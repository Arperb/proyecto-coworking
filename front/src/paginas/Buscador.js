import { useState } from "react";

function Buscador() {



  const [provincia, setProvincia] = useState('A Coruña, Lugo, Ourense, Pontevedra')
  const [ciudad, setCiudad] = useState('')
  const [tarifa, setTarifa] = useState('')
  const [fecha_inicio, setFecha_inicio] = useState('')
  const [fecha_fin, setFecha_fin] = useState('')
  const [capacidad, setCapacidad] = useState('')
  const [limpieza, setLimpieza] = useState('')
  const [parking, setParking] = useState('')
  const [wifi, setWifi] = useState('')
  const [proyector, setProyector] = useState('')
  const [impresora, setImpresora] = useState('')
  const [tipo, setTipo] = useState('despacho, compartida, sala de reuniones, salon de eventos')


  const [results, setResults] = useState()

  const handleSubmit = async e => {
    e.preventDefault()

    const url = `http://localhost:9999/buscador/?` +
      `provincia=${provincia}` + `&ciudad=${ciudad}` + `&tarifa=${tarifa}` + `&fecha_inicio=${fecha_inicio}`
     + `&fecha_fin=${fecha_fin}` + `&capacidad=${capacidad}`
     + `&limpieza=${limpieza}` +  `&parking=${parking}`
     + `&wifi=${wifi}` + `&proyector=${proyector}`
     + `&impresora=${impresora}` + `&tipo=${tipo}`
    const res = await fetch(url)
    console.log(res)
    const data = await res.json()
    setResults({ ...data, url })
  }

  const handleUrl = async (url) => {
    if (!url) return
    const res = await fetch(url)
    const data = await res.json()
    setResults({ ...data, url })
  }

  const chunk = results && results.url.substr(43).split('&').find(t => t.startsWith('page='))
  const page = chunk ? chunk.substr(5) : 1

  return (
    <div className="page search">
      <h1>Buscar</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Provincia:
          <select value={provincia} onChange={e => setProvincia(e.target.value)}>
                        <option value="" hidden>Provincia...</option>
                        <option value="A Coruña">A Coruña</option>
                        <option value="Lugo">Lugo</option>
                        <option value="Ourense">Ourense</option>
                        <option value="Pontevedra">Pontevedra</option>
                    </select>
        </label>
        <label>
          Ciudad:
          <input value={ciudad} onChange={e => setCiudad(e.target.value)} />
        </label>
        <label>
                        Tarifa
                                <select name="" value={tarifa} onChange={e => setTarifa(e.target.value)}>
                            <option value="" hidden>Min</option>
                            <option value={1}>100</option>
                            <option value={2}>500</option>
                            <option value={3}>1000</option>
                            <option value={4}>2000</option>
                        </select>
                        <select value={tarifa} onChange={e => setTarifa(e.target.value)}>
                            <option value='' hidden>Max</option>
                            <option value={1}>500</option>
                            <option value={2}>1000</option>
                            <option value={3}>2000</option>
                            <option value={4}>3000</option>
                        </select>
                    </label>
                    <label className='buscadorDate'>
                        Fecha de inicio
                                <input type='date' name='fecha_inicio' value={fecha_inicio} onChange={e => setFecha_inicio(e.target.value)} />
                                Fecha fin
                                <input type='date' name='fecha_fin' value={fecha_fin} onChange={e => setFecha_fin(e.target.value)} />
                    </label>
                    <label>
                    ¿CUÁNTOS SOIS?
                    <select value={capacidad} onChange={e => setCapacidad(e.target.value)}>
                        <option value="" hidden>personas</option>
                        <option value={1}>1</option>
                        <option value={2}>2-4</option>
                        <option value={3}>5-8</option>
                        <option value={4}>+8</option>
                    </select>
                    </label>

                    <label>
         limpieza:
          <input value={limpieza} onChange={e => setLimpieza(e.target.value)} />
        </label>
        <label>
       parking:
          <input value={parking} onChange={e => setParking(e.target.value)} />
        </label>
                 
        <label>
       wifi:
          <input value={wifi} onChange={e => setWifi(e.target.value)} />
        </label>

        <label>
        proyector
          <input value={proyector} onChange={e => setProyector(e.target.value)} />
        </label>   

        <label>
         impresora:
          <input value={impresora} onChange={e => setImpresora(e.target.value)} />
        </label>     
                       
              
                       
                   
                       
                  
                    <label>
                    ¿QUÉ QUIERES ALQUILAR?

                        <select value={tipo} onChange={e => setTipo(e.target.value)}>
                            <option value = "" hidden >tipo de sala</option>
                            <option value="despacho">despacho</option>
                            <option value="compartida">compartida</option>
                            <option value="sala de reuniones">sala de reuniones</option>
                            <option value="Sala de eventos">sala de eventos</option>
                        </select>

                    </label>
                   
      
        <button>Buscar coworking</button>
      </form>
      {results &&
        <div>
          <h2>Resultados:</h2>
          {results.results && results.results.map(r =>
            <div key={r.id}>
              {r.provincia}
              {r.ciudad}
              {r.tarifa}
              {r.fecha_inicio}
              {r.fecha_fin}
              {r.capacidad}
              {r.limpieza}
              {r.parking}
              {r.wifi}
              {r.proyector}
              {r.impresora}
              {r.tipo}
       
            </div>
          )}
          {results.results &&
            <div className="pagination">
              <span onClick={() => handleUrl(results.info.prev)}>&lt; Anterior</span>
              <span>
                {page}
                {' de '}
                {results.info.pages}
                </span>
              <span onClick={() => handleUrl(results.info.next)}>Siguiente &gt;</span>
            </div>
          }
          {!results.results &&
            <div><i>Sin resultados</i></div>
          }
        </div>
      }
    </div>
  );
}

export default Buscador;