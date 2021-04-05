import useFetch from "../useFetch";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import BorrarUsuario from "./BorrarUsuario";
import "./VerUsuario.css";

function VerUsuario() {
  const [usuario, setUsuario] = useState({});
  const login = useSelector((s) => s.login);
  //const { usuario, token} = useSelector((s) => s.login);
  let id_usuario = login.usuario.id_usuario;
  console.log(id_usuario);

  async function getUsuario(id_usuario) {
    const res = await fetch(`http://localhost:9999/usuario/${id_usuario}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: login.token,
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
  }

  useEffect(() => {
    getUsuario(id_usuario).then((response) => {
      setUsuario(response);
    });
  }, []);
  console.log(usuario);
  return (
    <div className="section users">
      {!usuario && "cargando"}

      <div className="datos-usuario">
        <div key={usuario.id_usuario}>
          <h2>Tus datos:</h2>
          {usuario.foto ? (
            <img
              src={`http://localhost:9999/images/profile/${usuario.foto}.jpg`}
            />
          ) : null}
          <div>
            <span>Email:</span>
            {usuario.email}
          </div>
          <div>
            <span>Nombre:</span>
            {usuario.nombre}
          </div>
          <div>
            <span>Teléfono</span>
            {usuario.telefono}
          </div>
          <div>
            <span>Descripción:</span>
            {usuario.bio}
          </div>
          <div>
            <span>NIF/CIF:</span>
            {usuario.nif_cif}
          </div>
          <div>
            <span>Rol:</span>
            {usuario.rol}
          </div>
        </div>
      </div>
      <div className="botones-ver">
        <NavLink className="navVerUser" to={`/actualizar-usuario`}>
          ACTUALIZAR DATOS
        </NavLink>
        <NavLink className="navVerUser" to={`/usuario/${usuario.id_usuario}`}>
          BORRAR USUARIO
        </NavLink>
      </div>
    </div>
  );
}

export default VerUsuario;
