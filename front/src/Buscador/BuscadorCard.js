import React from 'react'
import './BuscadorCard.css'
import { NavLink } from "react-router-dom";
export const BuscadorCard = ({ r }) => {

    return (
        <div className="card">
            <div className="card-logo">
                <img src='./images/logo.png' width='100' />
            </div>
            <div className="card-content">
                {r.provincia}
                {r.ciudad}
                {r.tarifa}
                {r.fecha_inicio}
                {r.fecha_fin}
                {r.capacidad}
                {r.limpieza}
                {r.parking}
                {r.wifi}
                {r.proyector}
                {r.impresora}
                {r.tipo}
                <NavLink to={`/coworking/${r.id_coworking}`}>
                    Ver coworking
                </NavLink>
            </div>
        </div>
    )
}

export default BuscadorCard;