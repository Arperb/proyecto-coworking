import { useState } from "react"
import { useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import useFetch from "../useFetch"


function UpdateUsuarioWrapper() {
    const { id_usuario } = useParams()
    const data = useFetch(`http://localhost:9999/usuario/${id_usuario}`)
    return data ? <Update data={data[0]} /> : false
}

function Update({ data }) {
    const login = useSelector(s => s.login)
    const { id_usuario } = useParams()

    const [nif_cif, setNif_cif] = useState(data.nif_cif || '')
    const [telefono, setTelefono] = useState(data.telefono || '')
    const [bio, setBio] = useState(data.bio || '')
    // const [email, setEmail] = useState(data.email || '')
    // const [password, setPassword] = useState(data.password || '')
    const [nombre, setNombre] = useState(data.bio || '')
    const [rol, setRol] = useState(data.telefono || '')

    const history = useHistory()

    const handleSubmit = async e => {
        e.preventDefault()
        const usuarioFoto = e.target.usuarioFoto.files[0]
        console.log(usuarioFoto)

        const fd = new FormData()
        fd.append('foto', usuarioFoto)
        fd.append('nif_cif', nif_cif)
        fd.append('telefono', telefono)
        fd.append('bio', bio)
        // fd.append('email', email)
        // fd.append('password', password)
        fd.append('nombre', nombre)
        fd.append('rol', rol)

        const ret = await fetch(`http://localhost:9999/usuario/${id_usuario}`, {
            method: 'PUT',
            headers: { 'Authorization': login.token },
            body: fd
        })
        if (ret.ok) {
            history.push(`/usuario/${id_usuario}`)
        } else {
            console.log('Ha habido un error')
        }

    }

    const avatarUrl = login && login.foto && (`http://localhost:9999/profile/${login.foto}.jpg`)
    const avatarStyle = login && login.foto && { backgroundFoto: 'url(' + avatarUrl + ')' }

    return (
        <div className='updateContainer'>
            <h1>Edita tu perfil</h1>
            <div className='updateContent'>
                <form onSubmit={handleSubmit}>
                    <label className='avatarPicker'>
                        <span>Foto actual:</span>
                        <div className="avatarEdit" style={avatarStyle} />
                        <input name="usuarioFoto" type="file" accept="image/*" />
                    </label>
                    <label>
                        Nif_cif
                    <input type='text' value={nif_cif} onChange={e => setNif_cif(e.target.value)} />
                    </label>
                    <label>
                        Teléfono
                    <input type='number' value={telefono} onChange={e => setTelefono(e.target.value)} />
                    </label>
                    <label>
                        Bio
                    <textarea rows='3' cols='25' value={bio} onChange={e => setBio(e.target.value)} />
                    </label>
                    {/* <label>
                    Email:
                    <input type='email' value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
                </label> */}
                    <label>
                       Nombre
                       <input type='text' value={nombre} onChange={e => setNombre(e.target.value)} />
          
                    </label>
                    <label>
                        Rol
                    <input type='text' value={rol} onChange={e => setRol(e.target.value)} />
                    </label>
                    <button className='updateButton'>Actualizar</button>
                </form>
            </div>

        </div>
    )
}

export default UpdateUsuarioWrapper;