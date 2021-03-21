import { useState } from 'react'
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import './Perfil.css'
import PerfilFoto from './PerfilFoto'

function Perfil() {
    const login = useSelector((s) => s.login);
    let id_usuario = login.usuario.id_usuario
   
  //const setMe = useSetUser()

  // Tomamos los datos del usuario actual como estado inicial
  const [nif_cif, setNif_cif] = useState(login.usuario.nif_cif || '')
  const [email, setEmail] = useState(login.usuario.email || '')
  const [telefono, setTelefono] = useState(login.usuario.telefono || '')
  const [bio, setBio] = useState(login.usuario.bio || '')
  const [nombre, setNombre] = useState(login.usuario.nombre || '')
  const [rol, setRol] = useState(login.usuario.rol || '')
  const [contrasena, setContrasena] = useState(login.usuario.contrasena || '')


  const [error, setError] = useState(false)

  const history = useHistory()

  const handleSubmit = e => {
    e.preventDefault()
   
    const res = fetch(`http://localhost:9999/usuario/${id_usuario}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: login.token,
      },
      body: JSON.stringify({
          nif_cif,
          email,
          telefono,
          bio,
          nombre,
          rol,
          contrasena,
      }),
    })
    if (res.ok) {
        history.push(`/usuario/${id_usuario}`)
    } else {
        setError(true)
        console.log('Ha habido un error')
    }
}



 

  return (
    <div className="section profile">
     
      <form onSubmit={handleSubmit}>
     
         
          <PerfilFoto />
        
      
        <label>
          <span>Nif_cif:</span>
          <input
            name="nif_cif"
            value={nif_cif}
            onChange={e => setNif_cif(e.target.value )}
          />
        </label>
        <label>
          <span>Email:</span>
          <input
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Telefono:</span>
          <input
            name="telefono"
            value={telefono}
            onChange={e => setTelefono(e.target.value)}
          />
        </label>
        <label>
          <span>Bio:</span>
          <input
            name="bio"
            value={bio}
            onChange={e => setBio(e.target.value)}
          />
        </label>
        <label>
          <span>Nombre:</span>
          <input
            name="nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </label>
        <label>
          <span>Rol:</span>
          <input
            name="rol"
            value={rol}
            onChange={e => setRol(e.target.value)}
          />
        </label>
        <label>
          <span>Contraseña:</span>
          <input
            name="contrasena"
            value={contrasena}
            onChange={e => setContrasena(e.target.value)}
          />
        </label>
        <button>Guardar</button>
      </form>
    </div>
  );
}

export default Perfil;