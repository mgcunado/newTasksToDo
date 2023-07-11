-- MariaDB dump 10.19  Distrib 10.11.2-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: new_tasks_todo
-- ------------------------------------------------------
-- Server version	10.11.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `image` varchar(255) NOT NULL DEFAULT 'defaultCategory.png',
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_8b0be371d28245da6e4f4b6187` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES
(1,'active','home.png','home'),
(2,'active','car.png','car'),
(3,'active','coding.png','programming'),
(4,'active','sunflower.png','eguzkilore'),
(5,'active','travel.png','travel'),
(6,'active','invoice.png','invoices'),
(7,'active','leisure.png','leisure'),
(8,'active','shopping.png','shopping'),
(9,'active','parents.png','parents');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES
(3,1685707163438,'FirstMigration1685707163438');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `authorId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c5a322ad12a7bf95460c958e80e` (`authorId`),
  CONSTRAINT `FK_c5a322ad12a7bf95460c958e80e` FOREIGN KEY (`authorId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `priority`
--

DROP TABLE IF EXISTS `priority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `priority` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `level` varchar(8) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_95b28512749d88f6b6ff2504d7` (`level`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `priority`
--

LOCK TABLES `priority` WRITE;
/*!40000 ALTER TABLE `priority` DISABLE KEYS */;
INSERT INTO `priority` VALUES
(3,'high'),
(1,'low'),
(2,'medium'),
(4,'urgent');
/*!40000 ALTER TABLE `priority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `categoryId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_d1a3a67c9c5d440edf414af127` (`name`),
  KEY `FK_d1fe096726c3c5b8a500950e448` (`categoryId`),
  CONSTRAINT `FK_d1fe096726c3c5b8a500950e448` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES
(1,'clean house','active',1),
(2,'order house','active',1),
(3,'workshop','active',2),
(4,'itv','active',2),
(5,'backups','active',3),
(6,'nestjs','active',3),
(7,'php','active',3),
(8,'javascript','active',3),
(9,'mysql','active',3),
(10,'mongodb','active',3),
(11,'invoices','active',4),
(12,'tax authorities','active',4),
(13,'facilities','active',4),
(14,'Office material','active',4),
(15,'Didactic material','active',4),
(16,'Maps-GPS','active',5),
(17,'Lodgement','active',5),
(18,'Flights','active',5),
(19,'Other activities','active',5),
(20,'Electricity-Water-Gas','active',6),
(21,'Mobile','active',6),
(22,'Other bills','active',6),
(23,'House Expenses','active',6),
(24,'Eguzkilore Expenses','active',6),
(25,'Car Expenses','active',6),
(26,'Travel Expenses','active',6),
(27,'Hegoalde Expenses','active',6),
(28,'Other Expenses','active',6),
(29,'Plans','active',7),
(30,'Music','active',7),
(31,'Reading','active',7),
(32,'Food','active',8),
(33,'Cleaning','active',8),
(34,'Leroy Merlin-Bricodepot','active',8),
(35,'Books-Culture','active',8),
(36,'Eguzkilore Center','active',8),
(37,'Other purchases','active',8),
(38,'Shopping','active',9),
(39,'Transportation','active',9),
(40,'Others','active',9);
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task` varchar(255) NOT NULL,
  `deadline` date DEFAULT NULL,
  `realizationDate` date DEFAULT NULL,
  `done` tinyint(1) NOT NULL DEFAULT 0,
  `comment` text DEFAULT NULL,
  `subcategoryId` int(11) NOT NULL,
  `priorityId` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `FK_fefba321936804402d53c199d86` (`subcategoryId`),
  KEY `FK_a396efb8f415c1b4970cdea6d4f` (`priorityId`),
  CONSTRAINT `FK_a396efb8f415c1b4970cdea6d4f` FOREIGN KEY (`priorityId`) REFERENCES `priority` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_fefba321936804402d53c199d86` FOREIGN KEY (`subcategoryId`) REFERENCES `subcategories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES
(4,'hola1',NULL,NULL,1,'hola hola',11,1),
(8,'peru',NULL,NULL,0,'perugorri2',11,1),
(10,'Nuevo backup',NULL,NULL,0,'eso ess',5,1),
(13,'koko',NULL,NULL,0,NULL,12,1),
(14,'koko',NULL,NULL,0,NULL,12,1),
(15,'koko',NULL,NULL,0,NULL,12,1),
(16,'kilko',NULL,NULL,0,NULL,12,1),
(21,'uouou',NULL,NULL,0,NULL,12,1),
(22,'toto',NULL,NULL,0,NULL,12,1),
(23,'tito',NULL,NULL,0,NULL,12,1),
(24,'roro',NULL,NULL,0,NULL,12,1),
(26,'glo',NULL,NULL,1,NULL,12,1),
(27,'koko',NULL,NULL,0,NULL,12,1),
(30,'noa',NULL,NULL,0,NULL,12,1),
(32,'koko',NULL,NULL,0,NULL,12,1),
(33,'miki',NULL,NULL,0,NULL,12,1),
(34,'pitxin',NULL,NULL,0,NULL,12,4),
(35,'julian',NULL,NULL,0,NULL,12,4),
(36,'nunu',NULL,NULL,0,NULL,12,3),
(37,'bibo',NULL,NULL,1,NULL,12,4),
(38,'fdfdfd',NULL,NULL,1,NULL,12,2),
(39,'koko',NULL,NULL,0,NULL,12,1),
(41,'pepe',NULL,NULL,0,NULL,12,3),
(42,'kokok',NULL,NULL,0,NULL,12,3),
(44,'roro',NULL,NULL,0,NULL,12,3),
(49,'pi',NULL,NULL,0,'pipo',13,3),
(50,'pu',NULL,NULL,0,'pupi',13,2),
(52,'gogo',NULL,NULL,1,NULL,13,1),
(53,'koko',NULL,NULL,0,NULL,13,3),
(54,'koko',NULL,NULL,0,NULL,13,1),
(66,'pedrito',NULL,NULL,0,'hola pedrito',13,3),
(77,'momo',NULL,NULL,0,'ppp',13,1),
(78,'roro',NULL,NULL,0,'mmmmm',13,4),
(79,'momo',NULL,NULL,0,NULL,13,1),
(112,'pasar la itv en febrero 2024','2024-02-15',NULL,0,NULL,4,1),
(114,'Cambiar aceite y filtro de aceite','2024-06-20',NULL,0,'El cambio se debe realizar antes de los 317.400 km.\nAceite semisintético 10W40.\nLa fecha límite es aproximada, a fecha de hoy, 20-06-2023, con 307.400 km.',3,1),
(115,'Cambiar correa de distribución','2030-06-20',NULL,0,'Cambio de correa de distribución antes de los 407.400 km.\nCambiada la correa, a fecha de hoy, 20-06-2023, con 307.400 km.',3,1),
(116,'Realizar copia de seguridad integral en el disco externo negro','2023-06-20',NULL,1,NULL,5,3);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_profile`
--

DROP TABLE IF EXISTS `user_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_profile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `age` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profile`
--

LOCK TABLES `user_profile` WRITE;
/*!40000 ALTER TABLE `user_profile` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `authStrategy` varchar(255) DEFAULT NULL,
  `profileId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_fe0bb3f6520ee0469504521e71` (`username`),
  UNIQUE KEY `REL_b1bda35cdb9a2c1b777f5541d8` (`profileId`),
  CONSTRAINT `FK_b1bda35cdb9a2c1b777f5541d87` FOREIGN KEY (`profileId`) REFERENCES `user_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-06  1:44:18
