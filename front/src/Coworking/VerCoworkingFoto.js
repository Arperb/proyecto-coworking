import useFetch from '../useFetch'
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import ImagesGallery from './ImagesGallery';
import './VerCoworkingFoto.css'
import SliderSlick from './SliderSlick';
import CarouselCwk from './CarouselCwk';
import CoworkingFoto from './CoworkingFoto';


function VerCoworkingFoto() {


    const login = useSelector(s => s.login)
    const id_coworking = useParams();
    //const { usuario, token} = useSelector((s) => s.login);
    let id_usuario = login.usuario.id_usuario
    console.log(id_usuario)


    const fotos = useFetch(`http://localhost:9999/ver-foto-coworking/${id_coworking}`) || []

    console.log(fotos)


    return (

        <div className="section fotos coworking">



            {!fotos && 'Cargando...'}


            <div>
                <ul>
                    <CarouselCwk>
                        {fotos.fotos.map(foto => <li key={foto.id}><img width="200"
                            src={`http://localhost:9999/images/cwk/${foto}.jpg`}
                        />  </li>)}
                    </CarouselCwk>
                </ul>

            </div>



        </div >
    )
}

// {fotos.fotos.map(foto => <li key={`fotos_${foto}`}><img width="200"
// src={`http://localhost:9999/images/cwk/${foto}.jpg`}
// /></li>)}
export default VerCoworkingFoto;