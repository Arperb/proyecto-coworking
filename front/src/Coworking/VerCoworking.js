import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useParams, NavLink } from "react-router-dom"
import Register from "../Auth/Register"
import Reservar from "../Reserva/Reservar"

import useFetch from "../useFetch"
import CarouselCwk from "./CarouselCwk"
import CarouselInfinite from "./CarouselInfinite"
import "./VerCoworking.css";






function VerCoworking() {
    const { id_coworking } = useParams()

    const login = useSelector(s => s.login)
    const [error, setError] = useState();
    const [data, setData] = useState([])
    async function getCoworking(id_coworking) {
        const res = await fetch(`http://localhost:9999/coworking/${id_coworking}`)
        const coworking = await res.json();

        return coworking
    }

    useEffect(() => {
        getCoworking(id_coworking).then(response => {
            setData(response[0])
            console.log(response)
        })



    }, [])











    //const data = useFetch(`http://localhost:9999/coworking/${id_coworking}`)


    return (
        <div >
            {!data && 'loading'}
            {data.map(coworking =>
                <div key={coworking.id_coworking} className='verCoworkingPage'>


                    <div className='verCoworkingContainer'>
                        <h1 id='verNombre'>{coworking.nombre}</h1>

                        <div className='verCoworkingContenido'>
                            <div className='verDatosCoworking'>

                                <ul >
                                    <li>Ciudad: <b>{coworking.ciudad}</b></li>
                                    <li>Provincia: <b>{coworking.provincia}</b></li>
                                    <li>Direccion: <b>{coworking.direccion}</b></li>
                                    <li>Descripción: <b>{coworking.descripcion}</b></li>
                                    <li>Web: <b>{coworking.web}</b></li>
                                    Servicios:
                                    <li>Wifi: <b>{coworking.wifi}</b></li>
                                    <li>Limpieza: <b>{coworking.limpieza}</b></li>
                                    <li>Parking: <b>{coworking.parking}</b></li>

                                </ul>
                            </div>


                            <div className="navLinks">

                                <NavLink className="versalas" to={`/coworking/${id_coworking}/salas`}>Ver salas</NavLink>

                                <NavLink className="volverbuscador" to={`/buscador`}>Volver</NavLink>

                            </div>
                            <div className="carousel-ver-coworking">

                                <CarouselInfinite id_coworking={id_coworking} />
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </div>


    )
}


export default VerCoworking;
