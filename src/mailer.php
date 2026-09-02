<?php
// src/mailer.php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/mail_config.php';

function send_email($to, $to_name, $subject, $html_body, $alt_body = '') {
    global $smtp;

    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = $smtp['host'];
        $mail->SMTPAuth = true;
        $mail->Username = $smtp['username'];
        $mail->Password = $smtp['password'];
        $mail->SMTPSecure = $smtp['encryption'];
        $mail->Port = (int)$smtp['port'];

        $mail->setFrom($smtp['from_email'], $smtp['from_name']);
        $mail->addAddress($to, $to_name);
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $html_body;
        $mail->AltBody = $alt_body ?: strip_tags($html_body);

        return $mail->send();
    } catch (Exception $e) {
        $msg = "[" . date('c') . "] Mailer Error: " . ($mail->ErrorInfo ?? '') . " Exception: " . $e->getMessage() . PHP_EOL;
        file_put_contents(__DIR__ . '/../logs/mail_errors.log', $msg, FILE_APPEND | LOCK_EX);
        return false;
    }
}
