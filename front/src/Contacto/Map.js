import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { latLngBounds } from 'leaflet';
import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import "./Map.css";

function Map() {
  const [map, setMap] = useState(null);
  const [filter, setFilter] = useState("");
  const data = useFetch("http://localhost:9999/coordenadas-coworking") || [];

  const filteredData = filter === "" ? data : data.filter(d => d.provincia === filter);

  useEffect(() => {

    if (map) {
      const bounds = latLngBounds();

      for (const p of filteredData) {
        bounds.extend([p.lat, p.lng]);
      }

      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [map, filteredData])

  if (!data.length) return <p>Cargando...</p>;






  return (
    <div className="page map">
      <h1 className="map title">¿DÓNDE ESTAMOS?</h1>
      <main>
        <MapContainer
          className="map style"
          whenCreated={setMap}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredData.map(point => {
            return <Marker key={point.id_coworking} position={[point.lat, point.lng]}>
              <Popup>{point.nombre}</Popup>
            </Marker>
          })}

        </MapContainer>
        <aside>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">Todas las provincias</option>
            <option value="Pontevedra">Pontevedra</option>
            <option value="A Coruña">A Coruña</option>
            <option value="Ourense">Ourense</option>
            <option value="Lugo">Lugo</option>
          </select>


        </aside>
      </main>
    </div>
  );
}

export default Map;
