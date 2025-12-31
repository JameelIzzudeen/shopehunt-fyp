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
    $stock_name = $data['stock_name'] ?? null;
    $price = $data['price'] ?? null;
    $quantity = $data['quantity'] ?? null;
    $description = $data['description'] ?? null;

    $store_id = $data['store_id'] ?? null;
    $store_name = $data['store_name'] ?? null;
    $latitude = $data['latitude'] ?? null;
    $longitude = $data['longitude'] ?? null;

    if (!$user_id) {
        echo json_encode([
            "status" => "error",
            "message" => "Missing user ID"
        ]);
        exit;
    }

    if ($stock_id) {
        # code...
        $sql = "SELECT stock_id FROM stock WHERE stock_name = ? AND stock_id != ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $stock_name, $stock_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows < 1) {
            $sql = "INSERT INTO stock (stock_name, category_id) VALUES (?, ?)";
            $stmt = $conn->prepare($sql);
            $category_id = 1; // Default category ID
            $stmt->bind_param("si", $stock_name, $category_id);
            $stmt->execute();
            $stock_id = $conn->insert_id;
        }
        $sql = "UPDATE store_stock SET price = ?, quantity = ?, description = ? WHERE stock_id = ? AND store_id = (SELECT store_id FROM seller s, store st WHERE s.user_id = ? AND s.seller_id = st.seller_id)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("disii", $price, $quantity, $description, $stock_id, $user_id);
    
    
        if ($stmt->execute()) {
            echo json_encode([
                "status" => "success",
                "message" => "Store stock updated successfully"
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Failed to update store stock"
            ]);
        }
        

        
    } else if ($store_id) {
        $sql = "UPDATE store SET store_name = ?, latitude = ?, longitude = ? WHERE store_id = ? AND seller_id = (SELECT seller_id FROM seller WHERE user_id = ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssddi", $store_name, $latitude, $longitude, $store_id, $user_id);

        if ($stmt->execute()) {
            echo json_encode([
                "status" => "success",
                "message" => "Store updated successfully"
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Failed to update store"
            ]);
        }
    }

?>