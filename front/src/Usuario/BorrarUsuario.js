import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./BorrarUsuario.css";

function BorrarUsuario({}) {
  const login = useSelector((s) => s.login);

  const history = useHistory();
  let id_usuario = login.usuario.id_usuario;

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:9999/usuario/${id_usuario}`, {
      method: "DELETE",
      headers: { Authorization: login.token },
    });
    if (res.ok) {
      history.push(`/usuario/${id_usuario}`);
    } else {
      console.log("Ha habido un error");
    }
  };

  return (
    <div className="byebye">
      <div
        className="deleteUsuarioButton"
        onClick={(e) => {
          if (window.confirm("¿Seguro que lo quieres eliminar?"))
            handleDelete(e);
        }}
      >
        Borrar
      </div>
    </div>
  );
}

export default BorrarUsuario;
