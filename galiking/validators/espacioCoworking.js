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

    web: Joi.string()
        .min(10)
        .max(150)
        .error(
            new Error('web should be a string between 10 and 150 characters')
        ),

    servicios: Joi.string()
        .min(2)
        .max(150)
        .error(
            new Error('servicios should be a string between 10 and 150 characters')
        ),

    equipacion: Joi.string()
        .min(2)
        .max(150)
        .error(
            new Error('equipacion should be a string between 10 and 150 characters')
        ),

    puesto_trabajo: Joi.string()
        .min(1)
        .max(2)
        .error(
            new Error('puesto trabajo should be a string between 10 and 150 characters')
        ),

    puesto_trabajo_capacidad: Joi.number()
        .integer()
        .error(
            new Error('puesto trabajo capacidad should be a number between 1 and 2 characters')
        ),

    puesto_trabajo_tarifa: Joi.number()
        .precision(2)
        .error(
            new Error('puesto trabajo tarifa should be a number type 0,00')
        ),

    puesto_trabajo_tarifa_tipo: Joi.string()
        .min(1)
        .max(7)
        .error(
            new Error('puesto trabajo should be a string between 1 and 7 characters')
        ),

    puesto_multiple: Joi.string()
        .min(1)
        .max(2)
        .error(
            new Error('puesto multiple should be a string between 10 and 150 characters')
        ),

    puesto_multiple_capacidad: Joi.number()
        .integer()
        .error(
            new Error('puesto multiple capacidad should be a number between 1 and 2 characters')
        ),

    puesto_multiple_tarifa: Joi.number()
        .precision(2)
        .error(
            new Error('puesto multiple tarifa should be a number type 0,00')
        ),

    puesto_multiple_tarifa_tipo: Joi.string()
        .min(1)
        .max(7)
        .error(
            new Error('puesto multiple should be a string between 1 and 7 characters')
        ),

    despacho: Joi.string()
        .min(1)
        .max(2)
        .error(
            new Error('despacho should be a string between 10 and 150 characters')
        ),

    despacho_capacidad: Joi.number()
        .integer()
        .error(
            new Error('despacho capacidad should be a number between 1 and 2 characters')
        ),

    despacho_tarifa: Joi.number()
       .precision(2)
       .error(
        new Error('despacho tarifa should be a number type 0,00')
        ),

    despacho_tarifa_tipo: Joi.string()
        .min(1)
        .max(7)
        .error(
            new Error('despacho tarifa tipo should be a string between 1 and 7 characters')
        ),

    sala_reuniones: Joi.string()
        .min(1)
        .max(2)
        .error(
            new Error('sala reuniones should be a string between 10 and 150 characters')
        ),

    sala_reuniones_capacidad: Joi.number()
        .integer()
        .error(
            new Error('sala reuniones capacidad should be a number between 1 and 2 characters')
        ),

    sala_reuniones_tarifa: Joi.number()
        .precision(2)
        .error(
        new Error('sala reuniones tarifa should be a number type 0,00')
        ),

    sala_reuniones_tarifa_tipo: Joi.string()
        .min(1)
        .max(7)
        .error(
            new Error('sala reuniones tarifa tipo should be a string between 1 and 7 characters')
        ),

    salon_eventos: Joi.string()
        .min(1)
        .max(2)
        .error(
            new Error('salón eventos should be a string between 10 and 150 characters')
        ),

    salon_eventos_capacidad: Joi.number()
        .integer()
        .error(
            new Error('salón eventos capacidad should be a number between 1 and 2 characters')
        ),

    salon_eventos_tarifa: Joi.number()
        .precision(2)
        .error(
        new Error('salón eventos tarifa should be a number type 0,00')
        ),

    salon_eventos_tarifa_tipo: Joi.string()
        .min(1)
        .max(7)
        .error(
            new Error('salón eventos tarifa tipo should be a string between 1 and 7 characters')
        ),

    })

    module.exports = {
        coworkingValidator,
    }