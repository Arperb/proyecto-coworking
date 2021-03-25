import { useState } from "react";
import "./Contacto.css";

function Contacto() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");

  if (sent) {
    return <div>✉️ ¡Enviado!.Pronto nos pondremos en contacto contigo✉️ </div>;
  }
  return (
    <form className="page form" onSubmit={handleSubmit}>
      <h1>CONTACTO</h1>
      <fieldset>
        {/* <fieldset> */}
        <label className="labelform">
          Nombre
          <br></br>
          <input
            className="iguales"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        {/* </fieldset> */}
        {/* <fieldset> */}
        <label className="labelform">
          Email
          <br></br>
          <input
            className="iguales"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {/* </fieldset> */}
        {/* <fieldset> */}
        <label className="labelform">
          Envíanos tus dudas, sugerencias o consultas.
          <br></br>
          <input
            className="iduda"
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </label>
        {/* </fieldset> */}
        <button className="envioformulario">
          {" "}
          <h3>✉️ Enviar </h3>
        </button>
      </fieldset>
    </form>
  );
}

export default Contacto;
