import React from 'react';
import Slider from 'infinite-react-carousel';
import { useState, useEffect } from "react"

export const CarouselInfinite = ({ id_coworking }) => {

    const [fotos, setFotos] = useState([])

    const settings = {
        arrows: true,
        adaptiveHeight: true,
        duration: 500,
        autoplay: false,
        autoplaySpeed: 8000



    };

    const getFotos = async () => {
        const response = await fetch(`http://localhost:9999/ver-foto-coworking/${id_coworking}`);
        const data = await response.json();
        return data

    }

    useEffect(() => {
        getFotos().then(response => {
            setFotos(response.result)
            console.log(response)

        });

    }, [])


    if (!fotos.length) return <p>Cargando...</p>;
    return (

        <Slider {...settings}>
            <div>
                <img width='500px' height='auto' src={`http://localhost:9999/images/cwk/${fotos[0]}.jpg`} alt="img1" />
            </div>
            <div>
                <img width='500px' height='auto' src={`http://localhost:9999/images/cwk/${fotos[1]}.jpg`} alt="img2" />
            </div>
            <div>
                <img width='500px' height='auto' src={`http://localhost:9999/images/cwk/${fotos[2]}.jpg`} alt="img3" />
            </div>
        </Slider>
    )
};

export default CarouselInfinite;