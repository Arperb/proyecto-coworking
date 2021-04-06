import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./BorrarValoracion.css";

function BorrarValoracion({}) {
  const login = useSelector((s) => s.login);
  const { id_rating } = useParams();
  const history = useHistory();

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
      history.push(`/rating-borrar/${id_rating}`);
    } else {
      console.log("Ha habido un error");
    }
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
