let usuario = [];

const createUsuario = (fecha_creacion, fecha_modificacion, nif_cif, email, telefono, bio, foto, nombre, administrador, contraseña) => {
    usuario.push({
        fecha_creacion,
        fecha_modificacion,
        nif_cif,
        email,
        telefono,
        bio,
        foto,
        nombre,
        administrador,
        contraseña
    })
}

const listUsuario = () => {
    return usuario
}

module.exports = {
    createUsuario, 
    listUsuario
}