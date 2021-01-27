let usuario = [];

const createUsuario = (fecha_creacion, fecha_modificacion, nif_cif, email, telefono, bio, foto, nombre, rol, contrasena) => {
    usuario.push({
        fecha_creacion,
        fecha_modificacion,
        nif_cif,
        email,
        telefono,
        bio,
        foto,
        nombre,
        rol,
        contrasena
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


let espacio_coworking = [];

const createEspacio_coworking = (fecha_creacion, fecha_modificacion, nombre, telefono, localizacion, descripcion, web) => {
    usuario.push({
        fecha_creacion,
        fecha_modificacion,
        nombre,
        telefono,
        localizacion,
        descripcion,
        web
    })
}

const listEspacio_coworking = (telefono, nombre) => {
    const filterByNombre = espacio_coworking => espacio_coworking.nombre.toLowerCase().indexOf(nombre.toLowerCase()) !== -1
    const filterByTelefono = espacio_coworking => espacio_coworking.telefono === telefono

    let filteredEspacio_coworking = [...espacio_coworking]

    if (telefono !== undefined) {
        filteredEspacio_coworking = filteredEspacio_coworking.filter( filterByTelefono )
    }

    if (nombre !== undefined) {
        filteredEspacio_coworking = filteredEspacio_coworking.filter( filterByNombre )
    }

    return filteredEspacio_coworking
}

module.exports = {
    createEspacio_coworking,
    listEspacio_coworking
}