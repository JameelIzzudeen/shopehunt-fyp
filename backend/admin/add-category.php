<?php
session_start();
require_once '../config/cors.php';
require_once '../config/connect.php';
require_once "admin-auth.php";

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$name = $data['category_name'] ?? '';

if (!$name) {
  http_response_code(400);
  echo json_encode([
    "status" => "error",
    "message" => "Category name required"
  ]);
  exit;
}

// image path is set to empty string for now
$stmt = $conn->prepare("
  INSERT INTO category (category_name, category_image_path)
  VALUES (?, '')
");
$stmt->bind_param("s", $name);

if ($stmt->execute()) {
  $category_id = $conn->insert_id;
  echo json_encode([
    "status" => "success",
    "message" => "Category added successfully",
    "category_id" => $category_id
  ]);
} else {
  http_response_code(500);
  echo json_encode([
    "status" => "error",
    "message" => "Failed to add category"
  ]);
}