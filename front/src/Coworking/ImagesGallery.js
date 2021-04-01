import React from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";

import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

const ImagesGallery = () => {
    const [images, setImages] = React.useState(null);
    const { id_coworking } = useParams();
    React.useEffect(() => {
        let shouldCancel = false;

        const call = async () => {
            const response = await fetch(
                `http://localhost:9999/ver-foto-coworking`
            );
            if (!shouldCancel && response.data && response.data.length > 0) {
                setImages(
                    response.data.map(url => ({
                        original: `${url}=w1024`,
                        thumbnail: `${url}=w100`
                    }))
                );
            }
        };
        call();
        return () => (shouldCancel = true);
    }, []);

    return images ? <ImageGallery items={images} /> : null;
};

const rootElement = document.getElementById("root");
ReactDOM.render(<ImagesGallery />, rootElement);


export default ImagesGallery;