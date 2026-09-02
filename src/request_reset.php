<?php
// src/request_reset.php
header('Content-Type: application/json');
require __DIR__ . '/db.php';

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) $input = $_POST;
$email = filter_var(trim($input['email'] ?? ''), FILTER_VALIDATE_EMAIL);

if (!$email) {
  http_response_code(400);
  echo json_encode(['error' => 'Provide a valid email.']);
  exit;
}

// always respond with success to avoid leaking which emails exist
$stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
$stmt->execute([$email]);
$user = $stmt->fetch();

if ($user) {
  $token = bin2hex(random_bytes(32));
  $expires = (new DateTime('+1 hour'))->format('Y-m-d H:i:s');

  $stmt = $pdo->prepare('UPDATE users SET reset_token = ?, reset_expires = ? WHERE id = ?');
  $stmt->execute([$token, $expires, $user['id']]);

  // send email with link (implement actual mailer)
  $resetLink = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' ? 'https' : 'http') . '://' . ($_SERVER['HTTP_HOST'] ?? 'your-domain.example') . dirname($_SERVER['PHP_SELF']) . '/reset_password_form.html?token=' . $token;

  // TODO: send email via SMTP/PHPMailer. For now write to a log file for debugging in dev.
  $log = "Password reset requested for $email. Link: $resetLink\n";
  file_put_contents(__DIR__ . '/../logs/reset_requests.log', $log, FILE_APPEND | LOCK_EX);
}

// Always return same response
echo json_encode(['success' => true, 'message' => 'If an account exists, a reset link has been sent.']);
