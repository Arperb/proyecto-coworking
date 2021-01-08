create database bd_galiking character set="utf8mb4" collate="utf8mb4_spanish_ci";

use bd_galiking;

create table usuario(
id_usuario int unsigned auto_increment primary key,
nif_cif varchar(9) UNIQUE not null,
email varchar(100) not null,
telefono varchar(13) not null,
bio varchar(500),
foto varchar(255),
nombre varchar(100) not null,
administrador ENUM('si', 'no') default 'no',
contraseña varchar(100) not null,
fecha_creacion timestamp not null default current_timestamp,
fecha_modificacion timestamp default current_timestamp on update current_timestamp
);

create table incidencia(
 id_incidencia int unsigned auto_increment primary key,
 id_usuario int unsigned not null,
 id_sala int unsigned not null,
 estado ENUM('activado', 'desactivado') DEFAULT 'desactivado',
 descripcion varchar(500) not null,
 fecha_creacion timestamp not null default current_timestamp,
 fecha_modificacion timestamp default current_timestamp on update current_timestamp,
 constraint incidencia_id_usuario_fk1 foreign key (id_usuario) references usuario(id_usuario),
 constraint incidenci_id_sala_fk2 foreign key (id_sala) references sala(id_sala)
 );
 
 create table reserva(
id_reserva int unsigned auto_increment primary key,
id_sala int unsigned not null,
id_usuario int unsigned not null,
valoracion tinyint CONSTRAINT valoracion_checkLimit CHECK (valoracion BETWEEN 1 AND 5),
estado ENUM('activado', 'desactivado' ) DEFAULT 'desactivado',
fecha_inicio date not null,
fecha_fin date,
fecha_creacion timestamp not null default current_timestamp,
fecha_modificacion timestamp default current_timestamp on update current_timestamp,
constraint reserva_id_usuario_fk3 foreign key (id_usuario) references usuario(id_usuario),
constraint reserva_id_sala_fk4 foreign key (id_sala) references sala(id_sala)
 );
 
 create table sala(
 id_sala int unsigned auto_increment primary key,
 id_coworking int unsigned not null,
 id_incidencia int unsigned not null,
 nombre ENUM('despacho', 'compartida', 'sala de reuniones', 'salón de eventos') not null,
 capacidad smallint(3) not null,
 tarifa float not null,
 disponibilidad ENUM('si', 'no') default 'si',
 equipacion SET('wifi', 'proyector', 'impresora', 'fotocopiadora', 'mobiliario', 'sistema de audio'),
 servicios SET('vending', 'limpieza', 'seguridad', 'recepción', 'cocina', 'espacio común', 'parking'),
 fecha_creacion timestamp not null default current_timestamp,
fecha_modificacion timestamp default current_timestamp on update current_timestamp,
 constraint sala_id_coworking_fk5 foreign key (id_coworking) references espacio_coworking(id_coworking),
 constraint sala_id_incidencia_fk6 foreign key (id_incidencia) references incidencia(id_incidencia)
 );
 
 create table foto_sala(
 id_foto_sala int unsigned auto_increment primary key,
 id_sala int unsigned not null,
 foto varchar(255) not null,
 fecha_creacion timestamp not null default current_timestamp,
 fecha_modificacion timestamp default current_timestamp on update current_timestamp,
 constraint foto_sala_id_sala_fk7 foreign key (id_sala) references sala(id_sala)
 );
 
 create table espacio_coworking(
 id_coworking int unsigned auto_increment primary key,
 id_usuario int unsigned not null,
 nombre varchar(100) not null,
 telefono varchar(13) not null,
 localizacion varchar(100) not null,
 descripcion varchar(800) not null,
 contraseña varchar(100) not null,
 web varchar(150) not null,
 fecha_creacion timestamp not null default current_timestamp,
 fecha_modificacion timestamp default current_timestamp on update current_timestamp,
 constraint espacio_coworking_id_usuario_fk8 foreign key (id_usuario) references usuario(id_usuario)
 );

create table foto_coworking(
id_foto_coworking int unsigned auto_increment primary key,
id_coworking int unsigned not null,
foto varchar(255) not null,
fecha_creacion timestamp not null default current_timestamp,
fecha_modificacion timestamp default current_timestamp on update current_timestamp,
constraint foto_coworking_id_coworking_fk9 foreign key (id_coworking) references espacio_coworking(id_coworking)
 );