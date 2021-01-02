create database bd_galiking character set="utf8mb4" collate="utf8mb4_spanish_ci";

use bd_galiking;

create table usuario(
id_usuario int unsigned auto_increment primary key,
nif_cif varchar(9) UNIQUE not null,
email varchar(30) not null,
telefono varchar(13) not null,
bio varchar(500),
foto blob(65535),
nombre varchar(50) not null,
administrador ENUM('si', 'no') default 'no',
contraseña varchar(100) not null,
fecha_creacion date not null,
fecha_modificacion date
);

create table incidencia(
 id_incidencia int unsigned auto_increment primary key,
 id_usuario int unsigned not null,
 estado ENUM('activado', 'desactivado') DEFAULT 'desactivado',
 descripcion varchar(500) not null,
 fecha_creacion date not null,
 fecha_modificacion date,
 constraint incidencia_id_usuario_fk1 foreign key (id_usuario) references usuario(id_usuario)
 );
 
 create table reserva(
id_reserva int unsigned auto_increment primary key,
id_sala int unsigned not null,
id_usuario int unsigned not null,
valoracion tinyint CONSTRAINT valoracion_checkLimit CHECK (valoracion BETWEEN 1 AND 5),
estado ENUM('activado', 'desactivado' ) DEFAULT 'desactivado',
fecha_inicio date not null,
fecha_fin date,
fecha_creacion date not null,
fecha_modificacion date,
constraint reserva_id_usuario_fk2 foreign key (id_usuario) references usuario(id_usuario),
constraint reserva_id_sala_fk3 foreign key (id_sala) references sala(id_sala)
 );
 
 create table sala(
 id_sala int unsigned auto_increment primary key,
 id_coworking int unsigned not null,
 nombre ENUM('despacho', 'compartida', 'sala de reuniones', 'salón de eventos') not null,
 capacidad smallint(3) not null,
 tarifa float not null,
 disponibilidad ENUM('si', 'no') default 'si',
 equipacion SET('wifi', 'proyector', 'impresora', 'fotocopiadora', 'mobiliario', 'sistema de audio'),
 servicios SET('vending', 'limpieza', 'seguridad', 'recepción', 'cocina', 'espacio común', 'parking'),
 fecha_creacion date not null,
 fecha_modificacion date,
 constraint sala_id_coworking_fk4 foreign key (id_coworking) references espacio_coworking(id_coworking)
 );
 
 create table foto_sala(
 id_sala int unsigned primary key,
 foto blob(65535),
 fecha_creacion date not null,
 fecha_modificacion date,
 constraint foto_sala_id_sala_fk5 foreign key (id_sala) references sala(id_sala)
 );
 
 create table espacio_coworking(
 id_coworking int unsigned auto_increment primary key,
 id_usuario int unsigned not null,
 nombre varchar(50) not null,
 telefono varchar(13) not null,
 localizacion varchar(100) not null,
 descripcion varchar(600) not null,
 contraseña varchar(100) not null,
 web varchar(30) not null,
 fecha_creacion date not null,
 fecha_modificacion date,
 constraint espacio_coworking_id_usuario_fk6 foreign key (id_usuario) references usuario(id_usuario)
 );

create table foto_coworking(
id_coworking int unsigned primary key,
foto blob(65535) not null,
fecha_creacion date not null,
fecha_modificacion date,
constraint foto_coworking_id_coworking_fk7 foreign key (id_coworking) references espacio_coworking(id_coworking)
 );