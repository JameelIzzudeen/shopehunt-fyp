<?php

    header("Content-Type: application/json");


    if (!isset($user_id)) {
        echo json_encode([
            "status" => "error",
            "message" => "No User ID"
        ]);
        exit();
    }
    $sql = "SELECT * FROM user u, seller s WHERE u.user_id = s.user_id AND u.user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows === 0) {
        echo json_encode([
            "status" => "unauthorized",
            "message" => "User not found"
        ]);
        exit();
    }

?>