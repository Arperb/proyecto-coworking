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
      {reserva &&
        <table>
          <thead>
            <tr>
              <th>id_reserva</th>
              <th>id_sala</th>
              <th>estado</th>
              <th>pago</th>
              <th>fecha_inicio</th>
              <th>fecha_fin</th>
              <th>nombre</th>
            </tr>
          </thead>
          <tbody>
                <tr key={reserva.id_reserva}>
                  <td>{reserva.id_reserva}</td>
                  <td>{reserva.id_sala}</td>
                  <td>{reserva.estado}</td>
                  <td>{reserva.pago}</td>
                  <td>{reserva.fecha_inicio}</td>
                  <td>{reserva.fecha_fin}</td>
                  <td>{reserva.nombre}</td>
                </tr>
                <NavLink to={`/reserva-actualizar/${reserva.id_reserva}`}>
                 Actualizar reserva
               
              </NavLink>
              <NavLink to={`/reserva-borrar/${reserva.id_reserva}`}>
                Borrar reserva
              </NavLink>
          </tbody>
        </table>
        
      }
      
    </div>
  );
}

export default VerReservas;