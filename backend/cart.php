<?php
    session_start();

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    include 'connect.php';

    $data = json_decode(file_get_contents("php://input"), true);
    $user_id = $data['user_id'] ?? null;
    $response = [];

    if (!$user_id) {
        echo json_encode([
            "status" => "error",
            "message" => "missing user id"
        ]);
        exit;
    }

    $sql = "SELECT s.stock_name, ss.price, c.cart_id, c.cart_quantity, MIN(ss.price) AS min_price, MAX(ss.price) AS max_price, ss.store_stock_image_path
            FROM cart c JOIN stock s ON c.stock_id = s.stock_id JOIN store_stock ss ON s.stock_id = ss.stock_id
            WHERE c.user_id = ? GROUP BY c.stock_id";

    $stmt = $conn -> prepare($sql);
    $stmt -> bind_param('i', $user_id);
    $stmt -> execute();
    $result = $stmt -> get_result();

    $cart_data = [];
    if ($result -> num_rows > 0) {
        while ($row = $result -> fetch_assoc()) {
            $cart_data[] = $row;
        }
        $response = [
            "status" => "success",
            "cart_data" => $cart_data
        ];
    } else {
        $response = [
            "status" => "error",
            "message" => "No items in cart"
        ];
    }
    echo json_encode($response);

?>