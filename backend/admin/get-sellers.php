<?php
session_start();
require_once '../config/cors.php';
    require_once '../config/connect.php';
require_once "admin-auth.php";

header("Content-Type: application/json");
$sql = "
SELECT
*
FROM seller s
JOIN user u ON s.user_id = u.user_id
LEFT JOIN seller_pending sp ON s.seller_id = sp.seller_id
LEFT JOIN store st ON s.seller_id = st.seller_id
ORDER BY s.seller_status ASC, u.creation_date DESC
";

$result = $conn->query($sql);

$sellers = [];
while ($row = $result->fetch_assoc()) {
  $sellers[] = $row;
}

echo json_encode($sellers);
