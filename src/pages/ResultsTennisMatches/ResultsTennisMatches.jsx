import React, { useEffect, useState } from "react";
import "./ResultsTennisMatches";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { tournamentIdData } from "../tournamentSlice";
import { bringResults, bringTennisMatches } from "../../services/apiCalls";
import { userData } from "../userSlice";
import { Table } from "react-bootstrap";

export const ResultsTennisMatches = () => {
  const navigate = useNavigate();
  const infoTournamentRdx = useSelector(tournamentIdData);
  const { id, name, start_date, end_date } = infoTournamentRdx.infoTournament;
  const selectedTournamentId = id;
  const selectedTournamentName = name;
  const formatedStartDateTournament = new Date(start_date).toLocaleDateString(
    "es-ES"
  );
  const formatedEndDateTournament = new Date(end_date).toLocaleDateString(
    "es-ES"
  );
  const credentialsRdx = useSelector(userData);
  const { token } = credentialsRdx.credentials;
  const [tennisResults, setTennisResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const matchesResponse = await bringTennisMatches(
          selectedTournamentId,
          token
        );
        const matches = matchesResponse.data.data;
  
        const resultsResponse = await bringResults(selectedTournamentId, token);
        const results = resultsResponse.data.data;
  
        const resultsMatches = results.map(result => {
          const match = matches.find(match => match.id === result.id);
          if (match) {
            return {
              ...result,
              location: match.location,
              date: match.date
            };
          } else {
            return result;
          }
        });
  
        setTennisResults(resultsMatches);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
  
    if (token) {
      fetchData();
    }
  }, [selectedTournamentId, token]);
  

  console.log(tennisResults);

  return (
    <div className="">
      <div className="">Resultado partidos finalizados</div>
      <Table striped bordered className="bg-white border-3">
        <thead>
          <tr className="titleRowTable">
            <th>Fecha</th>
            <th>Lugar</th>
            <th>Jugador 1</th>
            <th>Jugador 2</th>
            <th>Ganador</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5}>Cargando resultados ...</td>
            </tr>
          ) : tennisResults.length > 0 ? (
            tennisResults.map((result) => (
              <tr key={result.id}>
                <td>{new Date(result.date).toLocaleDateString("es-ES")}</td>
                <td>{result.location}</td>
                <td>{`${result.player1_name} ${result.player1_surname}`}</td>
                <td>{`${result.player2_name} ${result.player2_surname}`}</td>
                <td>{`${result.winner_name} ${result.winner_surname}`}</td>               
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No se encuentran resultados</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
