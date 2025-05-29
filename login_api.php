<?php
// login_api.php
require_once 'config.php';

// Set CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'Method not allowed');
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    // Fallback untuk form data biasa
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    $remember = isset($_POST['remember']) ? true : false;
} else {
    $email = $input['email'] ?? '';
    $password = $input['password'] ?? '';
    $remember = $input['remember'] ?? false;
}

// Validasi input
if (empty($email) || empty($password)) {
    jsonResponse(false, 'Email dan password harus diisi');
}

// Validasi email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    jsonResponse(false, 'Format email tidak valid');
}

try {
    // Cari user berdasarkan email
    $stmt = $pdo->prepare("SELECT id, email, password, first_name, last_name, phone, created_at FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        jsonResponse(false, 'Email atau password salah');
    }

    // Verifikasi password
    if (!password_verify($password, $user['password'])) {
        jsonResponse(false, 'Email atau password salah');
    }

    // Update last login
    $updateStmt = $pdo->prepare("UPDATE users SET last_login = NOW() WHERE id = ?");
    $updateStmt->execute([$user['id']]);

    // Remove password from response
    unset($user['password']);

    // Generate session atau token jika diperlukan
    session_start();
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_email'] = $user['email'];
    $_SESSION['user_name'] = $user['first_name'] . ' ' . $user['last_name'];

    // Set cookie jika remember me dicentang
    if ($remember) {
        setcookie('remember_user', $user['id'], time() + (86400 * 30), "/"); // 30 hari
    }

    jsonResponse(true, 'Login berhasil', [
        'user' => $user,
        'redirect' => 'index.html'
    ]);

} catch(PDOException $e) {
    jsonResponse(false, 'Terjadi kesalahan sistem');
}
?>