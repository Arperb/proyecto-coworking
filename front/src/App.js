import { Route, Switch, useHistory } from 'react-router-dom';

import './App.css';

 import Header from './componentes/Header';
  import Home from './paginas/Home';
// import ShowCoworking from './Coworking/ShowCoworking'
 import Login from './componentes/Auth/Login';

import Recover from './componentes/Auth/Recover';
import Registro from './componentes/Auth/Registro';
// import CreateCoworking from './Coworking/CreateCoworking';
import Buscador from './paginas/Buscador';

import Reset from './componentes/Auth/Reset';
// import Profile from './Usuario/Profile';
// import MyCoworkings from './Coworking/MyCoworkings';
 import UpdateUsuario from './paginas/UpdateUsuario';
// import MyReserva from './Reserva/MyReserva';
// import UpdateCoworking from './Coworking/UpdateCoworking';
// import Id_reserva from './Reserva/Id_reserva';
// import Reservar from './Reserva/Reservar';
// import Acordeon from './Home/Acordeon';
// import Map from './Contacto/Map';
// import Contacto from './Contacto/Contacto'


import Footer from './componentes/Footer';

function App() {

 return (

  
    <div className="App">
      <Header />
      <Switch>
      <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/login" exact>
          <Login/>
        </Route>
        <Route path="/usuario" exact>
          <Registro/>
        </Route>
        <Route path="/usuario/recover-contrasena" exact>
          <Recover/>
        </Route>
        <Route path="/update-reset-contrasena" exact>
          <Reset/>
        </Route>
        <Route path="/usuario/${id_usuario}" exact>
          <UpdateUsuario/>
        </Route>
        <Route path="/buscador" exact>
          <Buscador/>
        </Route>
       
      </Switch>
      <Footer />
     
    </div>
  );
}

export default App;
        
       



