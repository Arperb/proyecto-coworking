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


const createUsuario = async (nif_cif, email, telefono, bio, foto, nombre, rol, contrasena, validationCode) => {
    let connection;
 

    try {
        connection = await getConnection();

       let SQL = await connection.query(`
            INSERT INTO usuario (nif_cif, email, telefono, bio, foto, nombre, rol, contrasena, validationCode)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
            [nif_cif, email, telefono, bio, foto, nombre, rol, contrasena, validationCode])

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

const getUsuario = async (id_usuario) => {
    let connection;

    try {
        connection = await getConnection();

        // me quedo con el primer elemento (array destructuring)
        const [result] = await connection.query(`
            select * from usuario where id_usuario = ?
        `,
            [id_usuario])

        return result  // potential bug because connection is not released
    } catch (e) {
        throw new Error('database-error')

    } finally {
        if (connection) {
            connection.release()
        }
    }
}


const updateUsuario = async (id_usuario, nif_cif, email, telefono, bio, foto, nombre, rol, contrasena) => {
    let connection;
    

    try {
        connection = await getConnection();

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


const checkValidationCode = async (code) => {
     // comprobar si existe un usuario que esté pendiente de validación
     const query = (`select * from usuario where validationCode = ?`)

     const params = [code]
    
     const [result] = await performQuery(query, params)
   

     // si existe un usuario con ese código de validación
     // lo marcamos como activo
   
     if (result) {
         const query = (`update usuario set validado = true, validationCode =''`)
         
         await performQuery(query, [])
    } else {
         throw new Error('validation-error')
    }

 }

 //////////////////////////////////////////////////
//////           ESPACIO COWORKING           /////
//////////////////////////////////////////////////


 const createEspacio_coworking = async (id_usuario, nombre, telefono, localizacion, descripcion, web) => {
    let connection;
 

    try {
        connection = await getConnection();

       let SQL = await connection.query(`
            INSERT INTO espacio_coworking (id_usuario, nombre, telefono, localizacion, descripcion, web)
            VALUES (?, ?, ?, ?, ?, ?)
        `,
            [id_usuario, nombre, telefono, localizacion, descripcion, web])

    } catch (e) {
        console.log(e)
        throw new Error('database-error')

    } finally {
        if (connection) {
            connection.release()
        }
    }
}

const getEspacio_coworking = async (id_coworking) => {
    let connection;

    try {
        connection = await getConnection();

        // me quedo con el primer elemento (array destructuring)
        const [result] = await connection.query(`
            select * from espacio_coworking where id_coworking = ?
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

const updateEspacio_coworking = async (id_usuario, nombre, telefono, localizacion, descripcion, web) => {
    let connection;
    

    try {
        connection = await getConnection();

        await connection.query(`
            update espacio_coworking SET id_usuario=?, nombre=?, telefono=?, localizacion=?, descripcion=?, web=?
            where id_coworking=? 
        `,
            [nombre, telefono, localizacion, descripcion, web, id_usuario])
    } catch (e) {
        console.log(e)
        throw new Error('database-error')

    } finally {
        if (connection) {
            connection.release()
        }
    }
}

const checkEspacio_coworking = async (web, id_usuario) => {
    let connection;

    try {
        connection = await getConnection();

        // me quedo con el primer elemento (array destructuring)
        const [result] = await connection.query(`
            select 1 from espacio_coworking where web = ? and id_usuario=?
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

const deleteEspacio_coworking = async (id_coworking) => {
    let connection;

    try {
        connection = await getConnection();

        // me quedo con el primer elemento (array destructuring)
        const [result] = await connection.query(`
            delete from espacio_coworking where id_coworking = ?
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
    createEspacio_coworking,
    getUsuario,
    getEspacio_coworking,
    listUsuario,
    updateUsuario,
    updateEspacio_coworking,
    deleteUsuario,
    deleteEspacio_coworking,
    checkValidationCode,
    checkEspacio_coworking
}