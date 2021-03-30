import useFetch from '../useFetch'
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
//import BorrarUsuario from './BorrarUsuario';




function VerUsuarioCoworking() {

 const [coworking, setCoworking] = useState({})
 const login = useSelector(s => s.login)
 //const { usuario, token} = useSelector((s) => s.login);
 let id_usuario = login.usuario.id_usuario
 console.log(id_usuario)

 async function getCoworking(id_usuario) {
 const res = await fetch (`http://localhost:9999/usuario/${id_usuario}/coworking`, {
        headers:{"Content-Type":"application/json",
                 Authorization:login.token}
 })
 const data = await res.json();    
 return data
 }

 useEffect(() => {
   getCoworking(id_usuario).then(response =>{
       setCoworking(response)
       
   }) 
   
  
 },[])
 console.log(coworking)
return(
    <div className="section coworking">
       <h2>Coworking</h2>
       {!coworking && 'cargando' }
       
       
       
       
 <div key={coworking.id_coworking}>
                
                  <div>Nombre:
                      {coworking.nombre}</div>
                   <div>Teléfono:
                       {coworking.telefono}</div>
                   <div>Dirección:
                       {coworking.direccion}</div>
                   <div>Ciudad:
                       {coworking.ciudad}</div>
                   <div>Provincia:
                       {coworking.provincia}</div>
                   <div>Descripción:
                       {coworking.descripcion}</div>
                   <div>WIfi:
                       {coworking.wifi}</div>
                   <div>Limpieza:
                       {coworking.limpieza}</div>
                   <div>Parking:
                       {coworking.parking}</div>
                   <div>Web:
                       {coworking.web}</div>
                
                   </div>
                   <NavLink to={`/coworking/${coworking.id_coworking}/salas`}>
                Ver salas
              </NavLink>
                   <NavLink to={`/coworking-actualizar/${coworking.id_coworking}`}>
                 Actualizar datos coworking
              </NavLink>
              <NavLink to={`/foto-coworking/${coworking.id_coworking}`}>
                 Actualizar fotos coworking
              </NavLink>
              <NavLink to={`/coworking-borrar/${coworking.id_coworking}`}>
                Borrar coworking
              </NavLink>
              <NavLink to={`/coworking/${coworking.id_coworking}/reservas`}>
                Ver reservas coworking
              </NavLink>
       
       
       </div>
     


)}

export default VerUsuarioCoworking;