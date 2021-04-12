import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./BorrarUsuario.css";
import Swal from "sweetalert2";

function BorrarUsuario({}) {
  const login = useSelector((s) => s.login);

  const history = useHistory();
  let id_usuario = login.usuario.id_usuario;
  const Swal = require("sweetalert2");
  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:9999/usuario/${id_usuario}`, {
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
      title: "Usuario borrado con éxito",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="byebye">
      <div
        onClick={(e) => {
          if (window.confirm("¿Seguro que lo quieres eliminar?"))
            handleDelete(e);
        }}
      >
        <button className="deleteUsuarioButton">Borrar Usuario</button>
      </div>
    </div>
  );
}

export default BorrarUsuario;
