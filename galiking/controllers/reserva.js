const db = require("../db/mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");
const {
	dateToDB,
	sendConfirmationMailReserva,
} = require("../utils/utils");

const { reservaValidator } = require("../validators/reserva");

//creamos reserva
const createReserva = async (req, res) => {
	try {
		const { id_sala, id_usuario, fecha_inicio, fecha_fin } = req.body;
		const checkInDB = dateToDB(fecha_inicio);
		const checkOutDB = dateToDB(fecha_fin);
		await reservaValidator.validateAsync(req.body);

		

		await db.createReserva(id_sala, id_usuario, checkInDB, checkOutDB);
		try {
			const usuario = await db.getUsuarioId(id_usuario)
			await sendConfirmationMailReserva(usuario.email);
		} catch (e) {
			console.log(e);
		}
		return res.status(200).send({
			status: "ok",
			message: "enhorabuena,reserva ha sido registrada con éxito",
		});
	} catch (e) {
		console.warn(e);
		res.send({
			status: "false",
			message: "la reserva no se pudo completar",
		});
	}

};

const updateReserva = async (req, res) => {
	const { id_sala, id_usuario, fecha_inicio, fecha_fin } = req.body;
	const { id_reserva } = req.params;

	try {
		await reservaValidator.validateAsync(req.body);

		await db.updateReserva(
			id_sala,
			id_usuario,
			fecha_inicio,
			fecha_fin,
			id_reserva
		);
	} catch (e) {
		let statusCode = 400;
		// averiguar el tipo de error para enviar un código u otro
		if (e.message === "database-error") {
			statusCode = 500;
		}

		res.status(statusCode).send(e.message);
		return;
	}

	res.send({
		status: "ok",
		messsage: "tu reserva ha sido actualizada",
	});
};

const deleteReserva = async (req, res) => {
	const { id_reserva } = req.params;

	try {
		await db.deleteReserva(id_reserva);

		res.send({
			status: "ok",
			message: "la reserva fue cancelada satisfactoriamente",
		});
	} catch (e) {
		if (e.message === "unknown-id") {
			res.status(404).send();
		} else {
			res.status(500).send();
		}
	}
};

//Obtener una lista de las reservas a través del ID
const getReserva = async (req, res) => {
	const { id_reserva } = req.params;
	try {
		const reserva = await db.getReserva(id_reserva);
		res.send(reserva);
	} catch (e) {
		res.status(500).send();
	}
};

//Obtener lista de reservas
const getListReserva = async (req, res) => {
	try {
		// /get user/:id/reservas LISTADO RESERVAS USUARIO
		// /get user/:id/reservas/:id_reserva GET RESERVA USUARIO
		// /get coworking/:id/reservas LISTADO RESERVAS COWORKING
		// /get coworking/:id/reservas/:id_reserva GET RESERVA PROPIETARIO
		// /get coworking/:id/sala/:id_sala/reservas LISTADO RESERVAS SALA
		const { id_usuario, id_coworking } = req.params;
		const { id_sala } = req.body;
		let reservas = await db.getListReserva(id_usuario, id_sala, id_coworking);
		res.send(reservas);
	} catch (e) {
		res.status(500).send();
	}
};


module.exports = {
	createReserva,
	updateReserva,
	deleteReserva,
	getReserva,
	getListReserva
};