import React from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import useFetch from '../useFetch'

import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

const ImagesGallery = ({ id_coworking, imagenes }) => {
    const [images, setImages] = React.useState(imagenes || []);




    React.useEffect(() => {
        let shouldCancel = false;


        // images.map(imagen =>
        //     console.log(imagen)
        //         (ListImagenes.push(`http://localhost:9999/images/cwk/${imagen}.jpg`)))

        // setImages(imagenes)
        // const call = async () => {
        //     const response = await fetch(
        //         `http://localhost:9999/ver-foto-coworking/${id_coworking}`
        //     );

        //     //   if (!shouldCancel && response.data && response.data.length > 0) 
        //     const data = await response.json()
        //     console.log(data)
        //     setImages(
        //         data(url => ({
        //             original: `${url}=w1024`,
        //             thumbnail: `${url}=w100`
        //         }))
        //     );

        // };
        // call();
        return () => (shouldCancel = true);
    }, []);

    return images ? <ImageGallery items={images} /> : null;
};

const rootElement = document.getElementById("root");
ReactDOM.render(<ImagesGallery />, rootElement);


export default ImagesGallery;