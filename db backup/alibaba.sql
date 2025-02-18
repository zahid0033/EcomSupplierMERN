-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 18, 2025 at 06:17 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `alibaba`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `password`, `status`, `image`, `address`, `phone`, `roleId`, `slug`, `createdAt`, `updatedAt`) VALUES
(1, 'zahid', 'test', '$2b$10$GAoxj4KKQncEKepmSQT9j.wuu4Pr7gDVuQD.mNn4WREaylgZb9S6u', 'active', NULL, 'Rampura Banasree', '01521434247', 1, NULL, '2025-02-15 15:37:21', '2025-02-15 15:37:21'),
(3, 'test', 'test@dadavi.com', '$2b$10$mQFpM.BWFPl4WZHOQRedteLRRaANypS97.jSno3nveLNKYu57QYLq', 'active', NULL, 'Rampura Banasree', '01521434247', 2, NULL, '2025-02-15 16:08:22', '2025-02-15 16:08:22');

-- --------------------------------------------------------

--
-- Table structure for table `advertises`
--

CREATE TABLE `advertises` (
  `id` int(11) NOT NULL,
  `position` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `advertises`
--

INSERT INTO `advertises` (`id`, `position`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'after-latest-products', 'https://www.ryans.com/storage/sliders/Super-Sunday-Offer_1739681989.webp', '2025-02-16 08:28:33', '2025-02-16 08:28:33'),
(2, 'after-exclusive-products-left', 'https://www.ryans.com/storage/right_side/Buy-Logitech-products-get-Discount-right-slider%20(2)_1737880672.webp', '2025-02-16 08:42:05', '2025-02-16 08:42:05'),
(3, 'after-exclusive-products-left', 'https://www.ryans.com/storage/right_side/Jabra-Elite-10-Gen-2-Bluetooth-Cocoa-Earbuds-Slider_1739682364.webp', '2025-02-16 08:42:05', '2025-02-16 08:42:05'),
(4, 'after-exclusive-products-right', 'https://www.startech.com.bd/image/cache/catalog/home/banner/2025/boshonto-offer-main-banner-982x500.webp', '2025-02-16 08:44:44', '2025-02-16 08:44:44');

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `id` int(11) NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`id`, `text`, `image`, `createdAt`, `updatedAt`) VALUES
(1, NULL, 'https://i.ibb.co.com/ZCR4dSW/mobile.jpg', '2025-02-15 17:22:12', '2025-02-15 17:22:12'),
(3, '', 'https://storage.googleapis.com/pickaboo-prod/media/dcastalia_hybridslider/image/OnePlus_Nord_4_Website.jpg', '2025-02-15 16:23:35', '2025-02-15 16:23:35');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `supplierId` int(11) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `maincategories`
--

CREATE TABLE `maincategories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `maincategories`
--

INSERT INTO `maincategories` (`id`, `name`, `image`, `icon`, `status`, `slug`, `createdAt`, `updatedAt`) VALUES
(1, 'Computers & Laptops', NULL, '', 'active', NULL, '2025-02-15 16:38:22', '2025-02-15 16:38:22'),
(2, 'Men', NULL, 'flaticon-jacket', 'active', NULL, '2025-02-17 09:22:48', '2025-02-17 09:22:48'),
(3, 'Furniture', NULL, 'flaticon-armchair', 'active', NULL, '2025-02-17 09:46:13', '2025-02-17 09:46:13');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `specification` longtext DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `images` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `featured` varchar(255) DEFAULT NULL,
  `exclusive` varchar(255) DEFAULT NULL,
  `subCategoryId` int(11) DEFAULT NULL,
  `supplierId` int(11) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `specification`, `description`, `images`, `price`, `model`, `status`, `featured`, `exclusive`, `subCategoryId`, `supplierId`, `slug`, `createdAt`, `updatedAt`) VALUES
(1, 'ACER EK220Q H3bi 21.5 inch 1ms 100hz Borderless Full HD Monitor', '<h2>Key Features</h2><ul><li>Model: EK220Q H3bi</li><li>Resolution: FHD (1920x1080)</li><li>Display: VA, 100Hz, 1ms</li><li>Ports: HDMI, VGA</li></ul>', '<p>The Acer <strong>EK220Q H3bi</strong> monitor offers a vibrant visual experience</p>', '[\"https://www.startech.com.bd/image/cache/catalog/monitor/acer/ek220q-h3bi/ek220q-h3bi-05-500x500.webp\",\"https://www.startech.com.bd/image/cache/catalog/monitor/acer/ek220q-h3bi/ek220q-h3bi-03-500x500.webp\"]', 9500, 'Monitor', 'active', 'yes', 'yes', 2, 1, NULL, '2025-02-16 06:42:12', '2025-02-16 08:13:06'),
(2, 'Fantech MP256 Gaming Mouse Pad', '<h2>Key Features</h2><ul><li>Model: MP256</li><li>Edge Stitching</li><li>Anti-slip base</li><li>Smooth Surface</li><li>Size: 250 x 210 x 2mm</li></ul>', '<p>The Fantech <strong>MP256</strong> Gaming Mouse Pad is a high-quality device.</p>', '[\"https://www.startech.com.bd/image/cache/catalog/mouse-pad/fantech/mp256/mp256-01-500x500.webp\",\"https://www.startech.com.bd/image/cache/catalog/mouse-pad/fantech/mp256/mp256-03-500x500.webp\"]', 150, 'Mousepad', 'active', 'yes', 'no', 1, 1, NULL, '2025-02-16 08:19:26', '2025-02-17 09:49:11'),
(3, 'Lenovo Legion R27fc-30 27\" 240Hz FHD Curved Gaming Monitor', '<h2>Key Features</h2><ul><li>Model: Legion R27fc-30</li><li>Resolution: FHD (1920x1080)</li><li>Display: VA, 240Hz, 1ms (MPRT)</li><li>Ports: 2x HDMI 2.0, 1x DP1.4, 1x Audio Out</li><li>Features: Low Blue Light, AMD FreeSync, 1500R Curvature</li></ul>', '<p>The Lenovo <strong>Legion R27fc-30</strong> with enjoy gaming at a higher level.</p>', '[\"https://www.startech.com.bd/image/cache/catalog/monitor/lenovo/legion-r27fc-30/legion-r27fc-30-01-500x500.webp\",\"https://www.startech.com.bd/image/cache/catalog/monitor/lenovo/legion-r27fc-30/legion-r27fc-30-03-500x500.webp\"]', 32000, 'Lenovo', 'active', 'yes', 'yes', 2, 1, NULL, '2025-02-16 08:22:38', '2025-02-16 08:41:02'),
(4, 'Havit HV-MP846 Gaming Mouse Pad', '<h2>Key Features</h2><ul><li>MPN: HV-MP846</li><li>Model: MP846</li><li>Premium fine-mesh cloth surface</li><li>Mouse moves smoothly &amp; accurately</li><li>Non-Slip Rubber</li><li>Size: 25 x 21 x 3mm</li></ul>', '<p>Havit HV-MP846 Gaming Mouse Pad has a premium fine-mesh cloth surface.</p>', '[\"https://www.startech.com.bd/image/cache/catalog/mouse-pad/havit/hv-mp846/mp846-01-500x500.jpg\"]', 160, 'Havit', 'active', 'yes', 'no', 1, 1, NULL, '2025-02-16 08:26:05', '2025-02-17 09:34:41'),
(5, 'Sun Design Smart and Stylish Tshirt For Men - T Shirt For Man - T Shirt', '<p>Size: M, L, XL, XXLM - Length 26, - Chest 36L - Length 27, - Chest 38XL - Length 28, - Chest 40XXL - Length 29, - Chest 42</p>', '<p>As given pictureQuality:- Good QualityPrint Quality</p>', '[\"https://img.drz.lazcdn.com/static/bd/p/829c65d3b02fa09f0541cc9307a212ba.jpg_720x720q80.jpg_.webp\",\"https://img.drz.lazcdn.com/static/bd/p/8c79e24eb2d5a07cf9c56e61d79389ae.jpg_720x720q80.jpg_.webp\"]', 2000, 'Sara', 'active', 'no', 'yes', 3, 1, NULL, '2025-02-17 09:31:55', '2025-02-17 09:34:42'),
(6, 'Portable Foldable Laptop Table - Home Laptop/Notebook Stand Desk for Study', '<ul><li>Brand</li></ul><p>No Brand</p><ul><li>SKU</li></ul><p>460294020_BD-2201811200</p><ul><li>Cl Cable Length</li></ul><p>30.00</p>', '<p>Portable Foldable Laptop Table - Home Laptop/Notebook Stand Desk for Study</p>', '[\"https://img.drz.lazcdn.com/g/kf/S9cf41d7c420c41b99b47da932dc543f1l.jpg_720x720q80.jpg_.webp\",\"https://img.drz.lazcdn.com/g/kf/Seec40828f108425f87d2153db8dd7472R.jpg_720x720q80.jpg_.webp\"]', 340, 'Otobi', 'active', 'yes', 'yes', 4, 2, NULL, '2025-02-17 09:45:11', '2025-02-17 09:49:16');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '2025-02-15 16:36:05', '2025-02-15 16:36:05'),
(2, 'superAdmin', '2025-02-15 17:07:21', '2025-02-15 17:07:21');

-- --------------------------------------------------------

--
-- Table structure for table `subcategories`
--

CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `mainCategoryId` int(11) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subcategories`
--

INSERT INTO `subcategories` (`id`, `name`, `status`, `mainCategoryId`, `slug`, `createdAt`, `updatedAt`) VALUES
(1, 'Mousepads', 'active', 1, NULL, '2025-02-15 16:38:41', '2025-02-15 16:38:41'),
(2, 'Monitor', 'active', 1, NULL, '2025-02-16 08:12:52', '2025-02-16 08:12:52'),
(3, 'T-shirt', 'active', 2, NULL, '2025-02-17 09:31:48', '2025-02-17 09:31:48'),
(4, 'Table', 'active', 3, NULL, '2025-02-17 09:46:31', '2025-02-17 09:46:31');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `businessType` varchar(255) DEFAULT NULL,
  `ownership` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `verifyEmailToken` varchar(255) DEFAULT NULL,
  `mailTokenExpires` datetime DEFAULT NULL,
  `mailVerifyStatus` varchar(255) DEFAULT NULL,
  `resetPasswordToken` varchar(255) DEFAULT NULL,
  `resetPasswordExpires` datetime DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `name`, `address`, `phone`, `email`, `password`, `description`, `image`, `country`, `businessType`, `ownership`, `status`, `verifyEmailToken`, `mailTokenExpires`, `mailVerifyStatus`, `resetPasswordToken`, `resetPasswordExpires`, `slug`, `createdAt`, `updatedAt`) VALUES
(1, 'Zahid Hossain', 'Rampura Banasree', '01521434247', 'supplier@dadavi.com', '$2b$10$sf.0iszy9grJ1kC0PRFB2uxTGW6u/d2u.5Wbug18SCU8dbB5wdI/K', NULL, NULL, 'Bangladesh', 'Whole sale', 'Private Limited', 'Verified', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzdXBwbGllckBkYWRhdmkuY29tIiwiaWF0IjoxNzM5NjM4MTc2LCJleHAiOjE3NDMyMzgxNzZ9.80Ush5OtQzaT_34YOxUBFPTl3ZBHLryZ5IjPLxa3T9s', '2025-02-15 17:49:36', 'verified', NULL, NULL, NULL, '2025-02-15 16:49:36', '2025-02-16 07:20:51'),
(2, 'Zahid Hossain', 'Rampura Banasree', '01521434247', 'zahidhossain0033@gmail.com', '$2b$10$c0b7ZPe871AMY015qB1R/O4TSh8DBz2Fe3jUxuLRs/WSWf0LQdPma', NULL, NULL, 'Bangladesh', 'Whole sale', 'Private Limited', 'Verified', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ6YWhpZGhvc3NhaW4wMDMzQGdtYWlsLmNvbSIsImlhdCI6MTczOTYzODI5OSwiZXhwIjoxNzQzMjM4Mjk5fQ.eF8BSHyASRkr3wSQVvF6s06PNACxcTdgmO9jLMNVepg', '2025-02-15 17:51:39', 'verified', NULL, NULL, NULL, '2025-02-15 16:51:39', '2025-02-15 16:51:39');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `advertises`
--
ALTER TABLE `advertises`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `supplierId` (`supplierId`);

--
-- Indexes for table `maincategories`
--
ALTER TABLE `maincategories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subCategoryId` (`subCategoryId`),
  ADD KEY `supplierId` (`supplierId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mainCategoryId` (`mainCategoryId`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `advertises`
--
ALTER TABLE `advertises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `maincategories`
--
ALTER TABLE `maincategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `subcategories`
--
ALTER TABLE `subcategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admins`
--
ALTER TABLE `admins`
  ADD CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`supplierId`) REFERENCES `suppliers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`subCategoryId`) REFERENCES `subcategories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`supplierId`) REFERENCES `suppliers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD CONSTRAINT `subcategories_ibfk_1` FOREIGN KEY (`mainCategoryId`) REFERENCES `maincategories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
