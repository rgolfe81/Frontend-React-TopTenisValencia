import React, { useEffect, useState } from "react";
import "./Tournaments.css";
import { bringTournaments } from "../../services/apiCalls";
import { Table } from "react-bootstrap";

export const Tournaments = () => {
  const [allTournaments, setAllTournaments] = useState([]);
  const [loading, setLoading] = useState(true); // Agrega un estado para manejar el estado de carga

  useEffect(() => {
    const fetchData = async () => {
      try {
        let tournaments = [];
        let response = await bringTournaments();
        tournaments = response.data.data;
        setAllTournaments(tournaments);
        setLoading(false); // Actualiza el estado de carga a false cuando los datos se cargan
      } catch (error) {
        console.log(error);
        setLoading(false); // Actualiza el estado de carga a false en caso de error
      }
    };
    fetchData();
  }, []);

  console.log(allTournaments);
  return (
    <div className="tournamentsDesign">
      <div className="titleTournamentsDesign">
        <h4>Torneos</h4>
      </div>
      <Table striped bordered className="bg-white border-3 tableTournamentDesign">
        <thead>
          <tr>
            <th>Torneo</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {/* Verifica si los datos han sido cargados */}
          {loading ? (
            <tr>
              <td colSpan={4}>Cargando...</td>
            </tr>
          ) : allTournaments.length > 0 ? (
            allTournaments.map((tournament) => (
              <tr key={tournament.id} className="">
                <td>{tournament.name}</td>
                <td>{tournament.start_date}</td>
                <td>{tournament.end_date}</td>
                <td>seleccionar</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No se encuentran datos de torneos</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
