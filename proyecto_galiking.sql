create database proyecto_galiking character set="utf8mb4" collate="utf8mb4_spanish_ci";

use proyecto_galiking;

create table usuario(
id_usuario int(11) unsigned auto_increment primary key,
nif varchar(9) UNIQUE not null,
email varchar(30) not null,
telefono varchar(13) not null,
bio varchar(500),
foto blob(65535),
nombre varchar(50) not null,
administrador varchar(50) not null,
contrasena varbinary(10) not null,
fecha_creacion date not null,
fecha_modificacion date
);

create table reserva(
id_reserva int(11) unsigned auto_increment primary key,
id_sala int(11) unsigned not null,
id_usuario int(11) unsigned not null,
valoracion tinyint CONSTRAINT valoracion_checkLimit CHECK (valoracion BETWEEN 1 AND 5),
estado ENUM('activado', 'desactivado' ) DEFAULT 'desactivado',
fecha_inicio date not null,
fecha_fin date not null,
fecha_creacion date not null,
fecha_modificacion date,
constraint reserva_id_usuario_fk1 foreign key (id_usuario) references usuario(id_usuario),
constraint reserva_id_sala_fk2 foreign key (id_sala) references sala(id_sala)
 );

 create table sala(
 id_sala int(11) unsigned auto_increment primary key,
 nombre varchar(50) not null,
 capacidad smallint(3) not null,
 tarifa float(4) not null,
 equipacion ENUM('wifi', 'proyector', 'impresora', 'fotocopiadora', 'mobiliario', 'sistema de audio'),
 servicios ENUM('vending', 'limpieza', 'seguridad', 'recepción', 'cocina', 'espacio común', 'parking'),
 fecha_creacion date not null,
 fecha_modificacion date
 );
 
 create table foto_sala(
 id_sala int(11) unsigned primary key,
 foto blob(65535),
 constraint foto_sala_id_sala_fk3 foreign key (id_sala) references sala(id_sala)
 );
 
 create table incidencia(
 id_incidencia int(11) unsigned auto_increment primary key,
 id_reserva int(11) unsigned not null,
 estado ENUM('activado', 'desactivado') DEFAULT 'desactivado',
 descripcion varchar(500) not null,
 fecha_creacion date not null,
 fecha_modificacion date,
 constraint incidencia_id_reserva_fk4 foreign key (id_reserva) references reserva(id_reserva)
 );
 
 create table espacio_coworking(
 id_coworking int(11) unsigned auto_increment primary key,
 nombre varchar(50) not null,
 telefono varchar(13) not null,
 usuario varchar(30) not null,
 contraseña varbinary(10) not null,
 web varchar(30) not null,
 fecha_creacion date not null,
 fecha_modificacion date
 );

create table foto_coworking(
id_coworking int(11) unsigned primary key,
foto blob(65535),
constraint foto_coworking_id_coworking_fk5 foreign key (id_coworking) references espacio_coworking(id_coworking)
 );
 
 show tables