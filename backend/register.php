<?php
    session_start();

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    include 'connect.php';

    $input = json_decode(file_get_contents("php://input"), true);


    $username = $input['username'] ?? '';
    $fname = $input['fname'] ?? '';
    $lname = $input['lname'] ?? '';
    $email = $input['email'] ?? '';
    $phone = $input['phone'] ?? '';
    $password = $input['password'] ?? '';

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
            // echo '<script>alert("Something wrong??")</script>';
            $sql_add_user = "INSERT INTO user (role_id, username, first_name, last_name, email, phone, password) VALUES (2, ?, ?, ?, ?, ?, ?)";
            $stmt_add = $conn -> prepare($sql_add_user);
            $stmt_add -> bind_param('ssssss', $username, $fname, $lname, $email, $phone, $password);
            $stmt_add -> execute();

            $user_id = $conn -> insert_id;
            $conn -> query("INSERT INTO customer (user_id) VALUES ($user_id)");

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