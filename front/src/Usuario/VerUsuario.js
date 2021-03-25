
import useFetch from '../useFetch'
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import BorrarUsuario from './BorrarUsuario';




function VerUsuario() {

 const [usuario, setUsuario] = useState({})
 const login = useSelector(s => s.login)
 //const { usuario, token} = useSelector((s) => s.login);
 let id_usuario = login.usuario.id_usuario
 console.log(id_usuario)

 async function getUsuario(id_usuario) {
 const res = await fetch (`http://localhost:9999/usuario/${id_usuario}`, {
        headers:{"Content-Type":"application/json",
                 Authorization:login.token}
 })
 const data = await res.json();    
 return data
 }

 useEffect(() => {
   getUsuario(id_usuario).then(response =>{
       setUsuario(response)
       
   }) 
   
  
 },[])
 console.log(usuario)
return(
    <div className="section users">
       <h2>Usuarios</h2>
       {!usuario && 'cargando' }
       
       
       
       
 <div key={usuario.id_usuario}>
                
                  <div>{usuario.email}</div>
                   <div>{usuario.nombre}</div>
                   <div>{usuario.telefono}</div>
                   <div>{usuario.bio}</div>
                   <div>{usuario.nif_cif}</div>
                   <div>{usuario.rol}</div>
                
                   </div>
                   {login && login.usuario.id_usuario &&
                            <BorrarUsuario id={id_usuario} />
                        }
       
       
       
       </div>
     


)}




































// import './VerUsuario.css'

// import useFetch from '../useFetch'

// import { useSelector } from 'react-redux'



// function Usuarios() {

//     const login = useSelector(s => s.login)
//     const { usuario, token} = useSelector((s) => s.login);
//     let id_usuario = usuario.id_usuario
//   const usuarios = useFetch(`http://localhost:9999/usuario/${id_usuario}`, {
//     headers:{"Content-Type":"application/json",
//               Authorization:login.token}


// })


// console.log(usuarios)
//   return (
//     <div className="section users">
//       <h2>Usuarios</h2>
//       {!usuarios && 'Cargando...'}
//       {usuarios &&
//         <table>
//           <thead>
//             <tr>
//               <th>Img</th>
//               <th>Usuario</th>
//               <th>Nombre completo</th>
//               <th>Email</th>
//               <th>Ciudad</th>
//             </tr>
//           </thead>
//           <tbody>
//             {usuarios.map((u) => {
//               const avatarStyle = u.foto && { backgroundImage: 'url(' + u.foto + ')' }
//               return (
//                 <tr key={u.id_usuario}>
//                   <td><div className="avatar" style={avatarStyle} /></td>
//                   <td>{u.email}</td>
//                   <td>{u.nombre}</td>
//                   <td>{u.telefono}</td>
//                   <td>{u.descripcion}</td>
//                 </tr>
//               )
//             })}
//           </tbody>
//         </table>
//       }
//     </div>
//   );
// }

export default VerUsuario;