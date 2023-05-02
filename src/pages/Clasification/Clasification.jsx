import React, { useEffect, useState } from 'react'
import "./Clasification.css"
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux';
import { tournamentIdData } from '../tournamentSlice';
import { bringClassification, bringUsersForClassification } from '../../services/apiCalls';

export const Clasification = () => {
    const navigate = useNavigate();
    const infoTournamentRdx = useSelector(tournamentIdData)
    const { id, name, start_date, end_date } = infoTournamentRdx.infoTournament;
    const selectedTournamentId = id;
    const selectedtournamentName = name;
    const formatedStartDateTournament = new Date(start_date).toLocaleDateString("es-ES");
    const formatedEndDateTournament = new Date(end_date).toLocaleDateString("es-ES");
    const [classification, setClassification] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await bringUsersForClassification (selectedTournamentId);
                const users = usersResponse.data.data.users;
                setUsers(users);

                const classificationResponse = await bringClassification (selectedTournamentId);
                const clasification = classificationResponse.data.data;
                setClassification(clasification);
                
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchData()
    }, [selectedTournamentId]);
    console.log (users)
    console.log (classification)
  return (
    <div>Clasification</div>
  )
}
