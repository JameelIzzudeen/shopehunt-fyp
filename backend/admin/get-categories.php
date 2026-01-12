<?php
session_start();
require_once '../config/cors.php';
    require_once '../config/connect.php';
require_once "admin-auth.php";

header("Content-Type: application/json");

$result = $conn->query("SELECT * FROM category ORDER BY category_name ASC");

$categories = [];
while ($row = $result->fetch_assoc()) {
  $categories[] = $row;
}

echo json_encode([
          "status" => "success",
        "data" => $categories,
        "session" => $_SESSION
  ]);

