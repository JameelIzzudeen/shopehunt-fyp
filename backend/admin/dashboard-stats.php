<?php
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'domain' => 'sequence.taile5772e.ts.net', // your backend domain
    'secure' => true,
    'httponly' => true,
    'samesite' => 'None'
]);


session_start();
require_once '../config/cors.php';
    require_once '../config/connect.php';
require_once "admin-auth.php";

header("Content-Type: application/json");

$response = [];

/* Total users */
$response['total_users'] = $conn->query("SELECT COUNT(*) FROM user")->fetch_row()[0];

/* Total sellers */
$response['total_sellers'] = $conn->query("SELECT COUNT(*) FROM seller")->fetch_row()[0];

/* Pending sellers */
$response['pending_sellers'] = $conn->query("
    SELECT COUNT(*) FROM seller WHERE seller_status='pending'
")->fetch_row()[0];

/* Total stores */
$response['total_stores'] = $conn->query("SELECT COUNT(*) FROM store")->fetch_row()[0];

/* Total stocks */
$response['total_stocks'] = $conn->query("SELECT COUNT(*) FROM stock")->fetch_row()[0];

/* Seller status breakdown */
$status = [];
$result = $conn->query("
    SELECT seller_status, COUNT(*) AS total
    FROM seller
    GROUP BY seller_status
");

while ($row = $result->fetch_assoc()) {
    $status[$row['seller_status']] = $row['total'];
}
$response['seller_status'] = $status;

/* Stock by category */
$categories = [];
$result = $conn->query("
    SELECT c.category_name, COUNT(s.stock_id) AS total
    FROM category c
    LEFT JOIN stock s ON c.category_id = s.category_id
    GROUP BY c.category_id
");

while ($row = $result->fetch_assoc()) {
    $categories[] = $row;
}
$response['stock_by_category'] = $categories;

// echo json_encode($response);

    echo json_encode([
        "status" => "success",
        "data" => $response,
        "session" => $_SESSION
    ]);
