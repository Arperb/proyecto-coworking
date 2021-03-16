import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import Register from "../Auth/Register"
import Reservar from "../Reserva/Reservar"
import useFetch from "../useFetch"


function ShowHomeWrapper() {
    const { id_coworking } = useParams()
    const data = useFetch(`http://localhost:9999/coworking/${id_coworking}`)
    return data ? <VerCoworking data={data} /> : false
}

function VerCoworking({ data }) {
    const { id_coworking } = useParams()

    const login = useSelector(s => s.login)

   

    return (
        <div >
            {data.map(c =>
                <div className='verCoworkingPage'>
                    <div className='verCoworkingContainer'>
                        <h1 id='verNombre'>{c.nombre}</h1>
                        <div className='verCoworkingContenido'>
                            <div className='verDatosCoworking'>
                                <div className='coworkingFoto' style={data[0].imagen && { backgroundImage: `url(http://localhost:9999/images/${data[0].imagen}.jpg)` }} />
                                <ul key={c.id}>
                                    <li>Ciudad: <b>{c.ciudad}</b></li>
                                    <li>Provincia: <b>{c.provincia}</b></li>
                                    <li>Direccion: <b>{c.direccion}</b></li>
                                    <li>Descripción: <b>{c.descripcion}</b></li>
                                    <li>Descripción: <b>{c.descripcion}</b></li>
                                    <li>Servicios: <b>{c.wifi}</b></li>
                                    <li>Servicios: <b>{c.limpieza}</b></li>
                                    <li>Servicios: <b>{c.parking}</b></li>
                                    <li>Web: <b>{c.web}</b></li>
                                </ul>
                            </div>
                       
                          
                            {!(login) &&
                                <Register />
                            }
                            {(login) &&
                                <Reservar />
                            }
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}


export default VerCoworking;