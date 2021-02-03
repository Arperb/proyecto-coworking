require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const fileUpload = require("express-fileupload");
const uuid = require('uuid');

const fsPromises = require('fs').promises

const { createUsuario, getUsuarioId,getListOfUsuario, updateUsuario, deleteUsuario, validate, login, updateContrasena, resetContrasena, contrasenaUpdateCode, recoverContrasena, createFotoUsuario } = require('./controllers/usuario')
const { usuarioIsAdmin, usuarioIsOwner, usuarioIsUser, isAuthenticated, isSameUser } = require('./middlewares/auth')
const { createCoworking, getCoworking, getListCoworking, updateCoworking, deleteCoworking, validateCoworking } = require('./controllers/espacioCoworking')
const { createReserva, validateReserva, updateReserva, deleteReserva, getReserva, getListReserva } = require('./controllers/reserva')



const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload());

//servicio para ficheros estáticos que están en disco(los background de la web, logo...)
//solo funciona para obtener imágenes

app.use('/images', express.static(__dirname +'/images'));



const DEFAULT_PORT = 9999

const currentPort = process.env.PORT || DEFAULT_PORT


//////////////////////////////////////////////////
//////               USUARIO                 /////
//////////////////////////////////////////////////


//Crear una lista de datos de usuario a partir de unos parámetros dados

app.get('/usuario', getListOfUsuario, usuarioIsAdmin)


//obtener todos los datos de un usuario a través del ID

app.get('/usuario/:id_usuario', getUsuarioId)

//obtener todos los datos de un usuario a través del email

//app.get('/usuario/:email', getUsuarioEmail)

//crear un nuevo usuario

app.post('/usuario', createUsuario)

// app.post('/profile', async (req, res) => {


//     //recibimos los ficheros(si no existe la carpeta la crea)
//    await fsPromises.mkdir(`${process.env.TARGET_FOLDER}/profile`, {recursive:true})

//     try {
//         //les damos un identificador único
//         const fileID = uuid.v4()
//         //los guardamos en la carpeta que nos interesa
//         const outputFileName = `${process.env.TARGET_FOLDER}/profile/${fileID}.png`

//         console.log(outputFileName)

//         await fsPromises.writeFile(outputFileName, req.files.image.data)

//         //guardar una referencia a este uuid en la base de datos
//         //para que luego el front llame al get para que le de el uuid

//         res.send()

//     } catch (e) {
//         console.log('Error: ', e)
//         res.status(500).send
//     }
// })

//Añadir foto

app.post('/usuario/:id/profile', createFotoUsuario)

//ver foto
//app.get('/usuario/:id/profile')  //
// app.get('/profile/:uuid', async (req, res) => {

//     const { uuid } = req.params

//     //comprobar si la imagen existe
//     const path = `${__dirname}/images/profile/${uuid}.png`
//     try {
//         const checkExists = await fsPromises.stat(path)
//         //aquí devolvemos el fichero
//         res.sendFile(path)
//     } catch(e) {
//         console.log('el fichero no existe')
//         res.status(404).send()
//     }
    
// })

//modificar datos usuario

app.put('/usuario/:id_usuario', updateUsuario)

//borrar usuario

app.delete('/usuario/:id_usuario', deleteUsuario)

//validar un usuario

app.get('/usuario/validate/:validationCode', validate)

//autenticar un usuario

app.post('/usuario/login', login)

//Actualizar la contraseña de un usuario

app.put('/usuario/:id/update-contrasena', isSameUser, updateContrasena)



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

app.post('/coworking', createCoworking)

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

//validar una reserva
app.get('/reserva/validate/:code', validateReserva)

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