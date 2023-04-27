import React, { useEffect, useState } from 'react'
import "./SelectedTournament.css"
import { bringTournamentById } from '../../services/apiCalls';
import { useSelector } from 'react-redux';
import { tournamentIdData } from '../tournamentSlice';

export const SelectedTournament = () => {
    const [tournamentById, setTournamentById] = useState();
    const [loading, setLoading] = useState(true); // Agrega un estado para manejar el estado de carga
    const infoTournamentRdx = useSelector(tournamentIdData);
    const selectedTournamentID = infoTournamentRdx.infoTournament;
    console.log (selectedTournamentID);

  return (
    <div>SelectedTournament</div>
  )
}
