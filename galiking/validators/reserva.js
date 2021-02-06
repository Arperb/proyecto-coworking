
const { string } = require("joi");
//const Joi = require('joi');
const { date } = require("moment");

const JoiBase = require("@hapi/joi");
const JoiDate = require("@hapi/joi-date");
const Joi = JoiBase.extend(JoiDate);

const reservaValidator = Joi.object({
	id_usuario: Joi.string()
		.min(1)
		.max(5)
		.required()
		.error(
			new Error("id_usuario should be a string between 1 and 5 characters")
		),

	id_coworking: Joi.string()
		.min(1)
		.max(5)
		.required()
		.error(
			new Error("id_coworking should be a string between 1 and 5 characters")
		),

	fecha_inicio: Joi.date()
		.utc()
		.format("YYYY-MM-DDThh:mm:ss.sssZ")
		.error(new Error("La fecha es incorrecta")),

	fecha_fin: Joi.date()
		.utc()
		.format("YYYY-MM-DDThh:mm:ss.sssZ")
		.error(new Error("La fecha es incorrecta")),
});
module.exports = {
	reservaValidator,
};