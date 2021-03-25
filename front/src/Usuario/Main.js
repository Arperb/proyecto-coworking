import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Switch, Route, useHistory } from 'react-router-dom'
import Home from '../Home/Home'
import VerUsuario from './VerUsuario'

import UpdateUsuario from './UpdateUsuario'
import './Main.css'

function Main({children}) {
  
  const [open, setOpen] = useState(false)

  const login = useSelector(s => s.login)
  const dispatch = useDispatch()

  const handleOpen = e => {
    e.preventDefault()
    setOpen(!open)
}

const history = useHistory()

const handleLogout = () => {
    dispatch({ type: 'logout' })
    history.push('/')
}


  return (
    <div onClick={handleOpen}>
      <button className='sesionUsuario'>{children}</button>
    
        
      {open &&
         <div className='userLinks'>
          <li><Link to="/usuario">Ver/Borrar usuario</Link></li>
          <li><Link to="/actualizar-usuario">Actualizar usuario</Link></li>
          <li><Link to="/usuario/${id_usuario}/reservas">Ver reservas</Link></li>
          <button className='logout' onClick={handleLogout}>Cerrar sesión</button>
      
          </div>
      }
     
     
    </div>
  );
}

export default Main;