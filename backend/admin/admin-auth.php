<?php
// session_start();
// require_once '../cors.php';

$admin_id = $_SESSION['admin_id'] ?? null;

if (!isset($admin_id)) {
    // http_response_code(401);
    echo json_encode([
        "status" => "unauthorized",
        "message" => "Unauthorized",
        "data" => $admin_id
    ]);
    exit();
}

$sql = "SELECT * FROM `admin` WHERE admin_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $admin_id);
$stmt->execute();
$result = $stmt->get_result();

if (!$result->fetch_assoc()) {
    echo json_encode([
        "status" => "unauthorized",
        "message" => "Invalid admin session"
    ]);
    exit();
}