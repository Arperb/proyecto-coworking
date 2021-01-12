const db = require('../db/mysql')

const { usuarioValidator } = require('../validators/usuario')


const createUsuario = async (req, res) => {
    const {nif_cif, email, telefono, bio, foto, nombre, administrador, contraseña} = req.body

    try {
        await usuarioValidator.validateAsync(req.body)

        let existeUsuario = await db.getUsuario(nif_cif)

        console.log(existeUsuario.length)

        if (existeUsuario > 0) {
            return res.status(400).send({
                ok: 'false',
                message: 'el usuario ya existe'

            })

        }

        let response = await db.createUsuario(nif_cif, email, telefono, bio, foto, nombre, administrador, contraseña)
        console.log(response)

 
        return res.status(200).send({
            status: 'ok',
            message: 'usuario registrado'})
        

    } catch (e) {
        console.log(e.status)
        return res.status(400).send({
            ok: 'false',
            message: 'el usuario ya existe'
        })
    }

}

const getUsuario = async (req, res) => {
    // http://localhost:3000/908
    const { id } = req.params

    try {
        const usuario = await db.getUsuario(id)
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

module.exports = {
    createUsuario,
    getUsuario,
    getListOfUsuario,
    
}