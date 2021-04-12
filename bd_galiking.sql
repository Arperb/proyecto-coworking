-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: localhost    Database: bd_galiking
-- ------------------------------------------------------
-- Server version	8.0.23-0ubuntu0.20.04.1

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
  `wifi` enum('si','no') COLLATE utf8mb4_spanish_ci DEFAULT 'no',
  `limpieza` enum('si','no') COLLATE utf8mb4_spanish_ci DEFAULT 'no',
  `parking` enum('si','no') COLLATE utf8mb4_spanish_ci DEFAULT 'no',
  `web` varchar(150) COLLATE utf8mb4_spanish_ci NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lat` decimal(10,0) DEFAULT NULL,
  `lng` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id_coworking`),
  KEY `espacio_coworking_id_usuario_fk8` (`id_usuario`),
  CONSTRAINT `espacio_coworking_id_usuario_fk8` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coworking`
--

LOCK TABLES `coworking` WRITE;
/*!40000 ALTER TABLE `coworking` DISABLE KEYS */;
INSERT INTO `coworking` VALUES (3,214,'Espacio Nido','641412042','Rúa Ferrería 25 bajo','VIgo','Pontevedra','Creamos un espacio, con la intención de construir un entorno de trabajo en el que desarrollar nuestras ideas y poder compartirlas con otras personas.','si','si','no','www.espacionido.es','2021-02-20 22:26:52','2021-04-12 00:39:26',42,-9),(4,217,'SInergia','986 632 493','Rúa Velázquez Moreno, 17','VIgo','Pontevedra','Situado en pleno centro de Vigo, en Sinergia encontrarás un espacio propio o compartido para desarrollar tu proyecto. Un lugar de trabajo donde podrás recibir a tus clientes en un ambiente cálido e intercambiar ideas y recursos con otros profesionales en un entorno colaborativo.\n\n','si','si','no','www.sinergiavigo.com','2021-02-21 15:18:39','2021-04-12 00:39:26',42,-9),(5,218,'Nest','981 90 82 38','Avda. Finisterre 265-C, 3ª Planta','A Coruña','A Coruña','Nest Coworking & Co es un espacio concebido para trabajar en las mejores condiciones. Nuestras instalaciones, domotizadas e inteligentes, constan de amplios espacios con mobiliario ergonómico y de diseño.\n\n','si','no','si','www.nestcoworkingcoruna.es','2021-02-21 15:35:33','2021-04-12 00:39:26',43,-8),(6,219,'La Comunidad','881 878 123','Emilia Pardo Bazán 5 3º Izqda.','A Coruña','A Coruña','Luz natural, mesas amplias e individuales. Agradable, moderno e inspirador\n\n','si','no','no','www.lacomunidadcoworking.es','2021-02-21 15:50:29','2021-04-12 00:39:26',43,-8),(7,220,'La Ferretería','982 872 711','RÚA SAN FROILÁN 11 BAJO','Lugo','Lugo','TODAS LAS HERRAMIENTAS PARA QUE TUS IDEAS SE HAGAN REALIDAD.','si','no','no','www.laferreteria.info','2021-02-21 15:59:03','2021-04-12 00:39:26',43,-8),(8,221,'Impulsa','982 30 32 11','Rúa Amendoeira, nº 25','Lugo','Lugo','Espacios funcionales, pensandos para gente diferente ','si','si','si','www.impulsacoworking.com','2021-02-21 16:11:11','2021-04-12 00:39:26',43,-8),(9,222,'Magma','988 61 40 54','Bedoya 27 Bj','Ourense','Ourense','Un espacio de Coworking en el centro de Ourense de 300 m2, destinados a crear un entorno de trabajo colaborativo para profesionales (autónomos, freelance, emprendedores y pequeña empresa)','si','no','no','www.magmaespacio.es','2021-02-21 16:18:34','2021-04-12 00:39:26',42,-8),(10,223,'Milénica','689 761 666','Progreso 137-1 Oficina2','Ourense','Ourense','Disfruta de esta nueva forma de trabajo compartiendo un mismo espacio con profesionales de diferentes perfiles donde desarrollar tu propia actividad, fomentando sinergias, en un ambiente colaborativo.','si','si','no','www.milenicacoworking.com','2021-02-21 16:29:46','2021-04-12 00:39:26',42,-8),(11,232,'Coworking Vigo','986 13 61 55','Rúa de Pontevedra, 1','VIgo','Pontevedra','s la mejor solución para PYMES, delegaciones comerciales, emprendedores y autónomos.','si','si','no','www.coworking-vigo.com','2021-02-23 16:39:07','2021-04-12 00:39:26',42,-9);
/*!40000 ALTER TABLE `coworking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foto_coworking`
--

DROP TABLE IF EXISTS `foto_coworking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `foto_coworking` (
  `id_foto_coworking` int unsigned NOT NULL AUTO_INCREMENT,
  `id_coworking` int unsigned NOT NULL,
  `foto` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_foto_coworking`),
  KEY `foto_coworking_id_coworking_fk9` (`id_coworking`),
  CONSTRAINT `foto_coworking_id_coworking_fk9` FOREIGN KEY (`id_coworking`) REFERENCES `coworking` (`id_coworking`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foto_coworking`
--

LOCK TABLES `foto_coworking` WRITE;
/*!40000 ALTER TABLE `foto_coworking` DISABLE KEYS */;
INSERT INTO `foto_coworking` VALUES (58,4,'55d8b949-5255-4e7c-b433-29e2e75c45b3','2021-02-23 18:18:52','2021-02-23 18:18:52'),(59,4,'8a1d1324-dd20-4b13-8f16-260c1bdbe0bd','2021-02-23 18:19:04','2021-02-23 18:19:04'),(60,4,'bf9f51a8-e4da-48e5-b67e-8b6936063098','2021-02-23 18:19:52','2021-02-23 18:19:52'),(61,4,'c13968a6-0054-418f-8d49-1371db395d88','2021-02-23 18:20:31','2021-02-23 18:20:31'),(62,4,'cbd0c2ad-26ca-49a3-9a84-4382c8ae81ca','2021-02-23 18:20:39','2021-02-23 18:20:39'),(63,5,'e79a9838-21a1-4c7f-88b7-8069f0fdb844','2021-02-23 18:23:30','2021-02-23 18:23:30'),(64,5,'8105843d-eac3-4ae9-8024-915a7a7f8552','2021-02-23 18:23:39','2021-02-23 18:23:39'),(65,5,'70c52977-53b8-4d2c-9db7-0f64109ef1ab','2021-02-23 18:23:47','2021-02-23 18:23:47'),(66,5,'6713a331-1f43-4905-b6f2-0758a5de0fa4','2021-02-23 18:23:56','2021-02-23 18:23:56'),(67,6,'525a36c0-f405-4cec-9000-4a1b26e233bf','2021-02-23 18:32:50','2021-02-23 18:32:50'),(68,6,'66e71bf2-7a74-434a-8c1c-7be3f8ceaaac','2021-02-23 18:33:03','2021-02-23 18:33:03'),(69,6,'bf450308-de1f-4fdd-bda0-bb520a8b5e7a','2021-02-23 18:33:12','2021-02-23 18:33:12'),(70,7,'733529f5-bc37-40ee-ad2f-bd3a0e85b6c3','2021-02-23 18:36:02','2021-02-23 18:36:02'),(71,7,'874d1531-82d3-4213-95cc-c7721f382069','2021-02-23 18:36:11','2021-02-23 18:36:11'),(72,8,'4c00d5d8-c0f4-4566-83ca-e3833a93e2ea','2021-02-23 18:37:59','2021-02-23 18:37:59'),(73,8,'ed438ec3-ce24-475a-a88f-1b42d97f1327','2021-02-23 18:38:09','2021-02-23 18:38:09'),(74,9,'20bc607f-b5c6-4b55-962c-c04bd45acba3','2021-02-23 18:44:04','2021-02-23 18:44:04'),(75,9,'10d0487f-1dff-4584-a822-990bb789b289','2021-02-23 18:44:11','2021-02-23 18:44:11'),(76,9,'e6248d95-81a4-4341-8c97-2ac855d3cc73','2021-02-23 18:44:19','2021-02-23 18:44:19'),(77,9,'ca39f622-98c0-4e1a-b821-640b38d05a9a','2021-02-23 18:44:25','2021-02-23 18:44:25'),(78,10,'7907f9f7-6579-4f9e-9dc9-0ec61f7bdc16','2021-02-23 18:47:29','2021-02-23 18:47:29'),(79,10,'3987c79e-2237-46ed-a238-10069179c5b8','2021-02-23 18:47:38','2021-02-23 18:47:38'),(80,10,'b2a08e2b-9dbc-41b4-baa3-f5dfc0bb7897','2021-02-23 18:47:48','2021-02-23 18:47:48'),(81,10,'5c9a3b1c-1b48-46db-804c-7ce5fa9535cf','2021-02-23 18:47:56','2021-02-23 18:47:56'),(82,11,'d88a012e-f45d-4c58-af66-b153371bee2f','2021-02-23 18:52:37','2021-02-23 18:52:37'),(83,11,'ac1ee0b1-9ddf-4676-97f8-23135c6165b7','2021-02-23 18:52:47','2021-02-23 18:52:47'),(84,11,'470cf187-83b9-494a-b949-7e0720820c12','2021-02-23 18:52:56','2021-02-23 18:52:56'),(85,11,'1140d3ae-5be7-46d3-a17f-2464b8cd3fa1','2021-02-23 18:53:04','2021-02-23 18:53:04'),(86,11,'57523852-36dd-4ad2-9bf9-c5b9c6ddf2f6','2021-02-23 18:53:16','2021-02-23 18:53:16'),(90,3,'661168ac-0043-485e-81ed-f8622091664f','2021-04-05 18:32:37','2021-04-05 18:32:37'),(91,3,'c758ec86-978b-43e5-a19f-82133a527585','2021-04-05 18:33:05','2021-04-05 18:33:05'),(92,3,'4668dae8-4a42-4329-9723-1fed2703efe4','2021-04-05 18:33:28','2021-04-05 18:33:28'),(93,3,'066e798d-a9ef-4698-8ec3-6def9d4bee2e','2021-04-05 18:33:53','2021-04-05 18:33:53'),(94,3,'2acc7267-d4b9-4fa4-9d1b-b31e1277d8cf','2021-04-05 18:34:20','2021-04-05 18:34:20');
/*!40000 ALTER TABLE `foto_coworking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `incidencia`
--

DROP TABLE IF EXISTS `incidencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `incidencia` (
  `id_incidencia` int unsigned NOT NULL AUTO_INCREMENT,
  `id_usuario` int unsigned NOT NULL,
  `id_sala` int unsigned NOT NULL,
  `estado` enum('activado','desactivado') COLLATE utf8mb4_spanish_ci DEFAULT 'activado',
  `categoria` enum('limpieza','servicios','equipacion','otros') COLLATE utf8mb4_spanish_ci NOT NULL,
  `descripcion` varchar(500) COLLATE utf8mb4_spanish_ci NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_incidencia`),
  KEY `incidencia_id_usuario_fk1` (`id_usuario`),
  KEY `incidencia_id_sala_fk2` (`id_sala`),
  CONSTRAINT `incidencia_id_sala_fk2` FOREIGN KEY (`id_sala`) REFERENCES `sala` (`id_sala`),
  CONSTRAINT `incidencia_id_usuario_fk1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `incidencia`
--

LOCK TABLES `incidencia` WRITE;
/*!40000 ALTER TABLE `incidencia` DISABLE KEYS */;
INSERT INTO `incidencia` VALUES (5,224,4,'activado','servicios','El wifi a veces falla','2021-02-21 23:06:44','2021-02-22 00:42:44'),(6,226,6,'activado','otros','En algunos momentos hay ruidos que dificultan mi labor','2021-02-21 23:23:38','2021-02-22 00:42:44'),(7,228,8,'activado','equipacion','La impresora imprime a manchones','2021-02-21 23:39:12','2021-02-22 00:42:44'),(10,230,10,'desactivado','equipacion','El proyector parpadea','2021-02-21 23:48:54','2021-02-22 00:42:44'),(11,224,4,'activado','otros','saiu un rato a toda velocidade de debaixo da mesa','2021-03-17 23:35:33','2021-03-17 23:35:33');
/*!40000 ALTER TABLE `incidencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rating` (
  `id_rating` int unsigned NOT NULL AUTO_INCREMENT,
  `id_usuario` int unsigned NOT NULL,
  `id_reserva` int unsigned NOT NULL,
  `valoracion` int NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_rating`),
  KEY `rating_id_usuario_fk11` (`id_usuario`),
  KEY `rating_id_reserva_fk12` (`id_reserva`),
  CONSTRAINT `rating_id_reserva_fk12` FOREIGN KEY (`id_reserva`) REFERENCES `reserva` (`id_reserva`),
  CONSTRAINT `rating_id_usuario_fk11` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
INSERT INTO `rating` VALUES (4,224,4,3,'2021-02-21 23:09:38','2021-02-21 23:09:38'),(5,225,5,4,'2021-02-21 23:16:38','2021-02-21 23:16:38'),(6,226,6,3,'2021-02-21 23:24:18','2021-02-21 23:24:18'),(7,227,7,5,'2021-02-21 23:33:30','2021-02-21 23:33:30'),(8,228,8,3,'2021-02-21 23:39:33','2021-02-21 23:39:33'),(9,229,9,5,'2021-02-21 23:44:10','2021-02-21 23:44:10'),(10,230,10,3,'2021-02-21 23:49:21','2021-02-21 23:49:21'),(11,231,11,5,'2021-02-22 13:23:09','2021-02-22 13:23:09'),(12,224,4,4,'2021-03-17 23:45:09','2021-03-17 23:45:09');
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserva`
--

DROP TABLE IF EXISTS `reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserva` (
  `id_reserva` int unsigned NOT NULL AUTO_INCREMENT,
  `id_sala` int unsigned NOT NULL,
  `id_usuario` int unsigned NOT NULL,
  `estado` enum('activado','desactivado') COLLATE utf8mb4_spanish_ci DEFAULT 'activado',
  `pago` enum('pagado','pendiente de pago') COLLATE utf8mb4_spanish_ci DEFAULT 'pagado',
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_reserva`),
  KEY `reserva_id_usuario_fk3` (`id_usuario`),
  KEY `reserva_id_sala_fk5` (`id_sala`),
  CONSTRAINT `reserva_id_sala_fk5` FOREIGN KEY (`id_sala`) REFERENCES `sala` (`id_sala`),
  CONSTRAINT `reserva_id_usuario_fk3` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva`
--

LOCK TABLES `reserva` WRITE;
/*!40000 ALTER TABLE `reserva` DISABLE KEYS */;
INSERT INTO `reserva` VALUES (4,4,224,'activado','pagado','2021-04-01','2021-12-31','2021-02-21 22:59:36','2021-02-21 22:59:36'),(5,5,225,'activado','pagado','2021-04-01','2021-04-30','2021-02-21 23:14:58','2021-02-21 23:14:58'),(6,6,226,'activado','pagado','2021-08-01','2021-08-31','2021-02-21 23:20:26','2021-02-21 23:20:26'),(7,7,227,'activado','pagado','2021-04-01','2021-04-30','2021-02-21 23:32:48','2021-02-21 23:32:48'),(8,8,228,'activado','pagado','2021-05-01','2021-05-31','2021-02-21 23:37:15','2021-02-21 23:37:15'),(9,9,229,'activado','pagado','2021-06-01','2021-06-30','2021-02-21 23:43:43','2021-02-21 23:43:43'),(10,10,230,'activado','pagado','2021-07-01','2021-07-31','2021-02-21 23:46:57','2021-02-21 23:46:57'),(11,4,231,'activado','pagado','2021-01-01','2021-01-31','2021-02-22 13:22:03','2021-02-22 13:22:03'),(12,5,224,'activado','pagado','2021-04-01','2021-09-30','2021-03-17 15:46:55','2021-03-17 15:46:55'),(14,10,234,'activado','pagado','2021-09-01','2021-09-30','2021-04-12 01:01:11','2021-04-12 01:01:11');
/*!40000 ALTER TABLE `reserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sala`
--

DROP TABLE IF EXISTS `sala`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sala` (
  `id_sala` int unsigned NOT NULL AUTO_INCREMENT,
  `id_coworking` int unsigned NOT NULL,
  `tipo` enum('despacho','compartida','sala de reuniones','salón de eventos') COLLATE utf8mb4_spanish_ci NOT NULL,
  `descripcion` varchar(500) COLLATE utf8mb4_spanish_ci NOT NULL,
  `capacidad` smallint NOT NULL,
  `tarifa` float NOT NULL,
  `tarifa_tipo` varchar(30) COLLATE utf8mb4_spanish_ci DEFAULT 'mes',
  `disponibilidad` enum('limpio','pendiente de limpieza') COLLATE utf8mb4_spanish_ci DEFAULT 'limpio',
  `proyector` enum('si','no') COLLATE utf8mb4_spanish_ci DEFAULT 'no',
  `impresora` enum('si','no') COLLATE utf8mb4_spanish_ci DEFAULT 'no',
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_sala`),
  KEY `sala_id_coworking_fk6` (`id_coworking`),
  CONSTRAINT `sala_id_coworking_fk6` FOREIGN KEY (`id_coworking`) REFERENCES `coworking` (`id_coworking`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sala`
--

LOCK TABLES `sala` WRITE;
/*!40000 ALTER TABLE `sala` DISABLE KEYS */;
INSERT INTO `sala` VALUES (4,3,'compartida','Mesa de trabajo de 150x75cm',1,182,'mes','limpio','no','si','2021-02-21 14:20:37','2021-02-23 17:36:39'),(5,3,'compartida','Mesa grande compartida',1,121,'mes','limpio','no','si','2021-02-21 14:21:52','2021-02-21 14:21:52'),(6,3,'sala de reuniones','Sala de reuniones pequeña, para la realización de una reunión, taller o curso',10,540,'mes','limpio','si','no','2021-02-21 14:23:52','2021-02-21 14:23:52'),(7,3,'salón de eventos','Salón de eventos grande, para la realización de una presentación, curso o cualquier evento que se te ocurra',30,1080,'mes','limpio','si','no','2021-02-21 14:25:07','2021-02-21 14:25:07'),(8,4,'compartida','Disponemos de 21 puestos de trabajo individual agrupados en dos salas de coworking independientes y preparados para que desarrolles tu actividad de forma inmediata.',1,182,'mes','limpio','no','si','2021-02-21 15:21:34','2021-02-21 15:21:34'),(9,4,'salón de eventos','Espacio destinado a albergar jornadas formativas, talleres, seminarios, exposiciones, reuniones de trabajo, ruedas de prensa o cualquier otro evento que requiera de un espacio amplio y céntrico.',20,360,'mes','limpio','no','no','2021-02-21 15:23:13','2021-02-21 15:23:13'),(10,4,'sala de reuniones','Espacio para charlar con tus clientes, reunirte con ellos, realizar una videoconferencia, presentar un proyecto a tus socios, descubre nuestra sala de reuniones.',10,420,'mes','limpio','si','no','2021-02-21 15:24:49','2021-02-21 15:24:49'),(11,4,'despacho','Despachos totalmente equipados o por el contrario vacíos para que sean amueblados a tu gusto y den respuesta a las necesidades específicas de tu empresa.',1,350,'mes','pendiente de limpieza','no','no','2021-02-21 15:25:52','2021-02-21 15:25:52'),(12,5,'compartida','Tres tipos de disposiciones de puestos de trabajo para que elijas el que mejor se adapte: en \"L\", recto o mostrador. Tiene mesa, silla, armario y cajonera',1,193,'mes','limpio','no','no','2021-02-21 15:38:48','2021-02-21 15:38:48'),(13,5,'salón de eventos','Ideal para formaciones, presentaciones o conferencias. Salón de 70 m2',40,1050,'mes','limpio','si','no','2021-02-21 15:40:18','2021-02-21 15:40:18'),(14,5,'sala de reuniones','Presenta tus proyectos o reúnete con clientes en nuestra elegante sala de reuniones. Sala de 40 m2',12,450,'mes','limpio','no','no','2021-02-21 15:42:38','2021-02-21 15:42:38'),(15,6,'compartida','Mesa de trabajo de 150x75cm',1,157,'mes','limpio','no','si','2021-02-21 15:52:27','2021-02-21 15:52:27'),(16,6,'sala de reuniones','Sala de 25 m2',8,660,'mes','limpio','no','no','2021-02-21 15:53:34','2021-02-21 15:53:34'),(17,7,'sala de reuniones','180m2 para lo que quieras, a pie de calle, en pleno casco histórico de Lugo',60,2400,'mes','limpio','si','si','2021-02-21 16:02:23','2021-02-21 16:02:23'),(18,7,'salón de eventos','Sala privada de 17m2 totalmente acondicionada para cualquier tipo de reunión, charla, formación, taller, etc.',7,420,'mes','limpio','no','si','2021-02-21 16:03:29','2021-02-21 16:03:29'),(19,8,'compartida','Puesto individual en sala compartida con mesa, silla y taquilla',1,120,'mes','limpio','no','si','2021-02-21 16:13:05','2021-02-21 16:13:05'),(20,8,'sala de reuniones','Sala pequeña ideal para 6 personas',6,540,'mes','limpio','si','no','2021-02-21 16:14:25','2021-02-21 16:14:25'),(21,9,'compartida','Puesto de trabajo con silla, mesa y taquilla en sala compartida',1,182,'mes','pendiente de limpieza','no','si','2021-02-21 16:20:48','2021-02-21 16:20:48'),(22,9,'sala de reuniones','Salas formadas por módulos móviles de 5 m2',6,750,'mes','limpio','no','no','2021-02-21 16:22:52','2021-02-21 16:22:52'),(23,9,'salón de eventos','área privada',4,1050,'mes','limpio','si','si','2021-02-21 16:23:55','2021-02-21 16:23:55'),(24,10,'compartida','mesa individual en sala compartida',1,175,'mes','limpio','no','si','2021-02-21 16:32:05','2021-02-21 16:32:05'),(25,10,'compartida','mesa compartida',1,240,'mes','limpio','no','si','2021-02-21 16:32:40','2021-02-21 16:32:40'),(26,10,'sala de reuniones','Sala acogedora para reuniones reducidas ',8,450,'mes','limpio','si','si','2021-02-21 16:34:10','2021-02-21 16:34:10'),(27,10,'salón de eventos','Sala polivalente, adaptable a cada necesidad',40,900,'mes','limpio','si','si','2021-02-21 16:35:06','2021-02-21 16:35:06');
/*!40000 ALTER TABLE `sala` ENABLE KEYS */;
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
  `foto` varchar(250) COLLATE utf8mb4_spanish_ci DEFAULT '38880e62-882c-4d04-8bf5-fe0e58d4ad01',
  `nombre` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `rol` enum('cliente','propietario','administrador') COLLATE utf8mb4_spanish_ci NOT NULL,
  `contrasena` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `validado` tinyint(1) DEFAULT '0',
  `validationCode` varchar(50) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `nif_cif` (`nif_cif`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=247 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (214,'74508423p','zct82252@cuoly.com','641412042','Propietaria Espacio Nido','6ef97ce8-a440-465b-9d06-a874ae1ddf0d','Marta Fernández','propietario','$2b$10$gYKoiwpA9LuOTfox3ttgLuDMrAjfxSOocf4LXxl95UIB9KCiuha2K',1,'','2021-02-20 21:42:09','2021-04-11 14:30:18'),(217,'45208657q','kbj55700@cuoly.com','641412745','Propietario SInergia','9c6e8e1e-3c10-4c2f-8d19-f84564d7cbd0','Xerardo Quiroga','propietario','$2b$10$E979VRRvLuiZ.fI16zrch.ERseWl.TaTvbi3Z1.DPWaOMychSto8S',1,'','2021-02-21 15:14:47','2021-04-11 21:15:08'),(218,'45208021c','cbl72162@zwoho.com','641845745','Propietario Nest','38880e62-882c-4d04-8bf5-fe0e58d4ad01','Alejandro Jiménez','propietario','$2b$10$Hg2IuMRP1yzAQ2.PBU0oUOrz9/A3eAkjsL4dBdhaf3h5.YlyCB4Eu',1,'','2021-02-21 15:27:27','2021-02-23 03:24:43'),(219,'45208581f','hds83054@cuoly.com','641845852','Propietaria La Comunidad','38880e62-882c-4d04-8bf5-fe0e58d4ad01','Sabela Velasco','propietario','$2b$10$OMenzMbB3NO5lzV72axlCeQa4r9u3uKuXGBAZh4HbFrPI/J/5XOP2',1,'','2021-02-21 15:44:10','2021-02-23 03:24:43'),(220,'45208126w','rlt35913@cuoly.com','641845784','Propietaria La Ferretería','38880e62-882c-4d04-8bf5-fe0e58d4ad01','Concha González','propietario','$2b$10$y9.vBZH8Lc8dkaZ850etm.dJbf53c7FmH6wL9qY.Yg9Mp5wpqZWpG',1,'','2021-02-21 15:55:08','2021-02-23 03:24:43'),(221,'45208874x','emi99812@cuoly.com','641845874','Propietario Impulsa','38880e62-882c-4d04-8bf5-fe0e58d4ad01','Santiago Arnaiz','propietario','$2b$10$PAqb85vaBtH5p25YAMeMyOCUCnluy6LKc7IUFG7TxSf/uX5EWsgx2',1,'','2021-02-21 16:05:12','2021-02-23 03:24:43'),(222,'45208403h','lyt87099@zwoho.com','641845159','Propietaria Magma','38880e62-882c-4d04-8bf5-fe0e58d4ad01','Lucía Iturriaga','propietario','$2b$10$A78McdbtfUWlmpDIpWUSgunrffBFLoyd2N1Sg2vEm0WhR9PZ2AJLq',1,'','2021-02-21 16:15:45','2021-02-23 03:24:43'),(223,'45208792d','gmy47702@eoopy.com','641845850','Propietario Milénica','38880e62-882c-4d04-8bf5-fe0e58d4ad01','Fernando Álvarez','propietario','$2b$10$KJ4rYaSNLc1Xl9c25IHBUu66E.CGBVOpI5q86xSRkS5EAgPKzdKli',1,'','2021-02-21 16:25:19','2021-02-23 03:24:43'),(224,'56147820n','mrc93238@eoopy.com','698452173','Tengo una empresa de publicidad y marketing','38880e62-882c-4d04-8bf5-fe0e58d4ad01','Saleta Castro','cliente','$2b$10$mwEMeQzp1UHAYlNgAig89eDA84ALxiwwyRLJ5WLnwTrrrNNB.rrm2',1,'','2021-02-21 22:50:12','2021-02-23 03:24:43'),(225,'56147471p','vqw29119@zwoho.com','698452410','Tengo una empresa de relaciones públicas','38880e62-882c-4d04-8bf5-fe0e58d4ad01','Justo Redondo','cliente','$2b$10$plnR0MGj.g.ZWM4Bm./nu.ejsbllaIkek66AG3ASVt/yWDG4xF.yG',1,'','2021-02-21 23:12:42','2021-02-23 03:24:43'),(226,'56147450k','niq35752@eoopy.com','698452222','Me dedico a la docencia digital','38880e62-882c-4d04-8bf5-fe0e58d4ad01','NIeves Dominguez','cliente','$2b$10$WUeFdZ6t4hFcNG2/G7NhFus/ds4uUaUtd9vfaEOC9xzI/Avjehp6u',1,'','2021-02-21 23:18:24','2021-02-23 03:24:43'),(227,'56147124h','naf59469@eoopy.com','698452871','Organizo meetups','38880e62-882c-4d04-8bf5-fe0e58d4ad01','Lourdes Ochoa','cliente','$2b$10$WQIJp8YcL5HoXcQd5GmhwemlQJcleni4LWYfFODY6NpBgDuwdIe.q',1,'','2021-02-21 23:30:07','2021-02-23 03:24:43'),(228,'56147457y','unp97096@eoopy.com','698452210','Empresa de eventos','38880e62-882c-4d04-8bf5-fe0e58d4ad01','Luis Cantalapiedra','cliente','$2b$10$3m0eQFFxLUCj13wS5KvkN.0cXPZ9STO37pix4BTOnwj86TKCDpo.u',1,'','2021-02-21 23:35:42','2021-02-23 03:24:43'),(229,'56147172e','lpm00260@eoopy.com','698452108','Vendo productos personalizados','38880e62-882c-4d04-8bf5-fe0e58d4ad01','Andrea Peris','cliente','$2b$10$VMe1Ph0JmGfxSD1k7Xt8t.Xa2/6Fo5F9LD13JR0TcHkN8nxUF7rKa',1,'','2021-02-21 23:41:45','2021-02-23 03:24:43'),(230,'66147172e','byx10481@eoopy.com','698452102','Vendo seguros','38880e62-882c-4d04-8bf5-fe0e58d4ad01','Antia Tarregas','cliente','$2b$10$pV.BYTUImTV1ja8q/LnoQ.5utkgr6GI/6IlXs9LGz5/..pV5ufCwy',1,'','2021-02-21 23:45:14','2021-02-23 03:24:43'),(231,'66147257t','kuc85238@cuoly.com','698452587','TIenda online de decoración infantil','38880e62-882c-4d04-8bf5-fe0e58d4ad01','Ernesto Clavijo','cliente','$2b$10$po.B.03sp2kjugsWizH.pOfVMxwoiM/myTCr1RMiG289NLDPWwbPO',1,'','2021-02-22 13:18:12','2021-02-23 03:24:43'),(232,'66147459s','tyg87923@eoopy.com','698452125','Propietaria Coworking Vigo','38880e62-882c-4d04-8bf5-fe0e58d4ad01','Sara Pelaez','propietario','$2b$10$LCi9MiPbTU9mB3RZeBnrQ.LftxN.8kAYC5Tgk0ExfVigTEHgzFz9a',1,'','2021-02-23 16:13:00','2021-02-23 19:08:57'),(233,'66147410t','oay52337@eoopy.com','698452777','Administrador Galiking',NULL,'Galiking','administrador','$2b$10$FvRIgsToyJG4AXc4Oe3/L.e4EZfUZhg/Y04rsiawxOOOkIVa0e7D.',1,'','2021-02-24 03:20:04','2021-03-21 05:37:10'),(234,'58471259k','aperbarc@gmail.com','665 19 97 73','Tengo una empresa de desarrollo web','e7f557a5-0603-48e4-912b-4ec0cbb03a3c','Luna Martínez','cliente','$2b$10$H3vev2DTdZjA7ZHkqEyrt.gzYQf3xk/RdA.LKPwiPFA2Q31f9bWPm',1,'','2021-02-26 05:08:59','2021-04-12 00:59:31'),(237,'58412397P','akj07594@zwoho.com','986487596','Propietaria de Dinamo',NULL,'Raquel González','propietario','$2b$10$S4X.VZ03InGnvHakB.c6BO1LGCdLxTxJQ359OBGDog0CemzX.t7Di',1,'','2021-03-07 19:44:03','2021-03-07 19:45:07'),(238,'45789123k','led80794@zwoho.com','658741230','Propietaria de Dinamo',NULL,'Lili González','propietario','$2b$10$EuzVm4rmYzvEHVjsHJWe/.0SJ2VD8U80AM9M7lEqqA/N5y8rPGtBe',1,'','2021-03-12 19:50:26','2021-03-12 19:56:03'),(239,'58974126k','uly11015@eoopy.com','654789284','Soy propietaria de un cwk',NULL,'Perla Pereira','propietario','$2b$10$I4U0p0TjZQd0ut5CeUIK8OBXg2LuknEht3qQflsHgfqn2IM1Y1iK2',1,'','2021-03-15 18:52:49','2021-03-15 19:01:07'),(240,'58479621p','wgl14805@eoopy.com','658974123','administrador',NULL,'Arper','administrador','$2b$10$g/BnTKNqxx4y6gcB4o/QYuob0hh66kkOTKXVJGuAGLWr0.Oa6RSRe',1,'','2021-03-15 23:15:41','2021-03-15 23:16:32'),(241,'58963214p','yxh22529@zwoho.com','696587412','Propietaria cwk arbo',NULL,'Alba Gómez','propietario','$2b$10$gkxmtJNcXJL6MrpdT3elOe0iw.hWZKdSduTqa1/lu2gcRUvBiM0ge',1,'','2021-03-16 01:36:31','2021-03-16 01:37:16'),(242,'36987452t','iyc77163@eoopy.com','654872193','tengo un cwk',NULL,'Carolina Freire','propietario','$2b$10$igwYj2cvdMHQgi0e/Ok7XekaFKHd9kgEfrPbKm5IG9S8keS40i9tS',1,'','2021-03-16 15:27:16','2021-03-16 15:28:29'),(243,'36589412t','hvk35422@eoopy.com','698541236','Tengo un cwk en el centro de Ourense',NULL,'Encarna Dominguez','propietario','$2b$10$uUsXkJFObi9tgCwDLxffou4v6acQCMXZlZbFO4auJWufCXBOtyoM6',1,'','2021-03-19 15:45:10','2021-03-19 15:46:01'),(244,'36547810p','all94112@zwoho.com','654128790','Tengo un cwk en Lugo',NULL,'VIctor Fernández','propietario','$2b$10$S6UFAdv043uxF2oP6R0GzegCemCYAOfxQ9Gl9ftfIJhq6b80ME1J.',1,'','2021-03-19 16:41:09','2021-04-05 18:50:39'),(246,'36789410k','szg02444@cuoly.com','698547126','vendo productos de decoración','91a60900-6bde-4f48-9490-0c5744572ddd','Fernando Fernández','cliente','$2b$10$l8TUSbhxeUZ66AFjLOqnReJ6L2FrEfSo5YoUN3mWpTd1nvuIpCqlm',1,'','2021-03-30 18:02:31','2021-04-05 18:50:39');
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

-- Dump completed on 2021-04-12  4:14:09
