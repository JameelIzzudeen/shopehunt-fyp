<?php
    // $host = "100.98.141.122";
    $host = "100.117.156.69";
    $un = "sequence";
    $pd = "sequence12345678";
    $db = "shopehunt";


    $conn = new mysqli($host, $un, $pd, $db);
    if (!$conn) {
        die("Connection failed: ". mysqli_connect_error());
    }
?>