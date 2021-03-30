import useFetch from '../useFetch'
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";



function VerReservas() {

    const [reserva, setReserva] = useState({})
    const login = useSelector(s => s.login)
    //const { usuario, token} = useSelector((s) => s.login);
    let id_usuario = login.usuario.id_usuario
    console.log(id_usuario)
   
    async function getReserva(id_usuario) {
    const res = await fetch (`http://localhost:9999/usuario/${id_usuario}/reservas`, {
           headers:{"Content-Type":"application/json",
                    Authorization:login.token}
    })
    const data = await res.json();    
    
    return data
    }
   
    useEffect(() => {
      getReserva(id_usuario).then(response =>{
          setReserva(response)
          
      }) 
      
     
    },[])

  return (
    <div className="section reservas">
      <h2>Reservas</h2>
      {!reserva && 'Cargando...'}
      
         <div key={reserva.id_reserva}>
                
         <div>
           id_reserva:
           {reserva.id_reserva}</div>
          <div>
            id_sala:
            {reserva.id_sala}</div>
          <div>
            Estado:
            {reserva.estado}</div>
          <div>
            Pago:
            {reserva.pago}</div>
          <div>Fecha inicio:
            {reserva.fecha_inicio}</div>
          <div>Fecha fin:
            {reserva.fecha_fin}</div>
          <div>Nombre:
            {reserva.nombre}</div>
       
          </div>
          <NavLink to={`/reserva-actualizar/${reserva.id_reserva}`}>
                 Actualizar reserva
               
              </NavLink>
              <NavLink to={`/reserva-borrar/${reserva.id_reserva}`}>
                Borrar reserva
              </NavLink>


</div>



)}

export default VerReservas;