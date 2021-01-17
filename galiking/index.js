require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const { createUsuario, getUsuario, getListOfUsuario, updateUsuario, deleteUsuario, validate, login, resetContrasena, recoverContrasena } = require('./controllers/usuario')

  


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



const DEFAULT_PORT = 9999

const currentPort = process.env.PORT || DEFAULT_PORT

app.get('/usuario', getListOfUsuario )

app.get('/usuario/:id_usuario', getUsuario)

app.post('/usuario', createUsuario)

app.put('/usuario/:id_usuario', updateUsuario)

app.delete('/usuario/:id_usuario', deleteUsuario)

//validacion de creacion(registro)usuario

app.get('/usuario/validate/:code', validate)

app.post('usuario/login', login)

//cambiar contraseña
//app.put('/usuario/:id', updateUser)

//app.put('/usuario/contrasena/reset', resetContrasena)

//app.post('/usuario/recover-contrasena', recoverContrasena)


console.log(`Running on port ${currentPort}`)
app.listen(currentPort)