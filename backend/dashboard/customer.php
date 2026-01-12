<?php
    session_start();

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    require_once '../config/connect.php';
    
    $data = json_decode(file_get_contents("php://input"), true);
    $user_id = $data['user_id'] ?? null;
    
    require_once '../auth/customer-auth.php';
    
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
        
        //list categories
        $sql = "SELECT * FROM category";
        $result = $conn -> query($sql);

        $categories = [];
        while ($row = $result->fetch_assoc()) {
            $categories[] = $row;
        }
        $response['category'] = $categories;
        
        //list stores
        $sql = "SELECT s.* FROM store s, store_stock ss WHERE s.store_id = ss.store_id";
        $result = $conn -> query($sql);

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