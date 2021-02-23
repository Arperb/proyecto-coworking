const { getConnection } = require("../db/db");
const { dateToDB } = require("../utils/utils");
const db = require("../db/mysql");

const buscador = async (req, res) => {
	
    const { provincia,
            ciudad,
            fecha_inicio,
            fecha_fin,
            capacidad,
            wifi,
            limpieza,
            parking,
            proyector,
            impresora,
            tipo,
            valoracion,
            tarifa1,
            tarifa2,
            order,
            direction } = req.query;

            try {
                let buscador = await db.buscador(
                provincia,
                ciudad,
                fecha_inicio,
                fecha_fin,
                capacidad,
                wifi,
                limpieza,
                parking,
                proyector,
                impresora,
                tipo,
                valoracion,
                tarifa1,
                tarifa2,
                order,
                direction);

                if (!buscador) {
                  res.status(404).send()
                  
              } else {
                  res.send(buscador)
              }
              
              } catch (e) {
                console.log(e)
                res.status(500).send('Lo sentimos, no tenemos ningún coworking disponible con esas características');
              }
            };




module.exports = {
    buscador
}