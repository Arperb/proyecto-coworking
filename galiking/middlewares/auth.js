const jwt = require('jsonwebtoken');

const db = require('../db/mysql');
const { sendConfirmationMailCoworking } = require('../utils/utils');

const isAuthenticated = async (req, res, next) => {
    // obtenemos el token que habrán metido en 
    // la cabecera
    const { authorization } = req.headers;

    try {
        // si la verificación del token falla (caducado, mal formado, no descifrable
        // con el SECRET dado) salta una excepción
        const decodedToken = jwt.verify(authorization, process.env.SECRET);
       
        const usuario = await db.getUsuarioEmail(decodedToken.email)
      

        if (!usuario) {
            throw new Error()
        }
        req.auth = decodedToken;
       
    } catch (e) {
        res.status(401).send()
        return
    }

    next();
}


const usuarioIsAdmin = async (req, res, next) => {

    const { authorization } = req.headers;

    try {
        // si la verificación del token falla (caducado, mal formado, no descifrable
        // con el SECRET dado) salta una excepción
        const decodedToken = jwt.verify(authorization, process.env.SECRET);

        const usuario = await db.getUsuarioEmail(decodedToken.email)
        
     if (usuario.rol !=="administrador") {
         const error = new Error("tu deberías de ser administrador para acceder a este recurso");
        error.httpCode = 401;
         next(error);
         
       
     }
     next();
 } catch (e) {
     console.log(e)
}
}



const usuarioIsOwner = async (req, res, next) => {
    
    const { authorization } = req.headers;

    try {
        // si la verificación del token falla (caducado, mal formado, no descifrable
        // con el SECRET dado) salta una excepción
        const decodedToken = jwt.verify(authorization, process.env.SECRET);

        const usuario = await db.getUsuarioEmail(decodedToken.email)
     
     if (usuario.rol !=="propietario") {
         const error = new Error("tu deberías de ser propietario de un coworking para acceder a este recurso");
        error.httpCode = 401;
         next(error);
         
       
     }
     next();
 } catch (e) {
     console.log(e)
}
}

const usuarioIsUser = async (req, res, next) => {

    const { authorization } = req.headers;

    try {
        // si la verificación del token falla (caducado, mal formado, no descifrable
        // con el SECRET dado) salta una excepción
        const decodedToken = jwt.verify(authorization, process.env.SECRET);

        const usuario = await db.getUsuarioEmail(decodedToken.email)
     
     if (usuario.rol =="propietario") {
         const error = new Error("tu deberías de ser cliente o administrador para acceder a este recurso");
        error.httpCode = 401;
         next(error);
         
       
     }
     next();
 } catch (e) {
     console.log(e)
}
}

//COMPROBARÁ EL USUARIO DEL TOKEN CON EL .PARAMS O SI ES ADMIN

//  const isSameUser = (req, res, next) => {

//     //const { authorization } = req.headers;
//     const { id_usuario } = req.params;
//     //const decodedToken = jwt.verify(authorization,process.env.SECRET)
//     //const usuario = await db.getUsuarioEmail(decodedToken.email)
//     //req.auth = decodedToken
//    console.log(req.auth.email)

//     if (id_usuario === req.auth.email || req.auth.isAdmin){
//         next()
//     } else {
//         res.status(403).send()
//         return
//     }

// }

const isSameUser = async (req, res, next) => {
    const { authorization } = req.headers;
    const { id_usuario } = req.params;
    const decodedToken = jwt.verify(authorization,process.env.SECRET)
    const usuario = await db.getUsuarioEmail(decodedToken.email)
    //req.auth = decodedToken

    if ((id_usuario == usuario.id_usuario) || req.auth.isAdmin){
        next()

    } else {
        res.status(403).send()
        return
    }

}

const coworkingOwner = async (req, res, next) => {
    const { authorization } = req.headers;
    const decodedToken = jwt.verify(authorization,process.env.SECRET)
    const usuario = await db.getUsuarioEmail(decodedToken.email)
    const { id_coworking } = req.params;
    const owner = await db.getCoworkingOwner(id_coworking)
    const ownerId = owner[0]
    req.auth = decodedToken
   
    if ((usuario.id_usuario == ownerId.id_usuario) || req.auth.isAdmin) {
        next()

    } else {
        res.status(403).send()
        return
    }

}



//COMPROBACIÓN DE SI EXISTE RESERVA 
// const isReserva = (req, res, next) => {
//     //OBTENEMOS ID DE LA RESERVA
//     const { id_reserva } = req.params;

//     //OBTENEMOS RESERVA
//     const reserva = await db.getReserva(id_reserva);
//    
//     if (!reserva.length > 0) {
//         res.status(404).send();
//         return;
//     }
//     next();

// }

//COMPROBAR SI INCIDENCIA EXISTE 


// const checkIncidencia = async (estado, descripcion) => {
// 	let connection;

// 	try {
// 		connection = await getConnection();

// 		// me quedo con el primer elemento (array destructuring)
// 		const [result] = await connection.query(
// 			`
//             select * from incidencia where estado = ? and descripcion=?
//         `,
// 			[estado, descripcion]
// 		);

// 		return result; // potential bug because connection is not released
// 	} catch (e) {
// 		throw new Error("database-error");
// 	} finally {
// 		if (connection) {
// 			connection.release();
// 		}
// 	}
// };

// COMPROBAR SI COWORKING EXISTE
// const checkCoworking = async (web, id_usuario) => {
// 	let connection;

// 	try {
// 		connection = await getConnection();

// 		// me quedo con el primer elemento (array destructuring)
// 		const [result] = await connection.query(
// 			`
//             select * from coworking where web = ? and id_usuario=?
//         `,
// 			[web, id_usuario]
// 		);

// 		return result; // potential bug because connection is not released
// 	} catch (e) {
// 		throw new Error("database-error");
// 	} finally {
// 		if (connection) {
// 			connection.release();
// 		}
// 	}
// };

//comprobar lo que sea
/*
if (decodedToken.id_coworking !== coworking.id_coworking) {
    res.status(400).send()
    return
}
*/


module.exports = {
    usuarioIsAdmin,
    usuarioIsOwner,
    usuarioIsUser,
    isAuthenticated,
    isSameUser,
    coworkingOwner
    //isReserva,
    //checkIncidencia,
    //checkCoworking
};
