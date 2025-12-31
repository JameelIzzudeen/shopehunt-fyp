<?php
    session_start();

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    include 'connect.php';

    $data = json_decode(file_get_contents("php://input"), true);
    $user_id = $data['user_id'] ?? null;
    $store_id = $data['store_id'] ?? null;
    $stock_id = $data['stock_id'] ?? null;
    $stock_name = $data['stock_name'] ?? null;
    $category_id = $data['category_id'] ?? null;
    $category_name = $data['category_name'] ?? null;
    $price = $data['price'] ?? null;
    $quantity = $data['quantity'] ?? null;
    $description = $data['description'] ?? null;

    if (!$user_id || !$store_id || !$stock_name || !$category_id) {
        echo json_encode([
            "status" => "error",
            "message" => "Missing required fields"
        ]);
        exit;
    }

    if (!$stock_id){
        $sql = "SELECT stock_id FROM stock WHERE stock_name = ? AND category_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $stock_name, $category_id);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $stock_id = $row['stock_id'];
        } else {
            $sql = "INSERT INTO stock (stock_name, category_id) VALUES (?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("si", $stock_name, $category_id);
            if ($stmt->execute()) {
                $stock_id = $conn->insert_id;
            } else {
                echo json_encode([
                    "status" => "error",
                    "message" => "Failed to add new stock"
                ]);
                exit;
            }
        }
    }

    $sql = "INSERT INTO store_stock (store_id, stock_id, price, quantity, description)
            SELECT ?, ?, ?, ?, ?
            WHERE NOT EXISTS (
            SELECT 1 FROM store_stock
            WHERE store_id = ? AND stock_id = ?
            );";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iidisii", $store_id, $stock_id, $price, $quantity, $description, $store_id, $stock_id);
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode([
                "status" => "success",
                "message" => "Stock added to store successfully"
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Stock already exists in the store"
            ]);
        }
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Failed to add stock to store"
        ]);
    }