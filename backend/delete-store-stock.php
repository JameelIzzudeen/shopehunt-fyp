<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'connect.php';

$data = json_decode(file_get_contents("php://input"), true);

$stockId = $data['stock_id'] ?? null;
$storeId = $data['store_id'] ?? null;

if (!$stockId || !$storeId) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing parameters"
    ]);
    exit;
}

$conn->begin_transaction();

try {
    // 1️⃣ Get image path
    $stmt = $conn->prepare(
        "SELECT store_stock_image_path 
         FROM store_stock 
         WHERE stock_id = ? AND store_id = ?"
    );
    $stmt->bind_param("ii", $stockId, $storeId);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    // 2️⃣ Delete store_stock (CASCADE handles feedback)
    $stmt = $conn->prepare(
        "DELETE FROM store_stock WHERE stock_id = ? AND store_id = ?"
    );
    $stmt->bind_param("ii", $stockId, $storeId);
    $stmt->execute();

    // 3️⃣ Delete image file
    if (!empty($row['store_stock_image_path'])) {
        $imageFile = "../upload" . $row['store_stock_image_path'];
        if (file_exists($imageFile)) {
            unlink($imageFile);
        }
    }

    $conn->commit();

    echo json_encode([
        "status" => "success",
        "message" => "Stock deleted successfully"
    ]);

} catch (Exception $e) {
    $conn->rollback();
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
