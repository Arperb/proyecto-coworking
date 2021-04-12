import { useState } from "react";
import "./Recovery.css";
import Swal from "sweetalert2";

function Recover() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const Swal = require("sweetalert2");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:9999/usuario/recover-contrasena", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      method: "POST",
    });
    setSent(true);
    Swal.fire("Revisa tu email para recuperar la contraseña");
  };
  if (sent)
    return (
      <div>Recibirás un email con los datos para recuperar tu contraseña</div>
    );

  return (
    <div className="page recovery">
      <form className="pass recover" onSubmit={handleSubmit}>
        <p className="textrecovery">Introduce tu email</p>
        <div>
          <input
            className="mailreco"
            placeholder="e-mail..."
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="passagain">Recuperar contraseña</button>
      </form>
    </div>
  );
}

export default Recover;
