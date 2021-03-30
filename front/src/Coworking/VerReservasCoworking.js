import useFetch from '../useFetch'
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import { NavLink,useParams } from "react-router-dom";



function VerReservasCoworking() {

    const [sala, setSala] = useState({})
    const login = useSelector(s => s.login)
    const { id_coworking } = useParams();
    //const { usuario, token} = useSelector((s) => s.login);
    let id_usuario = login.usuario.id_usuario
    console.log(id_usuario)
   
    async function getSala(id_coworking) {
    const res = await fetch (`http://localhost:9999/coworking/${id_coworking}/reservas`, {
           headers:{"Content-Type":"application/json",
                    Authorization:login.token}
    })
    const data = await res.json();    
    
    return data
    }
   
    useEffect(() => {
      getSala(id_coworking).then(response =>{
          setSala(response)
          
      }) 
      
     
    },[])

  return (
    <div className="section reservas coworking">
      <h2>Reservas</h2>
      {!sala && 'Cargando...'}
      { sala.map &&
         <div key={sala.id_coworking}>
                
         <div>
           <span>id_sala:</span>
           {sala.id_sala}</div>
          <div>
          <span>id_usuario:</span>
            {sala.id_usuario}</div>
        
          </div>
}


</div>



)}

export default VerReservasCoworking;