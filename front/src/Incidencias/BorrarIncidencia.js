import { useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"

function BorrarIncidencia({}) {

    const login = useSelector(s => s.login)
    const { id_incidencia } = useParams();
    const history = useHistory()
   

    const handleDelete = async e => {
        e.preventDefault()
        const res = await fetch(`http://localhost:9999/incidencia-borrar/${id_incidencia}`, {
            method: 'DELETE',
            headers: { 'Authorization': login.token }
        })
        if (res.ok) {
            history.push(`/incidencia-borrar/${id_incidencia}`)
        } else {
            console.log('Ha habido un error')
        }
    }

    return (
        <div>
            <div className='deleteIncidenciaButton' onClick={(e) => { if (window.confirm('¿Seguro que quieres eliminar esta incidencia?')) handleDelete(e) }}>Borrar</div>
        </div>
    )
}



export default BorrarIncidencia;