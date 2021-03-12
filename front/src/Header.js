import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.css'
import logo from './images/logo.png'

function Header() {
  const login = useSelector(s => s.login)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch({ type: 'logout' })
  }  

  return (
    <header>
        <Link to="/">
          <img className="logoprincipal" src={logo} alt="Galiking" />
        </Link>
        <div className="header nav">
          <Link className="links" to="/Buscador"><p>Coworkings</p></Link>
          <Link className="links" to="/Register"><p>Crear Cuenta</p></Link>
          <Link className="links" to="/Contacto"><p>Contacto</p></Link>
          {!login &&
            <Link to="/login">Iniciar sesión</Link>
        }
        {login &&
            <div>
                {login.usuario.email}
                <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
            }
        </div>
    </header>
  );
}

export default Header;