import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./UpdateSala.css";

function UpdateSala() {
  const login = useSelector((s) => s.login);
  let id_usuario = login.usuario.id_usuario;

  const { id_sala, id_coworking } = useParams();

  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [tarifa, setTarifa] = useState("");
  const [tarifa_tipo, setTarifa_tipo] = useState("");
  const [disponibilidad, setDisponibilidad] = useState("");
  const [proyector, setProyector] = useState("");
  const [impresora, setImpresora] = useState("");

  const [error, setError] = useState(false);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const res = fetch(`http://localhost:9999/actualizar-sala/${id_sala}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: login.token,
      },
      body: JSON.stringify({
        tipo,
        descripcion,
        capacidad,
        tarifa,
        tarifa_tipo,
        disponibilidad,
        proyector,
        impresora,
      }),
    });
    if (res.ok) {
      history.push(`/coworking/${id_coworking}/sala`);
    } else {
      setError(true);
      console.log("Ha habido un error");
    }
  };

  return (
    <div className="section sala">
      <form className="formupdatesale" onSubmit={handleSubmit}>
        <label>
          <span>Tipo:</span>
          <input
            name="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />
        </label>
        <label>
          <span>Descripción:</span>
          <input
            name="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </label>
        <label>
          <span>Capacidad:</span>
          <input
            name="capacidad"
            value={capacidad}
            onChange={(e) => setCapacidad(e.target.value)}
          />
        </label>
        <label>
          <span>Tarifa:</span>
          <input
            name="tarifa"
            value={tarifa}
            onChange={(e) => setTarifa(e.target.value)}
          />
        </label>
        <label>
          <span>Tipo de tarifa:</span>
          <input
            name="tarifa_tipo"
            value={tarifa_tipo}
            onChange={(e) => setTarifa_tipo(e.target.value)}
          />
        </label>
        <label>
          <span>Disponibilidad:</span>
          <input
            name="disponibilidad"
            value={disponibilidad}
            onChange={(e) => setDisponibilidad(e.target.value)}
          />
        </label>
        <label>
          <span>Proyector:</span>
          <input
            name="proyector"
            value={proyector}
            onChange={(e) => setProyector(e.target.value)}
          />
        </label>
        <label>
          <span>Impresora:</span>
          <input
            name="impresora"
            value={impresora}
            onChange={(e) => setImpresora(e.target.value)}
          />
        </label>

        <button className="buttonupdate">Actualizar</button>
      </form>
    </div>
  );
}

export default UpdateSala;
