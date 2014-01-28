-- phpMyAdmin SQL Dump
-- version 4.0.9deb0ubuntu1ppa1
-- http://www.phpmyadmin.net
--
-- Host: localhost

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;


-- --------------------------------------------------------

--
-- Table structure for table `wp_users`
--

CREATE TABLE IF NOT EXISTS `wp_users` (
  `id` varchar(36) CHARACTER SET utf8 NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 NOT NULL,
  `password` varchar(128) CHARACTER SET utf8 DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `access_token` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT 'for web service call',
  `access_token_createdDate` date DEFAULT NULL COMMENT 'creation time of access_token used in webservice',
  PRIMARY KEY (`id`),
  KEY `BY_USERNAME` (`username`),
  KEY `BY_EMAIL` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `wp_users`
--

INSERT INTO `wp_users` (`id`, `username`,  `password`,  `access_token`,`email`, `access_token_createdDate`) VALUES
('529c6f40-7874-43bd-bc81-1c11c0a80004', 'digicorp',  '4a2b99e0e97b1cb6cf391aaa93c8de5b43d283fc',  'user@digi-corp.com','083ac340-737a-11e3-81ae-cd122744d349', '2014-01-02');

