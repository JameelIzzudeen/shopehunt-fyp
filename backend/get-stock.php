<?php
    session_start();

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    include 'connect.php';
    $sql = "SELECT * FROM stock s, category c WHERE s.category_id = c.category_id ORDER BY stock_name ASC";
    $result = $conn->query($sql);

    if (!$result) {
        echo json_encode([
            "status" => "error",
            "message" => $conn->error
        ]);
        exit;
    }

    $stocks = [];

    while ($row = $result->fetch_assoc()) {
        $stocks[] = $row;
    }

    echo json_encode([
        "status" => "success",
        "data" => $stocks
    ]);

?>