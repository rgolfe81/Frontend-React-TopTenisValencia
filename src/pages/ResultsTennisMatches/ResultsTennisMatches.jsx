import React, { useEffect, useState } from 'react'
import "./ResultsTennisMatches"
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux';
import { tournamentIdData } from '../tournamentSlice';
import { bringResults, bringTennisMatches } from '../../services/apiCalls';
import { userData } from '../userSlice';

export const ResultsTennisMatches = () => {
    const navigate = useNavigate();
    const infoTournamentRdx = useSelector(tournamentIdData);
    const { id, name, start_date, end_date } = infoTournamentRdx.infoTournament;
    const selectedTournamentId = id;
    const selectedTournamentName = name;
    const formatedStartDateTournament = new Date(start_date).toLocaleDateString("es-ES");
      const formatedEndDateTournament = new Date(end_date).toLocaleDateString("es-ES");
    const credentialsRdx = useSelector(userData);
    const { token } = credentialsRdx.credentials;
    const [tennisMatches, setTennisMatches] = useState([]);
    const [tennisResults, setTennisResults] = useState([]);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let matches = [];
                const matchesResponse = await bringTennisMatches (selectedTournamentId, token);
                matches = matchesResponse.data.data;
                setTennisMatches(matches);
                
                let results = [];
                const resultsResponse = await bringResults (selectedTournamentId, token);
                results = resultsResponse.data.data;
                setTennisResults(results);
                // setLoading(false)
            } catch (error) {
                console.log(error);
                // setLoading(false);
            }
        }
        if (token){
            fetchData();
        }
    }, [token])
    console.log(tennisMatches);
    console.log(tennisResults);
  return (
    <div>ResultsTennisMatches</div>
  )
}
