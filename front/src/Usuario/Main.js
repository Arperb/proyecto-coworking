import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Switch, Route, useHistory } from "react-router-dom";
import Home from "../Home/Home";
import VerUsuario from "./VerUsuario";

import UpdateUsuario from "./UpdateUsuario";
import "./Main.css";

function Main({ children }) {
  const [open, setOpen] = useState(false);

  const login = useSelector((s) => s.login);
  const dispatch = useDispatch();

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  const history = useHistory();

  const isUser =
    login.usuario.rol == "cliente" || login.usuario.rol == "administrador";
  const isOwner =
    login.usuario.rol == "propietario" || login.usuario.rol == "administrador";

  const handleLogout = () => {
    dispatch({ type: "logout" });
    history.push("/");
  };

  return (
    <div onClick={handleOpen}>
      <button className="sesionUsuario">{children}</button>

      {open && (
        <div className="userLinks">
          <li>
            <Link to="/usuario">Ver/Borrar usuario</Link>
          </li>
          <li>
            <Link to="/actualizar-usuario">Actualizar usuario</Link>
          </li>
          {isUser && (
            <li>
              <Link to="/usuario/reservas">Ver reservas</Link>
            </li>
          )}
          {isUser && (
            <li>
              <Link to="/usuario/crear-valoracion">Crear valoración</Link>
            </li>
          )}
          {isUser && (
            <li>
              <Link to="/usuario/ver-valoracion">Ver valoración</Link>
            </li>
          )}
          {isUser && (
            <li>
              <Link to="/usuario/crear-incidencia">Crear incidencia</Link>
            </li>
          )}
          {isUser && (
            <li>
              <Link to="/usuario/ver-incidencia">Ver incidencias</Link>
            </li>
          )}
          {isOwner && (
            <li>
              <Link to="/crear-coworking">Crear coworking</Link>
            </li>
          )}
          {isOwner && (
            <li>
              <Link to="/usuario/coworking">Ver coworking</Link>
            </li>
          )}

          <button className="logout" onClick={handleLogout}>
            <p className="logouttext">Cerrar sesión</p>
          </button>
        </div>
      )}
    </div>
  );
}

export default Main;
