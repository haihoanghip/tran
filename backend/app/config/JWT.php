<?php

namespace app\config;

class JWT
{
    private static function secret(): string
    {
        return $_ENV['JWT_SECRET'] ?? 'fallback_secret_please_change';
    }

    // Mã hóa base64url (không có padding =)
    private static function b64Encode(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private static function b64Decode(string $data): string
    {
        return base64_decode(strtr($data, '-_', '+/'));
    }

    /**
     * Tạo JWT token
     */
    public static function encode(array $payload, int $expiry = 3600): string
    {
        $header  = self::b64Encode(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));
        $payload['iat'] = time();
        $payload['exp'] = time() + $expiry;
        $payload = self::b64Encode(json_encode($payload));

        $signature = self::b64Encode(
            hash_hmac('sha256', "{$header}.{$payload}", self::secret(), true)
        );

        return "{$header}.{$payload}.{$signature}";
    }

    /**
     * Giải mã và xác thực JWT token
     */
    public static function decode(string $token): ?array
    {
        $parts = explode('.', $token);
        if (count($parts) !== 3) return null;

        [$header, $payload, $signature] = $parts;

        // Kiểm tra chữ ký
        $expectedSig = self::b64Encode(
            hash_hmac('sha256', "{$header}.{$payload}", self::secret(), true)
        );
        if (!hash_equals($expectedSig, $signature)) return null;

        $data = json_decode(self::b64Decode($payload), true);
        if (!$data) return null;

        // Kiểm tra hết hạn
        if (isset($data['exp']) && $data['exp'] < time()) return null;

        return $data;
    }
}
