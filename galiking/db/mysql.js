const moment = require('moment')

const { getConnection } = require("./db");

const createUsuario = async (nif_cif, email, telefono, bio, foto, nombre, administrador, contraseña) => {
    let connection;
 

    try {
        connection = await getConnection();

       let SQL = await connection.query(`
            INSERT INTO usuario (nif_cif, email, telefono, bio, foto, nombre, administrador, contraseña)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
            [nif_cif, email, telefono, bio, foto, nombre, administrador, contraseña])

    } catch (e) {
        
        throw new Error('database-error')

    } finally {
        if (connection) {
            connection.release()
        }
    }
}

const listUsuario = async (nombre, telefono) => {
    // sin filtros: select * from events

    // con filtros: 
    //    select  * from events where name=...

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
        console.log(result)
        return result  // potential bug because connection is not released
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


const updateUsuario = async (id_usuario, nif_cif, email, telefono, bio, foto, nombre, administrador, contraseña) => {
    let connection;
    

    try {
        connection = await getConnection();

        await connection.query(`
            update usuario SET nif_cif=?, email=?, telefono=?, bio=?, foto=?, nombre=?, administrador=?, contraseña=?
            where id_usuario=? 
        `,
            [nif_cif, email, telefono, bio, foto, nombre, administrador, contraseña, id_usuario])
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
module.exports = {
    createUsuario,
    getUsuario,
    listUsuario,
    updateUsuario,
    deleteUsuario
}