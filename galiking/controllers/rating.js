const db = require('../db/mysql')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const { sendConfirmationMailValoracion } = require('../utils/utils')

const { ratingValidator } = require('../validators/rating');
const { getConnection } = require('../db/db');



//creamos una valoración
const createRating = async (req, res) => {
    const { id_usuario } = req.auth;
  try {
      const { id_reserva, valoracion } = req.body
     

      await ratingValidator.validateAsync(req.body)

      await db.createRating(id_usuario, id_reserva, valoracion)

      let connection;
        
      try {
          const usuario = await db.getUsuarioId(id_usuario)
          await sendConfirmationMailValoracion(usuario.email)
      } catch(e) {
          console.log(e)
      }
      return res.status(200).send({
          status: 'ok',
          message: 'Has valorado tu reserva'})
      

  } catch (e) {
       res.send({
          status: 'false',
          message: 'no se ha podido registrar la valoracion'
       })
  }

}
 

const updateRating = async (req, res) => {
    const { id_reserva, valoracion } = req.body
    const { id_rating } = req.params
    const { id_usuario } = req.auth

    // TODO: considerar el caso en el que el ID pasado no existe
    // y enviar un 404
    try {
        await ratingValidator.validateAsync(req.body)

        await db.updateRating(id_reserva, valoracion, id_rating)

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
    
    
  const deleteRating = async (req, res) => {
    const { id_rating } = req.params;

    try {
       
        const rating = await db.getRating(id_rating)

      
        if (!rating.length) {
            res.status(404).send()
            return
        } 

        await db.deleteRating(id_rating)

        res.send()
    } catch (e) {
       

        if (e.message === 'unknown-id') {
            res.status(404).send()

        } else {
            res.status(500).send()
        }
    }
}


//Obtener una lista de ratings a través del ID

const getRating = async (req, res) => {
  const { id_rating } = req.params

  try {
      const rating = await db.getRating(id_rating)
      res.send(rating)
  } catch (e) {
      res.status(500).send()
  }
} 



  module.exports = {
    createRating,
    getRating,
    updateRating,
    deleteRating
  } 