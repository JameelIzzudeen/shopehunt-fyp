<?php
session_start();
require_once '../config/cors.php';
    require_once '../config/connect.php';
require_once "admin-auth.php";

header("Content-Type: application/json");

$sql = "
  SELECT u.user_id, u.username, u.email, r.role_name
  FROM user u
  JOIN role r ON u.role_id = r.role_id
";

$res = $conn->query($sql);
$users = [];

while ($row = $res->fetch_assoc()) {
  $users[] = $row;
}

echo json_encode($users);
