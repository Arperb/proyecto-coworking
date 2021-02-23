const Joi = require('joi');

const coworkingValidator = Joi.object({
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

    direccion: Joi.string()
        .min(9)
        .max(100)
        .required()        
        .error(
            new Error('direccion should be a string between 9 and 100 characters')
        ),

    ciudad: Joi.string()
        .min(2)
        .max(50)
        .required()        
        .error(
            new Error('ciudad should be a string between 2 and 50 characters')
        ),

    provincia: Joi.string()
        .min(2)
        .max(50)
        .required()        
        .error(
            new Error('provincia should be a string between 2 and 50 characters')
        ),

    descripcion: Joi.string()
        .min(5)
        .max(800)
        .error(
            new Error('descripcion should be a string between 100 and 800 characters')
        ),

    wifi: Joi.string()
        .valid('si', 'no')
        .error(
        new Error('wifi should be a string valid: si/no')
    ),

    limpieza: Joi.string()
        .valid('si', 'no')
        .error(
        new Error('limpieza should be a string valid: si/no')
    ),

    parking: Joi.string()
        .valid('si', 'no')
        .error(
        new Error('parking should be a string valid: si/no')
    ),

    web: Joi.string()
        .min(10)
        .max(150)
        .error(
            new Error('web should be a string between 10 and 150 characters')
        ),
    })

    module.exports = {
        coworkingValidator,
    }