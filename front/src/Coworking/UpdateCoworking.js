import useFetch from "../useFetch";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./UpdateCoworking.css";
import CoworkingFoto from "./CoworkingFoto";

function UpdateCoworking({ coworking }) {
  const login = useSelector((s) => s.login);
  let id_usuario = login.usuario.id_usuario;

  const { id_coworking } = useParams();

  const [nombre, setNombre] = useState(coworking.nombre || "");
  const [telefono, setTelefono] = useState(coworking.telefono || "");
  const [direccion, setDireccion] = useState(coworking.direccion || "");
  const [ciudad, setCiudad] = useState(coworking.ciudad || "");
  const [provincia, setProvincia] = useState(coworking.provincia || "");
  const [descripcion, setDescripcion] = useState(coworking.descripcion || "");
  const [wifi, setWifi] = useState(coworking.wifi || "");
  const [limpieza, setLimpieza] = useState(coworking.limpieza || "");
  const [parking, setParking] = useState(coworking.parking || "");
  const [web, setWeb] = useState(coworking.web || "");

  const [error, setError] = useState(false);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const res = fetch(
      `http://localhost:9999/coworking-actualizar/${id_coworking}`,
      {
        method: "PUT",
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
      }
    );
    if (res.ok) {
      history.push(`/usuario/coworking`);
    } else {
      setError(true);
      console.log("Ha habido un error");
    }
  };

  return (
    <div className="section coworking">
      <CoworkingFoto />
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nombre:</span>
          <input
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>
        <label>
          <span>Teléfono:</span>
          <input
            name="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </label>
        <label>
          <span>Dirección:</span>
          <input
            name="direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </label>
        <label>
          <span>Ciudad:</span>
          <input
            name="ciudad"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
          />
        </label>
        <label>
          <span>Provincia:</span>
          <input
            name="provincia"
            value={provincia}
            onChange={(e) => setProvincia(e.target.value)}
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
          <span>Wifi:</span>
          <input
            name="wifi"
            value={wifi}
            onChange={(e) => setWifi(e.target.value)}
          />
        </label>
        <label>
          <span>Limpieza:</span>
          <input
            name="limpieza"
            value={limpieza}
            onChange={(e) => setLimpieza(e.target.value)}
          />
        </label>
        <label>
          <span>Parking:</span>
          <input
            name="parking"
            value={parking}
            onChange={(e) => setParking(e.target.value)}
          />
        </label>
        <label>
          <span>Web:</span>
          <input
            name="web"
            value={web}
            onChange={(e) => setWeb(e.target.value)}
          />
        </label>

        <button className="applychanges">Actualizar</button>
      </form>
    </div>
  );
}

function UpdateCoworkingWrapper() {
  const login = useSelector((s) => s.login);
  let id_usuario = login.usuario.id_usuario;
  const coworking = useFetch(
    `http://localhost:9999/usuario/${id_usuario}/coworking`
  );
  if (!coworking) return "Loading...";
  return <UpdateCoworking coworking={coworking} />;
}

export default UpdateCoworkingWrapper;
