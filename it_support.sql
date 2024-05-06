-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2024 at 04:38 PM
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
-- Database: `it_support`
--

-- --------------------------------------------------------

--
-- Table structure for table `login_table`
--

CREATE TABLE `login_table` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` int(100) NOT NULL,
  `role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login_table`
--

INSERT INTO `login_table` (`id`, `username`, `password`, `role`) VALUES
(1, 'arun', 12, '1'),
(3, 'e1', 1, '2 '),
(4, 'a1', 1, '1 ');

-- --------------------------------------------------------

--
-- Table structure for table `request_ticket`
--

CREATE TABLE `request_ticket` (
  `id` int(1) NOT NULL,
  `requestType` varchar(100) NOT NULL,
  `key1` varchar(20) NOT NULL,
  `summary` varchar(200) NOT NULL,
  `reporter` varchar(20) NOT NULL,
  `assignee` varchar(20) NOT NULL,
  `urgency` varchar(50) NOT NULL,
  `time` varchar(50) NOT NULL,
  `status` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `request_ticket`
--

INSERT INTO `request_ticket` (`id`, `requestType`, `key1`, `summary`, `reporter`, `assignee`, `urgency`, `time`, `status`) VALUES
(1, 'Investigation', 'IS1', 'System Not Working', 'Arunp', 'Ap', 'Line Off', '5 May 2024', 2),
(2, 'Solution', 'IS4', 'LAN is not working', 'Kalu Singh', 'Ap', 'Intenet Off', '3 may 2024', 1),
(10, 'Investigation', 'IS7', 'Virus Detection', 'ap', 'kp', 'high', '6 may 2024', 0),
(14, 'Problem 1', 'gdfgd', 'fhfghf', '', '', '', '', 1),
(15, 'Problem 2', '', '', '', '', '', '', 1),
(16, 'Problem 3', '', '', '', '', '', '', 1),
(17, 'Problem 5', '', '', '', '', '', '', 1),
(18, 'Problem 6', '', '', '', '', '', '', 2),
(19, '', '', 'Problem 10', '', '', '', '', 2),
(99, 'Problem 1', 'gdfgd', 'fhfghf', '', '', '', '', 0),
(100, 'Problem 2', '', '', '', '', '', '', 1),
(102, 'Problem 3', '', '', '', '', '', '', 1),
(105, 'Problem 5', '', '', '', '', '', '', 1),
(107, '', '', 'Problem 10', '', '', '', '', 2),
(108, 'Problem 6', '', '', '', '', '', '', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `login_table`
--
ALTER TABLE `login_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `request_ticket`
--
ALTER TABLE `request_ticket`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `login_table`
--
ALTER TABLE `login_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `request_ticket`
--
ALTER TABLE `request_ticket`
  MODIFY `id` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
