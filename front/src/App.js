import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';

import Header from './Header';
import Home from './Home/Home';
import CreateCoworking from './Coworking/CreateCoworking'
import CreateSala from './Sala/CreateSala'

import Login from './Auth/Login';
import Recovery from './Auth/Recovery';
import Register from './Auth/Register';

import Buscador from './Buscador/Buscador';
import VerCoworking from './Coworking/VerCoworking'

import Reset from './Auth/Reset';






import Map from './Contacto/Map';
import Contacto from './Contacto/Contacto'


import Footer from './Footer';

function App() {

  const login = useSelector(s => s.login)

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path='/' exact>
          <Home /> 
          <Map/>
          <Contacto/>      
        </Route>
        <Route path='/Contacto'>
          <Contacto/>
        </Route>
        <Route path='/Login' exact>
          <Login />
        </Route>
        <Route path='/Register' exact>
          <Register />
        </Route>
        <Route path='/recovery' exact>
          <Recovery />
        </Route>
        <Route path='/reset/:code' exact>
          <Reset />
        </Route>
        <Route path='/buscador' exact>
          <div className='buscador'>
            <Buscador />
          </div>
        </Route>
        <Route path='/crear-coworking' exact>
        
            <CreateCoworking />
        
        </Route>
     
        <Route path='/coworking/:id_coworking/CreateSala' exact>
        
            <CreateSala />
        
        </Route>

        <Route path='/coworking/:id_coworking' exact>
             <VerCoworking />
        <CreateSala />
    
    </Route>
     
        <Route path='/'>Vaya, página no encontrada </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;


