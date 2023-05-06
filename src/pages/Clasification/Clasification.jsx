import React, { useEffect, useState } from 'react'
import "./Clasification.css"
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux';
import { tournamentIdData } from '../tournamentSlice';
import { bringClassification, bringUsersForClassification } from '../../services/apiCalls';
import { Table } from 'react-bootstrap';
import { userData } from '../userSlice';

export const Clasification = () => {
    const navigate = useNavigate();
    const infoTournamentRdx = useSelector(tournamentIdData)
    const { id, name } = infoTournamentRdx.infoTournament;
    const selectedTournamentId = id;
    const selectedtournamentName = name;
    const [classification, setClassification] = useState([]);
    const [loading, setLoading] = useState(true);
    const credentialsRdx = useSelector(userData);
    const { token } = credentialsRdx.credentials;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await bringUsersForClassification (selectedTournamentId, token);
                const users = usersResponse.data.data.users;

                const classificationResponse = await bringClassification (selectedTournamentId, token);
                const clasification = classificationResponse.data.data;

                // Creamos un nuevo array con la información del nombre y apellidos del usuario para mostrar en el renderizado
                const classificationWithUsers = clasification.map((ranking) => {
                    const user = users.find((user) => user.id === ranking.user_id);
                    if (user) {
                        return {
                            ...ranking,
                            name: user.name,
                            surname: user.surname
                        }
                    } else {
                        return ranking;
                    }
                })
                setClassification(classificationWithUsers)
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchData()
    }, [selectedTournamentId]);

  return (
    <div className='pageBaseDesign'>
        <h4 className='titleBaseDesign text-decoration-underline'>CLASIFICACIÓN</h4>
        <h5 className='mb-3'>
            <div>{selectedtournamentName}</div>
        </h5>
        <Table striped bordered className='bg-white border-3 tableClassification'>
            <thead>
                <tr className="titleRowTable text-center">
                    <th>Jugador</th>
                    <th>Puntos</th>
                    <th>Jugados</th>
                    <th>Ganados</th>
                    <th>Perdidos</th>
                </tr>
            </thead>
        <tbody>
        {loading ? (
            <tr>
              <td colSpan={5}>Cargando datos ...</td>
            </tr>
          ) : classification.length > 0 ? (
            classification.map((clasific) => (
              <tr key={clasific.id}>
                <td>{`${clasific.name} ${clasific.surname}`}</td>
                <td className='text-center'>{clasific.score}</td>
                <td className='text-center'>{clasific.matches_played}</td>
                <td className='text-center'>{clasific.matches_win}</td>
                <td className='text-center'>{clasific.matches_lost}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No se encuentran datos</td>
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
  )
}
