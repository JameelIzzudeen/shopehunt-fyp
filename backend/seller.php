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

    if(!$user_id){
        $response['status'] = "error";
        $response['message'] = "No User ID";
        echo json_encode($response);
        exit;
    }

    $sql = "SELECT * FROM user WHERE user_id = ?";
    $stmt = $conn -> prepare($sql);
    $stmt -> bind_param('i', $user_id);
    $stmt -> execute();

    $result = $stmt -> get_result();

    

    if ($row = $result -> fetch_assoc()) {
        $response['status'] = "success";
        $response['data'] = $row;
        

        $sql = "SELECT * FROM store str, seller s WHERE s.user_id = ? AND s.seller_id=str.seller_id";
        $stmt = $conn -> prepare($sql);
        $stmt -> bind_param('i', $user_id);
        $stmt -> execute();

        $result = $stmt -> get_result();
        $stores = [];
        while ($row = $result->fetch_assoc()) {
            $stores[] = $row;
        }
        $response['store'] = $stores;

    } else {
        
        $response['status'] = "error";
        $response['message'] = "User ID invalid";
        
    }
    echo json_encode($response);

?>