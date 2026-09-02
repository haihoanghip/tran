<?php
// backend/request_reset.php
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

  $protocol = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
  $host = $_SERVER['HTTP_HOST'] ?? 'your-domain.example';
  $resetLink = $protocol . '://' . $host . '/frontend/reset_password_form.html?token=' . $token;

  // Try to send email using PHPMailer if available
  $sent = false;
  if (file_exists(__DIR__ . '/../vendor/autoload.php')) {
    try {
      require_once __DIR__ . '/mailer.php';
      $subject = 'Reset your password';
      $html = "<p>We received a request to reset your password.</p><p>Click the link below to reset it (expires in 1 hour):</p><p><a href=\"$resetLink\">Reset password</a></p><p>If you didn't request this, ignore this email.</p>";
      $sent = send_email($email, '', $subject, $html);
      if (!$sent) {
        $log = "[" . date('c') . "] Failed to send reset email to $email. Link: $resetLink\n";
        file_put_contents(__DIR__ . '/../logs/reset_requests.log', $log, FILE_APPEND | LOCK_EX);
      }
    } catch (Throwable $e) {
      // Fallback to logging if PHPMailer isn't configured properly
      $log = "[" . date('c') . "] Error sending mail: " . $e->getMessage() . " Link: $resetLink\n";
      file_put_contents(__DIR__ . '/../logs/reset_requests.log', $log, FILE_APPEND | LOCK_EX);
    }
  } else {
    // No composer/vendor installed — fallback to log for manual testing
    $log = "[" . date('c') . "] Password reset requested for $email. Link: $resetLink\n";
    file_put_contents(__DIR__ . '/../logs/reset_requests.log', $log, FILE_APPEND | LOCK_EX);
  }
}

// Always return same response
echo json_encode(['success' => true, 'message' => 'If an account exists, a reset link has been sent.']);
