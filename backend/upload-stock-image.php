<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    session_start();

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    header("Content-Type: application/json");
    include 'connect.php';

if (!isset($_FILES['image']) || !isset($_POST['stock_id'])) {
    echo json_encode(["success" => false, "message" => "Missing data"]);
    exit;
}

$stockId = $_POST['stock_id'];
$storeId = $_POST['store_id'];
$uploadDir = "../upload/stock/";

if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$fileName = time() . "_" . basename($_FILES["image"]["name"]);
$targetFile = $uploadDir . $fileName;

if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {

    $imagePath = "/stock/" . $fileName;

    $stmt = $conn->prepare("UPDATE store_stock SET store_stock_image_path = ? WHERE stock_id = ? AND store_id = ?");
    $stmt->bind_param("sii", $imagePath, $stockId, $storeId);
    $stmt->execute();

    echo json_encode([
        "success" => true,
        "image" => $imagePath
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Upload failed"]);
}