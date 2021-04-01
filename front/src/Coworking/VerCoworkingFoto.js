import useFetch from '../useFetch'
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";



function VerCoworkingFoto() {


    const login = useSelector(s => s.login)
    const { id_coworking } = useParams();
    //const { usuario, token} = useSelector((s) => s.login);
    let id_usuario = login.usuario.id_usuario
    console.log(id_usuario)


    const fotos = useFetch(`http://localhost:9999/ver-foto-coworking/${id_coworking}`) || []




    return (

        <div className="section fotos coworking">



            {!fotos && 'Cargando...'}

            <div key={fotos.id_coworking}>
                <div>
                    <ul>
                        {fotos.fotos.map(fotos => <li key={`fotos_${fotos}`}>{fotos}</li>)}
                    </ul>
                </div>

            </div>

        </div>
    )
}
export default VerCoworkingFoto;