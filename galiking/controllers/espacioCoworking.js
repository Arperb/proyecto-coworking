const db = require('../db/mysql')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const {sendConfirmationMail, sendConfirmationMailCoworking} = require('../utils/utils')

const { espacioCoworkingValidator } = require('../validators/espacioCoworking');
const { getConnection } = require('../db/db');



//creamos espacio coworking
const createEspacio_coworking = async (req, res) => {
    

  try {
      const { id_usuario, nombre, telefono, localizacion, descripcion, web } = req.body
      console.log(id_usuario)
      const response = await db.checkEspacio_coworking(web, id_usuario)

      console.log(response)
    //   if(response) {
    //       return res.send({
    //           ok: false,
    //           message: 'el coworking ya existe'

    //       })
    //  }

      await espacioCoworkingValidator.validateAsync(req.body)


      await db.createEspacio_coworking(id_usuario, nombre, telefono, localizacion, descripcion, web)
        let connection;
      try {
          const usuario = await db.getUsuario(id_usuario)
          const email = usuario[0]
       
          await sendConfirmationMailCoworking(email)
      } catch(e) {
          console.log(e)
      }
      return res.status(200).send({
          status: 'ok',
          message: 'enhorabuena,su espacio coworking ha sido registrado con éxito'})
      

  } catch (e) {
      console.log(e)
//       res.send({
//           status: 'false',
//           message: 'este espacio coworking ya existe'
//       })
  }

}

const validateEspacio_coworking = async (req, res) => {
   
  const { code } = req.params;

  try {
      db.checkValidationCode(code)
      res.send('espacio coworking validado correctamente')
  } catch(e) {
      res.status(401).send('espacio coworking no validado')
  }

}   


//cambio datos del espacio coworking
// const updateEspacio_coworking = async (req, res) => {
//   const { id_coworking, id_usuario, nombre, telefono, localizacion, descripcion, web } = req.body
//   const { id_coworking } = req.params

//   try {
//     await espacioCoworkingValidator.validateAsync(req.body)

//     await db.updateEspacio_coworking(id_coworking, id_usuario, nombre, telefono, localizacion, descripcion, web)

// } catch (e) {
    
//     let statusCode = 400;
//     // averiguar el tipo de error para enviar un código u otro
//     if (e.message === 'database-error') {
//         statusCode = 500
//     }

//     res.status(statusCode).send(e.message)
//     return
// }

// res.send()
// }

const updateEspacio_coworking = async (req, res) => {
    const {id_usuario, nombre, telefono, localizacion, descripcion, web} = req.body
    const { id_coworking } = req.params

    // TODO: considerar el caso en el que el ID pasado no existe
    // y enviar un 404
    try {
        await espacioCoworkingValidator.validateAsync(req.body)

        await db.updateEspacio_coworking(id_coworking, id_usuario, nombre, telefono, localizacion, descripcion, web)

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
    
    
  const deleteEspacio_coworking = async (req, res) => {
    const { id_coworking } = req.params;

    try {
        // Para considerar el caso de que no existe el ID que nos 
        // pasamos podemos resolverlo aquí haciendo una petición
        // específica a la BBDD o bien resolverlo en el módulo de
        // BBDD leyendo la respuesta de la consulta (affectedRows)
        const espacio_coworking = await db.getEspacio_coworking(id_coworking)

        // Si nos piden eliminar un ID que no existe
        // tenemos que informar a quién hizo la llamada y lo
        // hacemos a través del statusCode, que será 404
        // En caso contrario, el programador que programa contra la API
        // podría pensar que efectivamente se hizo un DELETE cuando 
        // en realidad no es así
        if (!espacio_coworking.length) {
            res.status(404).send()
            return
        } 

        await db.deleteEspacio_coworking(id_coworking)

        res.send()
    } catch (e) {
       

        if (e.message === 'unknown-id') {
            res.status(404).send()

        } else {
            res.status(500).send()
        }
    }
}


//Obtener una lista de los espacios coworking a través del ID

const getEspacio_coworking = async (req, res) => {
  const { id_coworking } = req.params

  try {
      const espacio_coworking = await db.getEspacio_coworking(id_coworking)
      res.send(espacio_coworking)
  } catch (e) {
      res.status(500).send()
  }
} 

//Obtener lista de espacios coworking filtrando por nombre y/o localización

  const getListEspacio_coworking = async (req, res) => {
  const { nombre, localizacion } = req.query;
  try {
      let usuario = await db.listUsuario(nombre, localizacion)
      res.send(espacio_coworking)
  } catch (e) {
      res.status(500).send()
  }
}

  module.exports = {
    createEspacio_coworking,
    getEspacio_coworking,
    getListEspacio_coworking,
    updateEspacio_coworking,
    deleteEspacio_coworking,
    validateEspacio_coworking
  } 