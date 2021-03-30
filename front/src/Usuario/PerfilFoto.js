import { useState } from 'react'
import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import './UpdateUsuario.css'

function PerfilFoto() {
  const dispatch = useDispatch();
  const login = useSelector((s) => s.login);
  let id_usuario = login.usuario.id_usuario

  const [error, setError] = useState(false)

  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Como avatar no usa state, tenemos que obtenerlo de otra forma:
    const foto = e.target.elements.avatar.files[0] // avatar es el "name" del input



    // Para enviar los datos, como la imagen es un file, usamos un FormData
    const fd = new FormData()
    fd.append('foto', foto)


    // Luego hacemos un fetch normal, usando el FormData como body
    // En este caso no se pone el header content-type! Sólo el token...
    const res = await fetch(`http://localhost:9999/usuario/${id_usuario}/profile`, {
      method: 'POST',
      headers: { 'Authorization': login.token },
      body: fd
    })
    if (res.ok) {
      // Falta reducer para actualizar foto de usuario

      history.push(`/usuario`)
    } else {
      setError(true)
      console.log('Ha habido un error')
    }
  }

  // Ver Header para más info sobre la siguiente línea
  const avatarStyle = login.usuario && login.usuario.foto && { backgroundImage: `url(http://localhost:9999/images/profile/${login.usuario.foto}.jpg)` }



  return (
    <div className="section profile">
      <h2>Mi perfil</h2>
      <p>Desde aquí puedes editar tu perfil de usuario, y subir una foto de perfil.</p>
      <form onSubmit={handleSubmit}>
        <label className="avatar-picker">
          <span>Foto de perfil:</span>
          <div className="value">
            <div className="avatar" style={avatarStyle} />
            <input name="avatar" type="file" accept="image/*" />
            {/* Ojo: Los input type file no usan value/onChange! */}
          </div>
        </label>

        <button>Actualizar foto</button>
      </form>
    </div>
  );
}

export default PerfilFoto;