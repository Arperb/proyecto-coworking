import { Route, Switch, useHistory, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
// import ReservaUsuario from "../Reserva/MyReserva"
// import ValoracionUsuario
// import IncidenciaUsuario
// import useFetch from "../useFetch"




function PerfilUsuario() {
    const { id_usuario } = useParams()

    const usuarioData = useFetch(`http://localhost:9999/usuario/${id_usuario}`) || []
    const usuario = usuarioData[0]

    const login = useSelector(s => s.login)

    const history = useHistory()

    const handleUpdate = e => {
        e.preventDefault()
        history.push(`/usuario/${id_usuario}`)
    }

    return (
        <div className='profileContainer'>
            <h1>Tus datos</h1>
            <div className='profileUsuario'>
                {usuario &&
                    <div className='usuarioDataContainer'>
                        <div className='avatar' style={usuario && usuario.foto &&
                            { backgroundFoto: 'url(' + `http://localhost:9999/images/${usuario.foto}.jpg` + ')' }} />
                        <ul>
                            <li><b>{usuario.nombre}</b></li>
                            <li>Nif_cif <b>{usuario.nif_cif}</b></li>
                            <li>Teléfono <b>{usuario.telefono}</b></li>
                            <li>Bio<b>{usuario.bio}</b></li>
                        </ul>
                        <button onClick={handleUpdate}>Actualizar</button>
                    </div>}
                <div className='tabsContainer'>
                    <div>
                        <Tabs />
                    </div>
                    <Switch>
                        <Route path={`/usuario/:id/Coworking`}>
                            <div className='tabOption'>
                                <MyCoworkings />
                            </div>
                        </Route>
                        <Route path={`/usuario/${id}/Reservas`}>
                            <div className='tabOption'>
                                <MyReserva />
                            </div>
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default Profile