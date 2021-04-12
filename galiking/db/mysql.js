const { send } = require('@sendgrid/mail');
const moment = require('moment')
const { dateToDB } = require("../utils/utils");

const { getConnection } = require("./db");

const performQuery = async (query, params) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(query, params)

        return result;
    } catch (e) {
        console.log(e)
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

const uploadFotoUsuario = async (fileID, id_usuario) => {

    const query = `UPDATE usuario SET foto = ? where id_usuario = ?`
    const params = [fileID, id_usuario]

    await performQuery(query, params)
}

const getFotoUsuario = async (foto) => {

    const query = `select * from usuario where foto = ?`
    const params = [foto]
    const [result] = await performQuery(query, params)
    return result
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
    try {
        const query = `select * from usuario where validationCode = ?`
        const params = [code]

        const result = await performQuery(query, params)

        // si existe un usuario con ese código de validación
        // lo marcamos como activo
        if (result) {
            const query = `update usuario set validado = true, validationCode = ''`
            await performQuery(query, [])
        } else {
            throw new Error('validation-error')

        }

    } catch (e) {

    }
}


const updateValidationCode = async (email, validationCode) => {
    const query = `update usuario SET validationCode = ? where email=?`
    const params = [validationCode, email]

    await performQuery(query, params)
}

const updateContrasena = async (id_usuario, contrasena) => {

    const query = `update usuario SET contrasena=?, validationCode='' where id_usuario=?`
    const params = [contrasena, id_usuario]

    await performQuery(query, params)

}

const getUsuarioByCode = async (code) => {

    const query = `select * from usuario where validationCode=?`
    const params = [code]
    const [result] = await performQuery(query, params)
    return result

}

const getUsuarioReserva = async (id_usuario) => {

    const query = `select * from reserva
                  left outer join usuario on usuario.id_usuario = reserva.id_usuario
                  where reserva.id_usuario=?
                  order by reserva.fecha_creacion ASC`
    const params = [id_usuario]

    console.log(query)
    const [result] = await performQuery(query, params)
    console.log(result)
    return result

}

const getUsuarioIncidencia = async (id_usuario) => {

    const query = `select * from incidencia
                  left outer join usuario on usuario.id_usuario = incidencia.id_usuario`
    const params = [id_usuario]

    const [result] = await performQuery(query, params)
    return result

}

const getUsuarioRating = async (id_usuario) => {

    const query = `select * from rating
                  left outer join usuario on usuario.id_usuario = rating.id_usuario`
    const params = [id_usuario]

    const [result] = await performQuery(query, params)
    return result

}

const getUsuarioCoworking = async (id_usuario) => {

    const query = `select * from coworking
                  left outer join usuario on usuario.id_usuario = coworking.id_usuario
                  where coworking.id_usuario=?
                  order by coworking.fecha_creacion ASC`
    const params = [id_usuario]

    console.log(query)
    const [result] = await performQuery(query, params)
    console.log(result)
    return result

}

//////////////////////////////////////////////////
//////           ESPACIO COWORKING           /////
//////////////////////////////////////////////////


const createCoworking = async (id_usuario, nombre, telefono, direccion, ciudad, provincia, descripcion, wifi, limpieza, parking, web) => {
    let connection;

    try {
        connection = await getConnection();

        let SQL = await connection.query(`
            INSERT INTO coworking (id_usuario, nombre, telefono, direccion, ciudad, provincia, descripcion, wifi, limpieza, parking, web)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
            [id_usuario, nombre, telefono, direccion, ciudad, provincia, descripcion, wifi, limpieza, parking, web])

        return SQL

    } catch (e) {
        console.log(e)
        throw new Error('database-error')

    } finally {
        if (connection) {
            connection.release()
        }
    }
}

// COMPROBAR SI COWORKING EXISTE
const checkCoworking = async (web, id_usuario) => {
    let connection;

    try {
        connection = await getConnection();

        // 		// me quedo con el primer elemento (array destructuring)
        const [result] = await connection.query(
            `
             select * from coworking where web = ? and id_usuario=?
         `,
            [web, id_usuario]
        );

        return result; // potential bug because connection is not released
    } catch (e) {
        throw new Error("database-error");
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

const getCoworking = async (id_coworking) => {
    let connection;

    try {
        connection = await getConnection();

        // me quedo con el primer elemento (array destructuring)
        const result = await connection.query(`
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

const updateCoworking = async (nombre, telefono, direccion, ciudad, provincia, descripcion, wifi, limpieza, parking, web, id_coworking) => {
    let connection;

    try {
        connection = await getConnection();

        let SQL = await connection.query(`
            update coworking SET nombre=?, telefono=?, direccion=?, ciudad=?, provincia=?, descripcion=?, wifi=?, limpieza=?, parking=?, web=?
            where id_coworking=?
        `,
            [nombre, telefono, direccion, ciudad, provincia, descripcion, wifi, limpieza, parking, web, id_coworking])

    } catch (e) {
        console.log(e)
        throw new Error('database-error')
        res.send(updateCoworking)

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

const createFotoCoworking = async (fileID, id_coworking) => {

    const query = `INSERT INTO foto_coworking (foto, id_coworking)
                     VALUES (?, ?)`
    const params = [fileID, id_coworking]

    await performQuery(query, params)
}

const getFotoCoworking = async (id_coworking) => {

    const query = `  select id_coworking, JSON_ARRAYAGG(foto) AS fotos
    FROM foto_coworking GROUP BY id_coworking`
    const params = [id_coworking]
    const result = await performQuery(query, params)
    console.log(result)
    return result
}


const deleteFotoCoworking = async (foto) => {
    let connection;

    try {
        connection = await getConnection();

        // me quedo con el primer elemento (array destructuring)
        const [result] = await connection.query(`
            delete from foto_coworking where foto = ?
        `,
            [foto])

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

const getCoworkingReserva = async (id_coworking) => {

    const query = `
                    SELECT * FROM sala
            LEFT OUTER JOIN coworking ON coworking.id_coworking = sala.id_coworking
            LEFT OUTER JOIN reserva ON reserva.id_sala = sala.id_sala
            where sala.id_coworking = ?
            order by sala.fecha_creacion ASC`
    const params = [id_coworking]

    const result = await performQuery(query, params)
    return result

}

const getCoworkingRating = async (id_coworking) => {

    const query = `
                    SELECT * FROM sala
            LEFT OUTER JOIN coworking ON coworking.id_coworking = sala.id_coworking
            LEFT OUTER JOIN reserva ON reserva.id_sala = sala.id_sala
            LEFT OUTER JOIN rating ON rating.id_reserva = sala.id_sala
            where sala.id_coworking = ?
            order by sala.fecha_creacion ASC`
    const params = [id_coworking]

    const result = await performQuery(query, params)
    return result

}

const getCoworkingIncidencia = async (id_coworking) => {

    const query = `
                    SELECT * FROM sala
            LEFT OUTER JOIN coworking ON coworking.id_coworking = sala.id_coworking
            LEFT OUTER JOIN reserva ON reserva.id_sala = sala.id_sala
            LEFT OUTER JOIN incidencia ON incidencia.id_sala = sala.id_sala
            where sala.id_coworking = ?
            order by sala.fecha_creacion ASC`
    const params = [id_coworking]

    const result = await performQuery(query, params)
    return result

}

const getCoworkingSalas = async (id_coworking) => {

    const query = `
                    SELECT * FROM sala
            LEFT OUTER JOIN coworking ON coworking.id_coworking = sala.id_coworking
            where sala.id_coworking = ?
            order by sala.fecha_creacion ASC`
    const params = [id_coworking]

    const result = await performQuery(query, params)
    return result

}

const getCoworkingAvgRating = async (id_coworking) => {

    const query = `
                 SELECT avg(valoracion) AS 'coworkingRating'
                 FROM sala LEFT OUTER JOIN coworking ON coworking.id_coworking=sala.id_coworking
                 LEFT OUTER JOIN reserva ON reserva.id_sala=sala.id_sala
                 LEFT OUTER JOIN rating ON rating.id_reserva=sala.id_sala
                 where coworking.id_coworking = ?
                 group by coworking.id_coworking`

    const params = [id_coworking]

    const result = await performQuery(query, params)
    return result

}

const getCoworkingOwner = async (id_coworking) => {

    const query = `
                SELECT coworking.id_coworking,
                       usuario.id_usuario,
                       usuario.email from usuario LEFT OUTER JOIN coworking ON coworking.id_usuario=usuario.id_usuario
                       where coworking.id_coworking=?`

    const params = [id_coworking]

    const result = await performQuery(query, params)
    return result

}



//////////////////////////////////////////////////
//////                   SALA                /////
//////////////////////////////////////////////////


const createSala = async (id_coworking, tipo, descripcion, capacidad, tarifa, tarifa_tipo, disponibilidad, proyector, impresora) => {
    let connection;

    try {
        connection = await getConnection();

        let SQL = await connection.query(`
            INSERT INTO sala (id_coworking, tipo, descripcion, capacidad, tarifa, tarifa_tipo, disponibilidad, proyector, impresora)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
            [id_coworking, tipo, descripcion, capacidad, tarifa, tarifa_tipo, disponibilidad, proyector, impresora])



    } catch (e) {
        console.log(e)
        throw new Error('database-error')

    } finally {
        if (connection) {
            connection.release()
        }
    }
}

// COMPROBAR SI LA SALA EXISTE
const checkSala = async (id_coworking) => {
    let connection;

    try {
        connection = await getConnection();

        // me quedo con el primer elemento (array destructuring)
        const [result] = await connection.query(
            `
             select * from sala where id_coworking=?
         `,
            [id_coworking]
        );

        return result; // potential bug because connection is not released
    } catch (e) {
        throw new Error("database-error");
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

const updateSala = async (tipo, descripcion, capacidad, tarifa, tarifa_tipo, disponibilidad, proyector, impresora, id_sala) => {
    let connection;

    try {
        connection = await getConnection();

        let SQL = await connection.query(`
            update sala SET tipo=?, descripcion=?, capacidad=?, tarifa=?, tarifa_tipo=?, disponibilidad=?, proyector=?, impresora=?
            where id_sala=?
        `,
            [tipo, descripcion, capacidad, tarifa, tarifa_tipo, disponibilidad, proyector, impresora, id_sala])

    } catch (e) {
        console.log(e)
        throw new Error('database-error')
        res.send(sala)

    } finally {
        if (connection) {
            connection.release()
        }
    }
}

const getSala = async (id_coworking) => {
    let connection;

    try {
        connection = await getConnection();

        // me quedo con el primer elemento (array destructuring)
        const [result] = await connection.query(`
            select * from sala where id_coworking = ?
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

const deleteSala = async (id_sala) => {
    let connection;

    try {
        connection = await getConnection();

        // me quedo con el primer elemento (array destructuring)
        const [result] = await connection.query(`
            delete from sala where id_sala = ?
        `,
            [id_sala])

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

const getListSala = async (id_coworking, tipo) => {

    let connection;

    try {
        connection = await getConnection();
        let result;

        if (tipo && id_coworking) {
            result = await connection.query(`
                select id_sala, tipo, id_coworking from sala where tipo = ? and id_coworking = ?
                `, [tipo, id_coworking])
        } else if (!tipo && id_coworking) {
            result = await connection.query(`
            select id_sala, tipo, id_coworking from sala where id_coworking = ?
            `, [id_coworking])
        } else if (tipo && !id_coworking) {
            result = await connection.query(`
            select id_sala, tipo, id_coworking from sala where tipo = ?
            `, [tipo])
        } else {
            result = await connection.query(`
            select id_sala, tipo, id_coworking from sala
            `)
        }


        return result[0]  // potential bug because connection is not released
    } catch (e) {
        console.log(e)
        throw new Error('database-error')

    } finally {
        if (connection) {
            connection.release()
        }
    }

}

const getSalaAvgRating = async (id_sala) => {

    const query = `
                SELECT avg(valoracion) AS 'salaRating'
                FROM sala LEFT OUTER JOIN reserva ON reserva.id_sala = sala.id_sala
                LEFT OUTER JOIN rating ON rating.id_reserva = sala.id_sala
                where sala.id_sala = ? 
                group by sala.id_sala`

    const params = [id_sala]

    const result = await performQuery(query, params)
    return result

}

////////////////////////////////////////////////////
///////////            RESERVAS          //////////
//////////////////////////////////////////////////

const createReserva = async (
    id_sala,
    id_usuario,
    fecha_inicio,
    fecha_fin

) => {
    let connection;
    try {
        connection = await getConnection();
        console.log(id_usuario)

        let SQL = await connection.query(
            `
            
            INSERT INTO reserva (id_sala, id_usuario, fecha_inicio, fecha_fin)
            VALUES (?, ?, ?, ?)
        `,
            [id_sala, id_usuario, fecha_inicio, fecha_fin]

        );
    } catch (e) {
        console.log(e);
        throw new Error("database-error");
    } finally {
        if (connection) {
            connection.release();
        }
    }
};
const getListReserva = async (id_usuario, id_sala) => {
    let connection;

    try {
        connection = await getConnection();

        let result;
        //OBTENER RESERVAS DE USUARIO - COMPRADOR
        if (id_usuario) {
            result = await connection.query(
                `
            SELECT * FROM reserva WHERE id_usuario = ?`,
                [id_usuario]
            );
            //OBTENER RESERVAS DE UNA SALA DETERMINADA
        } else if (id_sala) {
            result = await connection.query(
                `
            SELECT * FROM reserva WHERE id_usuario = ?`,
                [id_sala]
            );
            //OBTENER RESERVA DE TODO EL ESPACIO DE COWORKING
        } else if (id_coworking) {
            result = await connection.query(
                `
            SELECT * FROM reserva 
            INNER JOIN sala ON reserva.id_sala = sala.id
            INNER JOIN coworking ON sala.id_coworking = coworking.id
            WHERE id = ?`,
                [id_coworking]
            );
        }

        console.log(result);
        return result[0]; // potential bug because connection is not released
    } catch (e) {
        throw new Error("database-error");
    } finally {
        if (connection) {
            connection.release();
        }
    }
};
const getReserva = async (id_reserva) => {
    let connection;

    try {
        connection = await getConnection();

        // me quedo con el primer elemento (array destructuring)
        const [result] = await connection.query(
            `
            select * from reserva where id_reserva = ?
        `,
            [id_reserva]
        );

        return result; // potential bug because connection is not released
    } catch (e) {
        throw new Error("database-error");
    } finally {
        if (connection) {
            connection.release();
        }
    }
};
const updateReserva = async (

    fecha_inicio,
    fecha_fin,
    id_reserva
) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(
            `
            update reserva SET fecha_inicio=?, fecha_fin=?
            where id_reserva=? 
        `,
            [

                fecha_inicio,
                fecha_fin,
                id_reserva,
            ]
        );
    } catch (e) {
        console.log(e);
        throw new Error("database-error");
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

const deleteReserva = async (id_reserva) => {
    let connection;

    try {
        connection = await getConnection();

        // me quedo con el primer elemento (array destructuring)
        const [result] = await connection.query(
            `
            delete from reserva where id_reserva = ?
        `,
            [id_reserva]
        );

        return result; // potential bug because connection is not released
    } catch (e) {
        console.log(e);
        throw new Error("database-error");
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

/////////////////////////////////////////////////////////////////////
//////////////            INCIDENCIA                       /////////
////////////////////////////////////////////////////////////////////

const createIncidencia = async (id_usuario, id_sala, estado, categoria, descripcion) => {
    let connection;
    try {
        connection = await getConnection();

        let SQL = await connection.query(`
            INSERT INTO incidencia (id_usuario, id_sala, estado, categoria, descripcion)
            VALUES (?, ?, ?, ?, ?)
        `,
            [id_usuario, id_sala, estado, categoria, descripcion])

    } catch (e) {
        console.log(e)
        throw new Error('database-error')

    } finally {
        if (connection) {
            connection.release()
        }
    }
}
const getListIncidencia = async (estado, descripcion) => {

    let connection;

    try {
        connection = await getConnection();
        let result;

        if (estado && descripcion) {
            result = await connection.query(`
                select id_incidencia, estado, descripcion from incidencia where estado = ? and descripcion = ?
                `, [estado, descripcion])
        } else if (!estado && descripcion) {
            result = await connection.query(`
            select id_incidencia, estado, descripcion from incidencia where estado = ?
            `, [estado])
        } else if (estado && !valoracion) {
            result = await connection.query(`
            select id_incidencia, estado, descripcion from incidencia where incidencia = ?
            `, [valoracion])
        } else {
            result = await connection.query(`
            select id_incidencia, estado, descripcion from incidencia
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
const getIncidencia = async (id_incidencia) => {
    let connection;

    try {
        connection = await getConnection();

        // me quedo con el primer elemento (array destructuring)
        const [result] = await connection.query(`
            select * from incidencia where id_incidencia = ?
        `,
            [id_incidencia])

        return result  // potential bug because connection is not released
    } catch (e) {
        throw new Error('database-error')

    } finally {
        if (connection) {
            connection.release()
        }
    }
}
const updateIncidencia = async (id_usuario, id_sala, estado, categoria, descripcion, id_incidencia) => {
    let connection;


    try {
        connection = await getConnection();

        await connection.query(`
            update incidencia SET id_usuario = ?, id_sala = ?, estado = ?, categoria = ?, descripcion = ?
            where id_incidencia=? 
        `,
            [id_usuario, id_sala, estado, categoria, descripcion, id_incidencia])
    } catch (e) {
        console.log(e)
        throw new Error('database-error')

    } finally {
        if (connection) {
            connection.release()
        }
    }
}

const deleteIncidencia = async (id_incidencia) => {
    let connection;

    try {
        connection = await getConnection();

        // me quedo con el primer elemento (array destructuring)
        const [result] = await connection.query(`
            delete from incidencia where id_incidencia = ?
        `,
            [id_incidencia])

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

/////////////////////////////////////////////////////////////////////
//////////////                 RATING                       /////////
////////////////////////////////////////////////////////////////////

const createRating = async (id_usuario, id_reserva, valoracion) => {
    let connection;
    try {
        connection = await getConnection();

        let SQL = await connection.query(`
            INSERT INTO rating (id_usuario, id_reserva, valoracion)
            VALUES (?, ?, ?)
        `,
            [id_usuario, id_reserva, valoracion])

    } catch (e) {
        console.log(e)
        throw new Error('database-error')

    } finally {
        if (connection) {
            connection.release()
        }
    }
}

const getRating = async (id_rating) => {
    let connection;

    try {
        connection = await getConnection();

        // me quedo con el primer elemento (array destructuring)
        const [result] = await connection.query(`
            select * from rating where id_rating = ?
        `,
            [id_rating])

        return result  // potential bug because connection is not released
    } catch (e) {
        throw new Error('database-error')

    } finally {
        if (connection) {
            connection.release()
        }
    }
}
const updateRating = async (id_usuario, id_reserva, valoracion, id_rating) => {
    let connection;


    try {
        connection = await getConnection();

        await connection.query(`
            update rating SET id_usuario = ?, id_reserva = ?, valoracion = ?
            where id_rating=? 
        `,
            [id_usuario, id_reserva, valoracion, id_rating])
    } catch (e) {
        console.log(e)
        throw new Error('database-error')

    } finally {
        if (connection) {
            connection.release()
        }
    }
}

const deleteRating = async (id_rating) => {
    let connection;

    try {
        connection = await getConnection();

        // me quedo con el primer elemento (array destructuring)
        const [result] = await connection.query(`
            delete from rating where id_rating = ?
        `,
            [id_rating])

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

/////////////////////////////////////////////////////////////////////
//////////////                 BUSCADOR                     /////////
////////////////////////////////////////////////////////////////////

const buscador = async (provincia, ciudad, fecha_inicio, fecha_fin, capacidad, wifi, limpieza, parking, proyector,
    impresora, tipo, tarifa, order, direction) => {
    let connection;


    try {

        connection = await getConnection();

        //nombramos la query base
        query = `
            SELECT * , sala.id_sala AS CSalas, coworking.id_coworking AS SCoworking FROM sala
            LEFT OUTER JOIN coworking ON coworking.id_coworking = sala.id_coworking
            LEFT OUTER JOIN reserva ON reserva.id_sala = sala.id_sala`;

        //establecer criterio de sentido de la búsqueda

        const orderDirection = (direction && direction.toLowerCase()) === "asc" ? "ASC" : "DESC";

        //establecer criterio de orden de búsqueda

        let orderBy;
        switch (order) {
            case "tarifa":
                orderBy = "tarifa";
                break;
            case "fechaCreacion":
                orderBy = "sala.fecha_creacion";
                break;
            default:
                orderBy = "sala.fecha_creacion";
        }

        //establecemos los parámetros de búsqueda
        const params = [];

        //establecemos condiciones para la query
        const conditions = [];

        //construimos query multibúsqueda
        if (provincia || ciudad || (fecha_inicio && fecha_fin) || capacidad || wifi || limpieza || parking || proyector ||
            impresora || tipo || tarifa) {

            if (provincia) {
                conditions.push(`provincia LIKE ?`);
                params.push(`${provincia}`);
            }
            if (ciudad) {
                conditions.push(`ciudad LIKE ?`)
                params.push(`${ciudad}`);
            }
            if (fecha_inicio && fecha_fin) {
                const fecha_inicioDB = dateToDB(fecha_inicio);
                const fecha_finDB = dateToDB(fecha_fin);
                conditions.push(`
                 fecha_inicio NOT BETWEEN ${fecha_inicioDB} AND ${fecha_finDB}
                 AND fecha_fin NOT BETWEEN ${fecha_inicioDB} AND ${fecha_finDB}
                 AND NOT (fecha_inicio < ${fecha_inicioDB} AND fecha_fin > ${fecha_finDB})
                 AND NOT (fecha_inicio > ${fecha_inicioDB} AND fecha_fin < ${fecha_finDB})`)
                params.push(
                    `${fecha_inicioDB}`,
                    `${fecha_finDB}`,
                    `${fecha_inicioDB}`,
                    `${fecha_finDB}`
                );
            }
            if (capacidad) {
                conditions.push(`capacidad>=?`);
                params.push(`${capacidad}`);
            }
            if (wifi) {
                conditions.push(`wifi=?`);
                params.push(`${wifi}`);
            }
            if (limpieza) {
                conditions.push(`limpieza=?`);
                params.push(`${limpieza}`);
            }
            if (parking) {
                conditions.push(`parking=?`);
                params.push(`${parking}`);
            }
            if (proyector) {
                conditions.push(`proyector=?`);
                params.push(`${proyector}`);
            }
            if (impresora) {
                conditions.push(`impresora=?`);
                params.push(`${impresora}`);
            }
            if (tipo) {
                conditions.push(`tipo=?`);
                params.push(`${tipo}`);
            }

            if (tarifa) {
                if (tarifa) {
                    conditions.push(`tarifa <=?`);
                    params.push(`${tarifa}`);
                }
            }
        }

        //finalizamos la construcción de la query

        query = `${query} WHERE ${conditions.join(
            ` AND `
        )} ORDER BY ${orderBy} ${orderDirection}`;

        console.log(query, params);

        //ejecutamos la query
        const [result] = await connection.query(query, params);
        console.log(result)
        //mandamos respuesta
        return result


    } catch (e) {
        console.warn(e)
        throw new Error('database-error')
    } finally {
        if (connection) {
            connection.release();
        }
    }
}



module.exports = {
    createUsuario,
    uploadFotoUsuario,
    getFotoUsuario,
    listUsuario,
    getUsuarioEmail,
    getUsuarioId,
    updateUsuario,
    deleteUsuario,
    checkValidationCode,
    updateValidationCode,
    updateContrasena,
    getUsuarioByCode,
    getUsuarioReserva,
    getUsuarioIncidencia,
    getUsuarioRating,
    getUsuarioCoworking,
    createCoworking,
    checkCoworking,
    getCoworking,
    getListCoworking,
    updateCoworking,
    deleteCoworking,
    createFotoCoworking,
    getFotoCoworking,
    deleteFotoCoworking,
    getCoworkingReserva,
    getCoworkingRating,
    getCoworkingIncidencia,
    getCoworkingSalas,
    getCoworkingAvgRating,
    getCoworkingOwner,
    createSala,
    checkSala,
    updateSala,
    getSala,
    deleteSala,
    getListSala,
    getSalaAvgRating,
    createReserva,
    getListReserva,
    getReserva,
    updateReserva,
    deleteReserva,
    createIncidencia,
    getListIncidencia,
    getIncidencia,
    updateIncidencia,
    deleteIncidencia,
    createRating,
    getRating,
    updateRating,
    deleteRating,
    buscador,
    performQuery
}