import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, Redirect, Link } from "react-router-dom";
import "./CreateCoworking.css";

function CreateCoworking() {
  //const [status,setStatus] = useState()

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [provincia, setProvincia] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [wifi, setWifi] = useState("");
  const [limpieza, setLimpieza] = useState("");
  const [parking, setParking] = useState("");
  const [web, setWeb] = useState("");

  //const login = useSelector(s => s.login)
  //const { usuario, token } = useSelector(s => s.login)
  const [error, setError] = useState();
  const login = useSelector((s) => s.login);
  const history = useHistory();

  if (!login || login.usuario.rol == "cliente") {
    return <Redirect to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setStatus('loading')
    //let id_usuario = usuario.id_usuario

    const res = await fetch("http://localhost:9999/coworking", {
      headers: {
        "Content-Type": "application/json",
        Authorization: login.token,
      },
      body: JSON.stringify({
        nombre,
        telefono,
        direccion,
        ciudad,
        provincia,
        descripcion,
        wifi,
        limpieza,
        parking,
        web,
      }),
      method: "POST",
    });

    if (res.ok) {
      const { id_coworking } = await res.json();
      const newId = id_coworking[0].insertId;

      history.push(`/coworking/${newId}/CreateSala`);
    } else {
      console.log("Error");
      setError(true);
    }
  };

  return (
    <div className="section coworking">
      <form onSubmit={handleSubmit}>
        <h3>Registra tu coworking</h3>
        <fieldset>
          <input
            name="nombre"
            required
            placeholder="nombre coworking..."
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            name="telefono"
            required
            placeholder="telefono coworking..."
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />

          <input
            name="direccion"
            required
            placeholder="dirección coworking..."
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />

          <input
            name="ciudad"
            required
            placeholder="ciudad..."
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
          />
          <select
            id="provincia"
            value={provincia}
            onChange={(e) => setProvincia(e.target.value)}
          >
            <option value="" hidden>
              Provincia...
            </option>
            <option value="A Coruña">A Coruña</option>
            <option value="Lugo">Lugo</option>
            <option value="Ourense">Ourense</option>
            <option value="Pontevedra">Pontevedra</option>
          </select>
        </fieldset>
        <fieldset>
          <input
            name="descripcion"
            required
            placeholder="¿cómo es tu coworking?..."
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label>¿Dispones de wifi?</label>
          <select value={wifi} onChange={(e) => setWifi(e.target.value)}>
            <option value="" hidden>
              wifi
            </option>
            <option value="si">sí</option>
            <option value="no">no</option>
          </select>

          <label>¿Dispones de servicio de limpieza?</label>
          <select
            value={limpieza}
            onChange={(e) => setLimpieza(e.target.value)}
          >
            <option value="" hidden>
              limpieza
            </option>
            <option value="si">sí</option>
            <option value="no">no</option>
          </select>

          <label>¿Dispones de parking?</label>
          <select value={parking} onChange={(e) => setParking(e.target.value)}>
            <option value="" hidden>
              parking
            </option>
            <option value="si">sí</option>
            <option value="no">no</option>
          </select>
        </fieldset>
        <fieldset>
          <input
            name="web"
            required
            placeholder="web..."
            value={web}
            onChange={(e) => setWeb(e.target.value)}
          />
        </fieldset>

        <button>Registrar coworking</button>
      </form>
    </div>
  );
}
export default CreateCoworking;
