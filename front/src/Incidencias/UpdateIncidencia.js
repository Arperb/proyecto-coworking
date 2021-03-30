import { useState } from 'react'
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import './UpdateIncidencia.css'


function UpdateIncidencia() {
    const login = useSelector((s) => s.login);
    let id_usuario = login.usuario.id_usuario
   
    const { id_incidencia } = useParams();
   

 
  const [id_sala, setId_sala] = useState("");
  const [estado, setEstado] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [error, setError] = useState(false)

  const history = useHistory()

  const handleSubmit = e => {
    e.preventDefault()
   
    const res = fetch(`http://localhost:9999/incidencia-actualizar/${id_incidencia}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: login.token,
      },
      body: JSON.stringify({
       
         id_sala,
         estado,
         categoria,
         descripcion,
      }),
    })
    if (res.ok) {
        history.push(`/incidencia-actualizar/${id_incidencia}`)
    } else {
        setError(true)
        console.log('Ha habido un error')
    }
}



 

  return (
    <div className="section incidencia">
     
      <form onSubmit={handleSubmit}>
     
      
        <label>
          <span>Id_sala:</span>
          <input
            name="id_sala"
            value={id_sala}
            onChange={e => setId_sala(e.target.value)}
          />
        </label>
        <label>
          <span>Estado:</span>
          <input
            name="estado"
            value={estado}
            onChange={e => setEstado(e.target.value)}
          />
        </label>
        <label>
          <span>Categoría:</span>
          <input
            name="categoria"
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
          />
        </label>
        <label>
          <span>Descripción:</span>
          <input
            name="descripcion"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
          />
        </label>
        
        <button>Actualizar</button>
      </form>
    </div>
  );
}

export default UpdateIncidencia;