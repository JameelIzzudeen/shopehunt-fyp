<?php
session_start();
require_once '../config/cors.php';
// require_once "admin-auth.php";

header("Content-Type: application/json");

session_destroy();
echo json_encode([
    "success" => true,
    "session" => $_SESSION]);
    
