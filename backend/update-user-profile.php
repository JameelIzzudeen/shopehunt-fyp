<?php
    session_start();

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    include 'connect.php';

    $data = json_decode(file_get_contents("php://input"), true);
    $user_id = $data['user_id'] ?? null;
    $username = $data['username'] ?? null;
    $first_name = $data['first_name'] ?? null;
    $last_name = $data['last_name'] ?? null;
    $email = $data['email'] ?? null;
    $phone = $data['phone'] ?? null;
    // $password = $data['password'] ?? null;

    if (!$user_id) {
        echo json_encode([
            "status" => "error",
            "message" => "Missing user ID"
        ]);
        exit;
    }

    $sql = "UPDATE user SET username = ?, first_name = ?, last_name = ?, email = ?, phone = ? WHERE user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssi", $username, $first_name, $last_name, $email, $phone, $user_id);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "message" => "Profile updated successfully"
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Failed to update profile"
        ]);
    }
    
?>