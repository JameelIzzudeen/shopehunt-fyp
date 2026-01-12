<?php
    session_start();

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    require_once '../config/connect.php';

    $data = json_decode(file_get_contents("php://input"), true);
    $category_id = $data['category_id'] ?? null;
    $response = [];

    if (!$category_id) {
        echo json_encode([
            "status" => "error",
            "message" => "missing category id"
        ]);
        exit;
    }

    $sql = "SELECT * FROM category cat, stock stk, store_stock ss WHERE cat.category_id=$category_id AND cat.category_id=stk.category_id AND stk.stock_id=ss.stock_id GROUP BY stk.stock_id";
    $result = $conn -> query($sql);

    $category_data = [];
    while ($row = $result -> fetch_assoc()) {
        $category_data[] = $row;
    }
    $response = [
        "status" => "success",
        "category" => $category_data
    ];

    echo json_encode($response);
?>