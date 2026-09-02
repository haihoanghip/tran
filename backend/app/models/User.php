<?php

namespace App\Models;

use App\Config\Database;
use PDO;

class User
{
    private $conn;
    private $table = 'users';

    public function __construct()
    {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    // Tìm user theo Email
    public function findByEmail($email)
    {
        $query = "SELECT * FROM " . $this->table . " WHERE email = :email LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Tạo user mới
    public function create($data)
    {
        $query = "INSERT INTO " . $this->table . " (fullname, email, password) VALUES (:fullname, :email, :password)";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':fullname', $data['fullname']);
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':password', $data['password']);

        if ($stmt->execute()) {
            return $this->conn->lastInsertId();
        }
        return false;
    }
}
