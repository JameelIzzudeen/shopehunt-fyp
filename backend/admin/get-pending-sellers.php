<?php
session_start();
require_once '../config/cors.php';
    require_once '../config/connect.php';
require_once "admin-auth.php";

header("Content-Type: application/json");

// $sql = "
//   SELECT s.seller_id, u.username, u.email, u.phone, s.seller_status
//   FROM seller s
//   JOIN user u ON s.user_id = u.user_id
//   WHERE s.seller_status = 'pending'
// ";
$sql = "
  SELECT *
  FROM seller s
  LEFT JOIN user u ON s.user_id = u.user_id
  LEFT JOIN seller_pending sp ON s.seller_id = sp.seller_id
  WHERE s.seller_status = 'pending'
";

$result = $conn->query($sql);

$sellers = [];
while ($row = $result->fetch_assoc()) {
  $sellers[] = $row;
}

echo json_encode($sellers);
