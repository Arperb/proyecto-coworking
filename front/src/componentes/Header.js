import {  useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.css'
import logo from '../images/logo.png'


function Header() {
  const login = useSelector(s => s.login)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch({ type: 'logout' })
  }
  return (
    <header className='headerContainer'>
      
        <Link to="/"><img src={logo} alt="Galiking" /></Link>
        <Link to="/buscador">Coworkings</Link>
        <Link to="/usuario">Crear Cuenta</Link>
        <Link to="/Contacto">Contacto</Link>
      {!login &&
            <Link to="/login">Iniciar sesión</Link>
        }
        {login &&
            <div>
                {login.email}
                <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
        }
    </header>
  );
}

export default Header;

