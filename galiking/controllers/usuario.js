const db = require('../db/mysql')

const { usuarioValidator } = require('../validators/usuario')


const createUsuario = async (req, res) => {
    const {nif_cif, email, telefono, bio, foto, nombre, administrador, contraseña} = req.body

    try {
        await usuarioValidator.validateAsync(req.body)


        let response = await db.createUsuario(nif_cif, email, telefono, bio, foto, nombre, administrador, contraseña)
        console.log(response)

 
        return res.status(200).send({
            status: 'ok',
            message: 'usuario registrado'})
        

    } catch (e) {
        console.log(e.status)
        return res.status(400).send({
            status: 'false',
            message: 'el usuario ya existe'
        })
    }

}

const getUsuario = async (req, res) => {
    // http://localhost:3000/908

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
    const { telefono, nombre } = req.body;
    try {
        let usuario = await db.listUsuario(telefono, nombre)
        res.send(usuario)
    } catch (e) {
        res.status(500).send()
    }
}


const updateUsuario = async (req, res) => {
    const {name, type, timestamp, place, description} = req.body
    const { id } = req.params

    // TODO: considerar el caso en el que el ID pasado no existe
    // y enviar un 404
    try {
        await eventValidator.validateAsync(req.body)

        await db.updateUsuario(id, name, type, timestamp, place, description)

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
    const { id } = req.params;

    try {
        // Para considerar el caso de que no existe el ID que nos 
        // pasamos podemos resolverlo aquí haciendo una petición
        // específica a la BBDD o bien resolverlo en el módulo de
        // BBDD leyendo la respuesta de la consulta (affectedRows)
        const event = await db.getUsuario(id)

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

        await db.deleteUsuario(id)

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
    getUsuario,
    getListOfUsuario,
    updateUsuario,
    deleteUsuario
    
}