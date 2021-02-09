import { Link, Switch, Route } from 'react-router-dom';
import Home from './Home/Home'
import Coworking from './coworking/Coworking'
import Usuario from './usuario/Usuario'
import Usuarios from './usuario/Usuarios'

import './App.css';

function App() {
  return (
    <div className="App">
        <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/coworking">
          <Coworking />
        </Route>
        <Route path="/usuario">
          <main>
            <Usuarios />
          </main>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
