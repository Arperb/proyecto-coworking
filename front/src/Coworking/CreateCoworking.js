import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, Redirect, Link } from 'react-router-dom'



function CreateCoworking() {

  
    //const [status,setStatus] = useState()

    const [nombre,setNombre] = useState('')
    const [telefono,setTelefono] = useState('')
    const [direccion,setDireccion] = useState('')
    const [ciudad,setCiudad] = useState('')
    const [provincia,setProvincia] = useState('')
    const [descripcion,setDescripcion] = useState('')
    const [wifi,setWifi] = useState('')
    const [limpieza,setLimpieza] = useState('')
    const [parking,setParking] = useState('')
    const [web,setWeb] = useState('')

    //const login = useSelector(s => s.login)
    //const { usuario, token } = useSelector(s => s.login)
    const [error, setError] = useState();
    const login = useSelector((s) => s.login);
    const history = useHistory()
 
    if (!login || login.usuario.rol == "cliente") {
        return <Redirect to="/" />;
      }


    const handleSubmit = async e => {
        e.preventDefault()
       // setStatus('loading')
        //let id_usuario = usuario.id_usuario
      
         const res = await fetch('http://localhost:9999/coworking',{
                headers:{"Content-Type":"application/json",
            Authorization:login.token},
                body:JSON.stringify({nombre,telefono,direccion,ciudad,provincia,descripcion,wifi,limpieza,parking,web}),
                method:'POST'
    })

    if (res.ok) {
        const { id_coworking } = await res.json();
 
        const newId = id_coworking[0].insertId
     
        history.push(`/coworking/${newId}/CreateSala`);
     
      } else {
        console.log("Error");
        setError(true);
      }
    };
        
       

 


    return(
        <form onSubmit={handleSubmit}>
            <h3>Registra tu coworking</h3>
            <input name="nombre"
            required
            placeholder="nombre coworking..."
            value={nombre}
            onChange= { e => setNombre(e.target.value)}
            />
             <input name="telefono"
            required
            placeholder="telefono coworking..."
            value={telefono}
            onChange= { e => setTelefono(e.target.value)}
            />
            <input name="direccion"
            required
            placeholder="dirección coworking..."
            value={direccion}
            onChange= { e => setDireccion(e.target.value)}
            />
             <input name="ciudad"
            required
            placeholder="ciudad..."
            value={ciudad}
            onChange= { e => setCiudad(e.target.value)}
            />
             <input name="provincia"
            required
            placeholder="provincia..."
            value={provincia}
            onChange= { e => setProvincia(e.target.value)}
            />
             <input name="descripcion"
            required
            placeholder="¿cómo es tu coworking?..."
            value={descripcion}
            onChange= { e => setDescripcion(e.target.value)}
            />
            <input name="wifi"
            placeholder="¿dispones de wifi?..."
            value={wifi}
            onChange= { e => setWifi(e.target.value)}
            />
            <input name="limpieza"
            placeholder="¿dispones de servicio de limpieza?..."
            value={limpieza}
            onChange= { e => setLimpieza(e.target.value)}
            />
             <input name="parking"
            placeholder="¿dispones de parking?..."
            value={parking}
            onChange= { e => setParking(e.target.value)}
            />
             <input name="web"
             required
            placeholder="web..."
            value={web}
            onChange= { e => setWeb(e.target.value)}
            />
           
            <button>Registrar coworking</button>
        
        </form>
    )
}
export default CreateCoworking;