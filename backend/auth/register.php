<?php
    session_start();

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    require_once '../config/connect.php';

    $input = json_decode(file_get_contents("php://input"), true);


    $username = $input['username'] ?? '';
    $fname = $input['fname'] ?? '';
    $lname = $input['lname'] ?? '';
    $email = $input['email'] ?? '';
    $phone = $input['phone'] ?? '';
    $password = $input['password'] ?? '';
    $role = $input['role'] ?? '';

    if(!empty($username) && !empty($fname) && !empty($lname) && !empty($email) && !empty($phone) && !empty($password)){
        $sql = "SELECT * FROM user WHERE username=? OR email=?";
        // $sql = mysqli_query($conn, $exist);
        $stmt = $conn -> prepare($sql);
        $stmt -> bind_param('ss', $username, $email);
        $stmt -> execute();
        $result = $stmt -> get_result();

        if ($row = $result -> fetch_assoc()) {
            // echo '<script>alert("Username or Email already exist!!!!")</script>';
            // header("Location: /www/register.html?username=$username&email=$email&error=exists"); //later maybe want the input on register not empty
            // exit();
            echo json_encode([
                "status" => "error",
                "message" => "username or email has been used"
            ]);
            exit;
        }
        else {
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            if ($role === 'customer') {
                $role_id = 2;
            } else if ($role === 'seller') {
                $role_id = 3;
            }
            else {
                echo json_encode([
                    "status" => "error",
                    "message" => "user role not defined"
                ]);
                exit;
            }
            // echo '<script>alert("Something wrong??")</script>';
            $sql_add_user = "INSERT INTO user (role_id, username, first_name, last_name, email, phone, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
            $stmt_add = $conn -> prepare($sql_add_user);
            $stmt_add -> bind_param('sssssss', $role_id, $username, $fname, $lname, $email, $phone, $hashedPassword);
            $stmt_add -> execute();

            $user_id = $conn -> insert_id;

            if ($role_id === 2) {
                $conn -> query("INSERT INTO customer (user_id) VALUES ($user_id)");
            } else if ($role_id === 3) {
                $conn -> query("INSERT INTO seller (user_id, seller_status) VALUES ($user_id, 'pending')");
                $seller_id = $conn -> insert_id;
                $stmt_pending = $conn -> prepare("INSERT INTO seller_pending (seller_id, pending_store_name, pending_latitude, pending_longitude) VALUES (?, ?, ?, ?)");
                $stmt_pending -> bind_param('isdd', $seller_id, $input['store_name'], $input['latitude'], $input['longitude']);
                $stmt_pending -> execute();
            }

            echo json_encode([
                "status" => "success",
                "message" => "Registration Successfull"
            ]);
            // header("Location: /www/register.html?username=$username&fname=$fname&lname=$lname&email=$email&phone=$phone&error=exists"); //later maybe want the input on register not empty
            // exit();

        }
        // echo '<script>alert("habis signin")</script>';
        // echo $username; //temp
        // echo $password; //temp
    }
    else {
        echo json_encode([
            "status" => "error",
            "message" => "All form not filled"
        ]);
    }
    // echo '<script>alert("habis laaaa")</script>';

?>