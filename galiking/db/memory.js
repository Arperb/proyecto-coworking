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


let coworking = [];

const createCoworking = (fecha_creacion, fecha_modificacion, nombre, telefono, direccion, ciudad, provincia, descripcion, servicios, web) =>
 {
    coworking.push({
        fecha_creacion,
        fecha_modificacion,
        nombre,
        telefono,
        direccion,
        ciudad,
        provincia,
        descripcion,
        servicios,
        web
    })
}

const listCoworking = (telefono, nombre) => {
    const filterByNombre = coworking => coworking.nombre.toLowerCase().indexOf(nombre.toLowerCase()) !== -1
    const filterByTelefono = coworking => coworking.telefono === telefono

    let filteredCoworking = [...coworking]

    if (telefono !== undefined) {
        filteredCoworking = filteredCoworking.filter( filterByTelefono )
    }

    if (nombre !== undefined) {
        filteredCoworking = filteredCoworking.filter( filterByNombre )
    }

    return filteredCoworking
}

module.exports = {
    createCoworking,
    listCoworking
}


let fotoCoworking = [];

const createFotoCoworking = (fecha_creacion, fecha_modificacion, foto) => {
    fotoCoworking.push({
        fecha_creacion,
        fecha_modificacion,
        foto

    })
}

module.exports = {
    createFotoCoworking,
}

let reserva = [];

const createReserva = (fecha_creacion, fecha_modificacion, valoracion, estado, ) => {
    reserva.push({
        fecha_creacion,
        fecha_modificacion,
        valoracion,
        estado, 
        fecha_inicio,
        fecha_fin
    })
}

const listReserva = (valoracion, estado) => {
    const filterByValoracion = reserva => reserva.valoracion.toLowerCase().indexOf(valoracion.toLowerCase()) !== -1
    const filterByEstado = reserva => reserva.estado === estado

    let filteredReserva = [...reserva]

    if (valoracion !== undefined) {
        filteredReserva = filteredReserva.filter( filterByValoracion )
    }

    if (estado !== undefined) {
        filteredReserva = filteredReserva.filter( filterByEstado )
    }

    return filteredReserva
}

module.exports = {
    createReserva,
    listReserva
}

let incidencia = [];

const createIncidencia = (fecha_creacion, fecha_modificacion, estado, descripcion ) => {
    reserva.push({
        fecha_creacion,
        fecha_modificacion,
        estado,
        descripcion
    })
}

const listIncidencia = (estado, descripcion) => {
    const filterByEstado = incidencia => incidencia.estado.toLowerCase().indexOf(estado.toLowerCase()) !== -1
    const filterByDescripcion = descripcion => incidencia.descripcion === descripcion

    let filteredIncidencia = [...incidencia]

    if (estado !== undefined) {
        filteredIncidencia = filteredIncidencia.filter( filterByEstado )
    }

    if (descripcion !== undefined) {
        filteredIncidencia = filteredIncidencia.filter( filterByDescripcion )
    }

    return filteredIncidencia
}

module.exports = {
    createIncidencia,
    listIncidencia
}