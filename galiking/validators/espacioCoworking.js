const Joi = require('joi');

const espacioCoworkingValidator = Joi.object({
    id_usuario: Joi.string()
        .min(1)
        .max(5)
        .required()
        .error(
            new Error('ID should be a string between 1 and 5 characters')
        ),

    nombre: Joi.string()
        .min(3)
        .max(100)
        .required()
        .error(
            new Error('nombre should be a string between 3 and 100 characters')
        ),

    telefono: Joi.string()
        .min(9)
        .max(13)
        .required()
        .error(
            new Error('telefono should be a string between 9 and 13 characters')
        ),

    localizacion: Joi.string()
        .min(9)
        .max(100)
        .required()        
        .error(
            new Error('localizacion should be a string between 9 and 100 characters')
        ),

    descripcion: Joi.string()
        .min(5)
        .max(800)
        .error(
            new Error('descripcion should be a string between 100 and 800 characters')
        ),

    web: Joi.string()
        .min(10)
        .max(150)
        .error(
            new Error('web should be a string between 10 and 150 characters')
        ),

    })

    module.exports = {
        espacioCoworkingValidator,
    }