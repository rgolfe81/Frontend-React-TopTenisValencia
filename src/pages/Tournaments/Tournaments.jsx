import React, { useEffect, useState } from "react";
import "./Tournaments.css";
import { bringTournaments } from "../../services/apiCalls";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { idTournament } from "../tournamentSlice";
import { userData } from "../userSlice";

export const Tournaments = () => {
  const [allTournaments, setAllTournaments] = useState([]);
  const [loading, setLoading] = useState(true); // Agrega un estado para manejar el estado de carga
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const credentialsRdx = useSelector(userData);
  const { token, fullUser } = credentialsRdx.credentials;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let tournaments = [];
        let response = await bringTournaments();
        tournaments = response.data.data;
        setAllTournaments(tournaments);
        setLoading(false); // Actualiza el estado de carga a false cuando los datos se cargan
      } catch (error) {
        console.log(error);
        setLoading(false); // Actualiza el estado de carga a false en caso de error
      }
    };
    fetchData();
  }, []);


  const goToSelectedTournament = (tournament) => {
    let selectedTournament = tournament; 
    // Guardamos en redux los datos del torneo seleccionado
    dispatch(idTournament({ infoTournament: selectedTournament}));
    navigate("/selectedTournament");
  }

  return (
    <div className="pageBaseDesign tournamentsDesign">
      <div className="titleBaseDesign">
        <h4 className="text-decoration-underline">Torneos</h4>
      </div>
      <Table striped bordered className="bg-white border-3 tableTournamentDesign">
        <thead>
          <tr className="titleRowTable text-center">
            <th>Torneo</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th className={token ? "text-center" : "btnsHidden"}>Acción</th>
          </tr>
        </thead>
        <tbody>
          {/* Verifica si los datos han sido cargados */}
          {loading ? (
            <tr>
              <td colSpan={4}>Cargando...</td>
            </tr>
          ) : allTournaments.length > 0 ? (
            allTournaments.map((tournament) => (
              <tr key={tournament.id}>
                <td>{tournament.name}</td>
                <td className="text-center">{new Date(tournament.start_date).toLocaleDateString("es-ES")}</td>
                <td className="text-center">{new Date(tournament.end_date).toLocaleDateString("es-ES")}</td>
                <td className={token ? "text-center" : "btnsHidden"}><button className="goButtonDesign" 
                onClick={() => goToSelectedTournament(tournament)}
                >Ir</button></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No se encuentran datos de torneos</td>
            </tr>
          )}
        </tbody>
      </Table>
<button className={token && fullUser.role_id === 2 ? "btnNewTournament" : "btnsHidden"} onClick={() => {navigate("/newTournament")}}>Nuevo Torneo</button>
    </div>
  );
};

