import { useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import useFetch from '../useFetch'







function VerCoworkingFoto({ id_coworking }) {

    // const params = useParams()
    // const id_coworking = id || params.id_coworking;
    const login = useSelector(s => s.login)
    //const { id_coworking } = useParams();

    //const { usuario, token} = useSelector((s) => s.login);
    let id_usuario = login.usuario.id_usuario
    console.log(id_coworking)


    const fotos = useFetch(`http://localhost:9999/ver-foto-coworking/${id_coworking}`) || []


    console.log(fotos)


    return (
        <div className="section ver-coworking">
            {!fotos && 'Cargando...'}

            <div key={fotos}>
                {/* <div>
                    <ul>
                        {fotos.fotos.map(fotos => <li key={`fotos_${fotos}`}>{fotos}</li>)}
                    </ul>
                </div> */}

                <div>
                    <ul>

                        {fotos.result && fotos.result.map(foto => <li key={foto}><img width="200"
                            src={`http://localhost:9999/images/cwk/${foto}.jpg`}
                        />  </li>)}

                    </ul>

                </div>

            </div>


        </div >
    )
}

// {fotos.fotos.map(foto => <li key={`fotos_${foto}`}><img width="200"
// src={`http://localhost:9999/images/cwk/${foto}.jpg`}
// /></li>)}
export default VerCoworkingFoto;
