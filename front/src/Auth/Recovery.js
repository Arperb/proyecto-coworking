import {useState} from 'react'

function Recover() {
    const [email,setEmail] = useState('')
    const [sent,setSent] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()
        await fetch('http://localhost:9999/usuario/recover-contrasena',{
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({email}),
            method: 'POST'
        })
        setSent(true)
    }
    if(sent) return(
        <div>
            Recibirás un email con los datos para recuperar tu contraseña
        </div>
    )

    return(
        <form className='pass recover' onSubmit={handleSubmit}>
            Introduce tu email
            <div>
                <input placeholder="Email..." type='email' required
                value={email} onChange={e=>setEmail(e.target.value)}/>
                  </div>
                <button>Recuperar contraseña</button>
          
        </form>
    )
}

export default Recover;