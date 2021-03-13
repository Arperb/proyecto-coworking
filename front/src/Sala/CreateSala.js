import {useState} from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'



function CreateSala() {

  
    const [status,setStatus] = useState()
    const { id_coworking } = useParams()
    const [tipo,setTipo] = useState('')
    const [descripcion,setDescripcion] = useState('')
    const [capacidad,setCapacidad] = useState('')
    const [tarifa,setTarifa] = useState('')
    const [tarifa_tipo,setTarifa_tipo] = useState('')
    const [disponibilidad,setDisponibilidad] = useState('')
    const [proyector,setProyector] = useState('')
    const [impresora,setImpresora] = useState('')

    const { usuario, token } = useSelector(s => s.login)
    const history = useHistory()
 


    const handleSubmit = async e => {
        e.preventDefault()
        setStatus('loading')
        //let id_usuario = usuario.id_usuario
      
         const ret = await fetch('http://localhost:9999/sala',{
                headers:{'Content-Type':'application/json',
            'Authorization':token},
                body:JSON.stringify({id_coworking,tipo,descripcion,capacidad,tarifa,tarifa_tipo,disponibilidad,proyector,impresora}),
                method:'POST'
    })
    if(ret.ok) {
        history.push(`/coworking/${id_coworking}`)
    } else {
        console.log('Error')
        setStatus(true)
    }
}
        
       

 


    return(
        <form onSubmit={handleSubmit}>
            <h3>Registra las salas de tu coworking</h3>
            <input name="tipo"
            required
            placeholder="tipo de sala..."
            value={tipo}
            onChange= { e => setTipo(e.target.value)}
            />
             <input name="descripcion"
            required
            placeholder="descripcion..."
            value={descripcion}
            onChange= { e => setDescripcion(e.target.value)}
            />
            <input name="capacidad"
            required
            placeholder="capacidad..."
            value={capacidad}
            onChange= { e => setCapacidad(e.target.value)}
            />
             <input name="tarifa"
            required
            placeholder="tarifa..."
            value={tarifa}
            onChange= { e => setTarifa(e.target.value)}
            />
             <input name="tarifa_tipo"
            required
            placeholder="mensual..."
            value={tarifa_tipo}
            onChange= { e => setTarifa_tipo(e.target.value)}
            />
             <input name="disponibilidad"
            required
            placeholder="limpio o pendiente de limpieza"
            value={disponibilidad}
            onChange= { e => setDisponibilidad(e.target.value)}
            />
            <input name="proyector"
            placeholder="¿dispone de proyector?..."
            value={proyector}
            onChange= { e => setProyector(e.target.value)}
            />
            <input name="impresora"
            placeholder="¿dispone de impresora?..."
            value={impresora}
            onChange= { e => setImpresora(e.target.value)}
            />
           
           
            <button>Registrar sala</button>
        
        </form>
    )
}
export default CreateSala;