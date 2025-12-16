<?php
    $host = "localhost";
    $un = "root";
    $pd = "";
    $db = "shopehunt";


    $conn = new mysqli($host, $un, $pd, $db);
    if (!$conn) {
        die("Connection failed: ". mysqli_connect_error());
    }
?>