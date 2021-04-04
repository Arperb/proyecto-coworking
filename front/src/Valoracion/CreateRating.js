import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams, NavLink } from 'react-router-dom'

function CreateValoracion() {

    const [error, setError] = useState();

    const [id_reserva, setId_reserva] = useState('')
    const [valoracion, setValoracion] = useState('')
    const login = useSelector(s => s.login)
    const history = useHistory()

    const handleSubmit = async e => {
        e.preventDefault()
        const res = await fetch(`http://localhost:9999/rating`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: login.token
            },
            body: JSON.stringify({ id_reserva, valoracion }),
            method: 'POST'

        })

        if (res.ok) {
            const { id_rating } = await res.json();
            // history.push(`/coworking/${id_coworking}/sala`)
        } else {
            console.log('Error')
            setError(true)
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <h3>¿Quieres valorar tu reserva?</h3>
            <span>Id_reserva:</span>
            <input name="id_reserva"
                required
                placeholder="Referencia reserva"
                value={id_reserva}
                onChange={e => setId_reserva(e.target.value)}
            />
            Valoración
            <input name="valoracion"
                required
                placeholder="1-5..."
                value={valoracion}
                onChange={e => setValoracion(e.target.value)}
            />



            <button>Crear valoración</button>



        </form>
    )
}



export default CreateValoracion;