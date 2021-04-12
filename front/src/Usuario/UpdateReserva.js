import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function UpdateReserva() {
  const login = useSelector((s) => s.login);
  let id_usuario = login.usuario.id_usuario;
  const Swal = require("sweetalert2");
  const { id_reserva } = useParams();

  const [fecha_inicio, setFecha_inicio] = useState("");
  const [fecha_fin, setFecha_fin] = useState("");

  const [error, setError] = useState(false);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const res = fetch(
      `http://localhost:9999/reserva-actualizar/${id_reserva}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: login.token,
        },
        body: JSON.stringify({
          fecha_inicio,
          fecha_fin,
        }),
      }
    );
    if (res.ok) {
      history.push(`/`);
    } else {
      setError(true);
      console.log("Ha habido un error");
    }
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Reserva modificada con éxito",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="section reserva">
      <form onSubmit={handleSubmit}>
        <label>
          <span>Fecha inicio:</span>
          <input
            type="date"
            name="fecha_inicio"
            value={fecha_inicio}
            onChange={(e) => setFecha_inicio(e.target.value)}
          />
        </label>
        <label>
          <span>Fecha fin:</span>
          <input
            type="date"
            name="fecha_fin"
            value={fecha_fin}
            onChange={(e) => setFecha_fin(e.target.value)}
          />
        </label>

        <button>Actualizar</button>
      </form>
    </div>
  );
}

export default UpdateReserva;
