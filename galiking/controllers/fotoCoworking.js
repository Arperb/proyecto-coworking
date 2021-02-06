const db = require('../db/mysql')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const uuid = require('uuid');
const fsPromises = require('fs').promises;
const { getConnection } = require('../db/db');

const addFotoCoworking = async (req, res) => {
	const { id_coworking } = req.params;

	try {
		//POST coworking/:id/picture
		if (req.files) {
			//CREA CARPETA SI NO EXISTE
			await fsPromises.mkdir(`${process.env.TARGET_FOLDER}/cwk`, {
				recursive: true,
			});

			//DEFINE NOMBRE
			const fileID = uuid.v4();
			//DEFINE LA RUTA DEL FICHERO
			const outputFileName = `${process.env.TARGET_FOLDER}/cwk/${fileID}.png`;

			//CREA EL FICHER
			await fsPromises.writeFile(req.files.image.name, req.files.image.data);
			console.log(req.files);

			// guardar una referencia a este UUID En la base de datos, de forma que
			// cuando nos pidan la lista de nuestros recursos (productos, conciertos, etc) o
			// el detalle de uno de ellos, accedemos a la BBDD para leer los UUID, y después el
			// front llamará al GET con el UUID correspondiente
			await db.uploadFotoCoworking(outputFileName, id_coworking);
		}
	} catch (e) {
		let statusCode = 400;
		// averiguar el tipo de error para enviar un código u otro
		if (e.message === "database-error") {
			statusCode = 500;
		}

		res.status(statusCode).send(e.message);
		return;
	}

	res.send("Datos actualizados correctamente");
};

module.exports = {
	addFotoCoworking,
};