const db = require('../db/mysql')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const uuid = require('uuid');
const fsPromises = require('fs').promises;
const { getConnection } = require('../db/db');
const sharp = require('sharp');

const getFotoSala = async (req, res) => {

    const { id_sala } = req.params
  
    try {
        const foto_sala = await db.getFotoSala(id_sala)
        res.send(foto_sala)
    } catch (e) {
        res.status(500).send()
    }
  }

const createFotoSala = async (req, res) => {  

    const { id_sala } = req.params

    //recibimos los ficheros(si no existe la carpeta la crea)
     await fsPromises.mkdir(`${process.env.TARGET_FOLDER}/salas`, { recursive: true })

    try {
       
        // pasamos la imagen por sharp

        //les damos un identificador único
        const fileID = uuid.v4()

        // los guardamos en la carpeta que nos interesa
        const outputFileName = `${process.env.TARGET_FOLDER}/salas/${fileID}.jpg`
         
        await fsPromises.writeFile(outputFileName, req.files.foto.data)

        //guardar una referencia a este uuid en la base de datos
        //para que luego el front llame al get para que le de el uuid
        try {
            await db.createFotoCoworking(fileID, id_sala)


        } catch (e) {
            console.log(e)
            res.status(400).send("error uuid")
            return
        }

		res.send()
    
    } catch (e) {
        console.log('Error: ', e)
        res.status(500).send
    }
}

const deleteFotoSala = async (req, res) => {
    const { foto } = req.params;

    try {
    
        const foto_sala = await db.getFotoSala(foto)

        if (!foto_sala) {
            res.status(404).send()
            return
        }

        await db.deleteFotoSala(foto)

        res.send("foto eliminada con éxito")
    } catch (e) {
        console.log(e)
        if (e.message === 'unknown-id') {
            res.status(404).send('este uuid no existe')

        } else {
            res.status(500).send('')
        }
    }
}


module.exports = {
	createFotoSala,
	getFotoSala,
    deleteFotoSala
}