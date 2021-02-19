require('dotenv').config()

//LIBRERIAS

const bodyParser = require('body-parser');
const express = require('express');
const fileUpload = require("express-fileupload");
const uuid = require('uuid');
const cors = require('cors');

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
            getFotoUsuario } = require('./controllers/usuario');

//CONTROLADORES COWORKING

 const { createCoworking, 
         getCoworking, 
         getListCoworking, 
         updateCoworking, 
        deleteCoworking } = require('./controllers/espacioCoworking');

const { createFotoCoworking,
        getFotoCoworking,
        deleteFotoCoworking } = require('./controllers/fotoCoworking');

//CONTROLADORES SALA      

const { createSala, 
        getSala, 
        getListSala, 
        updateSala, 
        deleteSala } = require('./controllers/sala');

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
        isReserva,
        checkIncidencia,
        checkCoworking
        } = require('./middlewares/auth');
const { lstat } = require('fs');

//LIBRERIAS SOBRE EXPRESS-APP

//app.use(morgan("dev"));
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
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


//modificar datos usuario

app.put('/usuario/:id_usuario', isAuthenticated, isSameUser, updateUsuario)

//borrar usuario

app.delete('/usuario/:id_usuario', isAuthenticated, isSameUser, deleteUsuario)

//validar un usuario

app.get('/usuario/validate/:code', validate)

//autenticar un usuario

app.post('/usuario/login', login)

//Actualizar la contraseña de un usuario

app.put('/usuario/:id/update-contrasena', isAuthenticated, isSameUser, updateContrasena)



//Petición de una nueva contraseña(2 pasos)

app.post('/usuario/recover-contrasena', recoverContrasena)

//Comprobar el code para poder actualizar la contraseña
//se envia un email con el mismo. El siguiente endpoint es para poner una contraseña nueva

app.get('/usuario/contrasena/reset/:code', contrasenaUpdateCode)

//actualizar la contraseña(recuperación de contraseña)

app.put('/update-reset-contrasena/:code', resetContrasena)

//Desautenticar usuario

app.post('/usuario/logout', isAuthenticated, logout)

//El usuario puede consultar sus reservas

app.get('/usuario/reservas/:id_usuario', isAuthenticated, isSameUser,)

//El usuario puede consultar sus incidencias registradas

app.get('/usuario/incidencias/:id_usuario', isAuthenticated, isSameUser,)

//El usuario puede consultar sus valoraciones

app.get('/usuario/reservas/:id_usuario', isAuthenticated, isSameUser,)

//////////////////////////////////////////////////
//////           ESPACIO COWORKING           /////
//////////////////////////////////////////////////

//Crear un nuevo espacio coworking

app.post('/coworking', isAuthenticated, usuarioIsOwner, isSameUser, createCoworking)

//obtener todos los datos de un espacio coworking a través del ID

app.get('/coworking/:id_coworking', isAuthenticated, usuarioIsOwner, isSameUser, getCoworking)

//Crear una lista de espacios coworking a partir de unos parámetros dados

app.get('/coworking', isAuthenticated, usuarioIsOwner, isSameUser, getListCoworking)

//Ver reservas de un coworking

app.get('/coworking/reservas/:id_coworking', isAuthenticated, usuarioIsOwner, isSameUser, )

//Ver valoraciones de un coworking

app.get('/coworking/rating/:id_coworking', isAuthenticated, usuarioIsOwner, isSameUser,)

//Ver incidencias de un coworking

app.get('/coworking/incidencias/:id_coworking', isAuthenticated, usuarioIsOwner, isSameUser,)

//Ver salas de un coworking

app.get('/coworking/salas/:id_coworking', isAuthenticated, usuarioIsOwner, isSameUser,)

//modificar datos espacio coworking

app.put('/coworking/:id_coworking', isAuthenticated, usuarioIsOwner, isSameUser, updateCoworking)

//borrar espacio coworking

app.delete('/coworking/:id_coworking', isAuthenticated, usuarioIsOwner, isSameUser, deleteCoworking)


//Añadir foto a coworking

app.post('/foto-coworking/:id_coworking', isAuthenticated, usuarioIsOwner, isSameUser, createFotoCoworking)

//Ver foto coworking

app.get('/foto-coworking/:id_coworking', isAuthenticated, usuarioIsOwner, isSameUser, getFotoCoworking)

//borrar foto

app.delete('/foto-coworking/:foto', isAuthenticated, usuarioIsOwner, isSameUser, deleteFotoCoworking)

//////////////////////////////////////////////////
//////                SALA                   /////
//////////////////////////////////////////////////

//Crear una nueva

app.post('/sala', isAuthenticated, usuarioIsOwner, isSameUser, createSala)

//obtener todos los datos de una sala a través del ID

app.get('/sala/:id_sala', isAuthenticated, usuarioIsOwner, isSameUser, getSala)

//Crear una lista de espacios coworking a partir de unos parámetros dados

app.get('/sala', isAuthenticated, usuarioIsAdmin, getListSala)

//modificar datos de una sala

app.put('/sala/:id_sala', isAuthenticated, usuarioIsOwner, isSameUser, updateSala)

//borrar una sala

app.delete('/sala/:id_sala', isAuthenticated, usuarioIsOwner, isSameUser, deleteSala)


///////////////////////////////////////////////////////////////////////
////////////////   RESERVAS                              /////////////
//////////////////////////////////////////////////////////////////////

//Crear una reserva
app.post('/reserva', isAuthenticated, isSameUser, createReserva)

//modificar datos de la reserva
app.put('/reserva/:id_reserva', isAuthenticated, isSameUser, createReserva, updateReserva)

//borrar reserva
app.delete('/reserva/:id_reserva', isAuthenticated, isSameUser, createReserva, deleteReserva)

//obtener todos los datos de una reserva través del ID
app.get('/reserva/:id_reserva', isAuthenticated, isSameUser, createReserva, getReserva)

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

//obterner la valoracion media de una sala

app.get('/rating/sala/:id_sala', isAuthenticated, usuarioIsUser, )



///////////////////////////////////////////////////////////////////////
//////////////////         BUSCADOR                      /////////////
/////////////////////////////////////////////////////////////////////

app.get('/buscador', buscador )



console.log(`Running on port ${currentPort}`)
app.listen(currentPort)
