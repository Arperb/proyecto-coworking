const Joi = require('joi');

const salaValidator = Joi.object({
    id_coworking: Joi.string()
        .min(1)
        .max(5)
        .required()
        .error(
            new Error('ID should be a string between 1 and 5 characters')
        ),

    tipo: Joi.string()
        .valid('despacho', 'compartida', 'sala de reuniones', 'salón de eventos')
        .error(
            new Error('tipo should be a string valid:despacho/compartida/sala de reuniones/salón de eventos')
        ),

    descripcion: Joi.string()
        .min(5)
        .max(500)
        .error(
            new Error('descripcion should be a string between 100 and 800 characters')
        ),

    capacidad: Joi.number()
        .integer()
        .error(
            new Error('capacidad should be a number between 1 and 2 characters')
        ),

    tarifa: Joi.number()
        .precision(2)
        .error(
            new Error('tarifa should be a number type 0,00')
        ),

    tarifa_tipo: Joi.string()
        .valid('hora', 'mes')
        .error(
            new Error('tarifa tipo should be a string valid:hora/mes')
        ),

    disponibilidad: Joi.string()
        .valid('si', 'no')
        .error(
            new Error('disponibilidad should be a string valid: si/no')
        ),

    equipacion: Joi.string()
        .valid('proyector', 'impresora', 'fotocopiadora', 'mobiliario', 'sistema de audio')
        .error(
            new Error('equipacion should be a string valid: proyector/impresora/fotocopiadora/mobiliario/sistema de audio')
        ),
    })

    module.exports = {
        salaValidator,
    }