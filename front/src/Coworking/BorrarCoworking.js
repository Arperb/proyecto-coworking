import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./BorrarCoworking.css";

function BorrarCoworking({}) {
  const login = useSelector((s) => s.login);
  const { id_coworking } = useParams();
  const history = useHistory();
  const Swal = require("sweetalert2");

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:9999/coworking-borrar/${id_coworking}`,
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
      title: "Coworking borrado con éxito",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div>
      <div
        className="byeCoworking"
        onClick={(e) => {
          if (window.confirm("¿Seguro que quieres eliminar este coworking?"))
            handleDelete(e);
        }}
      >
        <button className="deleteBorrarCoworking">Borrar</button>
      </div>
    </div>
  );
}

export default BorrarCoworking;
