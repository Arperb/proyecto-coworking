import { useState } from 'react'
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import './UpdateValoracion.css'


function UpdateValoracion() {
    const login = useSelector((s) => s.login);
    let id_usuario = login.usuario.id_usuario
   
    const { id_rating } = useParams();
   
  const [id_reserva, setId_reserva] = useState("");
  const [valoracion, setValoracion] = useState("");
  const [error, setError] = useState(false)

  const history = useHistory()

  const handleSubmit = e => {
    e.preventDefault()
   
    const res = fetch(`http://localhost:9999/rating-actualizar/${id_rating}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: login.token,
      },
      body: JSON.stringify({
       
         id_reserva,
         valoracion,
      }),
    })
    if (res.ok) {
        history.push(`/rating-actualizar/${id_rating}`)
    } else {
        setError(true)
        console.log('Ha habido un error')
    }
}



 

  return (
    <div className="section valoracion">
     
      <form onSubmit={handleSubmit}>
     
      
        <label>
          <span>Id_reserva:</span>
          <input
            name="id_reserva"
            value={id_reserva}
            onChange={e => setId_reserva(e.target.value)}
          />
        </label>
        <label>
          <span>Valoración:</span>
          <input
            name="valoracion"
            value={valoracion}
            onChange={e => setValoracion(e.target.value)}
          />
        </label>
      
        <button>Actualizar</button>
      </form>
    </div>
  );
}

export default UpdateValoracion;