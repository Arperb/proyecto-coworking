import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./BorrarSala.css";
import Swal from "sweetalert2";

function BorrarSala({}) {
  const login = useSelector((s) => s.login);
  const { id_sala, id_coworking } = useParams();
  const history = useHistory();
  const Swal = require("sweetalert2");

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:9999/borrar-sala/${id_sala}`, {
      method: "DELETE",
      headers: { Authorization: login.token },
    });
    if (res.ok) {
      history.push(`/`);
    } else {
      console.log("Ha habido un error");
    }
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Sala borrada con éxito",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="erase">
      <div
        className="deleteSalaButton"
        onClick={(e) => {
          if (window.confirm("¿Seguro que quieres eliminar esta sala?"))
            handleDelete(e);
        }}
      >
        Borrar Sala
      </div>
    </div>
  );
}

export default BorrarSala;
