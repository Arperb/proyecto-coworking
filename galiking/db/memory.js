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

const createCoworking = (fecha_creacion, fecha_modificacion, nombre, telefono, direccion, ciudad, provincia, descripcion, web, servicios,
    equipacion, puesto_trabajo, puesto_trabajo_capacidad, puesto_trabajo_tarifa, puesto_trabajo_tarifa_tipo, 
    puesto_multiple, puesto_multiple_capacidad, puesto_multiple_tarifa, puesto_multiple_tarifa_tipo, 
    despacho, despacho_capacidad, despacho_tarifa, despacho_tarifa_tipo, sala_reuniones, sala_reuniones_capacidad, 
    sala_reuniones_tarifa, sala_reuniones_tarifa_tipo, salon_eventos, salon_eventos_capacidad, salon_eventos_tarifa, 
    salon_eventos_tarifa_tipo) => {
    coworking.push({
        fecha_creacion,
        fecha_modificacion,
        nombre,
        telefono,
        direccion,
        ciudad,
        provincia,
        descripcion,
        web,
        servicios,
        equipacion,
        puesto_trabajo,
        puesto_trabajo_capacidad,
        puesto_trabajo_tarifa,
        puesto_trabajo_tarifa_tipo, 
        puesto_multiple,
        puesto_multiple_capacidad,
        puesto_multiple_tarifa,
        puesto_multiple_tarifa_tipo, 
        despacho,
        despacho_capacidad,
        despacho_tarifa,
        despacho_tarifa_tipo,
        sala_reuniones,
        sala_reuniones_capacidad, 
        sala_reuniones_tarifa,
        sala_reuniones_tarifa_tipo,
        salon_eventos,
        salon_eventos_capacidad,
        salon_eventos_tarifa, 
        salon_eventos_tarifa_tipo
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