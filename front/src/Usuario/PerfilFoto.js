import { useState } from 'react'
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import './Perfil.css'

function PerfilFoto() {
    const login = useSelector((s) => s.login);
    let id_usuario = login.usuario.id_usuario
   
  const [error, setError] = useState(false)

  const history = useHistory()

  const handleSubmit = e => {
    e.preventDefault()
    // Como avatar no usa state, tenemos que obtenerlo de otra forma:
    const foto = e.target.foto.files[0] // avatar es el "name" del input


    // Para enviar los datos, como la imagen es un file, usamos un FormData
    const fd = new FormData()
    fd.append('foto', foto)
  

    // Luego hacemos un fetch normal, usando el FormData como body
    // En este caso no se pone el header content-type! Sólo el token...
    const res = fetch(`http://localhost:9999/usuario/${id_usuario}/profile`, {
      method: 'PUT',
      headers: { 'Authorization': login.token},
      body: fd
    })
    if (res.ok) {
        history.push(`/usuario/${id_usuario}/profile`)
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