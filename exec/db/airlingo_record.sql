-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: airlingo
-- ------------------------------------------------------
-- Server version	8.0.33-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `record`
--

DROP TABLE IF EXISTS `record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `record` (
  `grade_id` bigint NOT NULL,
  `language_id` bigint NOT NULL,
  `record_created_date` datetime(6) DEFAULT NULL,
  `record_id` bigint NOT NULL AUTO_INCREMENT,
  `record_modified_date` datetime(6) DEFAULT NULL,
  `study_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`record_id`),
  KEY `FKqgyax2rqy138i82k3rd5dthl` (`grade_id`),
  KEY `FK813xrmpqnan17h920iplt9nay` (`language_id`),
  KEY `FK1srhkhsicvheehxpwguk2ldgm` (`study_id`),
  KEY `FKeny3549xar8rnrcmdw3hl0la1` (`user_id`),
  CONSTRAINT `FK1srhkhsicvheehxpwguk2ldgm` FOREIGN KEY (`study_id`) REFERENCES `study` (`study_id`),
  CONSTRAINT `FK813xrmpqnan17h920iplt9nay` FOREIGN KEY (`language_id`) REFERENCES `language` (`language_id`),
  CONSTRAINT `FKeny3549xar8rnrcmdw3hl0la1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKqgyax2rqy138i82k3rd5dthl` FOREIGN KEY (`grade_id`) REFERENCES `grade` (`grade_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `record`
--

LOCK TABLES `record` WRITE;
/*!40000 ALTER TABLE `record` DISABLE KEYS */;
INSERT INTO `record` VALUES (4,2,'2023-08-03 12:30:00.000000',1,'2023-08-03 12:30:00.000000',1,1),(2,1,'2023-08-03 12:30:00.000000',2,'2023-08-03 12:30:00.000000',1,2),(3,2,'2023-08-05 14:00:00.000000',3,'2023-08-05 14:00:00.000000',2,1),(4,1,'2023-08-05 14:00:00.000000',4,'2023-08-05 14:00:00.000000',2,3),(4,2,'2023-08-07 14:00:00.000000',5,'2023-08-07 14:00:00.000000',3,1),(4,1,'2023-08-07 14:00:00.000000',6,'2023-08-07 14:00:00.000000',3,4),(2,3,'2023-08-08 14:00:00.000000',7,'2023-08-08 14:00:00.000000',4,1),(2,1,'2023-08-08 14:00:00.000000',8,'2023-08-08 14:00:00.000000',4,5),(3,3,'2023-08-10 14:00:00.000000',9,'2023-08-10 14:00:00.000000',5,1),(2,1,'2023-08-10 14:00:00.000000',10,'2023-08-10 14:00:00.000000',5,5),(1,4,'2023-08-11 14:00:00.000000',11,'2023-08-11 14:00:00.000000',6,1),(5,1,'2023-08-11 14:00:00.000000',12,'2023-08-11 14:00:00.000000',6,6),(1,5,'2023-08-12 14:00:00.000000',13,'2023-08-12 14:00:00.000000',7,1),(5,1,'2023-08-12 14:00:00.000000',14,'2023-08-12 14:00:00.000000',7,7),(2,6,'2023-08-14 14:00:00.000000',15,'2023-08-14 14:00:00.000000',8,1),(4,1,'2023-08-14 14:00:00.000000',16,'2023-08-14 14:00:00.000000',8,8),(2,6,'2023-08-15 14:00:00.000000',17,'2023-08-15 14:00:00.000000',9,1),(5,1,'2023-08-15 14:00:00.000000',18,'2023-08-15 14:00:00.000000',9,8),(3,2,'2023-08-18 14:00:00.000000',19,'2023-08-18 14:00:00.000000',10,1),(3,1,'2023-08-18 14:00:00.000000',20,'2023-08-18 14:00:00.000000',10,4),(2,4,'2023-08-22 14:00:00.000000',21,'2023-08-22 14:00:00.000000',11,1),(4,1,'2023-08-22 14:00:00.000000',22,'2023-08-22 14:00:00.000000',11,6),(1,3,'2023-08-26 14:00:00.000000',23,'2023-08-26 14:00:00.000000',12,1),(2,1,'2023-08-26 14:00:00.000000',24,'2023-08-26 14:00:00.000000',12,5),(3,2,'2023-08-28 14:00:00.000000',25,'2023-08-28 14:00:00.000000',13,1),(2,1,'2023-08-28 14:00:00.000000',26,'2023-08-28 14:00:00.000000',13,2),(2,5,'2023-08-29 14:00:00.000000',27,'2023-08-29 14:00:00.000000',14,1),(2,1,'2023-08-29 14:00:00.000000',28,'2023-08-29 14:00:00.000000',14,7),(4,1,'2023-08-16 09:30:45.301897',29,'2023-08-16 09:30:45.301897',18,4),(4,2,'2023-08-16 09:30:53.855402',30,'2023-08-16 09:30:53.855402',18,1),(5,1,'2023-08-16 09:32:23.502954',31,'2023-08-16 09:32:23.502954',19,4),(4,2,'2023-08-16 09:32:23.995403',32,'2023-08-16 09:32:23.995403',19,1),(1,1,'2023-08-16 09:32:37.730614',33,'2023-08-16 09:32:37.730614',19,4),(6,1,'2023-08-16 09:34:38.332922',34,'2023-08-16 09:34:38.332922',20,4),(4,2,'2023-08-16 09:34:39.181423',35,'2023-08-16 09:34:39.181423',20,1),(1,1,'2023-08-16 09:34:45.571066',36,'2023-08-16 09:34:45.571066',20,4),(4,2,'2023-08-16 10:46:31.626673',37,'2023-08-16 10:46:31.626673',21,1),(4,1,'2023-08-16 10:46:32.142607',38,'2023-08-16 10:46:32.142607',21,3);
/*!40000 ALTER TABLE `record` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-16 11:03:49