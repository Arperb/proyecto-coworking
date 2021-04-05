import React from 'react';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import useFetch from '../useFetch'


const CarouselCwk = ({ id }) => {

    const params = useParams()
    const id_coworking = id || params.id_coworking;
    console.log('ID:', id_coworking, id, params)
    const fotos = useFetch(`http://localhost:9999/ver-foto-coworking/${id_coworking}`) || { fotos: [] }

    console.log('Fotos:', fotos)

    const images = fotos.fotos.map((foto) => ({
        src: `http://localhost:9999/images/cwk/${foto}.jpg`
    }));

    if (!images.length) return false;

    return (
        <Carousel images={images} />
    );
};

export default CarouselCwk;