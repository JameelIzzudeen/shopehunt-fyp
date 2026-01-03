<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_start();

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'connect.php';

if (!isset($_FILES['image']) || !isset($_POST['stock_id']) || !isset($_POST['store_id'])) {
    echo json_encode(["success" => false, "message" => "Missing data"]);
    exit;
}

$stockId = (int)$_POST['stock_id'];
$storeId = (int)$_POST['store_id'];
$uploadDir = "../upload/stock/";

/* 1️⃣ Get old image path */
$sql = "SELECT store_stock_image_path 
        FROM store_stock 
        WHERE stock_id = ? AND store_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $stockId, $storeId);
$stmt->execute();
$result = $stmt->get_result();

$oldImagePath = null;
if ($result->num_rows === 1) {
    $row = $result->fetch_assoc();
    $oldImagePath = $row['store_stock_image_path'];
}

/* Ensure upload directory exists */
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

/* 2️⃣ Upload new image */
$fileName = time() . "_" . basename($_FILES["image"]["name"]);
$targetFile = $uploadDir . $fileName;

if (!move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
    echo json_encode(["success" => false, "message" => "Upload failed"]);
    exit;
}

$newImagePath = "/stock/" . $fileName;

/* 3️⃣ Update database */
$sql = "UPDATE store_stock 
        SET store_stock_image_path = ? 
        WHERE stock_id = ? AND store_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sii", $newImagePath, $stockId, $storeId);

if (!$stmt->execute()) {
    // rollback file upload if DB fails
    unlink($targetFile);
    echo json_encode(["success" => false, "message" => "Database update failed"]);
    exit;
}

/* 4️⃣ Delete old image (SAFE) */
if (!empty($oldImagePath) && $oldImagePath !== $newImagePath) {
    $fullOldPath = __DIR__ . "/../upload" . $oldImagePath;

    if (file_exists($fullOldPath)) {
        unlink($fullOldPath);
    }
}

echo json_encode([
    "success" => true,
    "image" => $newImagePath
]);
