const db = require('../db/mysql')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const {sendConfirmationMail, sendConfirmationMailIncidencia} = require('../utils/utils')

const { incidenciaValidator } = require('../validators/incidencia');
const { getConnection } = require('../db/db');



//creamos incidencia
const createIncidencia = async (req, res) => {
    

  try {
      const { id_usuario, id_coworking, estado, descripcion, fecha_creacion, fecha_modificacion } = req.body
     
      const response = await db.checkIncidencia(id_usuario, id_coworking)

      await incidenciIncidenciaValidator.validateAsync(req.body)

      await db.createIncidencia( id_usuario, id_coworking, estado, descripcion, fecha_creacion, fecha_modificacion )
        let connection;
      try {
          const usuario = await db.getUsuario(id_usuario)
          const email = usuario[0]
       
          await sendConfirmationMailIncidencia(email)
      } catch(e) {
          console.log(e)
      }
      return res.status(200).send({
          status: 'ok',
          message: 'incidencia registrada con éxito'})
      

  } catch (e) {
       res.send({
          status: 'false',
          message: 'esta incidencia ya ha sido registrada'
       })
  }

}
 

const updateIncidencia = async (req, res) => {
    const { id_usuario, id_coworking, estado, descripcion, fecha_creacion, fecha_modificacion } = req.body
    const { id_incidencia } = req.params

    // TODO: considerar el caso en el que el ID pasado no existe
    // y enviar un 404
    try {
        await incidenciaValidator.validateAsync(req.body)

        await db.updateIncidencia(id_incidencia, id_usuario, id_coworking, estado, descripcion, fecha_creacion, fecha_modificacion)

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
    
    
  const deleteIncidencia = async (req, res) => {
    const { id_incidencia } = req.params;

    try {
        // Para considerar el caso de que no existe el ID que nos 
        // pasamos podemos resolverlo aquí haciendo una petición
        // específica a la BBDD o bien resolverlo en el módulo de
        // BBDD leyendo la respuesta de la consulta (affectedRows)
        const incidencia = await db.getIncidencia(id_incidencia)

        // Si nos piden eliminar un ID que no existe
        // tenemos que informar a quién hizo la llamada y lo
        // hacemos a través del statusCode, que será 404
        // En caso contrario, el programador que programa contra la API
        // podría pensar que efectivamente se hizo un DELETE cuando 
        // en realidad no es así
        if (!incidencia.length) {
            res.status(404).send()
            return
        } 

        await db.deleteIncidencia(id_incidencia)

        res.send()
    } catch (e) {
       

        if (e.message === 'unknown-id') {
            res.status(404).send()

        } else {
            res.status(500).send()
        }
    }
}


//Obtener una lista de incidencias a través del ID

const getIncidencia = async (req, res) => {
  const { id_incidencia } = req.params

  try {
      const incidencia = await db.getIncidencia(id_incidencia)
      res.send(incidencia)
  } catch (e) {
      res.status(500).send()
  }
} 

//Obtener lista de incidencias filtrando por fecha y estado

  const getListIncidencia = async (req, res) => {
  const { estado, fecha_creacion } = req.query;
  try {
      let incidencia = await db.getListCoworking(estado, fecha_creacion)
      res.send(incidencia)
  } catch (e) {
      res.status(500).send()
  }
}

  module.exports = {
    createIncidencia,
    getIncidencia,
    getListIncidencia,
    updateIncidencia,
    deleteIncidencia
  } 