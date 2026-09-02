<?php
// src/db.php - cấu hình PDO
// Copy this file and set real DB credentials or set env vars.
$DB_HOST = getenv('DB_HOST') ?: '127.0.0.1';
$DB_NAME = getenv('DB_NAME') ?: 'your_database';
$DB_USER = getenv('DB_USER') ?: 'your_user';
$DB_PASS = getenv('DB_PASS') ?: 'your_pass';

$options = [
  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  PDO::ATTR_EMULATE_PREPARES => false,
];

try {
  $pdo = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4", $DB_USER, $DB_PASS, $options);
} catch (Exception $e) {
  http_response_code(500);
  header('Content-Type: application/json');
  echo json_encode(['error' => 'Database connection failed']);
  exit;
}
