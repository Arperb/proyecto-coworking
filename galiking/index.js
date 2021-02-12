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
            createFotoUsuario } = require('./controllers/usuario');

 const { createCoworking, 
         getCoworking, 
         getListCoworking, 
         updateCoworking, 
        deleteCoworking } = require('./controllers/espacioCoworking');

const { createSala, 
        getSala, 
        getListSala, 
        updateSala, 
        deleteSala } = require('./controllers/sala');

 const { createReserva, 
         updateReserva, 
         deleteReserva, 
        getReserva, 
         getListReserva } = require('./controllers/reserva')

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
        } = require('./middlewares/auth')

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

app.get('/usuario', usuarioIsAdmin, getListOfUsuario)


//obtener todos los datos de un usuario a través del ID

app.get('/usuario/:id_usuario', getUsuarioId)






//Añadir foto

app.post('/usuario/:id/profile', createFotoUsuario)



//modificar datos usuario

app.put('/usuario/:id_usuario', updateUsuario)

//borrar usuario

app.delete('/usuario/:id_usuario', deleteUsuario)

//validar un usuario

app.get('/usuario/validate/:code', validate)

//autenticar un usuario

app.post('/usuario/login', login)

//Actualizar la contraseña de un usuario

app.put('/usuario/:id/update-contrasena', isAuthenticated, updateContrasena)



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

app.post('/coworking', usuarioIsOwner, createCoworking)

//obtener todos los datos de un espacio coworking a través del ID

app.get('/coworking/:id_coworking', getCoworking)

//Crear una lista de espacios coworking a partir de unos parámetros dados

app.get('/coworking', getListCoworking)

//modificar datos espacio coworking

app.put('/coworking/:id_coworking', updateCoworking)

//borrar espacio coworking

app.delete('/coworking/:id_coworking', deleteCoworking)

//////////////////////////////////////////////////
//////                SALA                   /////
//////////////////////////////////////////////////

//Crear una nueva

app.post('/sala', usuarioIsOwner, createSala)

//obtener todos los datos de una sala a través del ID

app.get('/sala/:id_sala', getSala)

//Crear una lista de espacios coworking a partir de unos parámetros dados

app.get('/sala', getListSala)

//modificar datos de una sala

app.put('/sala/:id_sala', updateSala)

//borrar una sala

app.delete('/sala/:id_sala', deleteSala)


///////////////////////////////////////////////////////////////////////
////////////////   RESERVAS                              /////////////
//////////////////////////////////////////////////////////////////////

//Crear una reserva
app.post('/reserva', createReserva)

//modificar datos de la reserva
app.put('/reserva/:id_reserva', updateReserva)

//borrar reserva
app.delete('/reserva/:id_reserva', deleteReserva)

//obtener todos los datos de una reserva través del ID
app.get('/reserva/:id_reserva', getReserva)

//Crear una lista de reservas a través de los parámetros dados
app.get('/reserva', getListReserva)

///////////////////////////////////////////////////////////////////////
//////////////////         BUSCADOR                      /////////////
/////////////////////////////////////////////////////////////////////





console.log(`Running on port ${currentPort}`)
app.listen(currentPort)
