require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const { createUsuario, getUsuario, getListOfUsuario, updateUsuario, deleteUsuario, validate, login, updateContrasena, resetContrasena, recoverContrasena } = require('./controllers/usuario')
const { usuarioIsAdmin, usuarioIsOwner, usuarioIsUser, isAuthenticated, isSameUser } = require('./middlewares/auth')
const { createEspacio_coworking, getEspacio_coworking, getListEspacio_coworking, updateEspacio_coworking, deleteEspacio_coworking, validateEspacio_coworking } = require('./controllers/espacioCoworking')
  


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



const DEFAULT_PORT = 9999

const currentPort = process.env.PORT || DEFAULT_PORT


//////////////////////////////////////////////////
//////               USUARIO                 /////
//////////////////////////////////////////////////


//Crear una lista de datos de usuario a partir de unos parámetros dados

app.get('/usuario', getListOfUsuario )

//obtener todos los datos de un usuario a través del ID

app.get('/usuario/:id_usuario', getUsuario)

//crear un nuevo usuario

app.post('/usuario', createUsuario)

//modificar datos usuario

app.put('/usuario/:id_usuario', updateUsuario)

//borrar usuario

app.delete('/usuario/:id_usuario', deleteUsuario)

//validar un usuario

app.get('/usuario/validate/:code', validate)

//autenticar un usuario

app.post('/usuario/login', login)

//Actualizar la contraseña de un usuario

//app.put('/usuario/:id/contrasena', updateContrasena)



//Petición de una nueva contraseña(2 pasos)

//app.post('/usuario/recover-contrasena', recoverContrasena)

//Actualizar la contraseña con el código de actualización al haber olvidado la contraseña(endopoint anterior)

//app.put('/usuario/contrasena/reset', resetContrasena)

//////////////////////////////////////////////////
//////           ESPACIO COWORKING           /////
//////////////////////////////////////////////////

//Crear un nuevo espacio coworking

app.post('/espacio-coworking', createEspacio_coworking, usuarioIsOwner)

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