<?php
    session_start();

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    include 'connect.php';

    $data = json_decode(file_get_contents("php://input"), true);
    $user_id = $data['user_id'] ?? null;
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

    $sql = "SELECT 
        s.store_id,
        s.store_name,
        s.latitude,
        s.longitude,
        COUNT(DISTINCT ss.stock_id) AS matched_items
    FROM store s
    JOIN store_stock ss 
        ON s.store_id = ss.store_id
    JOIN cart c 
        ON ss.stock_id = c.stock_id
    WHERE c.user_id = ?
    GROUP BY s.store_id, s.store_name
    HAVING COUNT(DISTINCT ss.stock_id) = (
        SELECT MAX(matched_items)
        FROM (
            SELECT COUNT(DISTINCT ss2.stock_id) AS matched_items
            FROM store s2
            JOIN store_stock ss2 ON s2.store_id = ss2.store_id
            JOIN cart c2 ON ss2.stock_id = c2.stock_id
            WHERE c2.user_id = ?
            GROUP BY s2.store_id
        ) t
    );";


    $stmt = $conn -> prepare($sql);
    $stmt -> bind_param('ii', $user_id, $user_id);
    $stmt -> execute();
    $result = $stmt -> get_result();

    $stores = [];
    while ($row = $result -> fetch_assoc()) {
        $stores[] = $row;
    }

    echo json_encode([
        "status" => "success",
        "data" => $stores
    ]);

?>