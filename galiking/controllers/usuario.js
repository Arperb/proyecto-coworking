const db = require('../db/mysql')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const {sendConfirmationMail} = require('../utils/utils')

const { usuarioValidator } = require('../validators/usuario')


const createUsuario = async (req, res) => {

   
    
    try {
        const { nif_cif, email, telefono, bio, foto, nombre, administrador, contrasena } = req.body
        const response  = await db.getUsuario(nif_cif)

        console.log(response)
        if(response.length > 0) {
            return res.send({
                ok: false,
                message: 'el usuario ya existe'

            })
        }
        await usuarioValidator.validateAsync(req.body)

        
        
        const contrasenaBcrypt = await bcrypt.hash(contrasena, 10);
        const validationCode = randomstring.generate(40);
        

        await db.createUsuario(nif_cif, email, telefono, bio, foto, nombre, administrador, contrasenaBcrypt, validationCode)

        try {
            
            sendConfirmationMail(email, `http://${process.env.PUBLIC_DOMAIN}/usuario/validate/${validationCode}`)
        } catch(e) {
            console.log(e)
        }
        return res.status(200).send({
            status: 'ok',
            message: 'usuario registrado'})
        

    } catch (e) {
        console.log(e)
        res.send({
            status: 'false',
            message: 'el usuario ya existe'
        })
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

    //try {
    const usuario = await db.getUsuario(email)

    if(!usuario) {
        res.status(401).send()
        return
    }

    const validContrasena = await bcrypt.compare(contrasena, usuario.contrasena);
        
    if(!validContrasena) {
        res.status(401).send()
        return
    }
    const tokenPayload = {
        isAdmin: usuario.administrador === 'si',
        email: usuario.email

    }
    const token = jwt.sign(tokenPayload, process.env.SECRET, {
        expiresIn: '1d'
    });

    res.json({
        token
    })
}


    // return res.status(200).send({
    //     ok: true,
    //     message: 'login correcto',
    //     administrador: usuario.administrador,
    //     email: usuario.email,
    //     token: token

    // });

//     }catch(error){
//         console.log(error)
//         res.status(500).send({
//             ok: false,
//             message: "error servidor"
//         })
//     }
// }




const getUsuario = async (req, res) => {

     const { id_usuario } = req.params

     try {
         const usuario = await db.getUsuario(id_usuario)
         res.send(usuario)
     } catch (e) {
         res.status(500).send()
     }
 }

const getListOfUsuario = async (req, res) => {
    // localhost:3000/events?type=music
    // localhost:3000/events
    // localhost:3000/events?name=xxxx&type=music
    const { nombre, telefono } = req.query;
    try {
        let usuario = await db.listUsuario(nombre, telefono)
        res.send(usuario)
    } catch (e) {
        res.status(500).send()
    }
}


const updateUsuario = async (req, res) => {
    const {nif_cif, email, telefono, bio, foto, nombre, administrador, contrasena} = req.body
    const { id_usuario } = req.params

    // TODO: considerar el caso en el que el ID pasado no existe
    // y enviar un 404
    try {
        await usuarioValidator.validateAsync(req.body)

        await db.updateUsuario(id_usuario, nif_cif, email, telefono, bio, foto, nombre, administrador, contrasena)

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
        const usuario = await db.getUsuario(id_usuario)

        // Si nos piden eliminar un ID que no existe
        // tenemos que informar a quién hizo la llamada y lo
        // hacemos a través del statusCode, que será 404
        // En caso contrario, el programador que programa contra la API
        // podría pensar que efectivamente se hizo un DELETE cuando 
        // en realidad no es así
        if (!usuario.length) {
            res.status(404).send()
            return
        } 

        await db.deleteUsuario(id_usuario)

        res.send()
    } catch (e) {
       

        if (e.message === 'unknown-id') {
            res.status(404).send()

        } else {
            res.status(500).send()
        }
    }
}




module.exports = {
    createUsuario,
    validate,
    login,
    //resetContrasena,
    //recoverContrasena,
    getUsuario,
    getListOfUsuario,
    updateUsuario,
    deleteUsuario
    
}