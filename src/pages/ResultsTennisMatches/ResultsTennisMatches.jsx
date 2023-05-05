import React, { useEffect, useState } from "react";
import "./ResultsTennisMatches.css";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { tournamentIdData } from "../tournamentSlice";
import { bringResults, bringTennisMatches } from "../../services/apiCalls";
import { userData } from "../userSlice";
import { Table } from "react-bootstrap";

export const ResultsTennisMatches = () => {
  const navigate = useNavigate();
  const infoTournamentRdx = useSelector(tournamentIdData);
  const { id, name } = infoTournamentRdx.infoTournament;
  const selectedTournamentId = id;
  const selectedTournamentName = name;
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

        // Creamos un nuevo array con la información añadida de la localización y la fecha del partido, para mostrar en el renderizado
        const resultsMatches = results.map((result) => {
          const match = matches.find((match) => match.id === result.id);
          if (match) {
            return {
              ...result,
              location: match.location,
              date: match.date,
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

  return (
    <div className="pageBaseDesign">
      <h4 className="titleBaseDesign">
        Resultado Partidos Finalizados
      </h4>
      <h5>
        {selectedTournamentName}
      </h5>
      <Table striped bordered className="bg-white border-3 tableTennisMatches">
        <thead>
          <tr className="titleRowTable text-center">
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
                <td className="text-center">{new Date(result.date).toLocaleDateString("es-ES")}</td>
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
      <button
        className="btnTennisMatches"
        onClick={() => {
          navigate("/selectedTournament");
        }}
      >
        Volver
      </button>
    </div>
  );
};
