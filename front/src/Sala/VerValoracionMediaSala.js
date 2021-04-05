import useFetch from '../useFetch'
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";



function VerValoracionMediaSala() {


    const login = useSelector(s => s.login)
    const { id_sala } = useParams();
    //const { usuario, token} = useSelector((s) => s.login);
    let id_usuario = login.usuario.id_usuario
    console.log(id_usuario)


    const medias = useFetch(`http://localhost:9999/sala/${id_sala}/avgRating`) || []




    return (

        <div className="section valoracion media sala">



            {!medias && 'Cargando...'}
            { medias &&
                <table>
                    <thead>
                        <tr>
                            <th>Valoración media sala</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medias.map(rating => {

                            return (
                                <tr key={rating.id_sala}>

                                    <td>{rating.salaRating}</td>

                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            }


        </div>
    );
}

export default VerValoracionMediaSala;