require('dotenv').config()

//LIBRERIAS

//const bodyParser = require('body-parser');
const express = require('express');
const fileUpload = require("express-fileupload");
const uuid = require('uuid');
const cors = require('cors');
const path = require("path");


const app = express();


const fsPromises = require('fs').promises

//PUERTO DEL .ENV

const DEFAULT_PORT = 9999

const currentPort = process.env.PORT || DEFAULT_PORT

//CONTROLADORES USUARIO

    const { createUsuario,
            getUsuarioId,
            getListOfUsuario,
            updateUsuario,
            deleteUsuario,
            validate,
            login, 
            updateContrasena,
            resetContrasena,
            contrasenaUpdateCode,
            recoverContrasena,
            logout,
            uploadFotoUsuario,
            getFotoUsuario,
            getUsuarioReserva,
            getUsuarioIncidencia,
            getUsuarioRating } = require('./controllers/usuario');

//CONTROLADORES COWORKING

 const { createCoworking, 
         getCoworking, 
         getListCoworking,
         updateCoworking, 
         deleteCoworking,
         getCoworkingReserva,
         getCoworkingRating,
         getCoworkingIncidencia,
         getCoworkingSalas,
         getCoworkingAvgRating } = require('./controllers/espacioCoworking');

const { createFotoCoworking,
        getFotoCoworking,
        deleteFotoCoworking } = require('./controllers/fotoCoworking');

//CONTROLADORES SALA      

const { createSala, 
        getSala, 
        getListSala, 
        updateSala, 
        deleteSala,
        getSalaAvgRating } = require('./controllers/sala');

//CONTROLADORES RESERVA

 const { createReserva, 
         updateReserva, 
         deleteReserva, 
         getReserva, 
         getListReserva } = require('./controllers/reserva');

//CONTROLADORES INCIDENCIA

const { createIncidencia,
        updateIncidencia,
        deleteIncidencia,
        getIncidencia } = require('./controllers/incidencia')

//CONTROLADORES RATING

const { createRating,
        updateRating,
        deleteRating,
        getRating } = require('./controllers/rating')

//CONTROLADOR BUSCADOR

const { buscador } = require('./controllers/buscador')

//MIDDLEWARES

const { 
        usuarioIsAdmin,
        usuarioIsOwner,
        usuarioIsUser,
        isAuthenticated,
        isSameUser,
        coworkingOwner,
        isReserva,
        checkIncidencia,
        checkCoworking
        } = require('./middlewares/auth');


//LIBRERIAS SOBRE EXPRESS-APP


//app.use(bodyParser.json());
app.use(express.json())
app.use(cors())
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload());

//servicio para ficheros estáticos que están en disco(los background de la web, logo...)
//solo funciona para obtener imágenes

app.use('/images', express.static(__dirname +'/images'));

//COMPROBACIÓN DE QUE EL SERVIDOR FUNCIONA
app.get("/", (req, res) => res.send("llega"));


//////////////////////////////////////////////////
//////               USUARIO                 /////
//////////////////////////////////////////////////

//crear un nuevo usuario

app.post('/usuario', createUsuario)


//Crear una lista de datos de usuario a partir de unos parámetros dados

app.get('/usuario', isAuthenticated, isSameUser, getListOfUsuario)


//obtener todos los datos de un usuario a través del ID

app.get('/usuario/:id_usuario', isAuthenticated, isSameUser, getUsuarioId)


//Añadir foto usuario

app.post('/usuario/:id_usuario/profile', isAuthenticated, isSameUser, uploadFotoUsuario)

//Ver foto usuario

app.get('/profile/:foto', isAuthenticated, isSameUser, getFotoUsuario)
//app.get('/images/profile//:foto', isAuthenticated, isSameUser, getFotoUsuario)


//modificar datos usuario

app.put('/usuario/:id_usuario', isAuthenticated, isSameUser, updateUsuario)

//borrar usuario

app.delete('/usuario/:id_usuario', isAuthenticated, isSameUser, deleteUsuario)

//validar un usuario

app.get('/usuario/validate/:code', validate)

//autenticar un usuario

app.post('/usuario/login', login)

//Actualizar la contraseña de un usuario

app.put('/usuario/:id_usuario/update-contrasena', isAuthenticated, isSameUser, updateContrasena)

//Petición de una nueva contraseña(2 pasos)

app.post('/usuario/recover-contrasena', recoverContrasena)

//Comprobar el code para poder actualizar la contraseña
//se envia un email con el mismo. El siguiente endpoint es para poner una contraseña nueva

app.get('/usuario/contrasena/reset/:code', contrasenaUpdateCode)

//actualizar la contraseña(recuperación de contraseña)

app.put('/update-reset-contrasena/:code', resetContrasena)

//Desautenticar usuario

app.post('/usuario/logout', isAuthenticated, logout)



//////////////////////////////////////////////////
//////           ESPACIO COWORKING           /////
//////////////////////////////////////////////////

//Crear un nuevo espacio coworking

app.post('/coworking', isAuthenticated, createCoworking)

//obtener todos los datos de un espacio coworking a través del ID

app.get('/coworking/:id_coworking', getCoworking)

//Crear una lista de espacios coworking a partir de unos parámetros dados

app.get('/coworking', isAuthenticated, coworkingOwner, getListCoworking)

//modificar datos espacio coworking

app.put('/coworking/:id_coworking', isAuthenticated, coworkingOwner, updateCoworking)

//borrar espacio coworking

app.delete('/coworking/:id_coworking', isAuthenticated, coworkingOwner, deleteCoworking)

//Añadir foto a coworking

app.post('/foto-coworking/:id_coworking', isAuthenticated, coworkingOwner, createFotoCoworking)

//Ver foto coworking

app.get('/foto-coworking/:id_coworking', isAuthenticated, coworkingOwner, getFotoCoworking)

//borrar foto

app.delete('/foto-coworking/:foto', isAuthenticated, coworkingOwner, deleteFotoCoworking)

//////////////////////////////////////////////////
//////                SALA                   /////
//////////////////////////////////////////////////

//Crear una nueva

app.post('/coworking/:id_coworking/CreateSala', isAuthenticated, usuarioIsOwner, createSala)

//obtener todos los datos de una sala a través del ID

app.get('/coworking/:id_coworking/sala/:id_sala', isAuthenticated, usuarioIsOwner, getSala)

//Crear una lista de espacios coworking a partir de unos parámetros dados

app.get('/sala', isAuthenticated, usuarioIsOwner, getListSala)

//modificar datos de una sala

app.put('/sala/:id_sala', isAuthenticated, usuarioIsOwner, updateSala)

//borrar una sala

app.delete('/sala/:id_sala', isAuthenticated, usuarioIsOwner, deleteSala)


///////////////////////////////////////////////////////////////////////
////////////////                RESERVAS                  /////////////
//////////////////////////////////////////////////////////////////////

//Crear una reserva
app.post('/reserva/:id_sala', isAuthenticated, usuarioIsUser, createReserva)

//modificar datos de la reserva
app.put('/reserva-actualizar/:id_reserva', isAuthenticated, usuarioIsUser, updateReserva)

//borrar reserva
app.delete('/reserva-borrar/:id_reserva', isAuthenticated, usuarioIsUser, deleteReserva)

//obtener todos los datos de una reserva través del ID
app.get('/reserva/:id_reserva', isAuthenticated, usuarioIsUser, getReserva)

//Crear una lista de reservas a través de los parámetros dados
app.get('/reserva', isAuthenticated, usuarioIsAdmin, getListReserva)


///////////////////////////////////////////////////////////////////////
////////////////                INCIDENCIA                /////////////
//////////////////////////////////////////////////////////////////////

//Crear una incidencia
app.post('/incidencia', isAuthenticated, usuarioIsUser, createIncidencia)

//modificar datos de una incidencia
app.put('/incidencia/:id_incidencia', isAuthenticated, usuarioIsUser, updateIncidencia)

//borrar incidencia
app.delete('/incidencia/:id_incidencia', isAuthenticated, usuarioIsUser, deleteIncidencia)

//obtener todos los datos de una incidencia través del ID
app.get('/incidencia/:id_incidencia', isAuthenticated, usuarioIsUser, getIncidencia)


///////////////////////////////////////////////////////////////////////
////////////////                  RATING                  /////////////
//////////////////////////////////////////////////////////////////////

//Crear una valoración
app.post('/rating', isAuthenticated, usuarioIsUser, createRating)

//modificar datos de una valoración
app.put('/rating/:id_rating', isAuthenticated, usuarioIsUser, updateRating)

//borrar valoración
app.delete('/rating/:id_rating', isAuthenticated, usuarioIsUser, deleteRating)

//obtener todos los datos de una valoración
app.get('/rating/:id_rating', isAuthenticated, usuarioIsUser, getRating)

///////////////////////////////////////////////////////////////////////
//////////////////         BUSCADOR                      /////////////
/////////////////////////////////////////////////////////////////////

app.get('/buscador', buscador )

///////////////////////////////////////////////////////////////////////
//////////////////          CONSULTA DE DATOS            /////////////
/////////////////////////////////////////////////////////////////////

//El usuario puede consultar sus reservas

app.get('/usuario/:id_usuario/reservas', isAuthenticated, isSameUser, getUsuarioReserva)

//El usuario puede consultar sus incidencias registradas

app.get('/usuario/:id_usuario/incidencias/:id_incidencia', isAuthenticated, isSameUser, getUsuarioIncidencia)

//El usuario puede consultar sus valoraciones

app.get('/usuario/:id_usuario/rating/:id_rating', isAuthenticated, isSameUser, getUsuarioRating)

//Ver reservas de un coworking

app.get('/coworking/:id_coworking/reservas', isAuthenticated, usuarioIsOwner, getCoworkingReserva)

//Ver valoraciones de un coworking en sus salas

app.get('/coworking/:id_coworking/rating', isAuthenticated, usuarioIsOwner, getCoworkingRating)

//Ver incidencias de un coworking

app.get('/coworking/:id_coworking/incidencias', isAuthenticated, usuarioIsOwner, getCoworkingIncidencia)

//Ver salas de un coworking

app.get('/coworking/:id_coworking/salas', getCoworkingSalas)

//obterner la valoracion media de un coworking

app.get('/coworking/:id_coworking/avgRating', getCoworkingAvgRating)

//Obtener la valoracion media de una sala

app.get('/sala/:id_sala/avgRating', getSalaAvgRating)

console.log(`Running on port ${currentPort}`)
app.listen(currentPort)
