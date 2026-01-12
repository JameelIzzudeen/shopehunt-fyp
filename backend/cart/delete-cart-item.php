<?php
    session_start();

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    require_once '../config/connect.php';


    $data = json_decode(file_get_contents("php://input"), true);
    $user_id = $data['user_id'] ?? null;
    $cart_id = $data['cart_id'] ?? null;
    // $user_id = 3;
    // $response = [];

    require_once '../auth/customer-auth.php';

    if (!$user_id) {
        echo json_encode([
            "status" => "error",
            "message" => "missing user id"
        ]);
        exit;
    }

    $sql = "DELETE FROM cart WHERE cart_id = ? AND user_id = ?";
    $stmt = $conn -> prepare($sql);
    $stmt -> bind_param("ii", $cart_id, $user_id);
    $stmt -> execute();


    if ($stmt -> affected_rows > 0){
        echo json_encode([
            "status" => "success",
            "message" => "cart item deleted successfully"
        ]);
        exit;
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "failed to delete cart item"
        ]);
        exit;
    }

?>
