import useFetch from '../useFetch'
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";



function VerValoracionMediaCoworking() {


    const login = useSelector(s => s.login)
    const { id_coworking } = useParams();
    //const { usuario, token} = useSelector((s) => s.login);
    let id_usuario = login.usuario.id_usuario
    console.log(id_usuario)


    const medias = useFetch(`http://localhost:9999/coworking/${id_coworking}/avgRating`) || []




    return (

        <div className="section valoracion media coworking">



            {!medias && 'Cargando...'}
            { medias &&
                <table>
                    <thead>
                        <tr>
                            <th>Valoración media coworking</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medias.map(rating => {

                            return (
                                <tr key={rating.id_coworking}>

                                    <td>{rating.coworkingRating}</td>

                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            }


        </div>
    );
}

export default VerValoracionMediaCoworking;