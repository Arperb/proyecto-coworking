const db = require('../db/mysql')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');


const { salaValidator } = require('../validators/sala');
const { getConnection } = require('../db/db');



//creamos una sala
const createSala = async (req, res) => {

    const { id_coworking } = req.params;
    console.log(id_coworking)
    try {
        const { tipo, descripcion, capacidad, tarifa, tarifa_tipo, disponibilidad, proyector, impresora } = req.body



        const response = await db.checkSala(id_coworking)

        await salaValidator.validateAsync(req.body)

        const id_sala = await db.createSala(id_coworking, tipo, descripcion, capacidad, tarifa, tarifa_tipo, disponibilidad, proyector, impresora)
        let connection;
        try {

            const coworking = await db.getCoworking(id_coworking)

        } catch (e) {
            console.log(e)
        }
        return res.status(200).send({
            status: 'ok',
            id_sala,
            message: 'enhorabuena,su sala ha sido registrada con éxito'
        })


    } catch (e) {
        console.log(e)
        res.send({
            status: 'false',
            message: 'este sala ya existe'
        })
    }

}

//Actualizamos datos de una sala

const updateSala = async (req, res) => {


    const { tipo, descripcion, capacidad, tarifa, tarifa_tipo, disponibilidad, proyector, impresora } = req.body

    const { id_sala } = req.params


    // TODO: considerar el caso en el que el ID pasado no existe
    // y enviar un 404

    try {

        await salaValidator.validateAsync(req.body)

        await db.updateSala(tipo, descripcion, capacidad, tarifa, tarifa_tipo, disponibilidad, proyector, impresora, id_sala)

    } catch (e) {

        let statusCode = 400;
        // averiguar el tipo de error para enviar un código u otro
        if (e.message === 'database-error') {
            statusCode = 500
        }

        res.status(statusCode).send(e.message)
        return
    }

    res.send()
}

//Borramos una sala

const deleteSala = async (req, res) => {
    const { id_sala } = req.params;

    try {

        const sala = await db.getSala(id_sala)


        if (!sala.length) {
            res.status(404).send()
            return
        }

        await db.deleteSala(id_sala)

        res.send()
    } catch (e) {


        if (e.message === 'unknown-id') {
            res.status(404).send()

        } else {
            res.status(500).send()
        }
    }
}

//Obtener una lista de sala a través del ID

const getSala = async (req, res) => {
    const { id_coworking } = req.params

    try {
        const sala = await db.getSala(id_coworking)


        if (!sala.length) {
            res.status(404).send()
        } else {
            res.send(sala)
        }
    } catch (e) {
        res.status(500).send()
    }
}

//Obtener lista de salas de un coworking

const getListSala = async (req, res) => {
    const { id_coworking, tipo } = req.query;
    try {
        let sala = await db.getListSala(id_coworking, tipo)
        res.send(sala)
    } catch (e) {
        res.status(500).send()
    }
}

const getSalaAvgRating = async (req, res) => {

    const { id_sala } = req.params

    try {
        const salaAvgRating = await db.getSalaAvgRating(id_sala)

        if (!salaAvgRating) {
            res.status(404).send()

        } else {
            res.send(salaAvgRating)
        }
    } catch (e) {
        console.warn(e)
        res.status(500).send('Esta sala no tiene valoraciones')
    }
}


module.exports = {
    createSala,
    updateSala,
    deleteSala,
    getSala,
    getListSala,
    getSalaAvgRating
}