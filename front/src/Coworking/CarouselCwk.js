import React from 'react';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import useFetch from '../useFetch'


const CarouselCwk = ({ }) => {

    const id_coworking = useParams();
    const fotos = useFetch(`http://localhost:9999/ver-foto-coworking/${id_coworking}`) || []

    console.log(fotos)

    const images = [fotos.fotos].map((foto) => ({
        src: `http://localhost:9999/images/cwk/${foto}.jpg`
    }));
    console.log(images)

    return (
        <Carousel images={images} />
    );
};

export default CarouselCwk;