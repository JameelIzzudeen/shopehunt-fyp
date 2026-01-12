<?php

    session_start();

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    require_once '../config/connect.php';

    $data = json_decode(file_get_contents("php://input"), true);

    $cart_id = $data['cart_id'];
    $quantity = $data['quantity'];

    $sql = "UPDATE cart SET cart_quantity=? WHERE cart_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $quantity, $cart_id);
    $stmt->execute();

    echo json_encode(["status" => "success"]);
?>