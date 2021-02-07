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

    servicios: Joi.string()
        .min(2)
        .max(150)
        .error(
            new Error('servicios should be a string between 10 and 150 characters')
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