import React, { useEffect, useState } from 'react'
import "./Results.css"
import { useSelector } from 'react-redux';
import { tournamentIdData } from '../tournamentSlice';
import { userData } from '../userSlice';
import { bringResultFortWinner } from '../../services/apiCalls';

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
            // setLoading(false); // Actualiza el estado de carga a false cuando los datos se cargan
          } catch (error) {
            console.log(error);
            // setLoading(false); // Actualiza el estado de carga a false en caso de error
          }
        };
        if (token) {
          fetchData();
        }
        
      }, [token]);
      
  return (
    <div>Results</div>
  )
}
