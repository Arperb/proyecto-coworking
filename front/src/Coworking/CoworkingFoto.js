import { useState } from 'react'
import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import './UpdateCoworking.css'
//import './UpdateUsuario.css'

function CoworkingFoto() {
    const dispatch = useDispatch();
    const login = useSelector((s) => s.login);
    const { id_coworking } = useParams();
    let id_usuario = login.usuario.id_usuario

    const [error, setError] = useState(false)

    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        // Como avatar no usa state, tenemos que obtenerlo de otra forma:
        const foto = e.target.elements.avatar.files[0] // avatar es el "name" del input



        // Para enviar los datos, como la imagen es un file, usamos un FormData
        const fd = new FormData()
        fd.append('foto', foto)


        // Luego hacemos un fetch normal, usando el FormData como body
        // En este caso no se pone el header content-type! Sólo el token...
        const res = await fetch(`http://localhost:9999/foto-coworking/${id_coworking}`, {
            method: 'POST',
            headers: { 'Authorization': login.token },
            body: fd
        })
        if (res.ok) {


            history.push(`/usuario/coworking`)
        } else {
            setError(true)
            console.log('Ha habido un error')
        }
    }

    // Ver Header para más info sobre la siguiente línea
    const avatarStyle = { backgroundImage: `url(http://localhost:9999/images/cwk/${id_coworking}.jpg)` }



    return (
        <div className="section coworking">
            <h2>Mi coworking</h2>
            <p>Desde aquí puedes añadir las fotos de tu coworking.</p>
            <form onSubmit={handleSubmit}>
                <label className="avatar-picker">
                    <span>Fotos coworking:</span>
                    <div className="value">
                        <div className="avatar" style={avatarStyle} />
                        <input name="avatar" type="file" accept="image/*" multiple />
                        {/* Ojo: Los input type file no usan value/onChange! */}
                    </div>
                </label>

                <button>Añadir fotos</button>
            </form>
        </div>
    );
}
export default CoworkingFoto;
