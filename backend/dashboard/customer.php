<?php
    session_start();

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    require_once '../config/connect.php';
    
    $data = json_decode(file_get_contents("php://input"), true);
    $user_id = $data['user_id'] ?? null;
    $userLat = $data['user_lat'] ?? null;
    $userLng = $data['user_lng'] ?? null;
    
    require_once '../auth/customer-auth.php';
    
    $response = [];

    if(!$user_id){
        $response['status'] = "error";
        $response['message'] = "No User IDs";
        echo json_encode($response);
        exit;
    }

    $sql = "SELECT * FROM user WHERE user_id = ?";
    $stmt = $conn -> prepare($sql);
    $stmt -> bind_param('i', $user_id);
    $stmt -> execute();

    $result = $stmt -> get_result();

    

    if ($row = $result -> fetch_assoc()) {
        $response['status'] = "success";
        $response['data'] = $row;
        
        //list categories
        $sql = "SELECT * FROM category";
        $result = $conn -> query($sql);

        $categories = [];
        while ($row = $result->fetch_assoc()) {
            $categories[] = $row;
        }
        $response['category'] = $categories;
        
        //list stores
        $sql = "
            SELECT DISTINCT
            s.store_id,
            s.store_name,
            s.latitude,
            s.longitude,
            s.store_image_path
            FROM store s
            JOIN store_stock ss ON s.store_id = ss.store_id
            ";
        $result = $conn -> query($sql);

        $storesInRadius = [];

        while ($row = $result->fetch_assoc()) {

            $distance = distanceKm(
                $userLat,
                $userLng,
                $row['latitude'],
                $row['longitude']
            );

            // ✅ Only keep stores within 100 km
            if ($distance <= 100) {
                $row['distance_km'] = round($distance, 2);
                $storesInRadius[] = $row;
            }
        }
        usort($storesInRadius, function ($a, $b) {
            return $a['distance_km'] <=> $b['distance_km'];
        });
        $recommendedStores = array_slice($storesInRadius, 0, 10);
        $response['status'] = "success";
        $response['store'] = $recommendedStores;

    } else {
        
        $response['status'] = "error";
        $response['message'] = "User ID invalid";
        
    }
    echo json_encode($response);
    /* ---------- HELPERS ---------- */
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