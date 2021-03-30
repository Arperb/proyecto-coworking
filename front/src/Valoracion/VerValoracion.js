import useFetch from '../useFetch'
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";



function VerValoracion() {

    const [rating, setRating] = useState({})
    const login = useSelector(s => s.login)
    //const { usuario, token} = useSelector((s) => s.login);
    let id_usuario = login.usuario.id_usuario
    console.log(id_usuario)
   
    async function getRating(id_usuario) {
    const res = await fetch (`http://localhost:9999/usuario/${id_usuario}/rating`, {
           headers:{"Content-Type":"application/json",
                    Authorization:login.token}
    })
    const data = await res.json();    
    
    return data
    }
   
    useEffect(() => {
      getRating(id_usuario).then(response =>{
          setRating(response)
          
      }) 
      
     
    },[])

  return (
    <div className="section valoracion">
      <h2>Valoraciones</h2>
      {!rating && 'Cargando...'}
      
         <div key={rating.id_rating}>
                
         <div>
           <span>id_reserva:</span>
           {rating.id_reserva}</div>
          <div>
          <span>Valoración:</span>
            {rating.valoracion}</div>
        
          </div>
          <NavLink to={`/rating-actualizar/${rating.id_rating}`}>
                 Actualizar valoración
               
              </NavLink>
              <NavLink to={`/rating-borrar/${rating.id_rating}`}>
                Borrar valoración
              </NavLink>


</div>



)}

export default VerValoracion;