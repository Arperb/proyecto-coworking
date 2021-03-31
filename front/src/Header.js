import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "./images/logo.png";
import Main from "./Usuario/Main";

function Header() {
  const login = useSelector((s) => s.login);

  //const avatarStyle = login && login.usuario.foto && { backgroundImage: 'url(' + login.usuario.foto + ')' }

  return (
    <header className="headerContainer">
      <div>
        <Link to="/">
          <img className="logo" src={logo} alt="Galiking" />
        </Link>
      </div>
      <div className="linksContainer">
        <Link className="links" to="/Buscador">
          <p>Coworkings</p>
        </Link>
        <Link className="links" to="/Register">
          <p>Crear Cuenta</p>
        </Link>
        <Link className="links" to="/Contacto">
          <p>Contacto</p>
        </Link>
        {!login && (
          <Link className="links" to="/login">
            Iniciar sesión
          </Link>
        )}
      </div>
      <div className="avatarymenu">
        {login && (
          <div className="userMenu">
            <div
              className="avatar"
              style={
                login.usuario.foto && {
                  backgroundImage: `url(http://localhost:9999/images/profile/${login.usuario.foto}.jpg)`,
                }
              }
            />
            <Main>{login.usuario.email}</Main>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
