import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useParams, NavLink } from "react-router-dom"
import Register from "../Auth/Register"
import Reservar from "../Reserva/Reservar"

import useFetch from "../useFetch"





function VerCoworking() {
    const { id_coworking } = useParams()
    console.log(id_coworking)
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
            {data.map(c =>
                <div key={c.id_coworking} className='verCoworkingPage'>
                    <div className='verCoworkingContainer'>
                        <h1 id='verNombre'>{c.nombre}</h1>
                        <div className='verCoworkingContenido'>
                            <div className='verDatosCoworking'>

                                <ul >
                                    <li>Ciudad: <b>{c.ciudad}</b></li>
                                    <li>Provincia: <b>{c.provincia}</b></li>
                                    <li>Direccion: <b>{c.direccion}</b></li>
                                    <li>Descripción: <b>{c.descripcion}</b></li>
                                    <li>Web: <b>{c.web}</b></li>
                                    Servicios:
                                    <li>Wifi: <b>{c.wifi}</b></li>
                                    <li>Limpieza: <b>{c.limpieza}</b></li>
                                    <li>Parking: <b>{c.parking}</b></li>
                                    {id_coworking ? <img src={`http://localhost:9999/images/cwk/${id_coworking}.jpg`} /> : null}
                                </ul>
                            </div>


                            {/* {!(login) &&
                                <VerSalas />
                            }
                            {(login) &&
                                <Reservar />
                            } */}

                            <NavLink to={`/coworking/${id_coworking}/salas`}>Ver salas</NavLink>

                            <NavLink to={`/buscador`}>Volver</NavLink>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}


export default VerCoworking;