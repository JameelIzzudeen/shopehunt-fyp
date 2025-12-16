<?php
    include 'connect.php';

    $username = $_POST['username'] ?? '';
    $fname = $_POST['fname'] ?? '';
    $lname = $_POST['lname'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $password = $_POST['password'] ?? '';

    if(!empty($username) && !empty($fname) && !empty($lname) && !empty($email) && !empty($phone) && !empty($password)){
        $sql = "SELECT * FROM user WHERE username=? OR email=?";
        // $sql = mysqli_query($conn, $exist);
        $stmt = $conn -> prepare($sql);
        $stmt -> bind_param('ss', $username, $email);
        $stmt -> execute();
        $result = $stmt -> get_result();

        if ($row = $result -> fetch_assoc()) {
            echo '<script>alert("Username or Email already exist!!!!")</script>';
            // header("Location: /www/register.html?username=$username&email=$email&error=exists"); //later maybe want the input on register not empty
            // exit();
        }
        else {
            echo '<script>alert("Something wrong??")</script>';
            $sql_add_user = "INSERT INTO user (role_id, username, first_name, last_name, email, phone, password) VALUES (2, ?, ?, ?, ?, ?, ?)";
            $stmt_add = $conn -> prepare($sql_add_user);
            $stmt_add -> bind_param('ssssss', $username, $fname, $lname, $email, $phone, $password);
            $stmt_add -> execute();

            $user_id = $conn -> insert_id;
            $conn -> query("INSERT INTO customer (user_id) VALUES ($user_id)");

            // header("Location: /www/register.html?username=$username&fname=$fname&lname=$lname&email=$email&phone=$phone&error=exists"); //later maybe want the input on register not empty
            // exit();

        }
        echo '<script>alert("habis signin")</script>';
        echo $username; //temp
        echo $password; //temp
    }
    echo '<script>alert("habis laaaa")</script>';

?>