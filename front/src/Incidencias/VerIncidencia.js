import useFetch from '../useFetch'
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";



function VerIncidencia() {

    const [incidencia, setIncidencia] = useState({})
    const login = useSelector(s => s.login)
    //const { usuario, token} = useSelector((s) => s.login);
    let id_usuario = login.usuario.id_usuario
    console.log(id_usuario)
   
    async function getIncidencia(id_usuario) {
    const res = await fetch (`http://localhost:9999/usuario/${id_usuario}/incidencias`, {
           headers:{"Content-Type":"application/json",
                    Authorization:login.token}
    })
    const data = await res.json();    
    
    return data
    }
   
    useEffect(() => {
      getIncidencia(id_usuario).then(response =>{
          setIncidencia(response)
          
      }) 
      
     
    },[])

  return (
    <div className="section reservas">
      <h2>Incidencias</h2>
      {!incidencia && 'Cargando...'}
      
         <div key={incidencia.id_incidencia}>
                
         <div>
           <span>id_sala:</span>
           {incidencia.id_sala}</div>
          <div>
          <span>Estado:</span>
            {incidencia.estado}</div>
          <div>
          <span>Categoría:</span>
            {incidencia.categoria}</div>
          <div>
          <span>Descripción:</span>
            {incidencia.descripcion}</div>
         
       
          </div>
          <NavLink to={`/incidencia-actualizar/${incidencia.id_incidencia}`}>
                 Actualizar reserva
               
              </NavLink>
              <NavLink to={`/incidencia-borrar/${incidencia.id_incidencia}`}>
                Borrar reserva
              </NavLink>


</div>



)}

export default VerIncidencia;