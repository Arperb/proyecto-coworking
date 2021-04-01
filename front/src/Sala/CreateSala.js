import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import "./CreateSala.css";

function CreateSala() {
  const [error, setError] = useState();
  //const [status,setStatus] = useState()

  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [tarifa, setTarifa] = useState("");
  const [tarifa_tipo, setTarifa_tipo] = useState("");
  const [disponibilidad, setDisponibilidad] = useState("");
  const [proyector, setProyector] = useState("");
  const [impresora, setImpresora] = useState("");

  const { id_coworking } = useParams();
  const login = useSelector((s) => s.login);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setStatus('loading')

    const res = await fetch(
      `http://localhost:9999/coworking/${id_coworking}/CreateSala`,
      {
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
        method: "POST",
      }
    );
    if (res.ok) {
      const { id_sala } = await res.json();
      // const newIdSala = id_sala[0].insertId
      // console.log(newIdSala)
      // history.push(`/coworking/${id_coworking}/sala`)
    } else {
      console.log("Error");
      setError(true);
    }
  };

  return (
    <div className="section sala">
      <form onSubmit={handleSubmit}>
        <h3>Registra las salas de tu coworking</h3>
        <fieldset>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="" hidden>
              tipo de sala
            </option>
            <option value="despacho">despacho</option>
            <option value="compartida">compartida</option>
            <option value="sala de reuniones">sala de reuniones</option>
            <option value="Sala de eventos">sala de eventos</option>
          </select>
        </fieldset>
        <fieldset>
          <input
            name="descripcion"
            required
            placeholder="descripcion..."
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <input
            name="capacidad"
            required
            placeholder="capacidad..."
            value={capacidad}
            onChange={(e) => setCapacidad(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <input
            name="tarifa"
            required
            placeholder="tarifa..."
            value={tarifa}
            onChange={(e) => setTarifa(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label>tipo de tarifa:</label>
          <select
            value={tarifa_tipo}
            onChange={(e) => setTarifa_tipo(e.target.value)}
          >
            <option value="" hidden>
              tarifa
            </option>
            <option value="mensual">mensual</option>
          </select>
        </fieldset>
        <fieldset>
          <label>Disponibilidad:</label>
          <select
            value={disponibilidad}
            onChange={(e) => setDisponibilidad(e.target.value)}
          >
            <option value="" hidden>
              disponibilidad
            </option>
            <option value="limpio">sí</option>
            <option value="pendiente de limpieza">pendiente de limpieza</option>
          </select>
        </fieldset>
        <fieldset>
          <label>proyector:</label>
          <select
            value={proyector}
            onChange={(e) => setProyector(e.target.value)}
          >
            <option value="" hidden>
              proyector
            </option>
            <option value="si">sí</option>
            <option value="no">no</option>
          </select>
        </fieldset>

        <fieldset>
          <label>impresora:</label>
          <select
            value={impresora}
            onChange={(e) => setImpresora(e.target.value)}
          >
            <option value="" hidden>
              impresora
            </option>
            <option value="si">sí</option>
            <option value="no">no</option>
          </select>
        </fieldset>

        <button>Registrar sala</button>

        <NavLink to={`/`}>He terminado</NavLink>
      </form>
    </div>
  );
}
export default CreateSala;
