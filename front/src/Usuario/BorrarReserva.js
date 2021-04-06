import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./BorrarReserva.css";

function BorrarReserva({}) {
  const login = useSelector((s) => s.login);
  const { id_reserva } = useParams();
  const history = useHistory();

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:9999/reserva-borrar/${id_reserva}`,
      {
        method: "DELETE",
        headers: { Authorization: login.token },
      }
    );
    if (res.ok) {
      history.push(`/borrar-reserva/${id_reserva}`);
    } else {
      console.log("Ha habido un error");
    }
  };

  return (
    <div className="byebook">
      <div
        className="deleteReservaButton"
        onClick={(e) => {
          if (window.confirm("¿Seguro que lo quieres eliminar tu reserva?"))
            handleDelete(e);
        }}
      >
        Borrar
      </div>
    </div>
  );
}

export default BorrarReserva;
