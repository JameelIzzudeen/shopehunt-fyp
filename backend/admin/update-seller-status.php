<?php
session_start();
require_once '../config/cors.php';
    require_once '../config/connect.php';
require_once "admin-auth.php";

header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"), true);

$seller_id = $data['seller_id'] ?? null;
$status = $data['status'] ?? null;

if (!$seller_id || !in_array($status, ['approved','rejected'])) {
  http_response_code(400);
  echo json_encode(["success" => false]);
  exit();
}

$stmt = $conn->prepare(
  "UPDATE seller SET seller_status = ? WHERE seller_id = ?"
);
$stmt->bind_param("si", $status, $seller_id);
if ($stmt->execute()) {
  if ($status === 'approved') {
    $get_pending_store = $conn -> query ("SELECT * FROM seller_pending WHERE seller_id = $seller_id");
    $pending = $get_pending_store->fetch_assoc();
    $stmt_approve = $conn -> prepare ("INSERT INTO store (seller_id, store_name, latitude, longitude) VALUES (?, ?, ?, ?)");
    $stmt_approve->bind_param("isdd", $seller_id, $pending['pending_store_name'], $pending['pending_latitude'], $pending['pending_longitude']);
    $stmt_approve->execute();
    if ($stmt_approve->affected_rows > 0) {
      $conn -> query ("DELETE FROM seller_pending WHERE seller_id = $seller_id");
    }
  }
  echo json_encode(["success" => true]);
} else {
  http_response_code(500);
  echo json_encode(["success" => false]);
}