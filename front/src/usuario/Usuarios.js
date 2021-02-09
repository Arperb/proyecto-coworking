import { Route, Switch, Link } from 'react-router-dom';
import Usuario from './Usuario';
import useFetch from './useFetch';


function Usuarios() {
  const listaUsuarios = useFetch('https://localhost:9999/usuario');

  if (!listaUsuarios) return <div className="usuarios">Loading...</div>

  return (
    <Switch>
      <Route path="/usuario" exact>
        <div className="usuarios">
          {listaUsuarios.map(usuario =>
            <Link key={usuario.id_usuario} className="usuario" to={`/usuario/${usuario.id_usuario}`}>
                 <span className="nombre">{usuario.nombre}</span>
              <div className="foto" style={{ backgroundImage: `url(${usuario.foto})` }} />
              <span className="rol">{usuario.rol} €</span>
            
            </Link>
          )}
        </div>
      </Route>
      <Route path="/usuario/:id_usuario" exact>
        <Usuario />
      </Route>
    </Switch>
  );
}

export default Usuarios;