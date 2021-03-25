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
import VerUsuario from './Usuario/VerUsuario'
import UpdateUsuario from './Usuario/UpdateUsuario'
import VerReservas from './Usuario/VerReservas'


import Reset from './Auth/Reset';

import Reservar from './Reserva/Reservar'
import UpdateReserva from './Usuario/UpdateReserva'
import BorrarReserva from './Usuario/BorrarReserva'
import VerSalas from './Coworking/VerSalas'

import CreateIncidencia from './Incidencias/CreateIncidencia';
import CreateRating from './Valoracion/CreateRating';
import Main from './Usuario/Main'






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
     
    
    </Route>
    <Route path='/coworking/:id_coworking/salas' exact>
             <VerSalas />
     
    
    </Route>
    <Route path='/reserva/:id_sala' exact>
             <Reservar />
     
    
    </Route>
    <Route path='/reserva-actualizar/:id_reserva' exact>
             <UpdateReserva />
     
    
    </Route>
    <Route path='/reserva-borrar/:id_reserva' exact>
             <BorrarReserva />
     
    
    </Route>
  

    <Route path='/usuario/:id_usuario/reservas' exact>
             <VerReservas />
       
    
    </Route>

    <Route path='/usuario' exact>
             <VerUsuario />
       
    
    </Route>
    <Route path='/actualizar-usuario' exact>
             <UpdateUsuario />
       
    
    </Route>

    <Route path='/usuario/crear-incidencia' exact>
             <CreateIncidencia />
       
    
    </Route>
    <Route path='/usuario/crear-valoracion' exact>
             <CreateRating />
       
    
    </Route>

  
        <Route path='/'>Vaya, página no encontrada </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;


