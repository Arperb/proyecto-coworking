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
import VerUsuarioCoworking from './Usuario/VerUsuarioCoworking'
import UpdateCoworking from './Coworking/UpdateCoworking'
import BorrarCoworking from './Coworking/BorrarCoworking'
import CoworkingFoto from './Coworking/CoworkingFoto'


import Reset from './Auth/Reset';

import Reservar from './Reserva/Reservar'
import UpdateReserva from './Usuario/UpdateReserva'
import BorrarReserva from './Usuario/BorrarReserva'
import VerSalas from './Coworking/VerSalas'

import CreateIncidencia from './Incidencias/CreateIncidencia';
import VerIncidencia from './Incidencias/VerIncidencia';
import UpdateIncidencia from './Incidencias/UpdateIncidencia';
import BorrarIncidencia from './Incidencias/BorrarIncidencia';

import CreateRating from './Valoracion/CreateRating';
import VerValoracion from './Valoracion/VerValoracion';
import UpdateValoracion from './Valoracion/UpdateValoracion';
import BorrarValoracion from './Valoracion/BorrarValoracion';
import Main from './Usuario/Main'






import Map from './Contacto/Map';
import Contacto from './Contacto/Contacto'


import Footer from './Footer';
import VerReservasCoworking from './Coworking/VerReservasCoworking';




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
        <Route path='/coworking/:id_coworking/reservas' exact>
             <VerReservasCoworking />
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
  

    <Route path='/usuario/reservas' exact>
             <VerReservas />
       
    
    </Route>

    <Route path='/usuario/coworking' exact>
             <VerUsuarioCoworking />
       
    
    </Route>
    <Route path='/coworking-actualizar/:id_coworking' exact>
             <UpdateCoworking />
       
    
    </Route>
    <Route path='/foto-coworking/:id_coworking' exact>
             <CoworkingFoto />
       
    
    </Route>

    <Route path='/coworking-borrar/:id_coworking' exact>
             <BorrarCoworking />
       
    
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
    <Route path='/usuario/ver-incidencia' exact>
             <VerIncidencia />
    </Route>
    <Route path='/incidencia-actualizar/:id_incidencia' exact>
             <UpdateIncidencia />
    </Route>
    <Route path='/incidencia-borrar/:id_incidencia' exact>
             <BorrarIncidencia />
    </Route>

    <Route path='/usuario/crear-valoracion' exact>
             <CreateRating />
    </Route>
    <Route path='/usuario/ver-valoracion' exact>
             <VerValoracion />
    </Route>
    <Route path='/rating-actualizar/:id_rating' exact>
             <UpdateValoracion />
    </Route>
    <Route path='/rating-borrar/:id_rating' exact>
             <BorrarValoracion />
    </Route>

  
        <Route path='/'>Vaya, página no encontrada </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;


