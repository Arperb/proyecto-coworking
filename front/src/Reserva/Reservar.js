import {useState} from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams, NavLink } from 'react-router-dom'



function Reservar () {

    const [error, setError] = useState();
    //const [status,setStatus] = useState()
 
    const [fecha_inicio,setFecha_inicio] = useState('')
    const [fecha_fin,setFecha_fin] = useState('')
 
    const login = useSelector(s => s.login)
    const history = useHistory()
 


    const handleSubmit = async e => {
        e.preventDefault()
       // setStatus('loading')
       
      
         const res = await fetch(`http://localhost:9999/reserva`,{
                headers:{"Content-Type":"application/json",
            Authorization:login.token},
                body:JSON.stringify({fecha_inicio,fecha_fin}),
                method:'POST'
    })
    if(res.ok) {
        const { id_reseva} = await res.json();
       // history.push(`/coworking/${id_coworking}/sala`)
    } else {
        console.log('Error')
        setError(true)
    }
}
        
       

 


    return(
         <form onSubmit={handleSubmit}>
             <h3>Haz tu reserva</h3>
             <input name="fecha inicio"
             type="date"
             required
            placeholder="fecha inicio..."
             value={fecha_inicio}
            onChange= { e => setFecha_inicio(e.target.value)}
             />
              <input name="fecha fin"
                type="date"
             required
            placeholder="fecha fin..."
             value={fecha_fin}
            onChange= { e => setFecha_fin(e.target.value)}
             />

           
           
            <button>Reservar</button>

            <NavLink to = {`/`}>Pagar</NavLink>
        
         </form>
    )
 }



export default Reservar;