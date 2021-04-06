import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./Update.css";
import "../Usuario/UpdateUsuario.css";

function Update() {
  const login = useSelector((s) => s.login);
  let id_usuario = login.usuario.id_usuario;

  const [contrasena, setContrasena] = useState("");
  const [newContrasena, setNewContrasena] = useState("");
  const [newContrasenaRepeat, setNewContrasenaRepeat] = useState("");

  const [error, setError] = useState(false);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `http://localhost:9999/usuario/${id_usuario}/update-contrasena`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: login.token,
        },
        body: JSON.stringify({
          contrasena,
          newContrasena,
          newContrasenaRepeat,
        }),
      }
    );
    if (res.ok) {
      history.push(`/`);
    } else {
      setError(true);
      console.log("Ha habido un error");
    }
  };

  return (
    <div className="section actualizar-contrasena">
      <form className="passform" onSubmit={handleSubmit}>
        <label>
          <span>Contraseña:</span>
          <input
            name="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </label>
        <label>
          <span>Nueva contraseña:</span>
          <input
            name="newContrasena"
            value={newContrasena}
            onChange={(e) => setNewContrasena(e.target.value)}
          />
        </label>
        <label>
          <span>Repite la nueva contraseña:</span>
          <input
            name="newContrasenaRepeat"
            value={newContrasenaRepeat}
            onChange={(e) => setNewContrasenaRepeat(e.target.value)}
          />
        </label>

        <button className="updatepass">Actualizar contraseña</button>
      </form>
    </div>
  );
}

export default Update;
