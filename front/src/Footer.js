import { Link } from "react-router-dom";
import "./Footer.css";
import blanco from "./images/blanco.png";
import twitter from "./images/twitter.png";
import facebook from "./images/facebook.png";
import instagram from "./images/instagram.png";
import linkedin from "./images/linkedin.png";

function Footer() {
  return (
    <footer className="Footer">
      <div className="container1">
        <div className="logo">
          <Link to="/">
            <img className="end logo" src={blanco} alt="Galiking" />
          </Link>
        </div>
      </div>
      <div className="container2">
        <Link className="finales" to="/">
          Coworking
        </Link>
        <Link className="finales" to="/">
          ¿Dónde estamos?
        </Link>
        <Link className="finales" to="/">
          ¿Por qué un coworking?
        </Link>
        <Link className="finales" to="/Registro">
          Crear Cuenta
        </Link>
        <Link className="finales" to="/Login">
          Acceso
        </Link>
      </div>
      <div className="container3">
        <h3>Contacto</h3>
        <h4>contacto@galiking.com</h4>
        <h4>teléfono:000 000 000</h4>
      </div>
      <div className="redes sociales">
        <a href="https://twitter.com" target="_blank">
          <img className="icono media" src={twitter} alt="twitter" />
        </a>
        <a href="https://facebook.com" target="_blank">
          <img className="icono media" src={facebook} alt="facebook" />
        </a>
        <a href="https://instagram.com" target="_blank">
          <img className="icono media" src={instagram} alt="instagram" />
        </a>
        <a href="https://linkedin.com" target="_blank">
          <img className="icono media" src={linkedin} alt="linkedin" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
