import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.css'
import logo from './images/logo.png'
import Main from './Usuario/Main'

function Header() {
  const login = useSelector(s => s.login)
  const dispatch = useDispatch()
  //const avatarStyle = login && login.usuario.foto && { backgroundImage: 'url(' + login.usuario.foto + ')' }
  const handleLogout = () => {
    dispatch({ type: 'logout' })
  }  

  return (
    <header>
        <Link to="/">
          <img className="logo" src={logo} alt="Galiking" />
        </Link>
          <Link className="links" to="/Buscador"><p>Coworkings</p></Link>
          <Link className="links" to="/Register"><p>Crear Cuenta</p></Link>
          <Link className="links" to="/Contacto"><p>Contacto</p></Link>
          {!login &&
            <Link to="/login">Iniciar sesión</Link>
        }
        {login &&
            <div className="usuario">
               <div className="avatar" style={login.usuario.foto && { backgroundImage: `url(http://localhost:9999/images/profile/${login.usuario.foto}.jpg)` }} />
               <div className="email">
               {login.usuario.email}
                <button onClick={handleLogout}>Cerrar sesión</button>
              </div>
            </div>
            }
       
    </header>
  );
}

export default Header;