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


const isAdmin = (req, res, next) => {
    if (!req.usuario || !req.usuario.isAdmin) {
        res.status(403).send()
        return
        //        const authError = new Error('not-authorized');
        //        authError.status = 403;
        //        return next(authError);
    }

    next();
}

module.exports = {
    //hasAPIKey,
    isAdmin,
    isAuthenticated
    //isSameUser
};
