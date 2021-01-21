require('dotenv').config()
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
  console.log(email)

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

const forgotPassworddMail = async (email, link) => {
  sendgrid.setApiKey(process.env.EMAIL_API_KEY);

  const message = {
      to: email,
      from: 'esther_h_e@hotmail.com',
      subject: 'Recuperate your password',
      text: `La dirección de verificación es: ${link}`,
      html: `
      <div>
        <h1> Cambia tu contraseña </h1>
        <p> Si te has registrado en el sistema, accede al siguiente
        enlace para validar tu cuenta </p>
        

        ${link}
      </div>
    `,
  };

  // Enviar mensaje porque has olvidado la contraseña
  await sendgrid.send(message);
}

module.exports = {
    sendConfirmationMail,
    sendConfirmationMailCoworking,
    forgotPassworddMail
}
