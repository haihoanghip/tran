<?php
// src/mail_config.php
// SMTP configuration loaded from environment variables. Set these in your server or .env.
$smtp = [
  'host' => getenv('SMTP_HOST') ?: 'smtp.example.com',
  'username' => getenv('SMTP_USER') ?: 'user@example.com',
  'password' => getenv('SMTP_PASS') ?: 'secret',
  'port' => getenv('SMTP_PORT') ?: 587,
  'encryption' => getenv('SMTP_ENCRYPTION') ?: 'tls', // tls or ssl
  'from_email' => getenv('MAIL_FROM') ?: 'no-reply@example.com',
  'from_name' => getenv('MAIL_FROM_NAME') ?: 'Your App',
];
