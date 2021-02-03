const db = require('../db/mysql')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const {sendConfirmationMail, sendConfirmationMailReserva} = require('../utils/utils')

const { reservaValidator } = require('../validators/reserva');
const { getConnection } = require('../db/db');

     
//const fecha_inicio = new Date(req.body.fecha_inicio); 
//const fecha_fin = new Date(req.body.fecha_fin); 


//creamos reserva
const createReserva = async (req, res) => {

    try {
        

        const { id_coworking, id_usuario, valoracion, estado, fecha_inicio, fecha_fin } = req.body
        //console.log(id_usuario)
        const response = await db.checkReserva(id_coworking, id_usuario)
        console.log(response)
        await reservaValidator.validateAsync(req.body)
  
          
        await db.createReserva(id_coworking, id_usuario, valoracion, estado, fecha_inicio, fecha_fin)
          let connection;
        try {
            const usuario = await db.getUsuarioId(id_usuario)
            //console.log(usuario)
            const coworking = await db.getCoworking(id_coworking)
            console.log(coworking)
            
         
            await sendConfirmationMailReserva(usuario.email)
        } catch(e) {
            //console.log(e)
        }
        return res.status(200).send({
            status: 'ok',
            message: 'enhorabuena,reserva ha sido registrada con éxito'})
        
  
    } catch (e) {
        console.warn(e)
         res.send({
            status: 'false',
            message: 'la reserva ya existe'
         })
    }
  
  }


const validateReserva = async (req, res) => {
   
  const { code } = req.params;

  try {
      db.checkValidationCode(code)
      res.send('reserva validada correctamente')
  } catch(e) {
      res.status(401).send('reserva no validada')
  }

}   

const updateReserva = async (req, res) => {
    const { valoracion, estado, fecha_inicio, fecha_fin, fecha_creacion, fecha_modificacion} = req.body
    const { id_reserva } = req.params

    // TODO: considerar el caso en el que el ID pasado no existe
    // y enviar un 404
    try {
        await reservaValidator.validateAsync(req.body)

        await db.updateReserva(valoracion, estado,fecha_inicio, fecha_fin, fecha_creacion, fecha_modificacion)

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
    
    
  const deleteReserva = async (req, res) => {
    const { id_reserva } = req.params;

    try {
        // Para considerar el caso de que no existe el ID que nos 
        // pasamos podemos resolverlo aquí haciendo una petición
        // específica a la BBDD o bien resolverlo en el módulo de
        // BBDD leyendo la respuesta de la consulta (affectedRows)
        const reserva = await db.getReserva(id_reserva)

        // Si nos piden eliminar un ID que no existe
        // tenemos que informar a quién hizo la llamada y lo
        // hacemos a través del statusCode, que será 404
        // En caso contrario, el programador que programa contra la API
        // podría pensar que efectivamente se hizo un DELETE cuando 
        // en realidad no es así
        if (!reserva.length) {
            res.status(404).send()
            return
        } 

        await db.deleteReserva(id_reserva)

        res.send()
    } catch (e) {
       

        if (e.message === 'unknown-id') {
            res.status(404).send()

        } else {
            res.status(500).send()
        }
    }
}


//Obtener una lista de las reservas a través del ID

const getReserva = async (req, res) => {
  const { id_reserva } = req.params

  try {
      const reserva = await db.getReserva(id_reserva)
      res.send(reserva)
  } catch (e) {
      res.status(500).send()
  }
} 

//Obtener lista de reservas filtrando por nombre y/o teléfono

  const getListReserva = async (req, res) => {
  const { valoracion, estado } = req.query;
  try {
      let reserva = await db.getListReserva(valoracion, estado)
      res.send(reserva)
  } catch (e) {
      res.status(500).send()
  }
}

  module.exports = {
    createReserva,
    validateReserva,
    updateReserva,
    deleteReserva,
    getReserva,
    getListReserva
        
  } 