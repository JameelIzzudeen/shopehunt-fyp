<?php
    session_start();

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    require_once '../config/connect.php';

    $data = json_decode(file_get_contents("php://input"), true);
    $user_id = $data['user_id'] ?? null;

    require_once '../auth/customer-auth.php';

    $stock_id = $data['stock_id'] ?? null;
    $quantity = $data['quantity'] ?? null;
    $response = [];

    if (!$user_id || !$stock_id) {
        echo json_encode([
            "status" => "error",
            "message" => "missing user id or stock id"
        ]);
        exit;
    }else if (!$quantity) {
        echo json_encode([
            "status" => "error",
            "message" => "Quantity is required"
        ]);
        exit;
    }

    if ($quantity <= 0) {
        echo json_encode([
            "status" => "error",
            "message" => "quantity must be greater than 0"
        ]);
        exit;
    }

    $sql = "INSERT INTO cart (user_id, stock_id, cart_quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE cart_quantity = cart_quantity + ?";
    $stmt = $conn -> prepare($sql);
    $stmt -> bind_param('iiii', $user_id, $stock_id, $quantity, $quantity);
    if ($stmt -> execute()) {
        $response = [
            "status" => "success",
            "message" => "Item added to cart successfully"
        ];
    } else {
        $response = [
            "status" => "error",
            "message" => "Failed to add item to cart"
        ];
    }
    echo json_encode($response);
?>