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
            <tr className="latablada">
              <th className="campos">Tipo</th>
              <th className="campos">Descripción</th>
              <th className="campos">Tarifa (€/mes)</th>
              <th className="campos">Capacidad</th>
              <th className="campos">Disponibilidad</th>
              <th className="campos">Proyector</th>
              <th className="campos">Impresora</th>
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

                  <div>
                    <NavLink
                      className="buttonReservarSala"
                      to={`/reserva/${sala.id_sala}`}
                    >
                      Reservar
                    </NavLink>
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
