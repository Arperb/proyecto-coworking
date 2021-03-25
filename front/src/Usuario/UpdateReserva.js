import { useState } from 'react'
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"



function UpdateReserva() {
    const login = useSelector((s) => s.login);
   
    const { id_reserva } = useParams();
   

  const [id_sala, setId_sala] = useState('');
  const [fecha_inicio, setFecha_inicio] = useState("");
  const [fecha_fin, setFecha_fin] = useState("");


  const [error, setError] = useState(false)

  const history = useHistory()

  const handleSubmit = e => {
    e.preventDefault()
   
    const res = fetch(`http://localhost:9999/reserva-actualizar/${id_reserva}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: login.token,
      },
      body: JSON.stringify({
         id_sala,
         fecha_inicio,
         fecha_fin,
      }),
    })
    if (res.ok) {
        history.push(`/reserva-actualizar/${id_reserva}`)
    } else {
        setError(true)
        console.log('Ha habido un error')
    }
}



 

  return (
    <div className="section reserva">
     
      <form onSubmit={handleSubmit}>
     
        <label>
          <span>id_sala:</span>
          <input
            name="id_sala"
            value={id_sala}
            onChange={e => setId_sala(e.target.value )}
          />
        </label>
        <label>
          <span>Fecha inicio:</span>
          <input
            type="date"
            name="fecha_inicio"
            value={fecha_inicio}
            onChange={e => setFecha_inicio(e.target.value)}
          />
        </label>
        <label>
          <span>Fecha fin:</span>
          <input
            type="date"
            name="fecha_fin"
            value={fecha_fin}
            onChange={e => setFecha_fin(e.target.value)}
          />
        </label>
        
        <button>Actualizar</button>
      </form>
    </div>
  );
}

export default UpdateReserva;