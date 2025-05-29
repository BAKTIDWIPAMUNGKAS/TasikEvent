<?php
// register_api.php
require_once 'config.php';

// Atur header CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'Method tidak diizinkan');
}

// Ambil input JSON
$json = file_get_contents('php://input');
$input = json_decode($json, true);

// Log untuk debug
error_log("Data register diterima: " . print_r($_POST, true));
error_log("Input JSON: " . $json);

// Inisialisasi variabel
$firstName = $lastName = $email = $phone = $password = $confirmPassword = '';
$agreeTerms = false;

if ($input && !empty($input)) {
    // Data dari JSON (request AJAX)
    $firstName = trim($input['first_name'] ?? '');
    $lastName = trim($input['last_name'] ?? '');
    $email = trim($input['email'] ?? '');
    $phone = trim($input['phone'] ?? '');
    $password = $input['password'] ?? '';
    $confirmPassword = $input['confirm_password'] ?? '';
    $agreeTerms = filter_var($input['agree_terms'] ?? false, FILTER_VALIDATE_BOOLEAN);
} else {
    // Data dari form POST biasa
    $firstName = trim($_POST['first_name'] ?? '');
    $lastName = trim($_POST['last_name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirm_password'] ?? '';
    $agreeTerms = isset($_POST['agree_terms']) && $_POST['agree_terms'] == '1';
}

// Validasi
if (empty($firstName) || empty($lastName) || empty($email) || empty($phone) || empty($password)) {
    jsonResponse(false, 'Semua field harus diisi');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    jsonResponse(false, 'Format email tidak valid');
}

if (strlen($password) < 8) {
    jsonResponse(false, 'Password minimal 8 karakter');
}

if ($password !== $confirmPassword) {
    jsonResponse(false, 'Konfirmasi password tidak cocok');
}

if (!preg_match('/^(\+62|62|0)[0-9]{9,13}$/', $phone)) {
    jsonResponse(false, 'Format nomor telepon tidak valid');
}

if (!$agreeTerms) {
    jsonResponse(false, 'Anda harus menyetujui syarat dan ketentuan');
}

try {
    // Cek apakah email sudah terdaftar
    $checkStmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $checkStmt->execute([$email]);
    
    if ($checkStmt->fetch()) {
        jsonResponse(false, 'Email sudah terdaftar');
    }

    // Cek apakah nomor telepon sudah terdaftar
    $checkPhoneStmt = $pdo->prepare("SELECT id FROM users WHERE phone = ?");
    $checkPhoneStmt->execute([$phone]);
    
    if ($checkPhoneStmt->fetch()) {
        jsonResponse(false, 'Nomor telepon sudah terdaftar');
    }

    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert user baru
    $stmt = $pdo->prepare("
        INSERT INTO users (first_name, last_name, email, phone, password, created_at) 
        VALUES (?, ?, ?, ?, ?, NOW())
    ");
    
    $result = $stmt->execute([$firstName, $lastName, $email, $phone, $hashedPassword]);
    
    if (!$result) {
        error_log("Error database: " . print_r($stmt->errorInfo(), true));
        jsonResponse(false, 'Gagal menyimpan data ke database');
    }
    
    $userId = $pdo->lastInsertId();

    // Kembalikan response sukses
    jsonResponse(true, 'Pendaftaran berhasil', [
        'user_id' => $userId,
        'redirect' => 'index.html',
        'user' => [
            'id' => $userId,
            'name' => $firstName . ' ' . $lastName,
            'email' => $email
        ]
    ]);

} catch(PDOException $e) {
    error_log("Error database: " . $e->getMessage());
    jsonResponse(false, 'Terjadi kesalahan sistem: ' . $e->getMessage());
}