import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import "./Reservar.css";
import Swal from "sweetalert2";

function Reservar() {
  const { id_sala } = useParams();
  const [error, setError] = useState();
  //const [status,setStatus] = useState()

  const [fecha_inicio, setFecha_inicio] = useState("");
  const [fecha_fin, setFecha_fin] = useState("");

  const login = useSelector((s) => s.login);
  const history = useHistory();
  const Swal = require("sweetalert2");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setStatus('loading')

    const res = await fetch(`http://localhost:9999/reserva/${id_sala}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: login.token,
      },
      body: JSON.stringify({ fecha_inicio, fecha_fin }),
      method: "POST",
    });
    if (res.ok) {
      const { id_reseva } = await res.json();
      // history.push(`/coworking/${id_coworking}/sala`)
    } else {
      console.log("Error");
      setError(true);
    }
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Reserva creada con éxito, revisa tu email",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="section Reservar">
      <div className="reservaContainer">
        <form onSubmit={handleSubmit}>
          <h2>Haz tu reserva</h2>

          <label className="reservarLabel">
            <input
              name="fecha inicio"
              type="date"
              required
              placeholder="fecha inicio..."
              value={fecha_inicio}
              onChange={(e) => setFecha_inicio(e.target.value)}
            />

            <input
              name="fecha fin"
              type="date"
              required
              placeholder="fecha fin..."
              value={fecha_fin}
              onChange={(e) => setFecha_fin(e.target.value)}
            />
          </label>

          <button className="buttonReservar">Reservar</button>
        </form>
      </div>
    </div>
  );
}

export default Reservar;
