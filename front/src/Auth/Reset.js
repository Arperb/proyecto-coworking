import {useState} from 'react'
import {useParams} from 'react-router-dom'

function Reset() {
    const {code} = useParams()
    const [contrasena,setContrasena] = useState('')
    const [sent,setSent] = useState(false)
    const handleSubmit= async e=> {
        e.preventDefault()
        await fetch(`http://localhost:9999/usuario/update-reset-contrasena/${code}`,{
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({contrasena}),
            method:'PUT'
        })
        setSent(true)
    }

    if(sent) return(
        <div>
            Contraseña cambiada correctamente
        </div>
    )
    
    return(
        <form className='password reset' onSubmit={handleSubmit}>
            Introduce tu nueva contraseña
            <div>
                <input placeholder='Contraseña...' type='password' required
                value={contrasena} onChange={e=>setContrasena(e.target.value)}/>
            </div>
            <button>Cambiar contraseña</button>
        </form>
    )
}
export default Reset;


