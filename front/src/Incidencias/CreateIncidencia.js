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
    <form onSubmit={handleSubmit}>
      <h3>¿Has tenido alguna incidencia?</h3>
      <fieldset>
        Referencia de la sala:
        <input
          name="id_sala"
          required
          placeholder="añade la referencia de la sala"
          value={id_sala}
          onChange={(e) => setId_sala(e.target.value)}
        />
      </fieldset>
      <fieldset>
        Estado:
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="" hidden>
            estado...
          </option>
          <option value="activado">activado</option>
          <option value="desactivado">desactivado</option>
        </select>
      </fieldset>
      <fieldset>
        Categoría:
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="" hidden>
            categoría...
          </option>
          <option value="limpieza">limpieza</option>
          <option value="servicios">servicios</option>
          <option value="equipacion">equipación</option>
          <option value="otros">otros</option>
        </select>
      </fieldset>
      <fieldset>
        Descripción:
        <input
          name="descripcion"
          required
          placeholder="descripcion..."
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </fieldset>

      <button>Crear incidencia</button>
    </form>
  );
}

export default CreateIncidencia;
