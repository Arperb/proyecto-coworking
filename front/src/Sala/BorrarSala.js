import { useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"

function BorrarSala({ }) {

    const login = useSelector(s => s.login)
    const { id_sala, id_coworking } = useParams();
    const history = useHistory()


    const handleDelete = async e => {
        e.preventDefault()
        const res = await fetch(`http://localhost:9999/borrar-sala/${id_sala}`, {
            method: 'DELETE',
            headers: { 'Authorization': login.token }
        })
        if (res.ok) {
            history.push(`/coworking/${id_coworking}/sala`)
        } else {
            console.log('Ha habido un error')
        }
    }

    return (
        <div>
            <div className='deleteSalaButton' onClick={(e) => { if (window.confirm('¿Seguro que quieres eliminar esta sala?')) handleDelete(e) }}>Borrar</div>
        </div>
    )
}



export default BorrarSala;