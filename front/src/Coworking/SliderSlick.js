import React from 'react';
import Slider from "react-slick";
import 'react-gallery-carousel/dist/index.css';
import { useState, useEffect, useRef } from "react";
import { NavLink, useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from 'react-redux'



function SliderSlick() {

    const id_coworking = useParams();
    const login = useSelector(s => s.login)
    const [data, setData] = useState([])
    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();
    const slider1 = useRef(null);
    const slider2 = useRef(null);

    async function getFotoCwk(id_coworking) {
        const res = await fetch(`http://localhost:9999/ver-foto-coworking/${id_coworking}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: login.token
            }
        })
        const data = await res.json();
        return data

    }

    useEffect(() => {
        getFotoCwk(id_coworking).then(response => {
            setData(response)


        })

        console.log(data.fotos)
    }, [])

    return (
        <div>
            <Slider className="mainSlider" asNavFor={nav2} ref={slider1}>
                {data.fotos.length > 0 && data.fotos.map(foto => (
                    <img key={foto.id} src={`http://localhost:9999/images/cwk/${foto}.jpg`}></img>

                ))}

            </Slider>

            <Slider
                asNavFor={nav1}
                ref={slider2}
                slidesToShow={3}
                swipeToSlide={true}
                focusOnSelect={true}
            >
                {data.fotos.length > 0 && data.fotos.map(foto => (
                    <img key={foto.id} src={`http://localhost:9999/images/cwk/${foto}.jpg`}></img>
                ))}
            </Slider>
        </div>
    );
};


export default SliderSlick;