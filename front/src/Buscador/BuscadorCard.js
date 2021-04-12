import React from 'react'
import './BuscadorCard.css'
import { NavLink } from "react-router-dom";
export const BuscadorCard = ({ r }) => {

    return (
        <div className="card">

            <div className="card-content">
                <h2>{r.nombre}</h2>
                <ul>
                    <li><span>Provincia:</span>
                        {r.provincia}</li>
                    <li><span>Ciudad:</span>
                        {r.ciudad}</li>
                    <li> <span>Tarifa:</span>
                        {r.tarifa}€/mes</li>
                    <li> <span>Desde:</span>
                        {r.fecha_inicio}</li>
                    <li> <span>Hasta:</span>
                        {r.fecha_fin}</li>
                    <li><span>Capacidad:</span>
                        {r.capacidad}</li>
                    <li><span>Limpieza:</span>
                        {r.limpieza}</li>
                    <li><span>Parking:</span>
                        {r.parking}</li>
                    <li><span>Wifi:</span>
                        {r.wifi}</li>
                    <li> <span>Proyector:</span>
                        {r.proyector}</li>
                    <li><span>Impresora:</span>
                        {r.impresora}</li>
                    <li><span>Tipo de sala:</span>
                        {r.tipo}</li>
                </ul>
            </div>
            <div className="link-cwk-buscador">
                <NavLink to={`/coworking/${r.id_coworking}`}>
                    Ver coworking
                </NavLink>

            </div>
        </div>
    )
}

export default BuscadorCard;