import useFetch from '../useFetch'
import { useState } from 'react'
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import './UpdateIncidencia.css'


function UpdateIncidencia({ incidencia }) {
  const login = useSelector((s) => s.login);
  let id_usuario = login.usuario.id_usuario

  const { id_incidencia } = useParams();



  const [id_sala, setId_sala] = useState(incidencia.id_sala || "");
  const [estado, setEstado] = useState(incidencia.estado || "");
  const [categoria, setCategoria] = useState(incidencia.categoria || "");
  const [descripcion, setDescripcion] = useState(incidencia.descripcion || "");

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

function UpdateIncidenciaWrapper() {
  const login = useSelector(s => s.login)
  let id_usuario = login.usuario.id_usuario
  const incidencia = useFetch(`http://localhost:9999/usuario/${id_usuario}/incidencias`)
  if (!incidencia) return "Loading..."
  return <UpdateIncidencia incidencia={incidencia} />
}

export default UpdateIncidenciaWrapper;