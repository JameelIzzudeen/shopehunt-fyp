<?php
    session_start();

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    include 'connect.php';

    $data = json_decode(file_get_contents("php://input"), true);
    $store_id = $data['store_id'] ?? null;
    $response = [];

    if (!$store_id) {
        echo json_encode([
            "status" => "error",
            "message" => "missing store id"
        ]);
        exit;
    }

    $sql = "SELECT * FROM store str, store_stock ss, stock stk WHERE str.store_id=$store_id AND str.store_id=ss.store_id AND ss.stock_id=stk.stock_id";
    $result = $conn -> query($sql);

    $store_data = [];
    while ($row = $result -> fetch_assoc()) {
        $store_data[] = $row;
        // echo json_encode([
        //     "status" => "success",
        //     "data" => $row
        // ]);
    }
    $response = [
        "status" => "success",
        "store" => $store_data
    ];

    echo json_encode($response);
?>