import { useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'



function Reset() {
    const { code } = useParams()
    const [newContrasena, setNewContrasena] = useState('')
    const [newContrasenaRepeat, setNewContrasenaRepeat] = useState('')
    const [sent, setSent] = useState(false)
    const handleSubmit = async e => {
        e.preventDefault()
        await fetch(`http://localhost:9999/usuario/update-reset-contrasena/${code}`, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify
                ({
                    newContrasena,
                    newContrasenaRepeat,
                }),
            method: 'PUT'
        })
        setSent(true)
    }

    if (sent) return (

        <div>
            Contraseña cambiada correctamente

            <NavLink to={`/login`}>
                LOGIN
            </NavLink>

        </div>

    )

    return (
        <form className='password reset' onSubmit={handleSubmit}>
            Introduce tu nueva contraseña
            <div>
                <input placeholder='Nueva contraseña...' type='password' required
                    value={newContrasena} onChange={e => setNewContrasena(e.target.value)} />
                <br></br>
                <input placeholder='Repite la nueva contraseña...' type='password' required
                    value={newContrasenaRepeat} onChange={e => setNewContrasenaRepeat(e.target.value)} />
            </div>
            <button>Cambiar contraseña</button>
        </form>
    )
}
export default Reset;


