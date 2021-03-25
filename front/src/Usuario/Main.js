import { Link, Switch, Route } from 'react-router-dom'
import Home from '../Home/Home'
import VerUsuario from './VerUsuario'

import Perfil from './Perfil'
import './Main.css'

function Main() {
  return (
    <div className="body">
      <aside className="navbar">
        <h2>Secciones</h2>
        <ul>
          <li><Link to="/">Portada</Link></li>
          <li><Link to="/usuario">Usuarios</Link></li>
          <li><Link to="/usuario/:id_usuario">Mi perfil</Link></li>
         
        </ul>
      </aside>
      <main>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/usuario" exact>
            <VerUsuario />
          </Route>
          <Route path="/usuario/:id_usuario" exact>
            <Perfil />
          </Route>
        
        </Switch>
      </main>
    </div>
  );
}

export default Main;