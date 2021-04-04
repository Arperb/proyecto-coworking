import useFetch from '../useFetch'
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";



function VerValoracionCoworking() {


    const login = useSelector(s => s.login)
    const { id_coworking } = useParams();
    //const { usuario, token} = useSelector((s) => s.login);
    let id_usuario = login.usuario.id_usuario
    console.log(id_usuario)


    const valoraciones = useFetch(`http://localhost:9999/coworking/${id_coworking}/rating`) || []




    return (

        <div className="section valoracion coworking">


            <h2>Valoraciones</h2>
            {!valoraciones && 'Cargando...'}
            { valoraciones &&
                <table>
                    <thead>
                        <tr>
                            <th>id_sala</th>
                            <th>id_rating</th>
                            <th>id_usuario</th>
                            <th>id_reserva</th>
                            <th>valoración</th>
                            <th>fecha de creación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {valoraciones.map(rating => {

                            return (
                                <tr key={rating.id_coworking}>

                                    <td>{rating.id_sala}</td>
                                    <td>{rating.id_rating}</td>
                                    <td>{rating.id_usuario}</td>
                                    <td>{rating.id_reserva}</td>
                                    <td>{rating.valoracion}</td>
                                    <td>{rating.fecha_creacion}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            }


        </div>
    );
}

export default VerValoracionCoworking;