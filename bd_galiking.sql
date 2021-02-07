-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: localhost    Database: bd_galiking
-- ------------------------------------------------------
-- Server version	8.0.22-0ubuntu0.20.04.3

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
-- Table structure for table `coworking`
--

DROP TABLE IF EXISTS `coworking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coworking` (
  `id_coworking` int unsigned NOT NULL AUTO_INCREMENT,
  `id_usuario` int unsigned NOT NULL,
  `nombre` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `telefono` varchar(13) COLLATE utf8mb4_spanish_ci NOT NULL,
  `direccion` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `ciudad` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `provincia` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `descripcion` varchar(800) COLLATE utf8mb4_spanish_ci NOT NULL,
  `web` varchar(150) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `servicios` set('vending','limpieza','seguridad','recepción','cocina','espacio común','parking') COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `equipacion` set('wifi','proyector','impresora','fotocopiadora','mobiliario','sistema de audio') COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `puesto_trabajo` enum('si','no') COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `puesto_trabajo_capacidad` char(10) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `puesto_trabajo_tarifa` decimal(6,2) DEFAULT NULL,
  `puesto_trabajo_tarifa_tipo` enum('hora','mensual') COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `puesto_multiple` enum('si','no') COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `puesto_multiple_capacidad` set('2','4','6') COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `puesto_multiple_tarifa` decimal(6,2) DEFAULT NULL,
  `puesto_multiple_tarifa_tipo` enum('hora','mensual') COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `despacho` enum('si','no') COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `despacho_capacidad` char(10) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `despacho_tarifa` decimal(6,2) DEFAULT NULL,
  `despacho_tarifa_tipo` enum('hora','mensual') COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `sala_reuniones` enum('si','no') COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `sala_reuniones_capacidad` char(10) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `sala_reuniones_tarifa` decimal(6,2) DEFAULT NULL,
  `sala_reuniones_tarifa_tipo` enum('hora','mensual') COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `salon_eventos` enum('si','no') COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `salon_eventos_capacidad` char(10) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `salon_eventos_tarifa` decimal(6,2) DEFAULT NULL,
  `salon_eventos_tarifa_tipo` enum('hora','mensual') COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_coworking`),
  UNIQUE KEY `web` (`web`),
  KEY `espacio_coworking_id_usuario_fk8` (`id_usuario`),
  CONSTRAINT `espacio_coworking_id_usuario_fk8` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coworking`
--

LOCK TABLES `coworking` WRITE;
/*!40000 ALTER TABLE `coworking` DISABLE KEYS */;
/*!40000 ALTER TABLE `coworking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int unsigned NOT NULL AUTO_INCREMENT,
  `nif_cif` varchar(9) COLLATE utf8mb4_spanish_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `telefono` varchar(13) COLLATE utf8mb4_spanish_ci NOT NULL,
  `bio` varchar(500) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `foto` blob,
  `uuid` varchar(250) COLLATE utf8mb4_spanish_ci DEFAULT (_utf8mb4'02c0722b-e4f1-4cac-919a-9dafbfa71b16'),
  `nombre` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `rol` enum('cliente','propietario','administrador') COLLATE utf8mb4_spanish_ci NOT NULL,
  `contrasena` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `validado` tinyint(1) DEFAULT '0',
  `validationCode` varchar(50) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `nif_cif` (`nif_cif`)
) ENGINE=InnoDB AUTO_INCREMENT=161 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (153,'12345678p','abcde@gmail.com','986789652',NULL,NULL,'images/profile/02c0722b-e4f1-4cac-919a-9dafbfa71b16','prueba autentificacion get','cliente','$2b$10$kkpBBgBSJBRImxAzOPS2E.2g/NgLQIGx.IOf..AUWJuTemHo2VsMa',1,'','2021-01-27 00:47:28','2021-01-27 02:09:42'),(154,'32145678p','abcdefg@gmail.com','986789652',NULL,NULL,'images/profile/02c0722b-e4f1-4cac-919a-9dafbfa71b16','prueba autentificacion get','cliente','$2b$10$Sa58XllUXsKSXld8urS.neUgoyp4/ktVDl3lAfBF9to96kvT7xXm.',1,'','2021-01-27 00:55:35','2021-01-27 02:09:42'),(155,'21145678p','abcdefghi@gmail.com','986789652',NULL,NULL,'images/profile/02c0722b-e4f1-4cac-919a-9dafbfa71b16','prueba autentificacion get','cliente','$2b$10$eTjsQ7DxRVeyQSln3I7vh.snINuajHSFkWxbirGAAi6eRR63/Afe.',1,'','2021-01-27 00:56:52','2021-01-27 02:09:42'),(156,'14545678p','abcdefghijk@gmail.com','986789652',NULL,NULL,'images/profile/02c0722b-e4f1-4cac-919a-9dafbfa71b16','prueba autentificacion get','administrador','$2b$10$.L6ELdLNPJiUoeSBBAvB9ukusT4nW7gdf7kAwbk61S00zsEFbctCi',1,'','2021-01-27 00:59:03','2021-01-27 02:09:42'),(157,'14545689p','abcdefghijkas@gmail.com','986789652',NULL,NULL,'images/profile/02c0722b-e4f1-4cac-919a-9dafbfa71b16','prueba autentificacion get','propietario','$2b$10$F8hCB/.qSjmw3BoOOQwSoum/If6Xz9IzcT0wg0qkpYzB5lVjg4OWy',1,'','2021-01-27 00:59:30','2021-01-27 02:09:42'),(159,'14545654a','aperbarc@gmail.com','986789652',NULL,NULL,'images/profile/02c0722b-e4f1-4cac-919a-9dafbfa71b16','prueba foto','propietario','$2b$10$RxRRaKBi8h4WhaNpgtbnnefmT4OMEW.J9LDSaIQSrOvN5I5QHxRXG',1,'','2021-01-27 20:19:43','2021-01-27 20:21:36'),(160,'14545609k','aperbarc@gmail.com','986789652',NULL,NULL,'02c0722b-e4f1-4cac-919a-9dafbfa71b16','prueba foto','cliente','$2b$10$i/nndSkyra3F53KnPOnfN.7DM8O7HOUz2ihkOSAiVpGCJybEJfQ6S',0,'3pY6uEvIuyE3Dey9sjZ2ocziTYRf36foxFfuUNon','2021-01-28 04:42:00','2021-01-28 04:42:00');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-29  2:16:24
