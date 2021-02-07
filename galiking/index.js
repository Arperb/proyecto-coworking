require('dotenv').config()

//LIBRERIAS

const bodyParser = require('body-parser');
const express = require('express');
const fileUpload = require("express-fileupload");
const uuid = require('uuid');

const app = express();

const fsPromises = require('fs').promises

//PUERTO DEL .ENV

const DEFAULT_PORT = 9999

const currentPort = process.env.PORT || DEFAULT_PORT

//CONTROLADORES USUARIO

    const { createUsuario,
            getUsuarioId,
            getUsuarioEmail,
            getListOfUsuario,
            updateUsuario,
            deleteUsuario,
            validate,
            login, 
            updateContrasena,
            resetContrasena,
            contrasenaUpdateCode,
            recoverContrasena,
            createFotoUsuario } = require('./controllers/usuario');

 const { createCoworking, 
         getCoworking, 
         getListCoworking, 
         updateCoworking, 
        deleteCoworking } = require('./controllers/espacioCoworking');
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

app.get('/usuario', getListOfUsuario, usuarioIsAdmin)


//obtener todos los datos de un usuario a través del ID

app.get('/usuario/:id_usuario', getUsuarioId)

//obtener todos los datos de un usuario a través del email

app.get('/usuario/:email', getUsuarioEmail)




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

app.put('/usuario/:id/update-contrasena', updateContrasena, isAuthenticated)



//Petición de una nueva contraseña(2 pasos)

app.post('/usuario/recover-contrasena', recoverContrasena)

//Actualizar la contraseña con el código de actualización al haber olvidado la contraseña(endpoint anterior)

app.get('/usuario/contrasena/reset/:code', contrasenaUpdateCode)

//actualizar la contraseña(recuperación de contraseña)

app.put('/update-reset-contrasena/:id', resetContrasena)

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
