const db = require('../db/mysql')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const uuid = require('uuid');
const fsPromises = require('fs').promises;
const { getConnection } = require('../db/db');

const addFotoCoworking = async (req, res) => {
    const { id_foto_coworking } = req.params
   
    
    const decodedToken = req.auth
    console.log(req.auth)
    try {
        const coworking = await db.getCowokingId(id_coworking)
        
        if (decodedToken.id_coworking !== coworking.id_coworking) {
            res.status(400).send()
            return
        }

        if (req.files) {
            // si hiciese falta comprobar la extensión del fichero
            // podríamos hacerlo aquí a partir de la información de req.files
            // y enviar un error si no es el tipo que nos interesa (res.status(400).send())

            await fsPromises.mkdir(`${process.env.TARGET_FOLDER}/cwk`, { recursive: true })


            const fileID = uuid.v4()
            const outputFileName = `${process.env.TARGET_FOLDER}/cwk/${fileID}.png`

            await fsPromises.writeFile(req.files.image.name, req.files.image.data)
            console.log(req.files)

            // guardar una referencia a este UUID En la base de datos, de forma que
            // cuando nos pidan la lista de nuestros recursos (productos, conciertos, etc) o 
            // el detalle de uno de ellos, accedemos a la BBDD para leer los UUID, y después el
            // front llamará al GET con el UUID correspondiente
            await db.uploadFotoCoworking(outputFileName, id_coworking)
        }

    } catch (e) {
        let statusCode = 400;
        // averiguar el tipo de error para enviar un código u otro
        if (e.message === 'database-error') {
            statusCode = 500
        }

        res.status(statusCode).send(e.message)
        return
    }

    res.send('Datos actualizados correctamente')
}
  

module.exports = {
    addFotoCoworking,
} 