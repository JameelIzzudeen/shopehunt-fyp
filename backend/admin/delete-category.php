<?php
session_start();
require_once '../config/cors.php';
    require_once '../config/connect.php';
require_once "admin-auth.php";

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['category_id'];

$stmt = $conn->prepare("DELETE FROM category WHERE category_id=?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
  echo json_encode(["success" => true]);
} else {
  http_response_code(500);
  echo json_encode(["success" => false]);
}
