<?php
// api/ticket.php - API endpoints untuk sistem tiket
require_once 'config.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

switch ($method) {
    case 'GET':
        handleGet($action);
        break;
    case 'POST':
        handlePost($action);
        break;
    default:
        jsonResponse(false, 'Method not allowed');
}

function handleGet($action) {
    global $pdo;
    
    switch ($action) {
        case 'event':
            getEventDetails();
            break;
        case 'ticket_types':
            getTicketTypes();
            break;
        case 'payment_methods':
            getPaymentMethods();
            break;
        case 'order':
            getOrderDetails();
            break;
        default:
            jsonResponse(false, 'Invalid action');
    }
}

function handlePost($action) {
    switch ($action) {
        case 'create_order':
            createOrder();
            break;
        case 'check_availability':
            checkTicketAvailability();
            break;
        default:
            jsonResponse(false, 'Invalid action');
    }
}

function getEventDetails() {
    global $pdo;
    
    $event_id = $_GET['id'] ?? 1; // Default ke event pertama
    
    try {
        $stmt = $pdo->prepare("
            SELECT e.*, 
                   COUNT(DISTINCT tt.id) as ticket_type_count,
                   MIN(tt.price) as min_price,
                   MAX(tt.price) as max_price
            FROM events e 
            LEFT JOIN ticket_types tt ON e.id = tt.event_id 
            WHERE e.id = ? AND e.status = 'active'
            GROUP BY e.id
        ");
        $stmt->execute([$event_id]);
        $event = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$event) {
            jsonResponse(false, 'Event not found');
            return;
        }
        
        // Format data untuk frontend
        $event['formatted_date'] = date('d M Y', strtotime($event['date']));
        $event['formatted_time'] = date('H:i', strtotime($event['start_time'])) . ' - ' . date('H:i', strtotime($event['end_time'])) . ' WIB';
        
        jsonResponse(true, 'Event details retrieved successfully', $event);
        
    } catch (PDOException $e) {
        jsonResponse(false, 'Database error: ' . $e->getMessage());
    }
}

function getTicketTypes() {
    global $pdo;
    
    $event_id = $_GET['event_id'] ?? 1;
    
    try {
        $stmt = $pdo->prepare("
            SELECT id, name, price, description, benefits, available_quantity, max_quantity
            FROM ticket_types 
            WHERE event_id = ? 
            ORDER BY price ASC
        ");
        $stmt->execute([$event_id]);
        $ticket_types = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Decode JSON benefits untuk setiap ticket type
        foreach ($ticket_types as &$ticket) {
            $ticket['benefits'] = json_decode($ticket['benefits'], true);
            $ticket['formatted_price'] = 'Rp ' . number_format($ticket['price'], 0, ',', '.');
        }
        
        jsonResponse(true, 'Ticket types retrieved successfully', $ticket_types);
        
    } catch (PDOException $e) {
        jsonResponse(false, 'Database error: ' . $e->getMessage());
    }
}

function getPaymentMethods() {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("
            SELECT id, name, code, logo_url 
            FROM payment_methods 
            WHERE is_active = 1 
            ORDER BY name ASC
        ");
        $stmt->execute();
        $payment_methods = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        jsonResponse(true, 'Payment methods retrieved successfully', $payment_methods);
        
    } catch (PDOException $e) {
        jsonResponse(false, 'Database error: ' . $e->getMessage());
    }
}

function checkTicketAvailability() {
    global $pdo;
    
    $input = json_decode(file_get_contents('php://input'), true);
    $ticket_type_id = $input['ticket_type_id'] ?? 0;
    $quantity = $input['quantity'] ?? 1;
    
    try {
        $stmt = $pdo->prepare("
            SELECT available_quantity, name, price 
            FROM ticket_types 
            WHERE id = ?
        ");
        $stmt->execute([$ticket_type_id]);
        $ticket = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$ticket) {
            jsonResponse(false, 'Ticket type not found');
            return;
        }
        
        $available = $ticket['available_quantity'] >= $quantity;
        
        jsonResponse(true, 'Availability checked', [
            'available' => $available,
            'available_quantity' => $ticket['available_quantity'],
            'requested_quantity' => $quantity,
            'ticket_name' => $ticket['name'],
            'ticket_price' => $ticket['price']
        ]);
        
    } catch (PDOException $e) {
        jsonResponse(false, 'Database error: ' . $e->getMessage());
    }
}

function createOrder() {
    global $pdo;
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validasi input
    $required_fields = ['buyer_name', 'buyer_email', 'buyer_phone', 'buyer_id_number', 'event_id', 'ticket_items', 'payment_method'];
    foreach ($required_fields as $field) {
        if (empty($input[$field])) {
            jsonResponse(false, "Field $field is required");
            return;
        }
    }
    
    // Validasi email
    if (!filter_var($input['buyer_email'], FILTER_VALIDATE_EMAIL)) {
        jsonResponse(false, 'Invalid email format');
        return;
    }
    
    // Validasi nomor KTP (harus 16 digit)
    if (strlen($input['buyer_id_number']) !== 16 || !is_numeric($input['buyer_id_number'])) {
        jsonResponse(false, 'ID number must be 16 digits');
        return;
    }
    
    try {
        $pdo->beginTransaction();
        
        // Generate order number
        $order_number = 'TKT' . date('Ymd') . sprintf('%04d', rand(1000, 9999));
        
        // Check jika order number sudah ada
        $stmt = $pdo->prepare("SELECT id FROM orders WHERE order_number = ?");
        $stmt->execute([$order_number]);
        if ($stmt->fetch()) {
            // Regenerate jika sudah ada
            $order_number = 'TKT' . date('Ymd') . sprintf('%04d', rand(1000, 9999));
        }
        
        // Hitung total
        $subtotal = 0;
        $validated_items = [];
        
        foreach ($input['ticket_items'] as $item) {
            $ticket_type_id = $item['ticket_type_id'];
            $quantity = $item['quantity'];
            
            // Ambil data ticket type dan check availability
            $stmt = $pdo->prepare("
                SELECT id, name, price, available_quantity 
                FROM ticket_types 
                WHERE id = ? FOR UPDATE
            ");
            $stmt->execute([$ticket_type_id]);
            $ticket_type = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$ticket_type) {
                throw new Exception("Ticket type not found: $ticket_type_id");
            }
            
            if ($ticket_type['available_quantity'] < $quantity) {
                throw new Exception("Not enough tickets available for " . $ticket_type['name']);
            }
            
            $item_subtotal = $ticket_type['price'] * $quantity;
            $subtotal += $item_subtotal;
            
            $validated_items[] = [
                'ticket_type_id' => $ticket_type_id,
                'ticket_name' => $ticket_type['name'],
                'quantity' => $quantity,
                'unit_price' => $ticket_type['price'],
                'subtotal' => $item_subtotal
            ];
        }
        
        // Hitung biaya tambahan
        $admin_fee = 5000;
        $tax_rate = 0.10;
        $tax_amount = $subtotal * $tax_rate;
        $total_amount = $subtotal + $admin_fee + $tax_amount;
        
        // Set payment due (24 jam dari sekarang)
        $payment_due = date('Y-m-d H:i:s', strtotime('+24 hours'));
        
        // Insert order
        $stmt = $pdo->prepare("
            INSERT INTO orders (
                order_number, buyer_name, buyer_email, buyer_phone, buyer_id_number,
                event_id, total_amount, admin_fee, tax_amount, payment_method,
                payment_due
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $order_number,
            $input['buyer_name'],
            $input['buyer_email'],
            $input['buyer_phone'],
            $input['buyer_id_number'],
            $input['event_id'],
            $total_amount,
            $admin_fee,
            $tax_amount,
            $input['payment_method'],
            $payment_due
        ]);
        
        $order_id = $pdo->lastInsertId();
        
        // Insert order items dan generate tickets
        foreach ($validated_items as $item) {
            // Insert order item
            $stmt = $pdo->prepare("
                INSERT INTO order_items (order_id, ticket_type_id, quantity, unit_price, subtotal)
                VALUES (?, ?, ?, ?, ?)
            ");
            $stmt->execute([
                $order_id,
                $item['ticket_type_id'],
                $item['quantity'],
                $item['unit_price'],
                $item['subtotal']
            ]);
            
            // Generate individual tickets
            for ($i = 0; $i < $item['quantity']; $i++) {
                $ticket_code = 'T' . $order_number . sprintf('%02d', $i + 1);
                
                $stmt = $pdo->prepare("
                    INSERT INTO tickets (ticket_code, order_id, ticket_type_id, holder_name)
                    VALUES (?, ?, ?, ?)
                ");
                $stmt->execute([
                    $ticket_code,
                    $order_id,
                    $item['ticket_type_id'],
                    $input['buyer_name']
                ]);
            }
            
            // Update available quantity
            $stmt = $pdo->prepare("
                UPDATE ticket_types 
                SET available_quantity = available_quantity - ? 
                WHERE id = ?
            ");
            $stmt->execute([$item['quantity'], $item['ticket_type_id']]);
        }
        
        $pdo->commit();
        
        // Response data
        $response_data = [
            'order_id' => $order_id,
            'order_number' => $order_number,
            'total_amount' => $total_amount,
            'payment_due' => $payment_due,
            'subtotal' => $subtotal,
            'admin_fee' => $admin_fee,
            'tax_amount' => $tax_amount,
            'items' => $validated_items
        ];
        
        jsonResponse(true, 'Order created successfully', $response_data);
        
    } catch (Exception $e) {
        $pdo->rollBack();
        jsonResponse(false, 'Failed to create order: ' . $e->getMessage());
    }
}

function getOrderDetails() {
    global $pdo;
    
    $order_number = $_GET['order_number'] ?? '';
    
    if (empty($order_number)) {
        jsonResponse(false, 'Order number is required');
        return;
    }
    
    try {
        $stmt = $pdo->prepare("
            SELECT o.*, e.title as event_title, e.date as event_date, 
                   e.start_time, e.location as event_location
            FROM orders o
            JOIN events e ON o.event_id = e.id
            WHERE o.order_number = ?
        ");
        $stmt->execute([$order_number]);
        $order = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$order) {
            jsonResponse(false, 'Order not found');
            return;
        }
        
        // Get order items
        $stmt = $pdo->prepare("
            SELECT oi.*, tt.name as ticket_name
            FROM order_items oi
            JOIN ticket_types tt ON oi.ticket_type_id = tt.id
            WHERE oi.order_id = ?
        ");
        $stmt->execute([$order['id']]);
        $order_items = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Get tickets
        $stmt = $pdo->prepare("
            SELECT t.*, tt.name as ticket_type_name
            FROM tickets t
            JOIN ticket_types tt ON t.ticket_type_id = tt.id
            WHERE t.order_id = ?
        ");
        $stmt->execute([$order['id']]);
        $tickets = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        $order['items'] = $order_items;
        $order['tickets'] = $tickets;
        $order['formatted_total'] = 'Rp ' . number_format($order['total_amount'], 0, ',', '.');
        
        jsonResponse(true, 'Order details retrieved successfully', $order);
        
    } catch (PDOException $e) {
        jsonResponse(false, 'Database error: ' . $e->getMessage());
    }
}
?>