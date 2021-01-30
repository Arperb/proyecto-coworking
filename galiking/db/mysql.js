const { send } = require('@sendgrid/mail');
const moment = require('moment')

const { getConnection } = require("./db");

const performQuery = async (query, params) => {
     let connection;

    try {
         connection = await getConnection();

        const [result] = await connection.query(query, params)

        return result;
     } catch (e) {
         throw new Error('database-error')
     } finally {
        if (connection) {
             connection.release()
         }
     }
 }


const createUsuario = async (nif_cif, email, telefono, bio, foto, uuid, nombre, rol, contrasena, validationCode) => {
    let connection;
 

    try {
        connection = await getConnection();

       let SQL = await connection.query(`
            INSERT INTO usuario (nif_cif, email, telefono, bio, foto, uuid, nombre, rol, contrasena, validationCode)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
            [nif_cif, email, telefono, bio, foto, uuid, nombre, rol, contrasena, validationCode])

    } catch (e) {
        console.log(e)
        throw new Error('database-error')

    } finally {
        if (connection) {
            connection.release()
        }
    }
}

const createFotoUsuario = async (id_usuario, uuid) => {
    let connection;
    

    try {
        connection = await getConnection();

        await connection.query(`
            INSERT INTO usuario (uuid)
            VALUES (?) 
        `,
            [uuid])
    } catch (e) {
        console.log(e)
        throw new Error('database-error')

    } finally {
        if (connection) {
            connection.release()
        }
    }
}


const listUsuario = async (nombre, telefono) => {
   
    let connection;

    try {
        connection = await getConnection();
        let result;

        if (telefono && nombre) {
            result = await connection.query(`
                select id_usuario, telefono, nombre from usuario where telefono = ? and nombre = ?
                `, [telefono, nombre])
        } else if (!telefono && nombre) {
            result = await connection.query(`
            select id_usuario, telefono, nombre from usuario where nombre = ?
            `, [nombre])
        } else if (telefono && !nombre) {
            result = await connection.query(`
            select id_usuario, telefono, nombre from usuario where telefono = ?
            `, [telefono])
        } else {
            result = await connection.query(`
            select id_usuario, telefono, nombre from usuario
            `)
        }
        
        return result[0]  // potential bug because connection is not released
    } catch (e) {
        throw new Error('database-error')

    } finally {
        if (connection) {
            connection.release()
        }
    }

}

const getUsuarioEmail = async (email) => {
    
    const query = `select * from usuario where email = ?`
    const params = [email]
    const [result] = await performQuery(query, params)
    return result
}

const getUsuarioId = async (id_usuario) => {
    
    const query = `select * from usuario where id_usuario = ?`
    const params = [id_usuario]
    const [result] = await performQuery(query, params)
    return result
}


const updateUsuario = async (nif_cif, email, telefono, bio, foto, nombre, rol, contrasena, id_usuario) => {
    let connection;
    

    try {
        connection = await getConnection();
console.log(nif_cif)
        await connection.query(`
            update usuario SET nif_cif=?, email=?, telefono=?, bio=?, foto=?, nombre=?, rol=?, contrasena=?
            where id_usuario=? 
        `,
            [nif_cif, email, telefono, bio, foto, nombre, rol, contrasena, id_usuario])
    } catch (e) {
        console.log(e)
        throw new Error('database-error')

    } finally {
        if (connection) {
            connection.release()
        }
    }
}


const deleteUsuario = async (id_usuario) => {
    let connection;
    try {
        connection = await getConnection();

        // me quedo con el primer elemento (array destructuring)
        const [result] = await connection.query(`
            delete from usuario where id_usuario = ?
        `,
            [id_usuario])

        return result  // potential bug because connection is not released
    } catch (e) {
        console.log(e)
        throw new Error('database-error')

    } finally {
        if (connection) {
            connection.release()
        }
    }
}


const checkValidationCode = async (validationCode) => {
     // comprobar si existe un usuario que esté pendiente de validación
     
     const query = `select * from usuario where validationCode = ?`
    const params = [validationCode]

    const [result] = await performQuery(query, params)

    // si existe un usuario con ese código de validación
    // lo marcamos como activo
    if (result) {
        const query = `update usuario set validado = 1, validationCode = ''`
        await performQuery(query, [])
    } else {
        throw new Error('validation-error')
    }

}




 const updateValidationCode = async (email, validationCode) => {
    const query = `update usuario SET validationCode = ?, expirationCodeDate = addtime(now(), '0 2:0:0') where email=?`
    const params = [validationCode, email]

    await performQuery(query, params)
}

 const updateContrasena = async (id_usuario, contrasena) => {
    
    const query = `update usuario SET contrasena=?, validationCode='' where id_usuario=?`
    const params = [contrasena, id_usuario]

    await performQuery(query, params)

 }

 const uploadFotoUsuario = async (uuid, id_usuario) => {
    const query = `UPDATE usuario SET uuid=? where id_usuario=?`
    const params = [uuid, id_usuario]

    await performQuery(query, params)
}
    

    
      

 //////////////////////////////////////////////////
//////           ESPACIO COWORKING           /////
//////////////////////////////////////////////////


 const createCoworking = async (id_usuario, nombre, telefono, direccion, ciudad, provincia, descripcion, web, servicios,
    equipacion, puesto_trabajo, puesto_trabajo_capacidad, puesto_trabajo_tarifa, puesto_trabajo_tarifa_tipo, 
    puesto_multiple, puesto_multiple_capacidad, puesto_multiple_tarifa, puesto_multiple_tarifa_tipo, 
    despacho, despacho_capacidad, despacho_tarifa, despacho_tarifa_tipo, sala_reuniones, sala_reuniones_capacidad, 
    sala_reuniones_tarifa, sala_reuniones_tarifa_tipo, salon_eventos, salon_eventos_capacidad, salon_eventos_tarifa, 
    salon_eventos_tarifa_tipo) => {
    let connection;
 

    try {
        connection = await getConnection();

       let SQL = await connection.query(`
            INSERT INTO coworking (id_usuario, nombre, telefono, direccion, ciudad, provincia, descripcion, web, servicios,
                equipacion, puesto_trabajo, puesto_trabajo_capacidad, puesto_trabajo_tarifa, puesto_trabajo_tarifa_tipo, 
                puesto_multiple, puesto_multiple_capacidad, puesto_multiple_tarifa, puesto_multiple_tarifa_tipo, 
                despacho, despacho_capacidad, despacho_tarifa, despacho_tarifa_tipo, sala_reuniones, sala_reuniones_capacidad, 
                sala_reuniones_tarifa, sala_reuniones_tarifa_tipo, salon_eventos, salon_eventos_capacidad, salon_eventos_tarifa, 
                salon_eventos_tarifa_tipo)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
            [id_usuario, nombre, telefono, direccion, ciudad, provincia, descripcion, web, servicios,
                equipacion, puesto_trabajo, puesto_trabajo_capacidad, puesto_trabajo_tarifa, puesto_trabajo_tarifa_tipo, 
                puesto_multiple, puesto_multiple_capacidad, puesto_multiple_tarifa, puesto_multiple_tarifa_tipo, 
                despacho, despacho_capacidad, despacho_tarifa, despacho_tarifa_tipo, sala_reuniones, sala_reuniones_capacidad, 
                sala_reuniones_tarifa, sala_reuniones_tarifa_tipo, salon_eventos, salon_eventos_capacidad, salon_eventos_tarifa, 
                salon_eventos_tarifa_tipo])

    } catch (e) {
        console.log(e)
        throw new Error('database-error')

    } finally {
        if (connection) {
            connection.release()
        }
    }
}

const getCoworking = async (id_coworking) => {
    let connection;

    try {
        connection = await getConnection();

        // me quedo con el primer elemento (array destructuring)
        const [result] = await connection.query(`
            select * from coworking where id_coworking = ?
        `,
            [id_coworking])

        return result  // potential bug because connection is not released
    } catch (e) {
        throw new Error('database-error')

    } finally {
        if (connection) {
            connection.release()
        }
    }
}


const getListCoworking = async (nombre, telefono) => {
   
    let connection;

    try {
        connection = await getConnection();
        let result;

        if (telefono && nombre) {
            result = await connection.query(`
                select id_coworking, telefono, nombre from coworking where telefono = ? and nombre = ?
                `, [telefono, nombre])
        } else if (!telefono && nombre) {
            result = await connection.query(`
            select id_coworking, telefono, nombre from coworking where nombre = ?
            `, [nombre])
        } else if (telefono && !nombre) {
            result = await connection.query(`
            select id_coworking, telefono, nombre from coworking where telefono = ?
            `, [telefono])
        } else {
            result = await connection.query(`
            select id_coworking, telefono, nombre from coworking
            `)
        }
        
        return result[0]  // potential bug because connection is not released
    } catch (e) {
        throw new Error('database-error')

    } finally {
        if (connection) {
            connection.release()
        }
    }

}

const updateCoworking = async (id_usuario, nombre, telefono, direccion, ciudad, provincia, descripcion, web, servicios,
    equipacion, puesto_trabajo, puesto_trabajo_capacidad, puesto_trabajo_tarifa, puesto_trabajo_tarifa_tipo, 
    puesto_multiple, puesto_multiple_capacidad, puesto_multiple_tarifa, puesto_multiple_tarifa_tipo, 
    despacho, despacho_capacidad, despacho_tarifa, despacho_tarifa_tipo, sala_reuniones, sala_reuniones_capacidad, 
    sala_reuniones_tarifa, sala_reuniones_tarifa_tipo, salon_eventos, salon_eventos_capacidad, salon_eventos_tarifa, 
    salon_eventos_tarifa_tipo, id_coworking) => {
    let connection;
    
    try {
        connection = await getConnection();
console.log(id_usuario)
       let SQL = await connection.query(`
            update coworking SET id_usuario=?, nombre=?, telefono=?, direccion=?, ciudad=?, provincia=?, descripcion=?, web=?, servicios=?,
            equipacion=?, puesto_trabajo=?, puesto_trabajo_capacidad=?, puesto_trabajo_tarifa=?, puesto_trabajo_tarifa_tipo=?, 
            puesto_multiple=?, puesto_multiple_capacidad=?, puesto_multiple_tarifa=?, puesto_multiple_tarifa_tipo=?, 
            despacho=?, despacho_capacidad=?, despacho_tarifa=?, despacho_tarifa_tipo=?, sala_reuniones=?, sala_reuniones_capacidad=?, 
            sala_reuniones_tarifa=?, sala_reuniones_tarifa_tipo=?, salon_eventos=?, salon_eventos_capacidad=?, salon_eventos_tarifa=?, 
            salon_eventos_tarifa_tipo=?
            where id_coworking=?
        `,
            [id_usuario, nombre, telefono, direccion, ciudad, provincia, descripcion, web, servicios,
                equipacion, puesto_trabajo, puesto_trabajo_capacidad, puesto_trabajo_tarifa, puesto_trabajo_tarifa_tipo, 
                puesto_multiple, puesto_multiple_capacidad, puesto_multiple_tarifa, puesto_multiple_tarifa_tipo, 
                despacho, despacho_capacidad, despacho_tarifa, despacho_tarifa_tipo, sala_reuniones, sala_reuniones_capacidad, 
                sala_reuniones_tarifa, sala_reuniones_tarifa_tipo, salon_eventos, salon_eventos_capacidad, salon_eventos_tarifa, 
                salon_eventos_tarifa_tipo, id_coworking])
            

                
    } catch (e) {
        console.log(e)
        throw new Error('database-error')
        res.send(coworking)

    } finally {
        if (connection) {
            connection.release()
        }
    }
}


const checkCoworking = async (web, id_usuario) => {
    let connection;

    try {
        connection = await getConnection();

        // me quedo con el primer elemento (array destructuring)
        const [result] = await connection.query(`
            select * from coworking where web = ? and id_usuario=?
        `,
            [web, id_usuario])

        return result  // potential bug because connection is not released
    } catch (e) {
        throw new Error('database-error')

    } finally {
        if (connection) {
            connection.release()
        }
    }
}

const deleteCoworking = async (id_coworking) => {
    let connection;

    try {
        connection = await getConnection();

        // me quedo con el primer elemento (array destructuring)
        const [result] = await connection.query(`
            delete from coworking where id_coworking = ?
        `,
            [id_coworking])

        return result  // potential bug because connection is not released
    } catch (e) {
        console.log(e)
        throw new Error('database-error')

    } finally {
        if (connection) {
            connection.release()
        }
    }
}

module.exports = {
    createUsuario,
    createFotoUsuario,
    uploadFotoUsuario,
    createCoworking,
    getUsuarioEmail,
    getUsuarioId,
    getCoworking,
    listUsuario,
    getListCoworking,
    updateUsuario,
    updateContrasena,
    updateValidationCode,
    updateCoworking,
    deleteUsuario,
    deleteCoworking,
    checkValidationCode,
    checkCoworking
}