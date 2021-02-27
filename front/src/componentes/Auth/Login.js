import {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'

function Login () {
    const [email,setEmail] = useState('')
    const [contrasena,setContrasena] = useState('')
    const [error,setError] = useState(false)

    const login = useSelector(s=>s.login)
    const dispatch = useDispatch()

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            const res = await fetch('http://localhost:9999/usuario/login',{
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({email,contrasena}),
            method: 'POST'
            })
            const data = await res.json()
            dispatch({type:'login',data})
            console.log(data)
        }catch(e) {
            console.warn(e)
            setError(true)
        }
        
    }
    if(login) return <Redirect to="/"/>

    return(
        <form className="pageLogin" onSubmit={handleSubmit}>
            <h3>Iniciar sesión</h3>
            <label>
                email:
                <input value={email}
                required
                type='email'
                onChange = {e=>setEmail(e.target.value)}/>
            </label>
            <label>
                Contraseña:
                <input value={contrasena}
                required
                type='password'
                onChange = {e => setContrasena(e.target.value)}/>
            </label>
            <button >Entrar</button>
            {error&&
                <div>
                    Usuario o contraseña incorrecto
                </div>
            }
            <div>
                <Link to="/usuario/recover-contrasena">¿Has olvidado la contraseña?</Link>
            </div>
        </form>
    )
}




export default Login;