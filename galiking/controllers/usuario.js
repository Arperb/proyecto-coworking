const db = require('../db/mysql')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const uuid = require('uuid');
const fsPromises = require('fs').promises
const sharp = require('sharp');
const { sendConfirmationMail, forgotPasswordMail } = require('../utils/utils')



const { usuarioValidator, passValidator, newPassValidator, emailValidator } = require('../validators/usuario');
const { getConnection } = require('../db/db');




const createUsuario = async (req, res) => {

    try {

        await usuarioValidator.validateAsync(req.body)

        const { nif_cif, email, telefono, bio, foto, nombre, rol, contrasena } = req.body
        const contrasenaBcrypt = await bcrypt.hash(contrasena, 10);
        const validationCode = randomstring.generate(40);

        await db.createUsuario(nif_cif, email, telefono, bio, foto, nombre, rol, contrasenaBcrypt, validationCode)
     
        sendConfirmationMail(email, `http://${process.env.PUBLIC_DOMAIN}/usuario/validate/${validationCode}`)

    } catch (e) {
    
        res.status(400).send("error de registro")
        return
    }

    res.send("usuario registrado con éxito")
}

const uploadFotoUsuario = async (req, res) => {

    const { id_usuario } = req.auth;

    //     //recibimos los ficheros(si no existe la carpeta la crea)
    await fsPromises.mkdir(`${process.env.TARGET_FOLDER}/profile`, { recursive: true })

    try {
        
        //les damos un identificador único
        const fileID = uuid.v4()
        // los guardamos en la carpeta que nos interesa
        const outputFileName = `${process.env.TARGET_FOLDER}/profile/${fileID}.jpg`
        
        //const image = sharp(req.files.foto.data)
        // const imageInfo = await image.metadata()
        // if (imageInfo.width>1000) {
        //     image.resize(720, 796)
        // }
        // console.log(image.width)
        await fsPromises.writeFile(outputFileName, req.files.foto.data)

        //         //guardar una referencia a este uuid en la base de datos
        //         //para que luego el front llame al get para que le de el uuid
        try {
            await db.uploadFotoUsuario(fileID, id_usuario)


        } catch (e) {
            console.log(e)
            res.status(400).send("error uuid")
            return
        }

        res.send()

    } catch (e) {
        console.log('Error: ', e)
        res.status(500).send
    }
}

const getFotoUsuario = async (req, res) => {

     const { foto } = req.params

     //comprobar si la imagen existe
     //const path = `/home/hack21/proyecto-coworking/galiking/images/profile/${foto}.png`
     const path = `${__dirname}/process.env.TARGET_FOLDER/profile/${foto}.jpg`
     console.log(path)
   
     try {
         await fsPromises.stat(path)
         //aquí devolvemos el fichero
         res.sendFile(path)
     } catch (e) {

         console.log(e)
         res.status(404).send('el fichero no existe')
     }

 }

const validate = async (req, res) => {

    const { code } = req.params;

    try {
        db.checkValidationCode(code)
        res.send('Validado correctamente')
        
    } catch(e) {
        res.status(401).send('Usuario no validado')
    }

}

const login = async (req, res) => {

    const { email, contrasena } = req.body

    //comprobar que el usuario está en la base de datos
    
        const usuario = await db.getUsuarioEmail(email)

        if (!usuario) {
            res.status(401).send('este usuario no existe')
            return
            
        }

        const validContrasena = await bcrypt.compare(contrasena, usuario.contrasena);

        if (!validContrasena) {
            res.status(401).send('la contraseña no es valida')
            return
        }

        const tokenPayload = {
            isAdmin: usuario.rol === 'administrador' ,
            rol: usuario.rol ,
            email: usuario.email,
            id_usuario: usuario.id_usuario,
        };
       

        const token = jwt.sign(tokenPayload, process.env.SECRET, {
            expiresIn: '1d'
        });


        res.json({
                token,
                usuario,
            })
            console.log(token)
        };

     

    

const updateContrasena = async (req, res) => {

   
     const { contrasena, newContrasena, newContrasenaRepeat } = req.body
     const decodedToken = req.auth

   
     if (newContrasena !== newContrasenaRepeat) {
         res.status(400).send('Los datos introducidos son incorrectos')
         return
       
     }

      try {
          await passValidator.validateAsync(req.body)
               
      } catch(e) {
      
          res.status(400).send('Validacion erronea')
        
          return
      }
    
     const usuario = await db.getUsuarioEmail(decodedToken.email)
     const validContrasena = await bcrypt.compare(contrasena, usuario.contrasena);

  
     if (!validContrasena) {
         res.status(401).send()
         return
     }

     const contrasenaBcrypt = await bcrypt.hash(newContrasena, 10);

     await db.updateContrasena(usuario.id_usuario, contrasenaBcrypt)

     res.send()
 }

const recoverContrasena = async (req, res) => {

    //comprobamos la sintaxis del email

    const { email } = req.body
    

    try {
        await emailValidator.validateAsync(req.body)
    } catch (e) {
        console.log(e)
        res.status(400).send('Email incorrecto')
        return
    }

    // Comprobar si el usuario existe en la BBDD

    const usuario = await db.getUsuarioEmail(email)

    if (usuario && usuario.validado) {
        const validationCode = randomstring.generate(40);
        await db.updateValidationCode(email, validationCode)
        forgotPasswordMail(email, `http://${process.env.PUBLIC_DOMAIN}/usuario/contrasena/reset/${validationCode}`)
    } else {
        res.status(400).send('Email no existe')
        return
    }

    res.send('Se ha enviado un correo al email indicado para recuperar la contraseña')
}

const contrasenaUpdateCode = async (req, res) => {

    const { code } = req.params;
   
    try {
        const usuario = await db.checkValidationCode(code)

        if (usuario) {
            // go to redireccion a otro endpoint con el user.id en 
            // req.params, donde se introducirá la contraseña dos veces
        }
        res.send()
    } catch (e) {
        res.status(401).send('Usuario no validado')
    }
}


const resetContrasena = async (req, res) => {

    const { code } = req.params
    const { newContrasena, newContrasenaRepeat } = req.body
  
    try {
        await newPassValidator.validateAsync(req.body)
    } catch (e) {
        res.status(400).send('Los datos introducidos son incorrectos')
        return
    }
   
    const usuario = await db.getUsuarioByCode(code)
 
    // Ciframos la nueva password
    const contrasenaBcrypt = await bcrypt.hash(newContrasena, 10);
 
    // Actualizar vieja password con la nueva cifrada
 
    await db.updateContrasena(usuario.id_usuario, contrasenaBcrypt)
 
    res.send('Contraseña actualizada correctamente')
}

const getUsuarioId = async (req, res) => {

    const { id_usuario } = req.params

    try {
        const usuario = await db.getUsuarioId(id_usuario)


        if (!usuario) {
            res.status(404).send()
            
        } else {
            res.send(usuario)
         
        }
    } catch (e) {
        res.status(500).send()
    }
}

//  const getUsuarioEmail = async (req, res) => {

//      const { email } = req.params
//      console.log(req.params)
   

//      try {
         
//          const usuario = await db.getUsuarioEmail(email)
       
//          if (!usuario) {
//              res.status(404).send()
            
//          } else {
//              res.send()
//          }
//      } catch (e) {
//          res.status(500).send()
//      }
//  }


const getListOfUsuario = async (req, res) => {
 
    const { nombre, telefono } = req.query;
    try {
        let usuario = await db.listUsuario(nombre, telefono)
        res.send(usuario)
    } catch (e) {
        res.status(500).send()
    }
}

const updateUsuario = async (req, res) => {
    const { nif_cif, email, telefono, bio, foto, nombre, rol, contrasena } = req.body
    const { id_usuario } = req.auth

    // TODO: considerar el caso en el que el ID pasado no existe
    // y enviar un 404
    try {
        await usuarioValidator.validateAsync(req.body)

        await db.updateUsuario(nif_cif, email, telefono, bio, foto, nombre, rol, contrasena, id_usuario)

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

const deleteUsuario = async (req, res) => {
    const { id_usuario } = req.params;

    try {
        // Para considerar el caso de que no existe el ID que nos 
        // pasamos podemos resolverlo aquí haciendo una petición
        // específica a la BBDD o bien resolverlo en el módulo de
        // BBDD leyendo la respuesta de la consulta (affectedRows)

        const usuario = await db.getUsuarioId(id_usuario)

        // Si nos piden eliminar un ID que no existe
        // tenemos que informar a quién hizo la llamada y lo
        // hacemos a través del statusCode, que será 404
        // En caso contrario, el programador que programa contra la API
        // podría pensar que efectivamente se hizo un DELETE cuando 
        // en realidad no es así
        if (!usuario) {
            res.status(404).send()
            return
        }

        await db.deleteUsuario(id_usuario)

        res.send("usuario eliminado con éxito")
    } catch (e) {
        console.log(e)
        if (e.message === 'unknown-id') {
            res.status(404).send('este ID no existe')

        } else {
            res.status(500).send('Este usuario no se puede borrar porque está asociado a un coworking')
        }
    }
}

const logout = async (req, res, next) => {
        
     try {
         const decodedToken = {}

         req.auth = decodedToken;
    } catch (e) {
         res.status(401).send()
         return
     }

     res.send('sesión finalizada correctamente')
 }

 const getUsuarioReserva = async (req, res) => {

    const { id_usuario } = req.params


    try {
        const usuarioReserva = await db.getUsuarioReserva(id_usuario)
       
       
        if (!usuarioReserva) {
            res.status(404).send()
            
        } else {
            res.send(usuarioReserva)
        }
    } catch (e) {
        console.log(e)
        res.status(500).send('No tienes reservas creadas')
    }
}

const getUsuarioIncidencia = async (req, res) => {

    const { id_usuario } = req.params

    try {
        const usuarioIncidencia = await db.getUsuarioIncidencia(id_usuario)
       
        if (!usuarioIncidencia) {
            res.status(404).send()
            
        } else {
            res.send(usuarioIncidencia)
        }
    } catch (e) {
        console.log(e)
        res.status(500).send('No tienes incidencias registradas')
    }
}

const getUsuarioRating = async (req, res) => {

    const { id_usuario } = req.params

    try {
        const usuarioRating = await db.getUsuarioRating(id_usuario)
       
        if (!usuarioRating) {
            res.status(404).send()
            
        } else {
            res.send(usuarioRating)
        }
    } catch (e) {
        console.log(e)
        res.status(500).send('No tienes valoraciones registradas')
    }
}

const getUsuarioCoworking = async (req, res) => {

    const { id_usuario } = req.params


    try {
        const usuarioCoworking = await db.getUsuarioCoworking(id_usuario)
       
       
        if (!usuarioCoworking) {
            res.status(404).send()
            
        } else {
            res.send(usuarioCoworking)
        }
    } catch (e) {
        console.log(e)
        res.status(500).send('No hay ningún coworking registrado')
    }
}

module.exports = {
    createUsuario,
    uploadFotoUsuario,
    getFotoUsuario,
    validate,
    login,
    updateContrasena,
    recoverContrasena,
    contrasenaUpdateCode,
    resetContrasena,
    getListOfUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuarioId,
    logout,
    getUsuarioReserva,
    getUsuarioIncidencia,
    getUsuarioRating,
    getUsuarioCoworking
} 
