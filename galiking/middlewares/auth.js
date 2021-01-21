const jwt = require('jsonwebtoken');

const db = require('../db/mysql')

const isAuthenticated = async (req, res, next) => {
    // obtengo el token que habrán metido en 
    // las cabecera
    const { authorization } = req.headers;

    try {
        // si la verificación del token falla (caducado, mal formado, no descifrable
        // con el SECRET dado) salta una excepción
        const decodedToken = jwt.verify(authorization, process.env.SECRET);

        const usuario = await db.getUsuario(decodedToken.email)

        if (!user) {
            throw new Error()
        }

        req.auth = decodedToken;
    } catch (e) {
        res.status(401).send()
        return

        //        const authError = new Error('invalid token');
        //        authError.status = 401;
        //        return next(authError);
    }

    next();
}


const usuarioIsAdmin = (req, res, next) => {
    if (req.auth.rol !=="administrador") {
        const error = new Error("tu deberías de ser administrador para acceder a este recurso");
        error.httpCode = 401;
        next(error);
    }
    next();
}


const usuarioIsOwner = (req, res, next) => {
    if (req.auth.rol !=="propietario") {
        const error = new Error("tu deberías de ser propietario de un coworking para acceder a este recurso");
        error.httpCode = 401;
        next(error);
    }
    next();
}

const usuarioIsUser = (req, res, next) => {
    if (req.auth.rol !=="cliente") {
        const error = new Error("tu deberías de ser usuario para acceder a este recurso");
        error.httpCode = 401;
        next(error);
    }
    next();
}




const isSameUser = (req, res, next) => {
    // ¿Es el mismo usuario cuando el recurso sobre el que queremos
    // actuar (/user/:id) es el mismo que el que viene codificado en el token?
    // Es decir, cuando desciframos el token, obtenemos el JSON original que se 
    // cifró en el proceso de autenticación. En dicho JSON viene información
    // de usuario, como su correo electrónico (que en nuestro sistema es su 
    // identificador). Por tanto isSameUser llamará a next() cuando el correo
    // electrónico de ese JSON sea igual al identificador del usuario
    // que nos pasan en la URL.
    
    // En otras palabras, vamos a comprobar que el ID de la URL es igual
    // al email que está en req.auth, obtenido de descibrar el token
    // en un middleware previo (en el isAuthenticated)
    const { id_usuario } = req.params;

    if (id_usuario === req.auth.email || req.auth.isAdmin) {
        next()
    } else {
        res.status(403).send()
        return
    }
}


module.exports = {
    usuarioIsAdmin,
    usuarioIsOwner,
    usuarioIsUser,
    isAuthenticated,
    isSameUser
};
