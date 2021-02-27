import {useState} from 'react'
// import {useDispatch,useSelector} from 'react-redux'
// import { Redirect } from 'react-router-dom'


function Registro() {

    const [usuario,setUsuario] = useState({})
    const [error,setError] = useState()

    const handleSubmit = async e => {
        e.preventDefault()
        try{
            await fetch('http://localhost:9999/usuario',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(usuario)
            })
            setUsuario('')
        }catch(e) {
            console.warn(e)
            setError(true)
        }
    }


    return(
        <form onSubmit={handleSubmit}>
            <h3>Regístrate</h3>
            <input name="email"
            required
            placeholder="email..."
            value={usuario.email || ''}
            onChange={e=>setUsuario({...usuario,email:e.target.value})}
            />
            <input
            name='password'
            type='password'
            required
            placeholder='Contraseña...'
            value={usuario.contrasena || ''}
            onChange = {e=> setUsuario({...usuario,contrasena: e.target.value})}
            />
            <input
            name='nif_cif'
            placeholder='NIF o CIF...'
            required
            value={usuario.nif_cif || ''}
            onChange={e=>setUsuario({...usuario,nif_cif:e.target.value})}
            />
            <input
            name='nombre'
            placeholder='Nombre...'
            value={usuario.nombre || ''}
            onChange={e=>setUsuario({...usuario,nombre:e.target.value})}
            />
             <input
            name='telefono'
            placeholder='Teléfono...'
            value={usuario.telefono || ''}
            onChange={e=>setUsuario({...usuario,telefono:e.target.value})}
            />
            <input
            name='bio'
            placeholder='¿A qué te dedicas?'
            value={usuario.bio || ''}
            onChange={e=>setUsuario({...usuario,bio:e.target.value})}
            />
            <input
            name='rol'
            placeholder='Si quieres reservar un coworking. Pon: Cliente.
                        Si quieres registrar un coworking. Ponr: Propietario'
            value={usuario.rol || ''}
            onChange={e=>setUsuario({...usuario,rol:e.target.value})}
            />
            <input name='foto'
             value={usuario.foto || ''}
             type='file'
             onChange={e=>setUsuario({...usuario,foto:e.target.value})} />
           
            <button>Quiero coronarme</button>
            {error&&
                <div>
                    Ya existe este usuario
                </div>
            }
        </form>
    )
}
export default Registro;