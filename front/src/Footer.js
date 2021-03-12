import { Link } from 'react-router-dom';
import './Footer.css'
import logo from './images/logo.png'
import twitter from './images/twitter.png'
import facebook from './images/facebook.png'
import instagram from './images/instagram.png'
import linkedin from './images/linkedin.png'



function Footer() {

    return (
        <footer className="Footer">
            <div className = "container1" >
            <div className="logo">
            <Link to="/">
                <img src={logo} alt="Galiking" />
            </Link>
            </div>
            <div className="redes">
            <a href="https://twitter.com" target="_blank" >
            <img src={twitter} alt="twitter" />
            </a>
            <a href="https://facebook.com" target="_blank" >
            <img src={facebook} alt="facebook"/>
            </a>
            <a href="https://instagram.com" target="_blank" >
            <img src={instagram} alt="instagram"/>
            </a>
            <a href="https://linkedin.com"target="_blank" >
            <img src={linkedin} alt="linkedin"/>
            </a>
            </div>
            </div>
            <div className = "container2" >
            <Link to="/">Coworking</Link>
            <Link to="/">¿Dónde estamos?</Link>
            <Link to="/">¿Por qué un coworking?</Link>
            <Link to="/Registro">Crear Cuenta</Link>
            <Link to="/Login">Acceso</Link>
            </div>
            <div className = "container3" >
            <h3>Contacto</h3>
            <h4>contacto@galiking.com</h4>
            <h4>teléfono:000 000 000</h4>
            </div>
            

        </footer>
    );
}

export default Footer;



