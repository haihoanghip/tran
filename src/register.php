<?php
// src/register.php
header('Content-Type: application/json');
require __DIR__ . '/db.php';

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) $input = $_POST;

$email = filter_var(trim($input['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$password = $input['password'] ?? '';
$name = trim($input['name'] ?? '');

if (!$email || strlen($password) < 8) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid email or password (min 8 chars).']);
  exit;
}

// check existing
$stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
$stmt->execute([$email]);
if ($stmt->fetch()) {
  http_response_code(409);
  echo json_encode(['error' => 'Email already registered.']);
  exit;
}

$hash = password_hash($password, PASSWORD_DEFAULT);
$stmt = $pdo->prepare('INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)');
$stmt->execute([$email, $hash, $name]);

echo json_encode(['success' => true, 'message' => 'Account created']);
