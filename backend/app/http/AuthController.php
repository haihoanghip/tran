<?php

namespace App\Http;

use App\Models\User;
use App\Config\JWT;

class AuthController
{
    private $userModel;

    public function __construct()
    {
        $this->userModel = new User();
    }

    // API Đăng ký: POST /api/register
    public function register()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data['fullname']) || empty($data['email']) || empty($data['password'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Vui lòng nhập đầy đủ thông tin!"]);
            return;
        }

        // Kiểm tra email đã tồn tại chưa
        if ($this->userModel->findByEmail($data['email'])) {
            http_response_code(409);
            echo json_encode(["status" => "error", "message" => "Email này đã được sử dụng!"]);
            return;
        }

        // Mã hóa mật khẩu
        $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);

        $userData = [
            'fullname' => trim($data['fullname']),
            'email'    => trim($data['email']),
            'password' => $hashedPassword
        ];

        $userId = $this->userModel->create($userData);

        if ($userId) {
            http_response_code(201);
            echo json_encode([
                "status"  => "success",
                "message" => "Đăng ký tài khoản thành công!"
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Đã có lỗi xảy ra, vui lòng thử lại!"]);
        }
    }

    // API Đăng nhập: POST /api/login
    public function login()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data['email']) || empty($data['password'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Vui lòng nhập Email và Mật khẩu!"]);
            return;
        }

        $user = $this->userModel->findByEmail($data['email']);

        // Kiểm tra user và xác nhận mật khẩu
        if (!$user || !password_verify($data['password'], $user['password'])) {
            http_response_code(401);
            echo json_encode(["status" => "error", "message" => "Email hoặc mật khẩu không chính xác!"]);
            return;
        }

        // Tạo JWT Payload
        $payload = [
            "iss"  => "localhost",
            "iat"  => time(),
            "exp"  => time() + (3600 * 24), // Token có hiệu lực 24 giờ
            "data" => [
                "id"       => $user['id'],
                "fullname" => $user['fullname'],
                "email"    => $user['email']
            ]
        ];

        // Tạo token từ config JWT của dự án
        $jwtHelper = new JWT();
        $token = $jwtHelper->encode($payload);

        http_response_code(200);
        echo json_encode([
            "status"  => "success",
            "message" => "Đăng nhập thành công!",
            "token"   => $token,
            "user"    => [
                "id"       => $user['id'],
                "fullname" => $user['fullname'],
                "email"    => $user['email']
            ]
        ]);
    }
}
