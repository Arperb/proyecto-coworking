
import {useState} from 'react'
import './Contacto.css'





function Contacto(){
    
    const [sent, setSent] = useState(false)
    const handleSubmit = e =>{
        e.preventDefault()
            setSent(true)
        }
       
        const [username, setUsername]=useState('')
        const [email, setEmail] = useState('')
        const [question, setQuestion] = useState('')
     
         
        
        if (sent){
            return(
                <div>✉️ ¡Enviado!.Pronto nos pondremos en contacto contigo✉️ </div>
            )
        }
        return (
        <form onSubmit={handleSubmit}>
         <h1>CONTACTO</h1>  
            <label>
                Nombre
                <input name="username" value={username} onChange={e =>setUsername(e.target.value)}/>
            </label>
            <label>
                Email
                <input name="email" value={email} onChange={e =>setEmail(e.target.value)} />
            </label>
            <label>
                Duda, sugerencia, consulta
                <input name="question" value={question} onChange={e =>setQuestion(e.target.value)} />
            </label>
            <button>✉️ Enviar</button>
            
       
            
        </form>
     
        )
       
    }
   

export default Contacto