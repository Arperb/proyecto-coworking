const { string } = require('joi');
const Joi = require('joi');
const { max } = require('moment');

const incidenciaValidator = Joi.object({
    id_usuario: Joi.string()
        .min(1)
        .max(5)
        .required()
        .error(
            new Error('id_usuario should be a string between 1 and 5 characters')
        ),

    id_coworking: Joi.string()
        .min(1)
        .max(5)
        .required()
        .error(
            new Error('id_coworking should be a string between 1 and 5 characters')
        ),
    estado: Joi.string()
        .min(1)
        .max(13)
        .error(
            new Error('estado should be a string between 7 and 13 characters')
        ),

    descripcion: Joi.string()
        .min(1)
        .max(7)
        .error(
            new Error('descripcion should be a  string between 1 and 7 characters')
        ),    

})
module.exports = {
    incidenciaValidator,
}