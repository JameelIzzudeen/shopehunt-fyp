<?php

session_start();
require_once '../config/cors.php';
    require_once '../config/connect.php';
require_once "admin-auth.php";

header("Content-Type: application/json");

if (!isset($_FILES['image']) || !isset($_POST['category_id'])) {
    echo json_encode(["success" => false, "message" => "Missing data"]);
    exit;
}

$categoryId = (int)$_POST['category_id'];
$uploadDir = "../../upload/category/";

/* 1️⃣ Get old image path */
$sql = "SELECT category_image_path 
        FROM category 
        WHERE category_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $categoryId);
$stmt->execute();
$result = $stmt->get_result();

$oldImagePath = null;
if ($result->num_rows === 1) {
    $row = $result->fetch_assoc();
    $oldImagePath = $row['category_image_path'];
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

$newImagePath = "/category/" . $fileName;

/* 3️⃣ Update database */
$sql = "UPDATE category 
        SET category_image_path = ? 
        WHERE category_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $newImagePath, $categoryId);

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
