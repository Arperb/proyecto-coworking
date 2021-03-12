import {Link} from 'react-router-dom';
import './Home.css'
// import portada from '../images/portada.jpg'
// import coworkers from '../images/coworkers.jpg'
import logo from '../images/logo.png'
//Imagen principal como background-*image?
// Reemplazo de form por div
//division en dos div
//Agregado imagen logo
import Acordeon from './Acordeon'


function Home(){

    return(
        <div className="page home">
            <div className="section bienvenida">
                {/* <img className="ay" src={portada} alt="Portada" /> */}
                <div className="home welcome">
                    <img className="mainlogo" src={logo} alt="mainlogo" />
                    <h1 className="title">CORÓNATE EN LOS MEJORES COWORKINGS</h1>
                    <Link className="home button1" to="/Reserva/Reservar"><span>RESERVA AHORA</span></Link> 
                </div>
            </div>

            <div className="section elegir">
                {/* <img id="ey" src={coworkers} alt="Coworkers" /> */}
                <h2 className="home subt">¿QUÉ QUIERES HACER?</h2>

                <div className="elegir botones">    
                    <Link className="sub button" to="/CreateCoworking"><p className="sub style">Ofrecer un espacio</p></Link>
                    <Link className="sub button" to="/Buscador"><p className="sub style">Reservar un espacio</p></Link>
                    
                </div>
            </div>
            <div className="razones">
                    <h2 className="why">por qué elegirnos</h2>
                    <Acordeon  cwks="Si tienes un cwk">
                        <ol>
                            <li>Daremos mayor visibilidad a tu coworking</li>
                            <li>Te conocerán empresas punteras</li>
                            <li>Te ayudaremos a conseguir nuevos clientes</li>
                        </ol>
                    </Acordeon>
                    <Acordeon cwks="si quieres trabajar en un cwk">
                        <ol className="dir">
                            <li>Trabajarás de manera más eficiente</li>
                            <li>Aprenderás y compartirás</li>
                            <li>Estarás más motivado</li>
                        </ol>
                    </Acordeon>
            </div>
            

        </div>
    )
}
export default Home;