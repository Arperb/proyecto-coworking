const { string } = require('joi');
const Joi = require('joi');
const { max } = require('moment');

const ratingValidator = Joi.object({
  
    id_reserva: Joi.string()
        .min(1)
        .max(5)
        .required()
        .error(
            new Error('id_reseva should be a string between 1 and 5 characters')
        ),

    valoracion: Joi.number()
        .min(1)
        .max(5)
        .required()
        .error(
        new Error('valoración should be a number between 1 and 5')
    ),
 
})
module.exports = {
    ratingValidator,
}