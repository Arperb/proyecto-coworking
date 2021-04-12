import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./BorrarValoracion.css";
import Swal from "sweetalert2";

function BorrarValoracion({}) {
  const login = useSelector((s) => s.login);
  const { id_rating } = useParams();
  const history = useHistory();
  const Swal = require("sweetalert2");

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:9999/rating-borrar/${id_rating}`,
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
      title: "Valoración borrada con éxito",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="byerate">
      <div
        className="deleteRatingButton"
        onClick={(e) => {
          if (window.confirm("¿Seguro que quieres eliminar esta valoración?"))
            handleDelete(e);
        }}
      >
        <p className="seborra">Borrar</p>
      </div>
    </div>
  );
}

export default BorrarValoracion;
