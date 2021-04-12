import Reservar from "../Reserva/Reservar";
import useFetch from "../useFetch";
import { useParams, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./VerSalas.css";

function VerSalas() {
  const { id_coworking } = useParams();
  const salas =
    useFetch(`http://localhost:9999/coworking/${id_coworking}/salas`) || [];

  return (
    <div className="section VerSalas">
      <h2>Salas</h2>
      {!salas && "Cargando..."}
      {salas && (
        <table>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Tarifa (€/mes)</th>
              <th>Capacidad</th>
              <th>Disponibilidad</th>
              <th>Proyector</th>
              <th>Impresora</th>
            </tr>
          </thead>
          <tbody>
            {salas.map((sala) => {
              return (
                <tr key={sala.id_sala}>
                  <td>{sala.tipo}</td>
                  <td>{sala.descripcion}</td>
                  <td>{sala.tarifa}</td>
                  <td>{sala.capacidad}</td>
                  <td>{sala.disponibilidad}</td>
                  <td>{sala.proyector}</td>
                  <td>{sala.impresora}</td>

                  <div className="buttonReservarSala">
                    <NavLink to={`/reserva/${sala.id_sala}`}>Reservar</NavLink>
                  </div>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default VerSalas;
