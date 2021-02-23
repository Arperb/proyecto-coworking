require('dotenv').config()
const moment = require('moment')
const sendgrid = require("@sendgrid/mail");




const sendConfirmationMail = async (email, link) => {
    sendgrid.setApiKey(process.env.EMAIL_API_KEY);

    const message = {
        to: email,
        from: 'esther_h_e@hotmail.com',
        subject: 'Validate your account',
        text: `La dirección de verificación es: ${link}`,
        html: `
        <div>
          <h1> Valida tu registro </h1>
          <p> Si te has registrado en el sistema, accede al siguiente
          enlace para validar tu cuenta </p>
          

          ${link}
        </div>
      `,
    };

    

    // Enviar mensaje de validación del registro
    await sendgrid.send(message);
}

const sendConfirmationMailCoworking = async (email) => {
  sendgrid.setApiKey(process.env.EMAIL_API_KEY);
 

  const message = {
      to: email,
      from: 'esther_h_e@hotmail.com',
      subject: 'Espacio coworking registrado',
      text: `La dirección de verificación es`,
      html: `
      <div>
        <h1> Coworking registrado </h1>
        <p> Muy bien te has coronado </p>
        
      </div>
    `,
  };

      // Enviar mensaje de confirmación de creación de coworking
      await sendgrid.send(message);
    }

const forgotPasswordMail = async (email, link) => {
  sendgrid.setApiKey(process.env.EMAIL_API_KEY);

  const message = {
      to: email,
      from: 'esther_h_e@hotmail.com',
      subject: 'Update your password',
      text: `La dirección de verificación es: ${link}`,
      html: `
      <div>
        <h1> Cambia tu contraseña </h1>
        <p> Si has creado una nueva contraseña, accede al siguiente
        enlace para poder actualizarla </p>
        

        ${link}
      </div>
    `,
  };

  // Enviar mensaje porque has olvidado la contraseña
  await sendgrid.send(message);
}

const sendConfirmationMailReserva = async (email) => {
  sendgrid.setApiKey(process.env.EMAIL_API_KEY);

  const message = {
      to: email,
      from: 'esther_h_e@hotmail.com',
      subject: 'Confirmation de pago',
      text: `La dirección de verificación es`,
      html: `
      <div>
        <h1> Confirmación del pago de su reserva </h1>
        <p> El pago de tu reserva se ha realizado con éxito </p>
        
      </div>
    `,
  };

  

  // Enviar mensaje de validación del registro
  await sendgrid.send(message);
}

const sendConfirmationMailIncidencia = async (email) => {
  sendgrid.setApiKey(process.env.EMAIL_API_KEY);

  const message = {
      to: email,
      from: 'esther_h_e@hotmail.com',
      subject: 'Confirmación de incidencia',
      text: `La dirección de verificación es`,
      html: `
      <div>
        <h1> Confirmación de la incidencia </h1>
        <p> Tu incidencia ha sido registrada con éxito </p>
        
      </div>
    `,
  };

  

  // Enviar mensaje de validación del registro
  await sendgrid.send(message);
}

const sendConfirmationMailValoracion = async (email) => {
  sendgrid.setApiKey(process.env.EMAIL_API_KEY);

  const message = {
      to: email,
      from: 'esther_h_e@hotmail.com',
      subject: 'Confirmación de valoración',
      text: `La dirección de verificación es`,
      html: `
      <div>
        <h1> Confirmación de la valoración de tu reserva </h1>
        <p> Tu validación ha sido registrada con éxito </p>
        
      </div>
    `,
  };

  

  // Enviar mensaje de validación del registro
  await sendgrid.send(message);
}
//conversor de formato de fecha 
function dateToDB(date) {
  //usamos librería moment para dar formato sql
  const dateSQL = moment(date).format("YYYY-MM-DD");
  //devolvemos la fecha
  return dateSQL;

}

function oneDay(date) {
  //sumamos un día a la fecha y formateamos
  const dateSQL = moment(date).add(1,'days').format("YYYY-MM-DD");

  //devolvemos la fecha
  return dateSQL;
}

module.exports = {
    sendConfirmationMail,
    sendConfirmationMailCoworking,
    forgotPasswordMail,
    sendConfirmationMailReserva,
    sendConfirmationMailIncidencia,
    sendConfirmationMailValoracion,
    dateToDB,
    oneDay
}
