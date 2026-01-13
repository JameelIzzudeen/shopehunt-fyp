-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 13, 2026 at 07:09 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `user_id`) VALUES
(1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `stock_id` int(10) NOT NULL,
  `cart_quantity` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cart_id`, `user_id`, `stock_id`, `cart_quantity`) VALUES
(1, 21, 10, 1);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(10) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `category_image_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `category_image_path`) VALUES
(1, 'Vegetables', '/category/vegetables.jpg'),
(2, 'Fruits', '/category/fruits.jpg'),
(3, 'Meat', '/category/meat.jpg'),
(4, 'Seafood', '/category/seafood.jpg'),
(5, 'Groceries', '/category/groceries.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customer_id`, `user_id`) VALUES
(1, 21);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `role_id` int(10) NOT NULL,
  `role_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role_id`, `role_name`) VALUES
(1, 'admin'),
(2, 'customer'),
(3, 'seller');

-- --------------------------------------------------------

--
-- Table structure for table `seller`
--

CREATE TABLE `seller` (
  `seller_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `seller_status` enum('pending','approved','rejected') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `seller`
--

INSERT INTO `seller` (`seller_id`, `user_id`, `seller_status`) VALUES
(1, 1, 'approved'),
(2, 2, 'approved'),
(3, 3, 'approved'),
(4, 4, 'approved'),
(5, 5, 'approved'),
(6, 6, 'approved'),
(7, 7, 'approved'),
(8, 8, 'approved'),
(9, 9, 'approved'),
(10, 10, 'approved'),
(11, 11, 'approved'),
(12, 12, 'approved'),
(13, 13, 'approved'),
(14, 14, 'approved'),
(15, 15, 'approved'),
(16, 16, 'approved'),
(17, 17, 'approved'),
(18, 18, 'approved'),
(19, 19, 'approved'),
(20, 20, 'approved');

-- --------------------------------------------------------

--
-- Table structure for table `seller_pending`
--

CREATE TABLE `seller_pending` (
  `pending_id` int(10) NOT NULL,
  `seller_id` int(10) NOT NULL,
  `pending_store_name` varchar(255) NOT NULL,
  `pending_latitude` decimal(10,8) NOT NULL,
  `pending_longitude` decimal(11,8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `stock_id` int(10) NOT NULL,
  `stock_name` varchar(255) NOT NULL,
  `category_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`stock_id`, `stock_name`, `category_id`) VALUES
(1, 'Tomato', 1),
(2, 'Onion', 1),
(3, 'Cabbage', 1),
(4, 'Spinach', 1),
(5, 'Carrot', 1),
(6, 'Apple', 2),
(7, 'Banana', 2),
(8, 'Orange', 2),
(9, 'Papaya', 2),
(10, 'Mango', 2),
(11, 'Chicken', 3),
(12, 'Beef', 3),
(13, 'Lamb', 3),
(14, 'Chicken Breast', 3),
(15, 'Minced Beef', 3),
(16, 'Prawn', 4),
(17, 'Squid', 4),
(18, 'Fish (Ikan Kembung)', 4),
(19, 'Salmon', 4),
(20, 'Crab', 4),
(21, 'Rice 5kg', 5),
(22, 'Cooking Oil', 5),
(23, 'Sugar', 5),
(24, 'Salt', 5),
(25, 'Flour', 5),
(26, 'Eggs (30pcs)', 5),
(27, 'Milk', 5),
(28, 'Instant Noodles', 5),
(29, 'Soy Sauce', 5),
(30, 'Chili Sauce', 5);

-- --------------------------------------------------------

--
-- Table structure for table `store`
--

CREATE TABLE `store` (
  `store_id` int(10) NOT NULL,
  `seller_id` int(10) NOT NULL,
  `store_name` varchar(255) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `store_image_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `store`
--

INSERT INTO `store` (`store_id`, `seller_id`, `store_name`, `latitude`, `longitude`, `store_image_path`) VALUES
(1, 1, 'Tawau Fresh Mart', 4.24425518, 117.88318515, '/store/1.jpg'),
(2, 2, 'DESA Fresh Mart - Tawau', 4.25907596, 117.91479598, '/store/2.jpg'),
(3, 3, 'Eswarran Store', 3.07481501, 101.71883294, '/store/3.jpg'),
(4, 4, 'Bakti Orang Kita', 4.24375403, 117.88455747, '/store/4.jpg'),
(5, 5, 'Rastamas Trading Sdn Bhd (Kemayan)', 4.24314467, 117.88370043, '/store/5.jpg'),
(6, 6, 'PASAR SEGAR BSB', 3.07189499, 101.71560102, '/store/6.jpg'),
(7, 7, 'HeroMarket Sungai Besi', 3.06493955, 101.71099114, '/store/7.jpg'),
(8, 8, 'Pasar Sayur Malam Tawau', 4.24258489, 117.88533309, '/store/8.jpg'),
(9, 9, 'HK FruitSeller', 4.24568535, 117.89077786, '/store/9.jpg'),
(10, 10, 'Best Meat Shop', 4.25921094, 117.90891257, '/store/10.jpg'),
(11, 11, 'FamilyMart Lake FIelds', 3.06224056, 101.71112217, '/store/11.jpg'),
(12, 12, 'SUPERVALUE @ PPR Desa Tun Razak', 3.07893010, 101.71636126, '/store/12.jpg'),
(13, 13, 'One Stop Superstore • Fajar', 4.24493058, 117.88977111, '/store/13.jpg'),
(14, 14, 'Kedai Runcit', 3.06435695, 101.71079351, '/store/14.jpg'),
(15, 15, 'Al Sulaiman Desa Tasik', 3.07187619, 101.71663242, '/store/15.jpg'),
(16, 16, 'Pasaraya Azs', 3.07243109, 101.71678683, '/store/16.jpg'),
(17, 17, '99 Speedmart 1317 Trillium Sungai Besi', 3.06205824, 101.71140196, '/store/17.jpg'),
(18, 18, 'Borneo Beef Sdn Bhd', 4.25229932, 117.89603591, '/store/18.jpeg'),
(19, 19, 'TF Value-Mart Taman Connaught', 3.08083380, 101.73073324, '/store/19.jpg'),
(20, 20, 'Tawau Tanjung Market', 4.24356837, 117.88475490, '/store/20.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `store_stock`
--

CREATE TABLE `store_stock` (
  `store_id` int(10) NOT NULL,
  `stock_id` int(10) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(10) NOT NULL,
  `description` varchar(255) NOT NULL,
  `store_stock_image_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `store_stock`
--

INSERT INTO `store_stock` (`store_id`, `stock_id`, `price`, `quantity`, `description`, `store_stock_image_path`) VALUES
(1, 1, 3.50, 120, 'Fresh tomatoes', '/stock/tomato.jpg'),
(1, 2, 2.80, 140, 'Red onions', '/stock/onion.jpg'),
(1, 3, 4.00, 90, 'Cabbage', '/stock/cabbage.jpg'),
(1, 4, 3.20, 110, 'Spinach', '/stock/spinach.jpg'),
(1, 5, 2.50, 160, 'Carrots', '/stock/carrot.jpg'),
(1, 6, 4.20, 80, 'Apple', '/stock/apple.jpg'),
(1, 7, 2.30, 150, 'Banana', '/stock/banana.jpg'),
(1, 8, 3.80, 100, 'Orange', '/stock/orange.jpg'),
(1, 11, 12.00, 60, 'Chicken', '/stock/chicken.jpg'),
(1, 12, 28.00, 40, 'Beef', '/stock/beef.jpg'),
(1, 16, 18.00, 50, 'Prawn', '/stock/prawn.jpg'),
(1, 18, 12.50, 90, 'Ikan Kembung', '/stock/fish.jpg'),
(1, 21, 25.00, 70, 'Rice 5kg', '/stock/rice.jpg'),
(1, 22, 10.50, 100, 'Cooking oil', '/stock/oil.jpg'),
(1, 26, 15.00, 85, 'Eggs 30pcs', '/stock/egg(30).jpg'),
(2, 1, 3.30, 130, 'Local tomatoes', '/stock/tomato.jpg'),
(2, 2, 2.70, 150, 'Onions', '/stock/onion.jpg'),
(2, 4, 3.00, 120, 'Spinach', '/stock/spinach.jpg'),
(2, 5, 2.60, 140, 'Carrots', '/stock/carrot.jpg'),
(2, 6, 4.10, 90, 'Apples', '/stock/apple.jpg'),
(2, 7, 2.40, 160, 'Bananas', '/stock/banana.jpg'),
(2, 9, 5.00, 70, 'Papaya', '/stock/papaya.jpg'),
(2, 10, 6.50, 60, 'Mango', '/stock/mango.jpg'),
(2, 11, 11.50, 65, 'Chicken', '/stock/chicken.jpg'),
(2, 14, 14.00, 55, 'Chicken Breast', '/stock/chicken_breast.jpg'),
(2, 16, 19.00, 45, 'Prawns', '/stock/prawn.jpg'),
(2, 21, 24.00, 75, 'Rice', '/stock/rice.jpg'),
(2, 23, 4.20, 120, 'Sugar', '/stock/sugar.jpg'),
(2, 26, 15.50, 90, 'Eggs', '/stock/egg(30).jpg'),
(2, 28, 5.50, 200, 'Instant noodles', '/stock/instant_noodle.jpg'),
(3, 1, 3.60, 100, 'Tomatoes', '/stock/tomato.jpg'),
(3, 3, 4.30, 80, 'Cabbage', '/stock/cabbage.jpg'),
(3, 4, 3.10, 110, 'Spinach', '/stock/spinach.jpg'),
(3, 6, 4.50, 75, 'Apples', '/stock/apple.jpg'),
(3, 7, 2.20, 170, 'Bananas', '/stock/banana.jpg'),
(3, 8, 3.90, 95, 'Oranges', '/stock/orange.jpg'),
(3, 11, 12.20, 60, 'Chicken', '/stock/chicken.jpg'),
(3, 12, 29.00, 35, 'Beef', '/stock/beef.jpg'),
(3, 15, 26.00, 40, 'Minced Beef', '/stock/minced_beef.jpg'),
(3, 16, 18.50, 55, 'Prawns', '/stock/prawn.jpg'),
(3, 17, 17.00, 60, 'Squid', '/stock/squid.jpg'),
(3, 21, 26.00, 65, 'Rice', '/stock/rice.jpg'),
(3, 22, 11.00, 90, 'Oil', '/stock/oil.jpg'),
(3, 24, 2.00, 200, 'Salt', '/stock/salt.jpg'),
(3, 26, 14.80, 85, 'Eggs', '/stock/egg(30).jpg'),
(4, 2, 2.90, 130, 'Onions', '/stock/onion.jpg'),
(4, 3, 4.10, 85, 'Cabbage', '/stock/cabbage.jpg'),
(4, 5, 2.70, 150, 'Carrots', '/stock/carrot.jpg'),
(4, 6, 4.30, 80, 'Apples', '/stock/apple.jpg'),
(4, 7, 2.35, 160, 'Bananas', '/stock/banana.jpg'),
(4, 8, 3.85, 100, 'Oranges', '/stock/orange.jpg'),
(4, 11, 12.50, 60, 'Chicken', '/stock/chicken.jpg'),
(4, 13, 32.00, 30, 'Lamb', '/stock/lamb.jpg'),
(4, 16, 19.50, 45, 'Prawns', '/stock/prawn.jpg'),
(4, 18, 13.00, 90, 'Fish', '/stock/fish.jpg'),
(4, 19, 42.00, 25, 'Salmon', '/stock/salmon.jpg'),
(4, 21, 25.50, 70, 'Rice', '/stock/rice.jpg'),
(4, 22, 10.80, 95, 'Oil', '/stock/oil.jpg'),
(4, 26, 15.20, 90, 'Eggs', '/stock/egg(30).jpg'),
(4, 30, 6.50, 110, 'Chili sauce', '/stock/chili_sauce.jpg'),
(5, 1, 3.40, 120, 'Tomatoes', '/stock/tomato.jpg'),
(5, 2, 2.60, 140, 'Onions', '/stock/onion.jpg'),
(5, 4, 3.10, 110, 'Spinach', '/stock/spinach.jpg'),
(5, 5, 2.55, 150, 'Carrots', '/stock/carrot.jpg'),
(5, 6, 4.00, 85, 'Apple', '/stock/apple.jpg'),
(5, 7, 2.20, 170, 'Banana', '/stock/banana.jpg'),
(5, 11, 11.80, 70, 'Chicken', '/stock/chicken.jpg'),
(5, 12, 27.50, 40, 'Beef', '/stock/beef.jpg'),
(5, 16, 18.20, 55, 'Prawns', '/stock/prawn.jpg'),
(5, 18, 12.00, 95, 'Fish', '/stock/fish.jpg'),
(5, 21, 24.50, 80, 'Rice', '/stock/rice.jpg'),
(5, 22, 10.20, 100, 'Cooking oil', '/stock/oil.jpg'),
(5, 23, 4.10, 130, 'Sugar', '/stock/sugar.jpg'),
(5, 26, 14.90, 90, 'Eggs', '/stock/egg(30).jpg'),
(5, 28, 5.30, 210, 'Instant noodles', '/stock/instant_noodle.jpg'),
(6, 1, 3.60, 110, 'Tomatoes', '/stock/tomato.jpg'),
(6, 3, 4.20, 90, 'Cabbage', '/stock/cabbage.jpg'),
(6, 5, 2.70, 160, 'Carrots', '/stock/carrot.jpg'),
(6, 6, 4.30, 80, 'Apples', '/stock/apple.jpg'),
(6, 8, 3.90, 100, 'Oranges', '/stock/orange.jpg'),
(6, 9, 5.20, 75, 'Papaya', '/stock/papaya.jpg'),
(6, 11, 12.30, 65, 'Chicken', '/stock/chicken.jpg'),
(6, 14, 14.50, 60, 'Chicken breast', '/stock/chicken_breast.jpg'),
(6, 16, 19.00, 50, 'Prawns', '/stock/prawn.jpg'),
(6, 17, 17.80, 55, 'Squid', '/stock/squid.jpg'),
(6, 21, 25.80, 70, 'Rice', '/stock/rice.jpg'),
(6, 22, 10.90, 95, 'Oil', '/stock/oil.jpg'),
(6, 24, 2.10, 190, 'Salt', '/stock/salt.jpg'),
(6, 26, 15.10, 85, 'Eggs', '/stock/egg(30).jpg'),
(6, 29, 6.80, 120, 'Soy sauce', '/stock/soy_sauce.jpg'),
(7, 2, 2.75, 150, 'Onions', '/stock/onion.jpg'),
(7, 3, 4.00, 100, 'Cabbage', '/stock/cabbage.jpg'),
(7, 4, 3.00, 120, 'Spinach', '/stock/spinach.jpg'),
(7, 6, 4.10, 90, 'Apples', '/stock/apple.jpg'),
(7, 7, 2.25, 170, 'Bananas', '/stock/banana.jpg'),
(7, 10, 6.80, 65, 'Mango', '/stock/mango.jpg'),
(7, 11, 12.00, 70, 'Chicken', '/stock/chicken.jpg'),
(7, 13, 31.00, 35, 'Lamb', '/stock/lamb.jpg'),
(7, 16, 18.50, 60, 'Prawns', '/stock/prawn.jpg'),
(7, 18, 12.80, 90, 'Fish', '/stock/fish.jpg'),
(7, 19, 41.00, 30, 'Salmon', '/stock/salmon.jpg'),
(7, 21, 26.00, 75, 'Rice', '/stock/rice.jpg'),
(7, 23, 4.30, 125, 'Sugar', '/stock/sugar.jpg'),
(7, 26, 15.00, 90, 'Eggs', '/stock/egg(30).jpg'),
(7, 30, 6.70, 115, 'Chili sauce', '/stock/chili_sauce.jpg'),
(8, 1, 3.20, 140, 'Tomatoes', '/stock/tomato.jpg'),
(8, 4, 3.10, 130, 'Spinach', '/stock/spinach.jpg'),
(8, 5, 2.60, 150, 'Carrots', '/stock/carrot.jpg'),
(8, 6, 4.20, 85, 'Apple', '/stock/apple.jpg'),
(8, 7, 2.30, 180, 'Banana', '/stock/banana.jpg'),
(8, 8, 3.70, 110, 'Orange', '/stock/orange.jpg'),
(8, 11, 11.90, 75, 'Chicken', '/stock/chicken.jpg'),
(8, 12, 28.20, 45, 'Beef', '/stock/beef.jpg'),
(8, 15, 25.50, 50, 'Minced beef', '/stock/minced_beef.jpg'),
(8, 16, 18.00, 65, 'Prawns', '/stock/prawn.jpg'),
(8, 21, 24.80, 85, 'Rice', '/stock/rice.jpg'),
(8, 22, 10.00, 105, 'Oil', '/stock/oil.jpg'),
(8, 26, 14.70, 95, 'Eggs', '/stock/egg(30).jpg'),
(8, 28, 5.20, 220, 'Instant noodles', '/stock/instant_noodle.jpg'),
(8, 29, 6.60, 130, 'Soy sauce', '/stock/soy_sauce.jpg'),
(9, 2, 2.85, 150, 'Onions', '/stock/onion.jpg'),
(9, 3, 4.25, 95, 'Cabbage', '/stock/cabbage.jpg'),
(9, 6, 4.50, 80, 'Apples', '/stock/apple.jpg'),
(9, 7, 2.40, 170, 'Bananas', '/stock/banana.jpg'),
(9, 9, 5.10, 85, 'Papaya', '/stock/papaya.jpg'),
(9, 10, 6.90, 70, 'Mango', '/stock/mango.jpg'),
(9, 11, 12.40, 65, 'Chicken', '/stock/chicken.jpg'),
(9, 14, 14.80, 55, 'Chicken breast', '/stock/chicken_breast.jpg'),
(9, 16, 19.20, 50, 'Prawns', '/stock/prawn.jpg'),
(9, 18, 13.10, 90, 'Fish', '/stock/fish.jpg'),
(9, 21, 26.20, 70, 'Rice', '/stock/rice.jpg'),
(9, 23, 4.00, 140, 'Sugar', '/stock/sugar.jpg'),
(9, 24, 2.20, 180, 'Salt', '/stock/salt.jpg'),
(9, 26, 15.30, 85, 'Eggs', '/stock/egg(30).jpg'),
(9, 30, 6.90, 120, 'Chili sauce', '/stock/chili_sauce.jpg'),
(10, 1, 3.50, 120, 'Tomatoes', '/stock/tomato.jpg'),
(10, 2, 2.70, 150, 'Onions', '/stock/onion.jpg'),
(10, 5, 2.60, 160, 'Carrots', '/stock/carrot.jpg'),
(10, 6, 4.30, 90, 'Apples', '/stock/apple.jpg'),
(10, 7, 2.20, 180, 'Bananas', '/stock/banana.jpg'),
(10, 11, 12.00, 70, 'Chicken', '/stock/chicken.jpg'),
(10, 12, 28.00, 45, 'Beef', '/stock/beef.jpg'),
(10, 16, 18.80, 55, 'Prawns', '/stock/prawn.jpg'),
(10, 18, 12.90, 95, 'Fish', '/stock/fish.jpg'),
(10, 21, 25.50, 80, 'Rice', '/stock/rice.jpg'),
(10, 22, 10.40, 100, 'Oil', '/stock/oil.jpg'),
(10, 23, 4.20, 130, 'Sugar', '/stock/sugar.jpg'),
(10, 26, 15.00, 90, 'Eggs', '/stock/egg(30).jpg'),
(10, 28, 5.40, 210, 'Noodles', '/stock/instant_noodle.jpg'),
(10, 29, 6.70, 125, 'Soy sauce', '/stock/soy_sauce.jpg'),
(11, 1, 3.45, 130, 'Tomatoes', '/stock/tomato.jpg'),
(11, 2, 2.75, 145, 'Onions', '/stock/onion.jpg'),
(11, 4, 3.10, 120, 'Spinach', '/stock/spinach.jpg'),
(11, 6, 4.25, 85, 'Apples', '/stock/apple.jpg'),
(11, 7, 2.30, 170, 'Bananas', '/stock/banana.jpg'),
(11, 8, 3.85, 110, 'Oranges', '/stock/orange.jpg'),
(11, 11, 12.10, 70, 'Chicken', '/stock/chicken.jpg'),
(11, 14, 14.60, 55, 'Chicken breast', '/stock/chicken_breast.jpg'),
(11, 16, 18.90, 60, 'Prawns', '/stock/prawn.jpg'),
(11, 18, 12.70, 95, 'Fish', '/stock/fish.jpg'),
(11, 21, 25.20, 80, 'Rice', '/stock/rice.jpg'),
(11, 22, 10.30, 100, 'Cooking oil', '/stock/oil.jpg'),
(11, 23, 4.10, 135, 'Sugar', '/stock/sugar.jpg'),
(11, 26, 15.20, 90, 'Eggs', '/stock/egg(30).jpg'),
(11, 28, 5.40, 200, 'Instant noodles', '/stock/instant_noodle.jpg'),
(12, 1, 3.60, 120, 'Tomatoes', '/stock/tomato.jpg'),
(12, 3, 4.15, 95, 'Cabbage', '/stock/cabbage.jpg'),
(12, 5, 2.65, 155, 'Carrots', '/stock/carrot.jpg'),
(12, 6, 4.40, 80, 'Apples', '/stock/apple.jpg'),
(12, 9, 5.20, 90, 'Papaya', '/stock/papaya.jpg'),
(12, 10, 6.90, 70, 'Mango', '/stock/mango.jpg'),
(12, 11, 12.30, 65, 'Chicken', '/stock/chicken.jpg'),
(12, 12, 28.50, 40, 'Beef', '/stock/beef.jpg'),
(12, 15, 25.80, 50, 'Minced beef', '/stock/minced_beef.jpg'),
(12, 16, 19.10, 55, 'Prawns', '/stock/prawn.jpg'),
(12, 21, 26.00, 75, 'Rice', '/stock/rice.jpg'),
(12, 22, 10.70, 95, 'Oil', '/stock/oil.jpg'),
(12, 24, 2.20, 180, 'Salt', '/stock/salt.jpg'),
(12, 26, 15.00, 85, 'Eggs', '/stock/egg(30).jpg'),
(12, 29, 6.80, 120, 'Soy sauce', '/stock/soy_sauce.jpg'),
(13, 2, 2.80, 150, 'Onions', '/stock/onion.jpg'),
(13, 3, 4.30, 100, 'Cabbage', '/stock/cabbage.jpg'),
(13, 4, 3.20, 115, 'Spinach', '/stock/spinach.jpg'),
(13, 6, 4.50, 85, 'Apples', '/stock/apple.jpg'),
(13, 7, 2.35, 175, 'Bananas', '/stock/banana.jpg'),
(13, 8, 3.90, 105, 'Oranges', '/stock/orange.jpg'),
(13, 11, 12.60, 60, 'Chicken', '/stock/chicken.jpg'),
(13, 13, 31.50, 35, 'Lamb', '/stock/lamb.jpg'),
(13, 16, 19.30, 55, 'Prawns', '/stock/prawn.jpg'),
(13, 18, 13.20, 90, 'Fish', '/stock/fish.jpg'),
(13, 19, 41.80, 30, 'Salmon', '/stock/salmon.jpg'),
(13, 21, 26.50, 70, 'Rice', '/stock/rice.jpg'),
(13, 23, 4.25, 130, 'Sugar', '/stock/sugar.jpg'),
(13, 26, 15.40, 85, 'Eggs', '/stock/egg(30).jpg'),
(13, 30, 6.80, 110, 'Chili sauce', '/stock/chili_sauce.jpg'),
(14, 1, 3.55, 125, 'Tomatoes', '/stock/tomato.jpg'),
(14, 4, 3.15, 120, 'Spinach', '/stock/spinach.jpg'),
(14, 5, 2.70, 150, 'Carrots', '/stock/carrot.jpg'),
(14, 6, 4.35, 90, 'Apples', '/stock/apple.jpg'),
(14, 7, 2.25, 180, 'Bananas', '/stock/banana.jpg'),
(14, 10, 7.00, 65, 'Mango', '/stock/mango.jpg'),
(14, 11, 12.20, 70, 'Chicken', '/stock/chicken.jpg'),
(14, 12, 28.20, 45, 'Beef', '/stock/beef.jpg'),
(14, 16, 18.70, 60, 'Prawns', '/stock/prawn.jpg'),
(14, 18, 12.90, 95, 'Fish', '/stock/fish.jpg'),
(14, 21, 25.80, 80, 'Rice', '/stock/rice.jpg'),
(14, 22, 10.50, 100, 'Oil', '/stock/oil.jpg'),
(14, 26, 15.10, 90, 'Eggs', '/stock/egg(30).jpg'),
(14, 28, 5.30, 210, 'Instant noodles', '/stock/instant_noodle.jpg'),
(14, 29, 6.70, 120, 'Soy sauce', '/stock/soy_sauce.jpg'),
(15, 2, 2.90, 150, 'Onions', '/stock/onion.jpg'),
(15, 3, 4.10, 100, 'Cabbage', '/stock/cabbage.jpg'),
(15, 6, 4.60, 80, 'Apples', '/stock/apple.jpg'),
(15, 7, 2.40, 170, 'Bananas', '/stock/banana.jpg'),
(15, 9, 5.30, 85, 'Papaya', '/stock/papaya.jpg'),
(15, 11, 12.70, 60, 'Chicken', '/stock/chicken.jpg'),
(15, 14, 14.90, 55, 'Chicken breast', '/stock/chicken_breast.jpg'),
(15, 16, 19.40, 55, 'Prawns', '/stock/prawn.jpg'),
(15, 17, 18.10, 60, 'Squid', '/stock/squid.jpg'),
(15, 18, 13.00, 90, 'Fish', '/stock/fish.jpg'),
(15, 21, 26.30, 75, 'Rice', '/stock/rice.jpg'),
(15, 23, 4.30, 130, 'Sugar', '/stock/sugar.jpg'),
(15, 24, 2.30, 180, 'Salt', '/stock/salt.jpg'),
(15, 26, 15.50, 85, 'Eggs', '/stock/egg(30).jpg'),
(15, 30, 6.90, 115, 'Chili sauce', '/stock/chili_sauce.jpg'),
(16, 1, 3.65, 120, 'Tomatoes', '/stock/tomato.jpg'),
(16, 4, 3.20, 125, 'Spinach', '/stock/spinach.jpg'),
(16, 5, 2.75, 150, 'Carrots', '/stock/carrot.jpg'),
(16, 6, 4.50, 85, 'Apples', '/stock/apple.jpg'),
(16, 7, 2.30, 180, 'Bananas', '/stock/banana.jpg'),
(16, 8, 3.95, 110, 'Oranges', '/stock/orange.jpg'),
(16, 11, 12.40, 65, 'Chicken', '/stock/chicken.jpg'),
(16, 12, 28.60, 40, 'Beef', '/stock/beef.jpg'),
(16, 16, 19.00, 60, 'Prawns', '/stock/prawn.jpg'),
(16, 18, 13.10, 95, 'Fish', '/stock/fish.jpg'),
(16, 21, 26.10, 80, 'Rice', '/stock/rice.jpg'),
(16, 22, 10.60, 100, 'Oil', '/stock/oil.jpg'),
(16, 26, 15.30, 90, 'Eggs', '/stock/egg(30).jpg'),
(16, 28, 5.50, 210, 'Instant noodles', '/stock/instant_noodle.jpg'),
(16, 29, 6.90, 125, 'Soy sauce', '/stock/soy_sauce.jpg'),
(17, 2, 2.85, 150, 'Onions', '/stock/onion.jpg'),
(17, 3, 4.20, 100, 'Cabbage', '/stock/cabbage.jpg'),
(17, 6, 4.55, 85, 'Apples', '/stock/apple.jpg'),
(17, 7, 2.35, 175, 'Bananas', '/stock/banana.jpg'),
(17, 10, 7.10, 65, 'Mango', '/stock/mango.jpg'),
(17, 11, 12.80, 60, 'Chicken', '/stock/chicken.jpg'),
(17, 13, 32.00, 35, 'Lamb', '/stock/lamb.jpg'),
(17, 16, 19.50, 55, 'Prawns', '/stock/prawn.jpg'),
(17, 18, 13.30, 90, 'Fish', '/stock/fish.jpg'),
(17, 19, 42.20, 30, 'Salmon', '/stock/salmon.jpg'),
(17, 21, 26.40, 75, 'Rice', '/stock/rice.jpg'),
(17, 23, 4.40, 130, 'Sugar', '/stock/sugar.jpg'),
(17, 26, 15.60, 85, 'Eggs', '/stock/egg(30).jpg'),
(17, 29, 7.00, 120, 'Soy sauce', '/stock/soy_sauce.jpg'),
(17, 30, 7.10, 115, 'Chili sauce', '/stock/chili_sauce.jpg'),
(18, 1, 3.70, 120, 'Tomatoes', '/stock/tomato.jpg'),
(18, 4, 3.25, 120, 'Spinach', '/stock/spinach.jpg'),
(18, 6, 4.60, 85, 'Apples', '/stock/apple.jpg'),
(18, 7, 2.40, 180, 'Bananas', '/stock/banana.jpg'),
(18, 11, 13.00, 60, 'Chicken', '/stock/chicken.jpg'),
(18, 12, 29.00, 40, 'Beef', '/stock/beef.jpg'),
(18, 14, 15.20, 55, 'Chicken breast', '/stock/chicken_breast.jpg'),
(18, 16, 19.80, 55, 'Prawns', '/stock/prawn.jpg'),
(18, 17, 18.30, 60, 'Squid', '/stock/squid.jpg'),
(18, 18, 13.50, 90, 'Fish', '/stock/fish.jpg'),
(18, 21, 26.80, 75, 'Rice', '/stock/rice.jpg'),
(18, 22, 10.90, 100, 'Oil', '/stock/oil.jpg'),
(18, 26, 15.80, 85, 'Eggs', '/stock/egg(30).jpg'),
(18, 28, 5.60, 200, 'Instant noodles', '/stock/instant_noodle.jpg'),
(18, 30, 7.20, 110, 'Chili sauce', '/stock/chili_sauce.jpg'),
(19, 2, 2.90, 150, 'Onions', '/stock/onion.jpg'),
(19, 3, 4.30, 100, 'Cabbage', '/stock/cabbage.jpg'),
(19, 6, 4.70, 80, 'Apples', '/stock/apple.jpg'),
(19, 7, 2.45, 170, 'Bananas', '/stock/banana.jpg'),
(19, 9, 5.40, 85, 'Papaya', '/stock/papaya.jpg'),
(19, 11, 13.10, 60, 'Chicken', '/stock/chicken.jpg'),
(19, 16, 19.90, 55, 'Prawns', '/stock/prawn.jpg'),
(19, 18, 13.60, 90, 'Fish', '/stock/fish.jpg'),
(19, 19, 42.50, 30, 'Salmon', '/stock/salmon.jpg'),
(19, 21, 27.00, 75, 'Rice', '/stock/rice.jpg'),
(19, 23, 4.50, 130, 'Sugar', '/stock/sugar.jpg'),
(19, 24, 2.40, 180, 'Salt', '/stock/salt.jpg'),
(19, 26, 15.90, 85, 'Eggs', '/stock/egg(30).jpg'),
(19, 29, 7.10, 120, 'Soy sauce', '/stock/soy_sauce.jpg'),
(19, 30, 7.30, 115, 'Chili sauce', '/stock/chili_sauce.jpg'),
(20, 1, 3.75, 120, 'Tomatoes', '/stock/tomato.jpg'),
(20, 4, 3.30, 120, 'Spinach', '/stock/spinach.jpg'),
(20, 5, 2.80, 150, 'Carrots', '/stock/carrot.jpg'),
(20, 6, 4.75, 85, 'Apples', '/stock/apple.jpg'),
(20, 7, 2.50, 175, 'Bananas', '/stock/banana.jpg'),
(20, 10, 7.20, 65, 'Mango', '/stock/mango.jpg'),
(20, 11, 13.20, 60, 'Chicken', '/stock/chicken.jpg'),
(20, 12, 29.20, 40, 'Beef', '/stock/beef.jpg'),
(20, 16, 20.00, 55, 'Prawns', '/stock/prawn.jpg'),
(20, 18, 13.70, 90, 'Fish', '/stock/fish.jpg'),
(20, 21, 27.20, 75, 'Rice', '/stock/rice.jpg'),
(20, 22, 11.00, 100, 'Oil', '/stock/oil.jpg'),
(20, 26, 16.00, 85, 'Eggs', '/stock/egg(30).jpg'),
(20, 28, 5.70, 200, 'Instant noodles', '/stock/instant_noodle.jpg'),
(20, 29, 7.20, 120, 'Soy sauce', '/stock/soy_sauce.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(10) NOT NULL,
  `role_id` int(10) NOT NULL,
  `username` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `role_id`, `username`, `first_name`, `last_name`, `email`, `password`, `phone`, `creation_date`) VALUES
(0, 1, 'admin', 'admin', 'admin', 'admin@shopehunt.cc', '$2y$10$AraI9GSlrWeVjU8D2NtuaeOCzWzRcM2XAZ/VwIrufkkr72oSHoNr2', '0146935758', '2026-01-13 17:58:58'),
(1, 3, 'seller1', 'Ali', 'Hassan', 'seller1@shop.com', '$2y$10$y8K4N2KCRND4MHFsbZIvTuzQID1drYvtx0GIKlLEl50wpf8UGE3c.', '0123456781', '2026-01-13 13:00:43'),
(2, 3, 'seller2', 'Ahmad', 'Zaki', 'seller2@shop.com', '$2y$10$Z7B/3rX66tfP/0E5S7nSCuHVM88kuX9yPTUZ7TALHTa1sJZHKFmEG', '0123456782', '2026-01-13 13:00:43'),
(3, 3, 'seller3', 'Siti', 'Aisyah', 'seller3@shop.com', '$2y$10$T.7/WQ2/I0HKFTUOwgXJJOz5eEgazkTSA0jddzLvJzgyhZP0PCmfm', '0123456783', '2026-01-13 13:00:43'),
(4, 3, 'seller4', 'Nur', 'Aina', 'seller4@shop.com', '$2y$10$v7rvuItsKT8xiXi2nV9XzOm/rVmXTNiGy79DL9YOYtlTNk0Q.2z6G', '0123456784', '2026-01-13 13:00:43'),
(5, 3, 'seller5', 'Hafiz', 'Iqbal', 'seller5@shop.com', '$2y$10$/j/gg7FhDPfeyxuh8GmCIuibCx0ZPj8JG1km2D2xz1c3Hu2HZpsUa', '0123456785', '2026-01-13 13:00:43'),
(6, 3, 'seller6', 'Amir', 'Faris', 'seller6@shop.com', '$2y$10$m9gGh.Z3m8k1Tp7icbK2AeJxyoQ7sHFAseNQ6dKfy4f.r3Z34FdNK', '0123456786', '2026-01-13 13:00:43'),
(7, 3, 'seller7', 'Aina', 'Sofea', 'seller7@shop.com', '$2y$10$TKMGkrwbq.bSfqoT3I7.b.UR9LDjTCQHWdPhqDL0eVIj.x9Le7tJy', '0123456787', '2026-01-13 13:00:43'),
(8, 3, 'seller8', 'Faiz', 'Hakim', 'seller8@shop.com', '$2y$10$EGpC0st.49So.oZV0fD8x.QPLuirL6i.SEULIztDhWzbgUSWcfguq', '0123456788', '2026-01-13 13:00:43'),
(9, 3, 'seller9', 'Irfan', 'Zul', 'seller9@shop.com', '$2y$10$SPvZnRVlv5dm9.LLgI9YIeMmI/R4QFmWhNDlRJieYsET2EZbP6uZG', '0123456789', '2026-01-13 13:00:43'),
(10, 3, 'seller10', 'Nabila', 'Rose', 'seller10@shop.com', '$2y$10$MN/3aCecJzUa1IoMbymhTuptQnbUe9ZOlKA1VpbH0f4x9PJtW/iHq', '0123456790', '2026-01-13 13:00:43'),
(11, 3, 'seller11', 'Adam', 'Daniel', 'seller11@shop.com', '$2y$10$o159Wieal5CLWlmuTWjhXut1Fur1I/HSmXIHfA2x0MnLn2LAFoweK', '0123456791', '2026-01-13 13:00:43'),
(12, 3, 'seller12', 'Aisyah', 'Amani', 'seller12@shop.com', '$2y$10$lVvrRF1YR8a0RrGwji9VNu1ds9cmD3e4hmu3fyquODAq0.ebQt/Nu', '0123456792', '2026-01-13 13:00:43'),
(13, 3, 'seller13', 'Haziq', 'Arif', 'seller13@shop.com', '$2y$10$neFM4BFYNG8WH0MfyW0Tv.dSeduRMqHyC4EQJ38yIc3vcZCryqmmy', '0123456793', '2026-01-13 13:00:43'),
(14, 3, 'seller14', 'Farah', 'Nabila', 'seller14@shop.com', '$2y$10$qQTHGeRb9tYMpwNCy.6kFueVp3x9IRXcmpbPQHIM1BdeEPz7jYSD2', '0123456794', '2026-01-13 13:00:43'),
(15, 3, 'seller15', 'Syafiq', 'Azman', 'seller15@shop.com', '$2y$10$ZerAUNoxgM1mBxhpv/VrQusCs9BjQy046KX6d.tRqkaZC3.8SFIcu', '0123456795', '2026-01-13 13:00:43'),
(16, 3, 'seller16', 'Izzat', 'Hakimi', 'seller16@shop.com', '$2y$10$7k/uuJGOdM/aP5yoDPAaZO1uz8bbiD.iq4wcNWxhV31dr5X1j/pcu', '0123456796', '2026-01-13 13:00:43'),
(17, 3, 'seller17', 'Nurin', 'Alya', 'seller17@shop.com', '$2y$10$ppfqVSzrFvZxFVg3Nt8RVO91z3OZZ3kvPqzKLb0AiTKaaVt/xH1NS', '0123456797', '2026-01-13 13:00:43'),
(18, 3, 'seller18', 'Aiman', 'Shah', 'seller18@shop.com', '$2y$10$82b4Oh/GXxFmMG0D52bofu650nSu7MZk.U7NuC/ObkeQCC/wTbq/S', '0123456798', '2026-01-13 13:00:43'),
(19, 3, 'seller19', 'Sofia', 'Hani', 'seller19@shop.com', '$2y$10$NgjmCQiLCnyo7uVPugCVVeCUOzQuaHtbcvd7w94IPZupTv3m52nPC', '0123456799', '2026-01-13 13:00:43'),
(20, 3, 'seller20', 'Zain', 'Amir', 'seller20@shop.com', '$2y$10$prEW35pxAfHuvo7EFkXrTuV6BMG5bFAU7tbZfd1NOuaCBc4VrZ6wO', '0123456800', '2026-01-13 13:00:43'),
(21, 2, 'yaya', 'Ayuna', 'Ismail', 'ayuna@gmail.com', '$2y$10$jV2FPWPNyv2zi/v5hIvanuFvvoaHmMUKgh5iKEsPvH9Vk6rgZjuNW', '0156736943', '2026-01-13 13:13:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`stock_id`),
  ADD KEY `stock_id` (`stock_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `seller`
--
ALTER TABLE `seller`
  ADD PRIMARY KEY (`seller_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `seller_pending`
--
ALTER TABLE `seller_pending`
  ADD PRIMARY KEY (`pending_id`),
  ADD KEY `seller_id` (`seller_id`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`stock_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`store_id`),
  ADD KEY `seller_id` (`seller_id`);

--
-- Indexes for table `store_stock`
--
ALTER TABLE `store_stock`
  ADD PRIMARY KEY (`store_id`,`stock_id`),
  ADD KEY `stock_id` (`stock_id`),
  ADD KEY `store_id` (`store_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `FK_user_role` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `role_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `seller`
--
ALTER TABLE `seller`
  MODIFY `seller_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `seller_pending`
--
ALTER TABLE `seller_pending`
  MODIFY `pending_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `stock_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `store`
--
ALTER TABLE `store`
  MODIFY `store_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`stock_id`) REFERENCES `stock` (`stock_id`);

--
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `seller`
--
ALTER TABLE `seller`
  ADD CONSTRAINT `seller_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `seller_pending`
--
ALTER TABLE `seller_pending`
  ADD CONSTRAINT `seller_pending_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `seller` (`seller_id`);

--
-- Constraints for table `stock`
--
ALTER TABLE `stock`
  ADD CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`);

--
-- Constraints for table `store`
--
ALTER TABLE `store`
  ADD CONSTRAINT `store_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `seller` (`seller_id`);

--
-- Constraints for table `store_stock`
--
ALTER TABLE `store_stock`
  ADD CONSTRAINT `store_stock_ibfk_1` FOREIGN KEY (`stock_id`) REFERENCES `stock` (`stock_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `store_stock_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_user_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
