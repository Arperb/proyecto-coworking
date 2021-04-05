import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

function BorrarCoworking({}) {
  const login = useSelector((s) => s.login);
  const { id_coworking } = useParams();
  const history = useHistory();

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
      history.push(`/borrar-coworking/${id_coworking}`);
    } else {
      console.log("Ha habido un error");
    }
  };

  return (
    <div>
      <div
        className="deleteCoworkingButton"
        onClick={(e) => {
          if (window.confirm("¿Seguro que quieres eliminar este coworking?"))
            handleDelete(e);
        }}
      >
        Borrar
      </div>
    </div>
  );
}

export default BorrarCoworking;
