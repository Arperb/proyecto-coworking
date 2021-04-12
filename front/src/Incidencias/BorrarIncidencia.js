import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./BorrarIncidencia.css";
import Swal from "sweetalert2";

function BorrarIncidencia({}) {
  const login = useSelector((s) => s.login);
  const { id_incidencia } = useParams();
  const history = useHistory();
  const Swal = require("sweetalert2");

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:9999/incidencia-borrar/${id_incidencia}`,
      {
        method: "DELETE",
        headers: { Authorization: login.token },
      }
    );
    if (res.ok) {
      history.push(`/`);
    } else {
      console.log("Ha habido un error");
    }
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Incidencia borrada con éxito",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="byeincidencia">
      <div
        className="deleteIncidenciaButton"
        onClick={(e) => {
          if (window.confirm("¿Seguro que quieres eliminar esta incidencia?"))
            handleDelete(e);
        }}
      >
        <p className="noincidencia">Borrar</p>
      </div>
    </div>
  );
}

export default BorrarIncidencia;
