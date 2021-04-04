const db = require('../db/mysql')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const uuid = require('uuid');
const fsPromises = require('fs').promises;
const { getConnection } = require('../db/db');
const sharp = require('sharp');

const getFotoCoworking = async (req, res) => {

    const { id_coworking } = req.params

    try {
        const foto_coworking = await db.getFotoCoworking(id_coworking)
        res.send(foto_coworking)
    } catch (e) {
        res.status(500).send()
    }
}

const createFotoCoworking = async (req, res) => {

    const { id_coworking } = req.params

    //recibimos los ficheros(si no existe la carpeta la crea)
    await fsPromises.mkdir(`${process.env.TARGET_FOLDER}/cwk`, { recursive: true })

    try {
        console.log(req.files)
        //les damos un identificador único
        const fileID = uuid.v4()
        // los guardamos en la carpeta que nos interesa
        const outputFileName = `${process.env.TARGET_FOLDER}/cwk/${fileID}.jpg`

        const image = sharp(req.files.foto.data)
        const imageInfo = await image.metadata()
        if (imageInfo.width > 1024) {
            image.resize(1024)
        }

        await image.toFile(outputFileName);


        //guardar una referencia a este uuid en la base de datos
        //para que luego el front llame al get para que le de el uuid
        try {
            await db.createFotoCoworking(fileID, id_coworking)


        } catch (e) {
            console.log(e)
            res.status(400).send("error uuid")
            return
        }
        const coworking = await db.getCoworking(id_coworking)

        res.send(coworking);

    } catch (e) {
        console.log('Error: ', e)
        res.status(500).send
    }
}

const deleteFotoCoworking = async (req, res) => {
    const { foto } = req.params;

    try {

        const foto_coworking = await db.getFotoCoworking(foto)

        if (!foto_coworking) {
            res.status(404).send()
            return
        }

        await db.deleteFotoCoworking(foto)

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
    createFotoCoworking,
    getFotoCoworking,
    deleteFotoCoworking
}