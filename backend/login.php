<?php
    session_start();

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    include 'connect.php';

    $input = json_decode(file_get_contents("php://input"), true);

    $username = $input['username'] ?? '';
    $password = $input['password'] ?? '';

    if(!empty($username) && !empty($password)){
        $sql = "SELECT * FROM user u JOIN role r on u.role_id=r.role_id WHERE username=? AND password=?";
        $stmt = $conn -> prepare($sql);

        $stmt -> bind_param('ss', $username, $password);
        $stmt -> execute();

        $result = $stmt -> get_result();

        if ($row = $result -> fetch_assoc()) {

            $_SESSION["user_id"] = $row['user_id'];
            $_SESSION['role_id'] = $row['role_id'];

            echo json_encode([
                "status" => "success",
                "user_id" => $row['user_id'],
                "role" => $row['role_name']
            ]);
            # code...
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
