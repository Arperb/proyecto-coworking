import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useState } from 'react'
import useFetch from '../useFetch'
import './Map.css'

function Map() {
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState('')
  const data = useFetch('https://localhost:9999/coworking') || []

  const filteredData = data.filter(e => e.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
  const paginatedData = filteredData.slice(5 * (page - 1), 5 * page)
  const max = Math.ceil(filteredData.length / 5)

  return (
    <div className="page map">
      <h1>¿DÓNDE ESTAMOS?</h1>
      <main>
        <MapContainer center={[43.37135 , -8.396]} zoom={14}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {paginatedData.map(entry =>
            <Marker key={entry.id} position={entry.coords}>
              <Popup>
                {entry.title}
              </Popup>
            </Marker>
          )}
        </MapContainer>
        <aside>
          <input placeholder="Filtrar por provincia..." value={filter} onChange={e => setFilter(e.target.value)} />
          <div className="entries">
            {paginatedData.map(entry =>
              <div key={entry.id}>{entry.title}</div>
            )}
          </div>
          
        </aside>
      </main>
    </div>
  );
}

export default Map
