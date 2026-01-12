<?php
    session_start();

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    require_once '../config/connect.php';

    $data = json_decode(file_get_contents("php://input"), true);
    $stock_id = $data['stock_id'] ?? null;
    $response = [];

    if (!$stock_id) {
        echo json_encode([
            "status" => "error",
            "message" => "missing stock id"
        ]);
        exit;
    }

    $sql = "SELECT 
    stk.stock_id,
    stk.stock_name,
    ss.description,
    ss.store_stock_image_path,
    MIN(ss.price) AS min_price,
    MAX(ss.price) AS max_price
FROM stock stk
JOIN store_stock ss 
    ON stk.stock_id = ss.stock_id
WHERE stk.stock_id = $stock_id
GROUP BY stk.stock_id, stk.stock_name;";
    $result = $conn -> query($sql);

    $stock_data = [];
    while ($row = $result -> fetch_assoc()) {
        $stock_data[] = $row;
    }
    $response = [
        "status" => "success",
        "stock" => $stock_data
    ];

    echo json_encode($response);
?>