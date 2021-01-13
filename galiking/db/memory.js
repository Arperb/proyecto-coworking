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



const listUsuario = (telefono, nombre) => {
    const filterByNombre = usuario => usuario.nombre.toLowerCase().indexOf(nombre.toLowerCase()) !== -1
    const filterByTelefono = usuario => usuario.telefono === telefono

    let filteredUsuario = [...usuario]

    if (telefono !== undefined) {
        filteredUsuario = filteredUsuario.filter( filterByTelefono )
    }

    if (nombre !== undefined) {
        filteredUsuario = filteredUsuario.filter( filterByNombre )
    }

    return filteredUsuario
}


module.exports = {
    createUsuario, 
    listUsuario
}