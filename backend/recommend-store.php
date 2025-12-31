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

    // $user_id = 3;
    $response = [];

    if (!$user_id) {
        echo json_encode([
            "status" => "error",
            "message" => "missing user id"
        ]);
        exit;
    }

    // $sql = "SELECT s.store_id, s.store_name, COUNT(DISTINCT ss.stock_id) AS matched_items FROM store s JOIN store_stock ss ON s.store_id = ss.store_id JOIN cart c ON ss.stock_id = c.stock_id WHERE c.user_id = ? GROUP BY s.store_id, s.store_name";
//     $sql = "SELECT 
//     s.store_id,
//     s.store_name,
//     s.latitude,
//     s.longitude
// FROM store s
// JOIN store_stock ss 
//     ON s.store_id = ss.store_id
// JOIN cart c 
//     ON ss.stock_id = c.stock_id
// WHERE c.user_id = ?";
//     $sql = "SELECT 
//     s.store_id,
//     s.store_name,
//     COUNT(DISTINCT ss.stock_id) AS matched_items
// FROM store s
// JOIN store_stock ss 
//     ON s.store_id = ss.store_id
// JOIN cart c 
//     ON ss.stock_id = c.stock_id
// WHERE c.user_id = ?
// GROUP BY s.store_id, s.store_name
// HAVING COUNT(DISTINCT ss.stock_id) = (
//     SELECT MAX(matched_items)
//     FROM (
//         SELECT COUNT(DISTINCT ss2.stock_id) AS matched_items
//         FROM store s2
//         JOIN store_stock ss2 ON s2.store_id = ss2.store_id
//         JOIN cart c2 ON ss2.stock_id = c2.stock_id
//         WHERE c2.user_id = ?
//         GROUP BY s2.store_id
//     ) t
// );
// ";
// $sql = "SELECT 
//     s.store_id,
//     s.store_name,
//     s.latitude,
//     s.longitude,
//     c.stock_id AS missing_stock_id
// FROM store s
// JOIN cart c ON c.user_id = ?
// WHERE s.store_id IN (
//     SELECT s2.store_id
//     FROM store s2
//     JOIN store_stock ss2 ON s2.store_id = ss2.store_id
//     JOIN cart c2 ON ss2.stock_id = c2.stock_id
//     WHERE c2.user_id = ?
//     GROUP BY s2.store_id
//     HAVING COUNT(DISTINCT ss2.stock_id) = (
//         SELECT MAX(matched_items)
//         FROM (
//             SELECT COUNT(DISTINCT ss3.stock_id) AS matched_items
//             FROM store s3
//             JOIN store_stock ss3 ON s3.store_id = ss3.store_id
//             JOIN cart c3 ON ss3.stock_id = c3.stock_id
//             WHERE c3.user_id = ?
//             GROUP BY s3.store_id
//         ) t
//     )
// )
// AND c.stock_id NOT IN (
//     SELECT ss.stock_id
//     FROM store_stock ss
//     WHERE ss.store_id = s.store_id
// );
// ";

    // $sql = "SELECT 
    //     s.store_id,
    //     s.store_name,
    //     s.latitude,
    //     s.longitude,
    //     COUNT(DISTINCT ss.stock_id) AS matched_items
    // FROM store s
    // JOIN store_stock ss 
    //     ON s.store_id = ss.store_id
    // JOIN cart c 
    //     ON ss.stock_id = c.stock_id
    // WHERE c.user_id = ?
    // GROUP BY s.store_id, s.store_name
    // HAVING COUNT(DISTINCT ss.stock_id) = (
    //     SELECT MAX(matched_items)
    //     FROM (
    //         SELECT COUNT(DISTINCT ss2.stock_id) AS matched_items
    //         FROM store s2
    //         JOIN store_stock ss2 ON s2.store_id = ss2.store_id
    //         JOIN cart c2 ON ss2.stock_id = c2.stock_id
    //         WHERE c2.user_id = ?
    //         GROUP BY s2.store_id
    //     ) t
    // );";
    
    // $stmt = $conn -> prepare($sql);
    // $stmt -> bind_param('ii', $user_id, $user_id);
    // $stmt -> execute();
    // $result = $stmt -> get_result();
    // $stores = [];
    // while ($row = $result -> fetch_assoc()) {
    //     $stores[] = $row;
    // }

    // echo json_encode([
    //     "status" => "success",
    //     "data" => $stores
    // ]);

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

        // $storeMap[$store_id]['items'][] = $row['cart_id'];
        $storeMap[$store_id]['items'][] = [
            'cart_id' => $row['cart_id'],
            'stock_name' => $row['stock_name']
        ];
    }

    $remaining = $cart_id; // selected cart items
    $recommendedStores = [];

    while (!empty($remaining)) {

        $bestStore = null;
        $bestMatchCount = 0;

        foreach ($storeMap as $store) {
            // $matched = array_intersect($store['items'], $remaining);
            $matched = array_filter($store['items'], function($item) use ($remaining) {
                return in_array($item['cart_id'], $remaining);
            });
            if (count($matched) > $bestMatchCount) {
                $bestMatchCount = count($matched);
                $bestStore = $store;
                // $bestStore['matched_items'] = $matched;
                $bestStore['matched_items'] = array_values($matched);
            }
        }

        // Safety break (no store can cover remaining items)
        if ($bestMatchCount === 0) {
            break;
        }

        $recommendedStores[] = $bestStore;

        // Remove covered items
        // $remaining = array_diff($remaining, $bestStore['matched_items']);
        $remaining = array_diff($remaining, array_column($bestStore['matched_items'], 'cart_id'));

        // Remove chosen store so it won't be reused
        unset($storeMap[$bestStore['store_id']]);
    }

    echo json_encode([
        "status" => "success",
        "recommended_stores" => $recommendedStores,
        "missing_cart_items" => array_values($remaining)
    ]);
  
?>