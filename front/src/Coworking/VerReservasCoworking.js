import useFetch from '../useFetch'
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import { NavLink,useParams } from "react-router-dom";



function VerReservasCoworking() {

   
    const login = useSelector(s => s.login)
    const { id_coworking } = useParams();
    //const { usuario, token} = useSelector((s) => s.login);
    let id_usuario = login.usuario.id_usuario
    console.log(id_usuario)
   
 
    const reservas = useFetch (`http://localhost:9999/coworking/${id_coworking}/reservas`) || []

    
  

  return (
    
    <div className="section reservas coworking">
      
       
      <h2>Reservas</h2>
      {!reservas && 'Cargando...'}
      { reservas &&
        <table>
        <thead>
          <tr>
            <th>id_sala</th>
            <th>tipo</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map(reserva => {
           
            return (
              <tr key={reserva.id_coworking}>
 
                <td>{reserva.id_sala}</td>
                <td>{reserva.tipo}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      
    }

              
  </div>
);
}

export default VerReservasCoworking;