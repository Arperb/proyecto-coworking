import useFetch from "../useFetch";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./VerIncidenciasCoworking.css";

function VerIncidenciasCoworking() {
  const login = useSelector((s) => s.login);
  const { id_coworking } = useParams();
  //const { usuario, token} = useSelector((s) => s.login);
  let id_usuario = login.usuario.id_usuario;
  console.log(id_usuario);

  const incidencias =
    useFetch(`http://localhost:9999/coworking/${id_coworking}/incidencias`) ||
    [];

  return (
    <div className="section incidenciasCoworking">
      <h2>Incidencias</h2>
      {!incidencias && "Cargando..."}
      {incidencias && (
        <table>
          <thead>
            <tr>
              <th>id_sala</th>
              <th>id_incidencia</th>
              <th>id_usuario</th>
              <th>estado</th>
              <th>categoría</th>
              <th>descripción</th>
              <th>fecha de creación</th>
            </tr>
          </thead>
          <tbody>
            {incidencias.map((incidencia) => {
              return (
                <tr key={incidencia.id_coworking}>
                  <td>{incidencia.id_sala}</td>
                  <td>{incidencia.id_incidencia}</td>
                  <td>{incidencia.id_usuario}</td>
                  <td>{incidencia.estado}</td>
                  <td>{incidencia.categoria}</td>
                  <td>{incidencia.descripcion}</td>
                  <td>{incidencia.fecha_creacion}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default VerIncidenciasCoworking;
