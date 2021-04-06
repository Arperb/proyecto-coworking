import useFetch from "../useFetch";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import CarouselCwk from "../Coworking/CarouselCwk";
//import BorrarUsuario from './BorrarUsuario';
import "./VerUsuarioCoworking.css";

function VerUsuarioCoworking() {
  const [coworking, setCoworking] = useState({});
  const login = useSelector((s) => s.login);
  //const { usuario, token} = useSelector((s) => s.login);
  let id_usuario = login.usuario.id_usuario;
  console.log(id_usuario);

  async function getCoworking(id_usuario) {
    const res = await fetch(
      `http://localhost:9999/usuario/${id_usuario}/coworking`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: login.token,
        },
      }
    );
    const data = await res.json();
    return data;
  }

  useEffect(() => {
    getCoworking(id_usuario).then((response) => {
      setCoworking(response);
    });
  }, []);
  console.log(coworking);
  return (
    <div className="section coworking-ver">
      {!coworking && "cargando"}

      <div className="datos-coworking">
        <div key={coworking.id_coworking}>
          <h2>Los datos de tu coworking:</h2>
          <div>
            <span>Nombre:</span>
            {coworking.nombre}
          </div>
          <div>
            <span>Teléfono:</span>
            {coworking.telefono}
          </div>
          <div>
            <span>Dirección:</span>
            {coworking.direccion}
          </div>
          <div>
            <span>Ciudad:</span>
            {coworking.ciudad}
          </div>
          <div>
            <span>Provincia:</span>
            {coworking.provincia}
          </div>
          <div>
            <span>Descripción:</span>
            {coworking.descripcion}
          </div>
          <div>
            <span>Wifi:</span>
            {coworking.wifi}
          </div>
          <div>
            <span>Limpieza:</span>
            {coworking.limpieza}
          </div>
          <div>
            <span>Parking:</span>
            {coworking.parking}
          </div>
          <div>
            <span>Web:</span>
            {coworking.web}
          </div>
        </div>
        <div className="carousel">
          <CarouselCwk id={coworking.id_coworking} />
        </div>
      </div>
      <div className="botones-ver">
        <NavLink to={`/coworking/${coworking.id_coworking}/sala`}>
          VER SALAS
        </NavLink>
        <NavLink to={`/coworking-actualizar/${coworking.id_coworking}`}>
          ACTUALIZAR DATOS
        </NavLink>
        <NavLink to={`/coworking-borrar/${coworking.id_coworking}`}>
          BORRAR
        </NavLink>
        <NavLink to={`/coworking/${coworking.id_coworking}/reservas`}>
          VER RESERVAS
        </NavLink>
        <NavLink to={`/coworking/${coworking.id_coworking}/incidencias`}>
          VER INCIDENCIAS
        </NavLink>
        <NavLink to={`/coworking/${coworking.id_coworking}/rating`}>
          VER VALORACIONES
        </NavLink>
      </div>
    </div>
  );
}

export default VerUsuarioCoworking;
