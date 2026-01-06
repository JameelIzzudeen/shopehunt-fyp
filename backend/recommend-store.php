<?php
    session_start();

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    include 'connect.php';

    $data = json_decode(file_get_contents("php://input"), true);
    $user_id = $data['user_id'] ?? null;
    $cart_id = $data['selected_cart_items'] ?? [];
    $userLat = $data['user_lat'] ?? null;
    $userLng = $data['user_lng'] ?? null;

    $response = [];

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

    $sql = "SELECT 
            s.store_id,
            s.store_name,
            s.latitude,
            s.longitude,
            s.store_image_path,
            c.cart_id,
            c.stock_id,
            stk.stock_name
        FROM store s
        JOIN store_stock ss ON s.store_id = ss.store_id
        JOIN cart c ON ss.stock_id = c.stock_id
        JOIN stock stk ON c.stock_id = stk.stock_id
        WHERE c.user_id = ?
        AND ss.quantity != 0
        AND c.cart_id IN (" . implode(',', array_fill(0, count($cart_id), '?')) . ")
        ";

    $types = str_repeat('i', count($cart_id) + 1);
    $params = array_merge([$user_id], $cart_id);

    $stmt = $conn->prepare($sql);
    $stmt->bind_param($types, ...$params);
    $stmt->execute();
    $result = $stmt->get_result();

    $storeMap = [];

    while ($row = $result->fetch_assoc()) {
        $store_id = $row['store_id'];

        if (!isset($storeMap[$store_id])) {
            $storeMap[$store_id] = [
                'store_id' => $row['store_id'],
                'store_name' => $row['store_name'],
                'latitude' => $row['latitude'],
                'longitude' => $row['longitude'],
                'store_image_path' => $row['store_image_path'],
                'items' => []
            ];
        }

        $storeMap[$store_id]['items'][] = [
            'cart_id' => $row['cart_id'],
            'stock_name' => $row['stock_name']
        ];
    }

    $remaining = $cart_id;
    $recommendedStores = [];

    while (!empty($remaining) && !empty($storeMap)) {

        $bestStore = null;
        $bestScore = -INF;

        foreach ($storeMap as $store) {

            $matched = array_filter($store['items'], function($item) use ($remaining) {
                return in_array($item['cart_id'], $remaining);
            });

            if (count($matched) === 0) continue;

            $distance = distanceKm(
                $userLat, $userLng,
                $store['latitude'], $store['longitude']
            );

            $score = (count($matched) * 10) - $distance;

            if ($score > $bestScore) {
                $bestScore = $score;
                $bestStore = $store;
                $bestStore['matched_items'] = array_values($matched);
                $bestStore['distance_km'] = round($distance, 2);
            }
        }

        // 🛑 No store can cover remaining items
        if ($bestStore === null) {
            break;
        }

        // ✅ Save best store
        $recommendedStores[] = $bestStore;

        // ❌ Remove covered cart items
        $remaining = array_diff(
            $remaining,
            array_column($bestStore['matched_items'], 'cart_id')
        );

        // ❌ Remove used store
        unset($storeMap[$bestStore['store_id']]);
    }

    echo json_encode([
        "status" => "success",
        "recommended_stores" => $recommendedStores,
        "missing_cart_items" => array_values($remaining)
    ]);

    function distanceKm($lat1, $lon1, $lat2, $lon2) {
        $earthRadius = 6371;
        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);

        $a = sin($dLat / 2) * sin($dLat / 2) +
            cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
            sin($dLon / 2) * sin($dLon / 2);

        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
        return $earthRadius * $c;
    }
  
?>