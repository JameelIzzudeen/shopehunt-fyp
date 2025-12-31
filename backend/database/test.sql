-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 31, 2025 at 02:10 AM
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
(1, 1);

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
(1, 2, 1, 1),
(2, 2, 5, 2),
(3, 3, 3, 3),
(4, 3, 7, 5),
(5, 4, 9, 2),
(6, 5, 11, 1),
(7, 6, 13, 3),
(8, 7, 6, 1),
(9, 8, 14, 4),
(10, 4, 1, 1),
(11, 4, 5, 1),
(12, 4, 2, 1);

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
(1, 'Fresh Meat', '/category/meat.jpg'),
(2, 'Vegetables', '/category/vegetables.jpg'),
(3, 'Groceries', '/category/groceries.jpg'),
(4, 'Beverages', '/category/beverages.jpg'),
(5, 'Frozen Food', '/category/frozen.jpg'),
(6, 'Seafood', '/category/seafood.jpg'),
(7, 'Snacks', '/category/snacks.jpg');

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
(1, 2),
(2, 3),
(3, 4),
(4, 5),
(5, 6),
(6, 7),
(7, 8);

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `feedback_id` int(10) NOT NULL,
  `customer_id` int(10) NOT NULL,
  `store_id` int(10) NOT NULL,
  `stock_id` int(10) NOT NULL,
  `feedback_msg` varchar(255) NOT NULL,
  `feedback_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`feedback_id`, `customer_id`, `store_id`, `stock_id`, `feedback_msg`, `feedback_date`) VALUES
(1, 1, 1, 1, 'Chicken quality is excellent', '2025-12-30 15:17:04'),
(2, 2, 2, 3, 'Vegetables are fresh', '2025-12-30 15:17:04'),
(3, 3, 3, 9, 'Frozen food is well packed', '2025-12-30 15:17:04'),
(4, 4, 4, 11, 'Seafood is very fresh', '2025-12-30 15:17:04'),
(5, 5, 5, 14, 'Snacks are affordable', '2025-12-30 15:17:04'),
(6, 6, 1, 7, 'Water bottles are cheap', '2025-12-30 15:17:04'),
(7, 7, 2, 6, 'Cooking oil price is reasonable', '2025-12-30 15:17:04');

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
  `user_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `seller`
--

INSERT INTO `seller` (`seller_id`, `user_id`) VALUES
(1, 9),
(2, 10),
(3, 11),
(4, 12),
(5, 13);

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
(1, 'Whole Chicken', 1),
(2, 'Chicken Breast', 1),
(3, 'Fresh Spinach', 2),
(4, 'Carrot', 2),
(5, 'Rice 5kg', 3),
(6, 'Cooking Oil 1L', 3),
(7, 'Mineral Water 1.5L', 4),
(8, 'Soft Drink 1.5L', 4),
(9, 'Frozen Nuggets', 5),
(10, 'Frozen Fries', 5),
(11, 'Fresh Prawn', 6),
(12, 'Fresh Fish', 6),
(13, 'Potato Chips', 7),
(14, 'Chocolate Biscuit', 7),
(15, 'Whole Chicken', 1);

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
(1, 1, 'Ali Fresh Market', 3.05330000, 101.72340000, '/store/store1.jpg'),
(2, 2, 'Zainal Grocery', 3.05410000, 101.72420000, '/store/store2.jpg'),
(3, 3, 'Farah Mini Mart', 3.05520000, 101.72280000, '/store/store3.jpg'),
(4, 4, 'Hakim Food Store', 3.05600000, 101.72150000, '/store/store4.jpg'),
(5, 5, 'Aina Daily Mart', 3.05730000, 101.72090000, '/store/store5.jpg');

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
(1, 1, 70.00, 30, 'Fresh whole chicken', '/stock/chicken.jpg'),
(1, 5, 29.00, 20, 'Local rice 5kg', '/stock/rice.jpg'),
(1, 7, 2.00, 100, 'Mineral water bottle', '/stock/water.jpg'),
(2, 3, 3.50, 50, 'Fresh spinach', '/stock/spinach.jpg'),
(2, 4, 2.50, 60, 'Organic carrots', '/stock/carrot.jpg'),
(2, 6, 8.90, 40, 'Cooking oil 1L', '/stock/oil.jpg'),
(3, 8, 3.20, 80, 'Soft drink bottle', '/stock/softdrink.jpg'),
(3, 9, 15.00, 35, 'Frozen chicken nuggets', '/stock/nuggets.jpg'),
(3, 10, 12.00, 25, 'Frozen fries', '/stock/fries.jpg'),
(4, 11, 28.00, 20, 'Fresh prawns', '/stock/prawn.jpg'),
(4, 12, 18.00, 30, 'Fresh fish', '/stock/fish.jpg'),
(4, 13, 4.50, 70, 'Potato chips', '/stock/chips.jpg'),
(5, 1, 50.00, 22, 'Chicken PokPokPok', '/stock/chicken.jpg'),
(5, 2, 18.00, 25, 'Chicken breast', '/stock/chicken_breast.jpg'),
(5, 7, 2.10, 90, 'Mineral water bottle', '/stock/water1.jpg'),
(5, 14, 6.00, 40, 'Chocolate biscuit', '/stock/biscuit.jpg');

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
(1, 1, 'admin', 'System', 'Admin', 'admin@shopehunt.com', 'admin123', '0000000000', '2025-12-30 15:17:04'),
(2, 2, 'ahmad', 'Ahmad', 'Ali', 'ahmad@gmail.com', 'ahmad123', '0121111111', '2025-12-30 15:17:04'),
(3, 2, 'siti', 'Siti', 'Aminah', 'siti@gmail.com', 'siti123', '0122222222', '2025-12-30 15:17:04'),
(4, 2, 'jameel', 'Jameel', 'Izzudeen', 'jameel@gmail.com', 'jameel123', '0123333333', '2025-12-30 15:17:04'),
(5, 2, 'faris', 'Faris', 'Azman', 'faris@gmail.com', 'faris123', '0124444444', '2025-12-30 15:17:04'),
(6, 2, 'nabila', 'Nabila', 'Yusuf', 'nabila@gmail.com', 'nabila123', '0125555555', '2025-12-30 15:17:04'),
(7, 2, 'amir', 'Amir', 'Haziq', 'amir@gmail.com', 'amir123', '0126666666', '2025-12-30 15:17:04'),
(8, 2, 'aisyah', 'Aisyah', 'Rahman', 'aisyah@gmail.com', 'aisyah123', '0127777777', '2025-12-30 15:17:04'),
(9, 3, 'seller_one', 'Ali', 'Hassan', 'seller1@shop.com', 'seller123', '0131111111', '2025-12-30 15:17:04'),
(10, 3, 'seller_two', 'Zainal', 'Abidin', 'seller2@shop.com', 'seller123', '0132222222', '2025-12-30 15:17:04'),
(11, 3, 'seller_three', 'Farah', 'Nabila', 'seller3@shop.com', 'seller123', '0133333333', '2025-12-30 15:17:04'),
(12, 3, 'seller_four', 'Hakim', 'Latif', 'seller4@shop.com', 'seller123', '0134444444', '2025-12-30 15:17:04'),
(13, 3, 'seller_five', 'Aina', 'Sofia', 'seller5@shop.com', 'seller123', '0135555555', '2025-12-30 15:17:04');

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
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedback_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `stock_id` (`stock_id`,`store_id`);

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
  MODIFY `cart_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `feedback_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `role_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `seller`
--
ALTER TABLE `seller`
  MODIFY `seller_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `stock_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `store`
--
ALTER TABLE `store`
  MODIFY `store_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  ADD CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`stock_id`,`store_id`) REFERENCES `store_stock` (`stock_id`, `store_id`);

--
-- Constraints for table `seller`
--
ALTER TABLE `seller`
  ADD CONSTRAINT `seller_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

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
  ADD CONSTRAINT `store_stock_ibfk_1` FOREIGN KEY (`stock_id`) REFERENCES `stock` (`stock_id`),
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
