import React, { useEffect, useState } from 'react'
import "./TennisMatches.css"
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { bringUsersByTournament } from '../../services/apiCalls';
import { tournamentIdData } from '../tournamentSlice';
import { userData } from '../userSlice';
import Calendar from 'react-calendar';

export const TennisMatches = () => {
    const navigate = useNavigate();
    const [dateForTransform, setDateForTransform] = useState(new Date());
    const infoTournamentRdx = useSelector(tournamentIdData);
    const { id, name, start_date, end_date } = infoTournamentRdx.infoTournament;
    const selectedTournamentId = id;
    const selectedtournamentName = name;
    const formatedStartDateTournament = new Date(start_date).toLocaleDateString('es-ES');
    const formatedEndDateTournament = new Date(end_date).toLocaleDateString('es-ES');
    const credentialsRdx = useSelector(userData);
    const { token } = credentialsRdx.credentials;
    const [congratulations, setCongratulations] = useState("");
    const [loading, setLoading] = useState(true);
    const [playersTournament, setPlayersTournament] = useState([]);

    const [newtennisMatch, setNewTennisMatch] = useState({
        date: dayjs(dateForTransform).format("YYYY-MM-DD"),
        location: "",
        player1_user_id: "",
        player2_user_id: ""
    });

    const inputHandler = (e) => {
        setNewTennisMatch((preveState) => ({
          ...preveState,
          [e.target.name]: e.target.value,
        }));
      };

      // Recibimos los jugadores del torneo para seleccionarlos posteriormente
      useEffect(() => {
        const fetchData = async () => {
          try {
            let players = [];
            const response = await bringUsersByTournament(selectedTournamentId, token);
            players = response.data.data.users;
            setPlayersTournament(players);
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
    
      console.log(playersTournament);

      const addTennisMatch = () => {
        addMatchToTournament(selectedTournamentId, newtennisMatch, token)
        .then((response) => {
            if (response){
                setCongratulations("El partido se ha creado correctamente");
                setTimeout(() => {
                    window.location.reload();
                  }, 3000);
            } else {
                setCongratulations(`Error: ${response.data}`);
                setTimeout(() => {
                  window.location.reload();
                }, 3000);
              }
        })
        .catch((error) => console.log(error));
      }

  return (
    <div className='tennisMatchDesign'>
        <div className="titleTennisMatchDesign">
            <h4>{selectedtournamentName}</h4>
        </div>
        <div>
        desde {formatedStartDateTournament} hasta{" "}
        {formatedEndDateTournament}
        </div>
        {congratulations !== "" ? (
          <div className="tennisMatchMessageDesign">{congratulations}</div>
        ) : (
          <>
            <div className="calendarDesign">
              <Calendar
                onChange={setDateForTransform}
                value={dateForTransform}
              />
            </div>
            <div>
                Fecha seleccionada:{" "}
                {dateForTransform.toLocaleDateString("es-ES")}
            </div>
            <select name="player1_user_id" onChange={(e) => inputHandler(e)}>
                {playersTournament.map((player) => (
                    <option key={player.id} value={player.id}>{player.name}{""}{player.surname}</option>
                ))}
            </select>
            <select name="player2_user_id" onChange={(e) => inputHandler(e)}>
                {playersTournament.map((player) => (
                    <option key={player.id} value={player.id}>{player.name}{""}{player.surname}</option>
                ))}
            </select>
            <input type="text" name="location" placeholder="Introduce localización" maxLength="40" onChange={(e) => inputHandler(e)}></input>
          </>
        )}
    </div>
  )
}


           {/* Verifica si los datos han sido cargados */}
        //     {{loading ? (
        //        <div>Cargando datos ...</div>
        //    ) : playersTournament.length > 0 ? (
        //      playersTournament.map((player) => (
        //        <tr key={player.id}>
        //         <td>{player.name}</td>
        //          <td>{player.surname}</td>
        //        </tr>
        //      ))
        //    ) : (
        //        <div>No se encuentran datos de los jugadores</div>
        //    )} }