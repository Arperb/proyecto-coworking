import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import useFetch from './useFetch';

function Usuario() {
    const listaUsuarios = useFetch('https://localhost:9999/usuario');
    const { id_usuario } = useParams()
    const dispatch = useDispatch()
    if (!listaUsuarios) return 'Loading...'
    const usuario = listaUsuarios.find(u => u.id_usuario == id_usuario)

    return (
        <div className="usuario">
            <span className="nombre">{usuario.nombre}</span>
            <div className="foto" style={{ backgroundImage: `url(${usuario.foto})` }} />
            <span className="rol">{usuario.rol}</span>
         
        </div>
    )
}

export default Usuario;



