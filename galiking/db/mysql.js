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

const createFotoUsuario = async (id_usuario, foto) => {
    let connection;
    

    try {
        connection = await getConnection();

        await connection.query(`
            INSERT INTO usuario (foto)
            VALUES (?) 
        `,
            [foto])
    } catch (e) {
        console.log(e)
        throw new Error('database-error')

    } finally {
        if (connection) {
            connection.release()
        }
    }
}

const uploadFotoUsuario = async (foto, id_usuario) => {
    const query = `UPDATE usuario SET foto=? where id_usuario=?`
    const params = [foto, id_usuario]

    await performQuery(query, params)
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
   
    const [result] = await performQuery(query, params)
   
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

 //////////////////////////////////////////////////
//////           ESPACIO COWORKING           /////
//////////////////////////////////////////////////


 const createCoworking = async (id_usuario, nombre, telefono, direccion, ciudad, provincia, descripcion, servicios, web) => {
    let connection;

    try {
        connection = await getConnection();

       let SQL = await connection.query(`
            INSERT INTO coworking (id_usuario, nombre, telefono, direccion, ciudad, provincia, descripcion, servicios, web)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
            [id_usuario, nombre, telefono, direccion, ciudad, provincia, descripcion, servicios, web])

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

const updateCoworking = async (id_usuario, nombre, telefono, direccion, ciudad, provincia, descripcion, servicios, web) => {
    let connection;
    
    try {
        connection = await getConnection();

       let SQL = await connection.query(`
            update coworking SET id_usuario=?, nombre=?, telefono=?, direccion=?, ciudad=?, provincia=?, descripcion=?, servicios=?, web=?
            where id_coworking=?
        `,
            [id_usuario, nombre, telefono, direccion, ciudad, provincia, descripcion, servicios, web, id_coworking])
               
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


 //////////////////////////////////////////////////
//////                   SALA                /////
//////////////////////////////////////////////////


const createSala = async (id_coworking, tipo, descripcion, capacidad, tarifa, tarifa_tipo, disponibilidad, equipacion) => {
    let connection;

    try {
        connection = await getConnection();

       let SQL = await connection.query(`
            INSERT INTO sala (id_coworking, tipo, descripcion, capacidad, tarifa, tarifa_tipo, disponibilidad, equipacion)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
            [id_coworking, tipo, descripcion, capacidad, tarifa, tarifa_tipo, disponibilidad, equipacion])

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

// 		// me quedo con el primer elemento (array destructuring)
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

 const updateSala = async (id_coworking, tipo, descripcion, capacidad, tarifa, tarifa_tipo, disponibilidad, equipacion, id_sala) => {
    let connection;
    
    try {
        connection = await getConnection();

       let SQL = await connection.query(`
            update sala SET id_coworking=?, tipo=?, descripcion=?, capacidad=?, tarifa=?, tarifa_tipo=?, disponibilidad=?, equipacion=?
            where id_sala=?
        `,
            [id_coworking, tipo, descripcion, capacidad, tarifa, tarifa_tipo, disponibilidad, equipacion, id_sala])
            
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

const getSala = async (id_sala) => {
    let connection;

    try {
        connection = await getConnection();

        // me quedo con el primer elemento (array destructuring)
        const [result] = await connection.query(`
            select * from sala where id_sala = ?
        `,
            [id_sala])

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


////////////////////////////////////////////////////
///////////            RESERVAS          //////////
//////////////////////////////////////////////////

const createReserva = async (
	id_coworking,
	id_usuario,
	valoracion,
	estado,
	fecha_inicio,
	fecha_fin
) => {
	let connection;
	try {
		connection = await getConnection();

		let SQL = await connection.query(
			`
        
            INSERT INTO reserva (id_coworking, id_usuario, valoracion, estado, fecha_inicio, fecha_fin)
            VALUES (?, ?, ?, ?, ?, ?)
        `,
			[id_coworking, id_usuario, valoracion, estado, fecha_inicio, fecha_fin]
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
	id_reserva,
	id_coworking,
	id_usuario,
	valoracion,
	estado,
	fecha_inicio,
	fecha_fin
) => {
	let connection;

	try {
		connection = await getConnection();

		await connection.query(
			`
            update reserva SET valoracion=?, estado=?, fecha_inicio=?, fecha_fin=?
            where id_reserva=? 
        `,
			[
				id_reserva,
				id_coworking,
				id_usuario,
				valoracion,
				estado,
				fecha_inicio,
				fecha_fin,
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

const createIncidencia = async (estado, descripcion, fecha_inicio, fecha_fin) => {
    let connection;
    try {
        connection = await getConnection();

        let SQL = await connection.query(`
            INSERT INTO incidencia (estado, descripcion, fecha_inicio, fecha_fin)
            VALUES (?, ?, ?, ?,)
        `,
            [estado, descripcion, fecha_inicio, fecha_fin])

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
const updateIncidencia = async (id_incidencia, id_coworking, id_usuario, valoracion, estado, fecha_inicio, fecha_fin) => {
    let connection;


    try {
        connection = await getConnection();

        await connection.query(`
            update incidencia SET valoracion=?, estado=?, fecha_inicio=?, fecha_fin=?
            where id_incidencia=? 
        `,
            [id_incidencia, id_coworking, id_usuario,estado, descripcion, fecha_inicio, fecha_fin])
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
const checkIncidencia = async (estado, descripcion) => {
    let connection;

    try {
        connection = await getConnection();

        // me quedo con el primer elemento (array destructuring)
        const [result] = await connection.query(`
            select * from incidencia where estado = ? and descripcion=?
        `,
            [estado, descripcion])

        return result  // potential bug because connection is not released
    } catch (e) {
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
    listUsuario,
    getUsuarioEmail,
    getUsuarioId,
    updateUsuario,
    deleteUsuario,
    checkValidationCode,
    updateValidationCode,
    updateContrasena,
    getUsuarioByCode,
    createCoworking,
    checkCoworking,
    getCoworking,
    getListCoworking,
    updateCoworking,
    deleteCoworking,
    createSala,
    checkSala,
    updateSala,
    getSala,
    deleteSala,
    getListSala,
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
    checkIncidencia,
    
}