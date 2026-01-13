<?php
session_start();

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once '../config/connect.php';
require_once '../auth/customer-auth.php';

$data = json_decode(file_get_contents("php://input"), true);

$user_id  = $data['user_id'] ?? null;
$userLat  = $data['user_lat'] ?? null;
$userLng  = $data['user_lng'] ?? null;

if (!$user_id) {
    echo json_encode([
        "status" => "error",
        "message" => "missing user id"
    ]);
    exit;
}

if ($userLat === null || $userLng === null) {
    echo json_encode([
        "status" => "error",
        "message" => "missing user location"
    ]);
    exit;
}

/* ✅ Fetch stores that have stock */
$sql = "
    SELECT DISTINCT s.*
    FROM store s
    INNER JOIN store_stock ss ON s.store_id = ss.store_id
";

$result = $conn->query($sql);

$stores = [];

while ($row = $result->fetch_assoc()) {

    $distance = distanceKm(
        $userLat,
        $userLng,
        $row['latitude'],
        $row['longitude']
    );

    $row['distance_km'] = round($distance, 2);
    $stores[] = $row;
}

/* ✅ Sort nearest first */
usort($stores, function ($a, $b) {
    return $a['distance_km'] <=> $b['distance_km'];
});

echo json_encode([
    "status" => "success",
    "recommended_stores" => $stores
]);

/* ---------- HELPERS ---------- */

function distanceKm($lat1, $lon1, $lat2, $lon2) {
    $earthRadius = 6371;
    $dLat = deg2rad($lat2 - $lat1);
    $dLon = deg2rad($lon2 - $lon1);

    $a = sin($dLat / 2) ** 2 +
        cos(deg2rad($lat1)) *
        cos(deg2rad($lat2)) *
        sin($dLon / 2) ** 2;

    return 2 * $earthRadius * atan2(sqrt($a), sqrt(1 - $a));
}
