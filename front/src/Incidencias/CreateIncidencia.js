import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import "./CreateIncidencia.css";

function CreateIncidencia() {
  const [error, setError] = useState();

  const [id_sala, setId_sala] = useState("");
  const [estado, setEstado] = useState("activado");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const login = useSelector((s) => s.login);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:9999/incidencia`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: login.token,
      },
      body: JSON.stringify({ id_sala, estado, categoria, descripcion }),
      method: "POST",
    });

    if (res.ok) {
      const { id_incidencia } = await res.json();
      // history.push(`/coworking/${id_coworking}/sala`)
    } else {
      console.log("Error");
      setError(true);
    }
  };

  return (
    <div className="section incidencia-crear">
      <h3 className="tituloincidencia">¿Has tenido alguna incidencia?</h3>
      <form className="formincidencia" onSubmit={handleSubmit}>
        <p className="textincidencia">Id_sala</p>
        <input
          className="isala"
          name="id_sala"
          required
          placeholder="¿en qué sala?"
          value={id_sala}
          onChange={(e) => setId_sala(e.target.value)}
        />
        <br></br>
        <p className="textincidencia">Estado</p>
        <input
          className="isala"
          name="estado"
          required
          placeholder="estado..."
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        />
        <br></br>
        <p className="textincidencia">Categoría</p>
        <input
          className="isala"
          name="categoria"
          required
          placeholder="categoría..."
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />
        <br></br>
        <p className="textincidencia">Descripción</p>
        <input
          className="idescripcion"
          name="descripcion"
          required
          placeholder="descripción..."
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <button className="buttontocreate">Crear incidencia</button>
      </form>
    </div>
  );
}

export default CreateIncidencia;
