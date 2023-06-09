import React, { useEffect, useState } from "react";
import "./PlayersTournament.css";
import { useSelector } from "react-redux";
import { tournamentIdData } from "../tournamentSlice";
import { userData } from "../userSlice";
import { bringUsersByTournament } from "../../services/apiCalls";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const PlayersTournament = () => {
  const infoTournamentRdx = useSelector(tournamentIdData);
  const { id, name } = infoTournamentRdx.infoTournament;
  const selectedTournamentId = id;
  const selectedTournamentName = name;
  const credentialsRdx = useSelector(userData);
  const { token } = credentialsRdx.credentials;
  const [playersTournament, setPlayersTournament] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let players = [];
        const response = await bringUsersByTournament(
          selectedTournamentId,
          token
        );
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

  return (
    <div className="pageBaseDesign">
      <div className="titleBaseDesign">
        <h4 className="text-decoration-underline">Jugadores Inscritos</h4>
      </div>
      <h5>{selectedTournamentName}</h5>
      <Table
        striped
        bordered
        className="bg-white border-3 tablePlayersTournamentsDesign"
      >
        <thead>
          <tr className="titleRowTable text-center">
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Edad</th>
            <th>Ciudad</th>
            <th>Email</th>
            <th>Telefono</th>
          </tr>
        </thead>
        <tbody>
          {/* Verifica si los datos han sido cargados */}
          {loading ? (
            <tr>
              <td colSpan={6}>Cargando datos ...</td>
            </tr>
          ) : playersTournament.length > 0 ? (
            playersTournament.map((player) => (
              <tr key={player.id}>
                <td>{player.name}</td>
                <td>{player.surname}</td>
                <td className="text-center">{player.age}</td>
                <td>{player.city}</td>
                <td>{player.email}</td>
                <td className="text-center">{player.phone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No se encuentran datos de los jugadores</td>
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
