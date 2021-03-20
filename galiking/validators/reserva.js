
const { string } = require("joi");
//const Joi = require('joi');
const { date } = require("moment");

const JoiBase = require("@hapi/joi");
const JoiDate = require("@hapi/joi-date");
const Joi = JoiBase.extend(JoiDate);

const reservaValidator = Joi.object({


/*	estado: Joi.string()
        .valid('activado', 'desactivado')
        .error(
            new Error('estado should be a string valid:activado/desactivado')
        ),*/

	fecha_inicio: Joi.date()
		.utc()
		.format("YYYY-MM-DD")
		.error(new Error("La fecha es incorrecta")),

	fecha_fin: Joi.date()
		.utc()
		.format("YYYY-MM-DD")
		.error(new Error("La fecha es incorrecta")),
});

module.exports = {
	reservaValidator
};