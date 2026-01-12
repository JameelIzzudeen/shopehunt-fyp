<?php
    session_start();

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    require_once '../config/connect.php';

    $input = json_decode(file_get_contents("php://input"), true);

    $username = $input['username'] ?? '';
    $password = $input['password'] ?? '';

    if(!empty($username) && !empty($password)){
        $sql = "SELECT u.user_id, u.username, u.password, r.role_name FROM user u JOIN role r on u.role_id=r.role_id WHERE username=?";
        $stmt = $conn -> prepare($sql);

        $stmt -> bind_param('s', $username);
        $stmt -> execute();

        $result = $stmt -> get_result();

        if ($row = $result -> fetch_assoc()) {
            if (password_verify($password, $row['password'])) {
                // $_SESSION["user_id"] = $row['user_id'];
                // $_SESSION['role_id'] = $row['role_id'];

                if ($row['role_name'] === 'seller') {
                    $seller_status = "SELECT seller_status FROM seller WHERE user_id=?";
                    $stmt_status = $conn -> prepare($seller_status);
                    $stmt_status -> bind_param('i', $row['user_id']);
                    $stmt_status -> execute();
                    $result_status = $stmt_status -> get_result();
                    if ($status_row = $result_status -> fetch_assoc()) {
                        if ($status_row['seller_status'] !== 'approved') {
                            echo json_encode([
                                "status" => "error",
                                "message" => "Seller account not approved"
                            ]);
                            exit;
                        }
                    }
                }

                echo json_encode([
                    "status" => "success",
                    "user_id" => $row['user_id'],
                    "role" => $row['role_name']
                ]);
            } else {
                echo json_encode([
                    "status" => "error",
                    "message" => "Invalid username or password"
                ]);
            }
            

        }
        else {
            echo json_encode([
            "status" => "error",
            "message" => "Invalid credentials"
            ]);
        }
        // echo $username;
        // echo $password;

    }
    else{
        echo json_encode([
            "status" => "error",
            "message" => "Missing username or password"
        ]);

    // exit;
    }


?>
