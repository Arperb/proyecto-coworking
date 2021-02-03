const { getConnection } = require("../db/db");

async function buscador(req, res, next) {
    let connection;
    try {
        connection = await getConneection();

        //obtenemos criterios de búsqueda de usuario
        const { nombre, provincia, tarifa1, tarifa2, fecha_inicio, fecha_fin, tipoSala, servicios } = req.query;

        //nombramos la query base
        let query = `SELECT * FROM coworking
        LEFT OUTER JOIN reserva ON reserva.id_coworking = id_coworking`;

        //establecer criterio de sentido de la búsqueda

        const orderProvincia = (provincia && provincia.toLowerCase()) === "asc" ? "ASC" : "DESC";

        //establecer criterio de orden de búsqueda

        let orderBy;
        switch (order) {
            case "tarifa":
                orderBy = "tarifa";
                break;
            case "creationDate":
                orderBy = "creation_date";
                break;
            default:
                orderBy = "creation_date";
        }


        //establecemos los parámetros de búsqueda
        const params = [];

        //construimos query multibúsqueda
        if (nombre || provincia || (tarifa1 && tarifa2) || (fecha_inicio && fecha_fin) || tipoSala || servicios) {

            //establecemos condiciones para la query
            const conditions = [];
            if (nombre) {
                conditions.push(`nombre LIKE ?`);
                params.push(`%${nombre}%`);
            }
            if (provincia) {
                conditions.push(`provincia=?`)
                params.push(`${provincia}`);
            }
            if (tarifa1 && tarifa2) {
                conditions.push(`tarifa1 BETWEEN ? AND ?`);
                params.push(`${tarifa1}`, `${tarifa2}`);
            }
            if (fecha_inicio && fecha_fin) {
                const fecha_inicioDB = dateToBD(fecha_inicio);
                const fecha_finDB = dateToDB(fecha_fin);
                conditions.push(`fecha_inicio NOT BETWEEN ? AND ?
                AND fecha_fin NOT BETWEEN ? AND ?`);
                params.push(
                    `${fecha_inicioDB}`,
                    `${fecha_finDB}`,
                    `${fecha_inicioDB}`,
                    `${fecha_finDB}`
                    )
            }
            if (tipoSala) {
                conditions.push(`tipoSala=?`);
                params.push(`${nombre}`);
            }
            if (servicios) {
                conditions.push(`servicios=?`);
                params.push(`${servicios}`);
            }
            

        }

        //finalizamos la construcción de la query

        query = `${query} WHERE ${conditions.join(
            `AND`
        )} ORDER BY ${orderBy} ${orderDirection}`;

        console.log(query, params);

        //ejecutamos la query
        const [result] = await connection.query(query, params);

        //mandamos respuesta
        res.send({
            data: result,
        })



    } catch (error) {
        next(error);
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

module.exports = buscador;