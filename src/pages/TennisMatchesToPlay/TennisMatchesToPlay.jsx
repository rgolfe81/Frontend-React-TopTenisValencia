import React, { useEffect, useState } from 'react'
import "./TennisMatchesToPlay.css"
import { useNavigate } from 'react-router-dom'
import { bringResultsForMatches, bringTennisMatches } from '../../services/apiCalls';
import { useSelector } from 'react-redux';
import { tournamentIdData } from '../tournamentSlice';
import { userData } from '../userSlice';


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
            //    else {
            //     return result;
            //   }
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
    
      console.log(allTennisMatches)

  return (
    <div>TennisMatchesToPlay</div>
  )
}
