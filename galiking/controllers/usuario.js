const db = require('../db/mysql')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const uuid = require('uuid');
const fsPromises = require('fs').promises
const { sendConfirmationMail } = require('../utils/utils')



const { usuarioValidator, passValidator, newPassValidator } = require('../validators/usuario');
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
        console.log(e)
        res.status(400).send("error de registro")
        return
    }

    res.send("usuario registrado con éxito")
}

const createFotoUsuario = async (req, res) => {

    const { id_usuario } = req.params;

    //     //recibimos los ficheros(si no existe la carpeta la crea)
    await fsPromises.mkdir(`${process.env.TARGET_FOLDER}/profile`, { recursive: true })

    try {
        //         //les damos un identificador único
        const fileID = uuid.v4()
        //         //los guardamos en la carpeta que nos interesa
        const outputFileName = `${process.env.TARGET_FOLDER}/profile/${fileID}.png`

        //         console.log(outputFileName)

        await fsPromises.writeFile(outputFileName, req.files.image.data)

        //         //guardar una referencia a este uuid en la base de datos
        //         //para que luego el front llame al get para que le de el uuid
        try {
            await db.uploadFotoUsuario(outputFileName, id_usuario)


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

    const { uuid } = req.params

    //     //comprobar si la imagen existe
    const path = `${__dirname}/images/profile/${uuid}.png`
    try {
        const checkExists = await fsPromises.stat(path)
        //         //aquí devolvemos el fichero
        res.sendFile(path)
    } catch (e) {
        console.log('el fichero no existe')
        res.status(404).send()
    }

}


const validate = async (req, res) => {

    const { code } = req.params;

    try {
        db.checkValidationCode(code)
        res.send('Usuario validado correctamente')
    } catch (e) {
        //if(!db.checkValidationCode(code))
        res.status(401).send('Validación incorrecta de usuario')
    }

}

const login = async (req, res) => {

    const { email, contrasena } = req.body

    //comprobar que el usuario está en la base de datos
    try {
        const usuario = await db.getUsuario(email)
        console.log(usuario);

        if (!usuario) {
            res.status(401).send()
            return
        }

        const validContrasena = bcrypt.compare(contrasena, usuario.contrasena);

        if (!validContrasena) {
            res.status(401).send()
            return
        }

        const tokenPayload = {
            isAdmin: usuario.rol === 'administrador',
            rol: usuario.rol,
            email: usuario.email
        }

        const token = jwt.sign(tokenPayload, process.env.SECRET, {
            expiresIn: '1d'
        });


        res.json({
            status: "ok",
            data: {
                token,
            },
        });

        return res.status(200).send({
            ok: true,
            message: 'login correcto',
            rol: usuario.rol,
            email: usuario.email,
            token: token

        });

    } catch (error) {

        res.status(500).send({
            ok: false,
            message: "error servidor"
        })
    }
}

const updateContrasena = async (req, res) => {

    // Comprobar sintaxis de los parámetros (vieja password (1234) y la nueva password (123456))

    const { contrasena, newContrasena, newContrasenaRepeat } = req.body

    // Comprobar que la vieja es correcta

    const decodedToken = req.auth

    if (newContrasena !== newContrasenaRepeat) {
        res.status(400).send('Las contraseñas no coinciden')
        return
    }

    /* try {
        await passValidator.validateAsync(req.body)
    } catch(e) {
        console.log(e)
        res.status(400).send('Validacion erronea')
        return
    } */


    //comprobar la contraseña correspondiente
    //const decodedToken = jwt.verify(authorization, process.env.SECRET);

    const [usuario] = await db.getUsuarioEmail(decodedToken.email)
    console.log(req.auth);
    console.log(usuario)

    const validContrasena = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!validContrasena) {
        res.status(401).send()
        return

        //Ciframos la nueva password

        const contrasenaBcrypt = bcrypt.hash(newContrasena, 10);

        //actualizar la vieja contraseña con la nueva cifrada

        await db.updateContrasena(usuario.id_usuario, contrasenaBcrypt)

        res.send()
    }
}

const recoverContrasena = async (req, res) => {

    //comprobamos la sintaxis del email

    const { email } = req.body

    try {
        await usuarioValidator.validateAsync(req.body)
    } catch (e) {
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
        res.status(400).send('Email incorrecto')
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

    const { id_usuario } = req.params
    const { newContrasena, newContrasenaRepeat } = req.body

    try {
        await newPassValidator.validateAsync(req.body)
    } catch (e) {
        res.status(400).send('Los datos introducidos son incorrectos')
        return
    }

    const usuario = await db.getUsuarioId(id_usuario)
    // Ciframos la nueva password
    const passwordBcrypt = await bcrypt.hash(newContrasena, 10);
    // Actualizar vieja password con la nueva cifrada
    await db.updateContrasena(id_usuario, contrasenadBcrypt)
    forgotPasswordMail(usuario.email, `http://${process.env.PUBLIC_DOMAIN}/usuario/login`)

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


// const getUsuarioEmail = async (req, res) => {

//     const { email } = req.params
   

//     try {
//         const email = usuario [0]
//         const usuario = await db.getUsuarioEmail(email)

//         if (!usuario) {
//             res.status(404).send()
//         } else {
//             res.send(usuario)
//         }
//     } catch (e) {
//         res.status(500).send()
//     }
// }




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
    const { nif_cif, email, telefono, bio, foto, nombre, rol, contrasena } = req.body
    const { id_usuario } = req.params

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

// const addFotoUsuario = async (req, res) => {
//     const { id_usuario } = req.params


//     const decodedToken = req.auth
//     console.log(req.auth)
//     try {
//         const usuario = await db.getUsuarioId(id_usuario)

//         if (decodedToken.id_usuario !== usuario.id_usuario) {
//             res.status(400).send()
//             return
//         }

//         if (req.files) {
//             // si hiciese falta comprobar la extensión del fichero
//             // podríamos hacerlo aquí a partir de la información de req.files
//             // y enviar un error si no es el tipo que nos interesa (res.status(400).send())

//             await fsPromises.mkdir(`${process.env.TARGET_FOLDER}/profile`, { recursive: true })


//             const fileID = uuid.v4()
//             const outputFileName = `${process.env.TARGET_FOLDER}/profile/${fileID}.png`

//             await fsPromises.writeFile(req.files.image.name, req.files.image.data)
//             console.log(req.files)

//             // guardar una referencia a este UUID En la base de datos, de forma que
//             // cuando nos pidan la lista de nuestros recursos (productos, conciertos, etc) o 
//             // el detalle de uno de ellos, accedemos a la BBDD para leer los UUID, y después el
//             // front llamará al GET con el UUID correspondiente
//             await db.uploadFotoUsuario(outputFileName, id_usuario)
//         }

//     } catch (e) {
//         let statusCode = 400;
//         // averiguar el tipo de error para enviar un código u otro
//         if (e.message === 'database-error') {
//             statusCode = 500
//         }

//         res.status(statusCode).send(e.message)
//         return
//     }

//     res.send('Datos actualizados correctamente')
// }


module.exports = {
    createUsuario,
    createFotoUsuario,
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
    getUsuarioId
} 
