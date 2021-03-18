

import useFetch from '../useFetch'



function VerSalas() {
  const salas = useFetch(`http://localhost:9999/coworking//salas`) || []
 
  return (
    <div className="section salas">
      <h2>Salas</h2>
      {!salas && 'Cargando...'}
      {salas &&
        <table>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Capacidad</th>
              <th>Tarifa</th>
              <th>Disponibilidad</th>
              <th>Equipación</th>
            </tr>
          </thead>
          <tbody>
            {salas.map(sala => {
             
              return (
                <tr key={sala.id_sala}>
   
                  <td>{sala.tipo}</td>
                  <td>{sala.descripcion}</td>
                  <td>{sala.tarifa}</td>
                  <td>{sala.capacidad}</td>
                  <td>{sala.disponibilidad}</td>
                  <td>{sala.proyector}</td>
                  <td>{sala.impresora}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      }
    </div>
  );
}

export default VerSalas;