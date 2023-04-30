import React, { useEffect, useState } from 'react'
import "./Results.css"
import { useSelector } from 'react-redux';
import { tournamentIdData } from '../tournamentSlice';
import { userData } from '../userSlice';
import { bringResultFortWinner } from '../../services/apiCalls';
import { Table } from 'react-bootstrap';

export const Results = () => {
    const infoTournamentRdx = useSelector(tournamentIdData);
    const { id, name } = infoTournamentRdx.infoTournament;
    const selectedTournamentId = id;
    const selectedTournamentName = name;
    const credentialsRdx = useSelector(userData);
    const { token } = credentialsRdx.credentials;
    const [resultWithPlayers, setResultWithPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            let resultPlayers = [];
            const response = await bringResultFortWinner(
              selectedTournamentId,
              token
            );
            console.log(response.data.data)
            resultPlayers = response.data.data;
            setResultWithPlayers(resultPlayers);
            setLoading(false); // Actualiza el estado de carga a false cuando los datos se cargan
          } catch (error) {
            console.log(error);
            setLoading(false); // Actualiza el estado de carga a false en caso de error
          }
        };
        if (token) {
          fetchData();
        }
        
      }, [token]);
      
  return (
    <div className="playersTournamentsDesign">
    <div className="titlePlayersTournamentsDesign">
      <h4>Introducir ganador</h4>
    </div>
    <h5>{selectedTournamentName}</h5>
    <Table
      striped
      bordered
      className="bg-white border-3 tablePlayersTournamentsDesign"
    >
      <thead>
      <tr className="text-center titleRowTable">
          <th>Partido</th>
          <th colSpan={2}>Jugador 1</th>
          <th colSpan={2}>Jugador 2</th>
          <th colSpan={2}>Ganador</th>
        </tr>
        <tr className="text-center titleRowTable">
          <th>Id</th>
          <th>Id</th>
          <th>Nombre</th>
          <th>Id</th>
          <th>Nombre</th>
          <th>Id</th>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>
        {/* Verifica si los datos han sido cargados */}
        {loading ? (
          <tr>
            <td colSpan={7}>Cargando datos ...</td>
          </tr>
        ) : resultWithPlayers.length > 0 ? (
            resultWithPlayers.map((result) => (
            <tr key={result.id}>
              <td className="text-center">{result.tennis_match_id}</td>
              <td className="text-center">{result.player1_user_id}</td>
              <td>{result.player1_name}{" "}{result.player1_surname}</td>
              <td className="text-center">{result.player2_user_id}</td>
              <td>{result.player2_name}{" "}{result.player2_surname}</td>
              <td className="text-center">{result.winner_user_id}</td>
              <td>{result.winner_name}{" "}{result.winner_surname}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={7}>No se encuentran datos de jugadores para introducir ganador</td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
  )
}
