require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const { createUsuario, getUsuario, getListOfUsuario } = require('./controllers/usuario')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



const DEFAULT_PORT = 9999

const currentPort = process.env.PORT || DEFAULT_PORT

app.get('/usuario', getListOfUsuario )
app.get('/usuario/:id', getUsuario)

app.post('/usuario', createUsuario )

//app.put('/event/:id', updateUsuario)
// app.delete('/event/:id', deleteEvent)


console.log(`Running on port ${currentPort}`)
app.listen(currentPort)