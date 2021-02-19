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

    id_sala: Joi.string()
        .min(1)
        .max(5)
        .required()
        .error(
            new Error('id_sala should be a string between 1 and 5 characters')
        ),

    estado: Joi.string()
        .valid('activado', 'desactivado')
        .error(
            new Error('estado should be a string valid:activado/desactivado')
        ),

    categoria: Joi.string()
        .valid('limpieza', 'servicios', 'equipacion', 'otros')
        .error(
            new Error('categoría should be a string valid:limpieza/servicios/equipacion/otros')
        ),

    descripcion: Joi.string()
        .min(1)
        .max(500)
        .error(
            new Error('descripcion should be a  string between 1 and 500 characters')
        ),    

})
module.exports = {
    incidenciaValidator,
}