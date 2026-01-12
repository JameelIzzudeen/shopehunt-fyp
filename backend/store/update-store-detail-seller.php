<?php
    session_start();

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    require_once '../config/connect.php';

    $data = json_decode(file_get_contents("php://input"), true);

    $user_id = $data['user_id'] ?? null;
    require_once '../auth/seller-auth.php';

    $master_stock_id = $data['stock_id'] ?? null;
    $stock_name = $data['stock_name'] ?? null;
    $category_id = $data['category_id'] ?? null;
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

    if ($master_stock_id) {
        # code...
        $sql = "SELECT stock_id FROM stock WHERE stock_name = ? AND category_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $stock_name, $category_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows != 0) {

            $row = $result->fetch_assoc();
            $existing_stock_id = $row['stock_id'];

            if ($existing_stock_id == $master_stock_id) {
                // ✅ SAME stock → normal update
                $sql = "UPDATE store_stock 
                        SET price = ?, quantity = ?, description = ? 
                        WHERE stock_id = ? AND store_id = ?";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param(
                    "disii",
                    $price,
                    $quantity,
                    $description,
                    $master_stock_id,
                    $store_id
                );

            } else {
                // 🔥 DIFFERENT stock → migrate to existing master stock
                $conn->begin_transaction();

                try {
                    /* 1️⃣ Get old store_stock image */
                    $sql = "SELECT store_stock_image_path 
                            FROM store_stock 
                            WHERE store_id = ? AND stock_id = ?";
                    $stmt = $conn->prepare($sql);
                    $stmt->bind_param("ii", $store_id, $master_stock_id);
                    $stmt->execute();
                    $result2 = $stmt->get_result();

                    if ($result2->num_rows !== 1) {
                        throw new Exception("Original store stock not found");
                    }

                    $row2 = $result2->fetch_assoc();

                    /* 2️⃣ Insert new store_stock using EXISTING stock */
                    $sql = "INSERT INTO store_stock
                            (store_id, stock_id, price, quantity, description, store_stock_image_path)
                            VALUES (?, ?, ?, ?, ?, ?)";
                    $stmt = $conn->prepare($sql);
                    $stmt->bind_param(
                        "iidiss",
                        $store_id,
                        $existing_stock_id,
                        $price,
                        $quantity,
                        $description,
                        $row2['store_stock_image_path']
                    );
                    $stmt->execute();

                    /* 3️⃣ Move feedback */
                    $sql = "UPDATE feedback
                            SET stock_id = ?
                            WHERE store_id = ? AND stock_id = ?";
                    $stmt = $conn->prepare($sql);
                    $stmt->bind_param(
                        "iii",
                        $existing_stock_id,
                        $store_id,
                        $master_stock_id
                    );
                    $stmt->execute();

                    /* 4️⃣ Delete old store_stock */
                    $sql = "DELETE FROM store_stock
                            WHERE store_id = ? AND stock_id = ?";
                    $stmt = $conn->prepare($sql);
                    $stmt->bind_param("ii", $store_id, $master_stock_id);
                    $stmt->execute();

                    $conn->commit();

                    echo json_encode([
                        "status" => "success",
                        "message" => "Stock merged successfully"
                    ]);
                    exit;

                } catch (Exception $e) {
                    $conn->rollback();
                    echo json_encode([
                        "status" => "error",
                        "message" => $e->getMessage()
                    ]);
                    exit;
                }
            }

        } else{
            $conn->begin_transaction();

            try {
                /* 1️⃣ Get or create master stock */
                $sql = "SELECT stock_id FROM stock WHERE stock_name = ? AND category_id = ?";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("si", $stock_name, $category_id);
                $stmt->execute();
                $result = $stmt->get_result();

                if ($result->num_rows === 1) {
                    $row = $result->fetch_assoc();
                    $new_stock_id = $row['stock_id'];
                } else {
                    $sql = "INSERT INTO stock (stock_name, category_id) VALUES (?, ?)";
                    $stmt = $conn->prepare($sql);
                    $stmt->bind_param("si", $stock_name, $category_id);
                    if (!$stmt->execute()) {
                        throw new Exception("Failed to insert stock");
                    }
                    $new_stock_id = $conn->insert_id;
                }

                /* 2️⃣ Get old store_stock data */
                $sql = "SELECT store_stock_image_path 
                        FROM store_stock 
                        WHERE store_id = ? AND stock_id = ?";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("ii", $store_id, $master_stock_id);
                $stmt->execute();
                $result = $stmt->get_result();

                if ($result->num_rows !== 1) {
                    throw new Exception("Original store stock not found");
                }

                $row = $result->fetch_assoc();

                /* 3️⃣ Insert new store_stock */
                $sql = "INSERT INTO store_stock 
                        (store_id, stock_id, price, quantity, description, store_stock_image_path)
                        VALUES (?, ?, ?, ?, ?, ?)";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param(
                    "iidiss",
                    $store_id,
                    $new_stock_id,
                    $price,
                    $quantity,
                    $description,
                    $row['store_stock_image_path']
                );
                if (!$stmt->execute()) {
                    throw new Exception("Failed to insert new store_stock");
                }

                /* 4️⃣ MOVE feedback (KEY STEP 🔥) */
                $sql = "UPDATE feedback
                        SET stock_id = ?
                        WHERE store_id = ? AND stock_id = ?";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("iii", $new_stock_id, $store_id, $master_stock_id);
                if (!$stmt->execute()) {
                    throw new Exception("Failed to update feedback");
                }

                /* 5️⃣ Delete old store_stock */
                $sql = "DELETE FROM store_stock WHERE store_id = ? AND stock_id = ?";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("ii", $store_id, $master_stock_id);
                if (!$stmt->execute()) {
                    throw new Exception("Failed to delete old store_stock");
                }

                /* ✅ Commit */
                $conn->commit();

                echo json_encode([
                    "status" => "success",
                    "message" => "Stock updated successfully",
                    "new_stock_id" => $new_stock_id
                ]);
                exit;

            } catch (Exception $e) {
                $conn->rollback();
                echo json_encode([
                    "status" => "error",
                    "message" => $e->getMessage()
                ]);
                exit;
            }
        }
    
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
        $stmt->bind_param("sddii", $store_name, $latitude, $longitude, $store_id, $user_id);

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