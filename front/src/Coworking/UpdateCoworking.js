import { useState } from 'react'
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import './UpdateCoworking.css'


function UpdateCoworking() {
    const login = useSelector((s) => s.login);
    let id_usuario = login.usuario.id_usuario
   
    const { id_coworking } = useParams();
   

 
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [provincia, setProvincia] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [wifi, setWifi] = useState("");
  const [limpieza, setLimpieza] = useState("");
  const [parking, setParking] = useState("");
  const [web, setWeb] = useState("");


  const [error, setError] = useState(false)

  const history = useHistory()

  const handleSubmit = e => {
    e.preventDefault()
   
    const res = fetch(`http://localhost:9999/coworking-actualizar/${id_coworking}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: login.token,
      },
      body: JSON.stringify({
       
         nombre,
         telefono,
         direccion,
         ciudad,
         provincia,
         descripcion,
         wifi,
         limpieza,
         parking,
         web,

      }),
    })
    if (res.ok) {
        history.push(`/coworking-actualizar/${id_coworking}`)
    } else {
        setError(true)
        console.log('Ha habido un error')
    }
}



 

  return (
    <div className="section coworking">
     
      <form onSubmit={handleSubmit}>
     
      
        <label>
          <span>Nombre:</span>
          <input
            name="nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </label>
        <label>
          <span>Teléfono:</span>
          <input
            name="telefono"
            value={telefono}
            onChange={e => setTelefono(e.target.value)}
          />
        </label>
        <label>
          <span>Dirección:</span>
          <input
            name="direccion"
            value={direccion}
            onChange={e => setDireccion(e.target.value)}
          />
        </label>
        <label>
          <span>Ciudad:</span>
          <input
            name="ciudad"
            value={ciudad}
            onChange={e => setCiudad(e.target.value)}
          />
        </label>
        <label>
          <span>Provincia:</span>
          <input
            name="provincia"
            value={provincia}
            onChange={e => setProvincia(e.target.value)}
          />
        </label>
        <label>
          <span>Descripción:</span>
          <input
            name="descripcion"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
          />
        </label>
        <label>
          <span>Wifi:</span>
          <input
            name="wifi"
            value={wifi}
            onChange={e => setWifi(e.target.value)}
          />
        </label>
        <label>
          <span>Limpieza:</span>
          <input
            name="limpieza"
            value={limpieza}
            onChange={e => setLimpieza(e.target.value)}
          />
        </label>
        <label>
          <span>Parking:</span>
          <input
            name="parking"
            value={parking}
            onChange={e => setParking(e.target.value)}
          />
        </label>
        <label>
          <span>Web:</span>
          <input
            name="web"
            value={web}
            onChange={e => setWeb(e.target.value)}
          />
        </label>
        
        <button>Actualizar</button>
      </form>
    </div>
  );
}

export default UpdateCoworking;