<?php
    session_start();

    header("Content-Type: application/json");

    include 'connect.php';

    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    if(!empty($username) && !empty($password)){
        $sql = "SELECT * FROM user WHERE username=? AND password=?";
        $stmt = $conn -> prepare($sql);

        $stmt -> bind_param('ss', $username, $password);
        $stmt -> execute();

        $result = $stmt -> get_result();

        if ($row = $result -> fetch_assoc()) {
            echo '<script>alert("Successsss!!!!")</script>';
            $_SESSION["user_id"] = $row['user_id'];
            # code...
        }
        else {
            echo '<script>alert("Something wrong??")</script>';
        }
        echo '<script>alert("habis signin")</script>';
        echo $username;
        echo $password;
    }
    echo '<script>alert("habis laaaa")</script>';

?>
