import React, { useEffect, useState } from 'react'
import "./TennisMatchesToPlay.css"
import { useNavigate } from 'react-router-dom'
import { bringResultsForMatches, bringTennisMatches, deleteTennisMatch } from '../../services/apiCalls';
import { useSelector } from 'react-redux';
import { tournamentIdData } from '../tournamentSlice';
import { userData } from '../userSlice';
import { Table } from 'react-bootstrap';


export const TennisMatchesToPlay = () => {
    const navigate = useNavigate();
    const infoTournamentRdx = useSelector(tournamentIdData);
    const { id, name } = infoTournamentRdx.infoTournament;
    const selectedTournamentId = id;
    const selectedTournamentName = name;
    const credentialsRdx = useSelector(userData);
    const { token, fullUser } = credentialsRdx.credentials;
    const nameUser = fullUser.name;
    const [loading, setLoading] = useState(true);
    const [allTennisMatches, setAllTennisMatches] = useState([]);
    const [congratulations, setCongratulations] = useState("")

    useEffect(() => {
        const fetchData = async () => {
          try {
            const matchesResponse = await bringTennisMatches(
              selectedTournamentId,
              token
            );
            const matches = matchesResponse.data.data;
    
            const resultsResponse = await bringResultsForMatches(selectedTournamentId, token);
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
              }
            });
    
            setAllTennisMatches(resultsMatches);
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
    
    const deleteThisTennisMatch = async (id) => {
        const confirm = window.confirm("¿Estás seguro de que quieres eliminar esta partido de tenis?");
        if (confirm){
            try {
                await deleteTennisMatch (id, token);
                const updateAllTennisMatches = allTennisMatches.filter((match) => match.id !== id);
                setAllTennisMatches(updateAllTennisMatches);
                setCongratulations(`Enhorabuena ${nameUser}, has eliminado el partido de tenis correctamente`);
                setTimeout(() => {
                    window.location.reload();
                  }, 3000);
            } catch (error) {
                setCongratulations(`Error: ${error.response.data.message}`);
                setTimeout(() => {
                  window.location.reload();
                }, 3000);
            }
        }
    }

  return (
    <div className="pageBaseDesign">
      <div className="titleBaseDesign">
        <h4 className='text-decoration-underline'>Partidos del Torneo</h4>
      </div>
      <div className="titleTournamentBase">
        <h5>{selectedTournamentName}</h5>
      </div>
      {congratulations != "" ? (
        <div>{congratulations}</div>
      ) : (
        <>
      <Table striped bordered className="bg-white border-3 tableAllTennisMatches">
        <thead>
          <tr className="titleRowTable text-center">
            <th>Fecha</th>
            <th>Lugar</th>
            <th>Jugador 1</th>
            <th>Jugador 2</th>
            <th>Ganador</th>
            <th className={token && fullUser.role_id === 2 ? "" : "btnsHidden"}>Acción</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6}>Cargando resultados ...</td>
            </tr>
          ) : allTennisMatches.length > 0 ? (
            allTennisMatches.map((match) => (
              <tr key={match.id}>
                <td className='text-center'>{new Date(match.date).toLocaleDateString("es-ES")}</td>
                <td>{match.location}</td>
                <td>{`${match.player1_name} ${match.player1_surname}`}</td>
                <td>{`${match.player2_name} ${match.player2_surname}`}</td>
                <td>{(match.winner_name && match.winner_surname) ? `${match.winner_name} ${match.winner_surname}` : ""}</td>
                <td className={token && fullUser.role_id === 2 ? 'text-center' : 'btnsHidden'}><button className='goButtonDesign goButtonDelete' onClick={() => deleteThisTennisMatch(match.id)}>Eliminar</button></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No se encuentran resultados</td>
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
      </>
    )}
    </div>
  )
}
