<?php

session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'domain' => 'sequence.taile5772e.ts.net',
    'secure' => true,
    'httponly' => true,
    'samesite' => 'None'
]);

session_start();

require_once '../config/cors.php';
    require_once '../config/connect.php';

header("Content-Type: application/json");
error_reporting(0);
ini_set('display_errors', 0);

$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

if ($username === '' || $password === '') {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Username and password required"
    ]);
    exit();
}

$sql = "
SELECT 
    u.user_id,
    u.username,
    u.password,
    a.admin_id
FROM user u
JOIN admin a ON a.user_id = u.user_id
JOIN role r ON r.role_id = u.role_id
WHERE u.username = ?
AND r.role_name = 'admin'
LIMIT 1
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($admin = $result->fetch_assoc()) {

    if (password_verify($password, $admin['password'])) {
        $_SESSION["admin_id"] = $admin['admin_id'];
        echo json_encode([
            "status" => "success",
            "admin_id" => $admin['admin_id'],
            "user_id" => $admin['user_id'],
            "username" => $admin['username'],
            "session" => $_SESSION
        ]);
        exit();
    }
    echo json_encode([
        "status" => "error",
        "message" => "something rong"
    ]);
}

// fallback
// http_response_code(401);
echo json_encode([
    "status" => "error",
    "message" => "Invalid admin credentials"
]);
