
import useFetch from '../useFetch'
import { useParams, NavLink } from 'react-router-dom'
import { useSelector } from "react-redux"
import './VerSalasCoworking.css'
import VerValoracionMediaSala from './VerValoracionMediaSala'


function VerSalasCoworking() {

    const { id_coworking } = useParams()
    const salas = useFetch(`http://localhost:9999/coworking/${id_coworking}/sala`) || []

    return (
        <div className="section sala-ver">

            {!salas && 'Cargando...'}

            <div className="datos-sala">
                <h2>Salas</h2>
                {salas &&
                    <table>
                        <thead>
                            <tr>
                                <th>id_sala</th>
                                <th>Tipo</th>
                                <th>Descripción</th>
                                <th>Tarifa (€/mes)</th>
                                <th>Capacidad</th>
                                <th>Disponibilidad</th>
                                <th>Proyector</th>
                                <th>Impresora</th>

                            </tr>
                        </thead>
                        <tbody>
                            {salas.map(sala => {

                                return (
                                    <tr key={sala.id_sala}>

                                        <td>{sala.id_sala}</td>
                                        <td>{sala.tipo}</td>
                                        <td>{sala.descripcion}</td>
                                        <td>{sala.tarifa}</td>
                                        <td>{sala.capacidad}</td>
                                        <td>{sala.disponibilidad}</td>
                                        <td>{sala.proyector}</td>
                                        <td>{sala.impresora}</td>

                                        <div className="botones-ver">
                                            <NavLink to={`/actualizar-sala/${sala.id_sala}`}>Modificar datos</NavLink>
                                            <NavLink to={`/borrar-sala/${sala.id_sala}`}>Borrar sala</NavLink>
                                            <NavLink to={`/sala/${sala.id_sala}/avgRating`}>Valoración media</NavLink>
                                        </div>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                }





            </div>
        </div>
    );
}

export default VerSalasCoworking;