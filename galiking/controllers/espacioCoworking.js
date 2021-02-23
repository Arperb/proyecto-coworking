const db = require('../db/mysql')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const {sendConfirmationMailCoworking} = require('../utils/utils')

const { coworkingValidator } = require('../validators/espacioCoworking');
const { getConnection } = require('../db/db');



//creamos espacio coworking
const createCoworking = async (req, res) => {
    

  try {
      const { id_usuario, nombre, telefono, direccion, ciudad, provincia, descripcion, wifi, limpieza, parking, web } = req.body
   
      const response = await db.checkCoworking(web, id_usuario)

      await coworkingValidator.validateAsync(req.body)

      await db.createCoworking(id_usuario, nombre, telefono, direccion, ciudad, provincia, descripcion, wifi, limpieza, parking, web)
        let connection;
      try {
         
          const usuario = await db.getUsuarioId(id_usuario)
          await sendConfirmationMailCoworking(usuario.email)
      } catch(e) {
          console.log(e)
      }
      return res.status(200).send({
          status: 'ok',
          message: 'enhorabuena,su espacio coworking ha sido registrado con éxito'})
      

  } catch (e) {
      console.log(e)
       res.send({
          status: 'false',
          message: 'este espacio coworking ya existe'
       })
  }

}

 

const updateCoworking = async (req, res) => {

    
    const { id_usuario, nombre, telefono, direccion, ciudad, provincia, descripcion, wifi, limpieza, parking, web } = req.body

    const { id_coworking } = req.params
    
        
    // TODO: considerar el caso en el que el ID pasado no existe
    // y enviar un 404

    try {

       await coworkingValidator.validateAsync(req.body)

       await db.updateCoworking(id_usuario, nombre, telefono, direccion, ciudad, provincia, descripcion, wifi, limpieza, parking, web, id_coworking)

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
    
    
  const deleteCoworking = async (req, res) => {
    const { id_coworking } = req.params;

    try {
        // Para considerar el caso de que no existe el ID que nos 
        // pasamos podemos resolverlo aquí haciendo una petición
        // específica a la BBDD o bien resolverlo en el módulo de
        // BBDD leyendo la respuesta de la consulta (affectedRows)
        const coworking = await db.getCoworking(id_coworking)

        // Si nos piden eliminar un ID que no existe
        // tenemos que informar a quién hizo la llamada y lo
        // hacemos a través del statusCode, que será 404
        // En caso contrario, el programador que programa contra la API
        // podría pensar que efectivamente se hizo un DELETE cuando 
        // en realidad no es así
        if (!coworking.length) {
            res.status(404).send()
            return
        } 

        await db.deleteCoworking(id_coworking)

        res.send()
    } catch (e) {
       

        if (e.message === 'unknown-id') {
            res.status(404).send()

        } else {
            res.status(500).send('Debes borrar primero las fotos,reservas o salas asociadas a este coworking')
        }
    }
}


//Obtener una lista de los espacios coworking a través del ID

const getCoworking = async (req, res) => {
  const { id_coworking } = req.params

  try {
    const coworking = await db.getCoworking(id_coworking)


    if (!coworking.length) {
        res.status(404).send()
    } else {
        res.send(coworking)
    }
} catch (e) {
    res.status(500).send()
}
}

//Obtener lista de espacios coworking filtrando por nombre y/o localización

  const getListCoworking = async (req, res) => {
  const { nombre, telefono } = req.query;
  try {
      let coworking = await db.getListCoworking(nombre, telefono)
      res.send()
  } catch (e) {
      res.status(500).send()
  }
}

const getCoworkingReserva = async (req, res) => {

    const { id_coworking } = req.params

    try {
        const coworkingReserva = await db.getCoworkingReserva(id_coworking)
       
        if (!coworkingReserva) {
            res.status(404).send()
            
        } else {
            res.send(coworkingReserva)
        }
    } catch (e) {
        console.warn(e)
        res.status(500).send('Este coworking no tiene reservas')
    }
}

const getCoworkingRating = async (req, res) => {

    const { id_coworking } = req.params

    try {
        const coworkingRating = await db.getCoworkingRating(id_coworking)
       
        if (!coworkingRating) {
            res.status(404).send()
            
        } else {
            res.send(coworkingRating)
        }
    } catch (e) {
        console.warn(e)
        res.status(500).send('Este coworking no tiene valoraciones')
    }
}

const getCoworkingIncidencia = async (req, res) => {

    const { id_coworking } = req.params

    try {
        const coworkingIncidencia = await db.getCoworkingIncidencia(id_coworking)
       
        if (!coworkingIncidencia) {
            res.status(404).send()
            
        } else {
            res.send(coworkingIncidencia)
        }
    } catch (e) {
        console.warn(e)
        res.status(500).send('Este coworking no tiene incidencias')
    }
}

const getCoworkingSalas = async (req, res) => {

    const { id_coworking } = req.params

    try {
        const coworkingSalas = await db.getCoworkingSalas(id_coworking)
       
        if (!coworkingSalas) {
            res.status(404).send()
            
        } else {
            res.send(coworkingSalas)
        }
    } catch (e) {
        res.status(500).send('Este coworking aún no tiene salas registradas')
    }
}

const getCoworkingAvgRating = async (req, res) => {

    const { id_coworking } = req.params

    try {
        const coworkingAvgRating = await db.getCoworkingAvgRating(id_coworking)
       
        if (!coworkingAvgRating) {
            res.status(404).send()
            
        } else {
            res.send(coworkingAvgRating)
        }
    } catch (e) {
        console.warn(e)
        res.status(500).send('Este coworking no tiene valoraciones')
    }
}

  module.exports = {
    createCoworking,
    getCoworking,
    getListCoworking,
    updateCoworking,
    deleteCoworking,
    getCoworkingReserva,
    getCoworkingRating,
    getCoworkingIncidencia,
    getCoworkingSalas,
    getCoworkingAvgRating
  } 