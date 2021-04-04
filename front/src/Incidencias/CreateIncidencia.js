import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";

function CreateIncidencia() {
  const [error, setError] = useState();

  const [id_sala, setId_sala] = useState("");
  const [estado, setEstado] = useState("activado");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const login = useSelector((s) => s.login);
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await fetch(`http://localhost:9999/incidencia`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: login.token
      },
      body: JSON.stringify({ id_sala, estado, categoria, descripcion }),
      method: 'POST'

    })

    if (res.ok) {
      const { id_incidencia } = await res.json();
      // history.push(`/coworking/${id_coworking}/sala`)
    } else {
      console.log('Error')
      setError(true)
    }
  }


  return (
    <div className="section incidencia-crear">
      <form onSubmit={handleSubmit}>
        <h3>¿Has tenido alguna incidencia?</h3>
         Id_sala:
      <input name="id_sala"
          required
          placeholder="¿en que sala?"
          value={id_sala}
          onChange={e => setId_sala(e.target.value)}
        />
         Estado
      <input name="estado"
          required
          placeholder="estado..."
          value={estado}
          onChange={e => setEstado(e.target.value)}
        />
         Categoría:
      <input name="categoria"
          required
          placeholder="categoria..."
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
        />
         Descripción:
      <input name="descripcion"
          required
          placeholder="descripcion..."
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
        />


        <button>Crear incidencia</button>



      </form>
    </div>
  )
}

export default CreateIncidencia;
