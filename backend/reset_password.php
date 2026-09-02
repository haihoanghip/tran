<?php
// backend/reset_password.php
header('Content-Type: application/json');
require __DIR__ . '/db.php';

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) $input = $_POST;

$token = $input['token'] ?? '';
$newPassword = $input['password'] ?? '';

if (!$token || strlen($newPassword) < 8) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid token or password too short.']);
  exit;
}

$stmt = $pdo->prepare('SELECT id, reset_expires FROM users WHERE reset_token = ?');
$stmt->execute([$token]);
$user = $stmt->fetch();

if (!$user) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid token.']);
  exit;
}

$expires = new DateTime($user['reset_expires']);
$now = new DateTime();
if ($now > $expires) {
  http_response_code(400);
  echo json_encode(['error' => 'Token expired.']);
  exit;
}

$hash = password_hash($newPassword, PASSWORD_DEFAULT);
$stmt = $pdo->prepare('UPDATE users SET password_hash = ?, reset_token = NULL, reset_expires = NULL WHERE id = ?');
$stmt->execute([$hash, $user['id']]);

echo json_encode(['success' => true, 'message' => 'Password updated']);
