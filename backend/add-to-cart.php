<?php
    session_start();

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    include 'connect.php';

    $data = json_decode(file_get_contents("php://input"), true);
    $user_id = $data['user_id'] ?? null;
    $stock_id = $data['stock_id'] ?? null;
    $quantity = $data['quantity'] ?? null;
    $response = [];

    if (!$user_id || !$stock_id || !$quantity) {
        echo json_encode([
            "status" => "error",
            "message" => "missing user id or stock id or quantity"
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

    $sql = "INSERT INTO user_cart (user_id, stock_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?";
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