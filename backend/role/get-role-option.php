<?php
    session_start();

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    require_once '../config/connect.php';

    $sql ="SELECT role_id, role_name FROM role";
    $stmt = $conn -> query($sql);

    $roles = [];
    while ($row = $stmt -> fetch_assoc()) {
        $roles[] = $row;
    }
    echo json_encode([
        "status" => "success",
        "roles" => $roles
    ]);
?>
