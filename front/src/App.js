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
import BorrarUsuario from './Usuario/BorrarUsuario'
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
import VerIncidenciasCoworking from './Coworking/VerIncidenciasCoworking';
import VerValoracionCoworking from './Coworking/VerValoracionCoworking';
import PerfilFoto from './Usuario/PerfilFoto';





import SliderSlick from './Coworking/SliderSlick';

import ErrorBoundary from './ErrorBoundary';
import CarouselCwk from './Coworking/CarouselCwk';
import VerValoracionMediaCoworking from './Coworking/VerValoracionMediaCoworking';
import VerSalasCoworking from './Sala/VerSalasCoworking';
import UpdateSala from './Sala/UpdateSala';
import BorrarSala from './Sala/BorrarSala';
import VerValoracionMediaSala from './Sala/VerValoracionMediaSala';
import Update from './Auth/Update';



function App() {

  const login = useSelector(s => s.login)

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path='/' exact>
          <Home />
          <Map />
          <Contacto />
        </Route>
        <Route path='/Contacto'>
          <Contacto />
        </Route>
        <Route path='/Login' exact>
          <Login />
        </Route>
        <Route path='/Register' exact>
          <Register />
        </Route>
        <Route path='/usuario/recover-contrasena' exact>
          <Recovery />
        </Route>
        <Route path='/usuario/update-reset-contrasena/:code' exact>
          <Reset />
        </Route>
        <Route path='/usuario/:id_usuario/update-contrasena' exact>
          <Update />
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
        <Route path='/coworking/:id_coworking/incidencias' exact>
          <VerIncidenciasCoworking />
        </Route>
        <Route path='/coworking/:id_coworking/rating' exact>
          <VerValoracionCoworking />
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
        <Route path='/coworking/:id_coworking/AvgRating' exact>
          <VerValoracionMediaCoworking />
        </Route>

        <Route path='/coworking/:id_coworking/sala' exact>
          <VerSalasCoworking />
        </Route>
        <Route path='/actualizar-sala/:id_sala' exact>
          <UpdateSala />
        </Route>
        <Route path='/borrar-sala/:id_sala' exact>
          <BorrarSala />
        </Route>
        <Route path='/sala/:id_sala/avgRating' exact>
          <VerValoracionMediaSala />
        </Route>

        <Route path='/usuario' exact>
          <VerUsuario />
        </Route>
        <Route path='/actualizar-usuario' exact>
          <UpdateUsuario />
        </Route>
        <Route path='/usuario/:id_usuario' exact>
          <BorrarUsuario />
        </Route>
        <Route path='/usuario/:id_usuario/profile' exact>
          <PerfilFoto />
        </Route>

        <Route path='/incidencia' exact>
          <CreateIncidencia />
        </Route>
        <Route path='/usuario/:id_usuario/incidencias' exact>
          <VerIncidencia />
        </Route>
        <Route path='/incidencia-actualizar/:id_incidencia' exact>
          <UpdateIncidencia />
        </Route>
        <Route path='/incidencia-borrar/:id_incidencia' exact>
          <BorrarIncidencia />
        </Route>

        <Route path='/rating' exact>
          <CreateRating />
        </Route>
        <Route path='/usuario/:id_usuario/rating' exact>
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


