import useFetch from '../useFetch'
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import './VerReservas.css'




function VerReservas() {

  const [reserva, setReserva] = useState({})
  const login = useSelector(s => s.login)
  //const { usuario, token} = useSelector((s) => s.login);
  let id_usuario = login.usuario.id_usuario
  console.log(id_usuario)

  async function getReserva(id_usuario) {
    const res = await fetch(`http://localhost:9999/usuario/${id_usuario}/reservas`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: login.token
      }
    })
    const data = await res.json();

    return data
  }

  useEffect(() => {
    getReserva(id_usuario).then(response => {
      setReserva(response)

    })


  }, [])

  return (
    <div className="section reservas">

      {!reserva && 'Cargando...'}

      <div className="datos-reservas">

        <div key={reserva.id_reserva}>
          <h2>Reservas</h2>
          <div>
            <span>id_reserva:</span>
            {reserva.id_reserva}</div>
          <div>
            <span>id_sala:</span>
            {reserva.id_sala}</div>
          <div>
            <span> Estado:</span>
            {reserva.estado}</div>
          <div>
            <span>Pago:</span>
            {reserva.pago}</div>
          <div> <span>Fecha inicio:</span>
            {reserva.fecha_inicio}</div>
          <div> <span>Fecha fin:</span>
            {reserva.fecha_fin}</div>
          <div> <span>Nombre:</span>
            {reserva.nombre}</div>
        </div>
      </div>
      <div className="botones-ver">
        <NavLink to={`/reserva-actualizar/${reserva.id_reserva}`}>
          ACTUALIZAR RESERVA
              </NavLink>
        <NavLink to={`/reserva-borrar/${reserva.id_reserva}`}>
          BORRAR RESERVA
              </NavLink>

      </div>
    </div>



  )
}

export default VerReservas;