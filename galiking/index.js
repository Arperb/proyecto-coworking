require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const fileUpload = require("express-fileupload");
const uuid = require('uuid');

const fsPromises = require('fs').promises

const { createUsuario, getUsuarioId, getListOfUsuario, updateUsuario, deleteUsuario, validate, login, updateContrasena, resetContrasena, contrasenaUpdateCode, recoverContrasena, addFotoUsuario } = require('./controllers/usuario')
const { usuarioIsAdmin, usuarioIsOwner, usuarioIsUser, isAuthenticated, isSameUser } = require('./middlewares/auth')
const { createEspacio_coworking, getEspacio_coworking, getListEspacio_coworking, updateEspacio_coworking, deleteEspacio_coworking, validateEspacio_coworking } = require('./controllers/espacioCoworking')



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

app.get('/usuario/:id', getUsuarioId)

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

app.post('/usuario/:id/profile', addFotoUsuario)

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

app.get('/usuario/validate/:code', validate)

//autenticar un usuario

app.post('/usuario/login', login)

//Actualizar la contraseña de un usuario

app.put('/usuario/:id/update-contrasena', isSameUser, updateContrasena)



//Petición de una nueva contraseña(2 pasos)

app.post('/usuario/recover-contrasena', recoverContrasena)

//Actualizar la contraseña con el código de actualización al haber olvidado la contraseña(endopoint anterior)

app.get('/usuario/contrasena/reset/:code', contrasenaUpdateCode)

//actualizar la contraseña(recuperación de contraseña)

app.put('/update-reset-contrasena/:id', resetContrasena)

//////////////////////////////////////////////////
//////           ESPACIO COWORKING           /////
//////////////////////////////////////////////////

//Crear un nuevo espacio coworking

app.post('/espacio-coworking', createEspacio_coworking)

//obtener todos los datos de un espacio coworking a través del ID

app.get('/espacio-coworking/:id_coworking', getEspacio_coworking)

//Crear una lista de espacios coworking a partir de unos parámetros dados

app.get('/espacio-coworking', getListEspacio_coworking)

//modificar datos espacio coworking

app.put('/espacio-coworking/:id_coworking', updateEspacio_coworking)

//borrar espacio coworking

app.delete('/espacio-coworking/:id_coworking', deleteEspacio_coworking)

//validar un usuario

app.get('/espacio-coworking/validate/:code', validateEspacio_coworking)



console.log(`Running on port ${currentPort}`)
app.listen(currentPort)