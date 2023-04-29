import React, { useEffect, useState } from "react";
import "./TennisMatches.css";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  addMatchToTournament,
  bringUsersByTournament,
} from "../../services/apiCalls";
import { tournamentIdData } from "../tournamentSlice";
import { userData } from "../userSlice";
import Calendar from "react-calendar";
import { Col, Container, Row } from "react-bootstrap";

export const TennisMatches = () => {
  const navigate = useNavigate();
  const [dateForTransform, setDateForTransform] = useState(new Date());
  const infoTournamentRdx = useSelector(tournamentIdData);
  const { id, name, start_date, end_date } = infoTournamentRdx.infoTournament;
  const selectedTournamentId = id;
  const selectedtournamentName = name;
  const formatedStartDateTournament = new Date(start_date).toLocaleDateString(
    "es-ES"
  );
  const formatedEndDateTournament = new Date(end_date).toLocaleDateString(
    "es-ES"
  );
  const credentialsRdx = useSelector(userData);
  const { token } = credentialsRdx.credentials;
  const [congratulations, setCongratulations] = useState("");
  const [loading, setLoading] = useState(true);
  const [playersTournament, setPlayersTournament] = useState([]);

  const [newTennisMatch, setNewTennisMatch] = useState({
    date: dayjs(dateForTransform).format("YYYY-MM-DD"),
    location: "",
    player1_user_id: "",
    player2_user_id: "",
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
        const playersResponse = await bringUsersByTournament(
          selectedTournamentId,
          token
        );
        players = playersResponse.data.data.users;
        setPlayersTournament(players);
        setLoading(false); // Actualiza el estado de carga a false cuando los datos de los juegadores se cargan
      } catch (error) {
        console.log(error);
        setLoading(false); // Actualiza el estado de carga a false en caso de error
      }
    };
    if (token) {
      fetchData();
    }
  }, [token]);

  const addTennisMatch = () => {
    addMatchToTournament(selectedTournamentId, newTennisMatch, token)
      .then((response) => {
        if (token) {
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
  };

  return (
    <div className="tennisMatchDesign">
      <div className="titleTennisMatchDesign">
        <h4>{selectedtournamentName}</h4>
      </div>
      <div className="mb-4">
        desde {formatedStartDateTournament} hasta {formatedEndDateTournament}
      </div>
      {congratulations !== "" ? (
        <div className="tennisMatchMessageDesign">{congratulations}</div>
      ) : (
        <>
          <Container className="containerTennisMatches">
            <Row>
              <Col sm={12} md={6} className="col1TennisMatches">
                <div className="calendarDesign">
                  <Calendar
                    onChange={setDateForTransform}
                    value={dateForTransform}
                  />
                </div>
              </Col>
              <Col sm={12} md={6} className="col2TennisMatches">
                <div className="dateSelected">
                  Fecha seleccionada:{" "}
                  {dateForTransform.toLocaleDateString("es-ES")}
                </div>

                {/* Verifica si los datos de los jugadores han sido cargados */}
                {loading ? (
                  <div>Cargando datos de jugadores ...</div>
                ) : (
                  <>
                    <div className="labelPlayerAlign">
                      <span>Jugador 1</span>
                      <select
                        className="inputsTennisMatchesDesign longSelect"
                        name="player1_user_id"
                        onChange={(e) => inputHandler(e)}
                      >
                        {playersTournament.map((player) => (
                          <option key={player.id} value={player.id}>
                            {player.name} {player.surname}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="labelPlayerAlign">
                      <span>Jugador 2</span>
                      <select
                        className="inputsTennisMatchesDesign longSelect"
                        name="player2_user_id"
                        onChange={(e) => inputHandler(e)}
                      >
                        {playersTournament.map((player) => (
                          <option key={player.id} value={player.id}>
                            {player.name} {player.surname}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
                <input
                  className="inputsTennisMatchesDesign"
                  type="text"
                  name="location"
                  placeholder="Introduce localización"
                  maxLength="40"
                  onChange={(e) => inputHandler(e)}
                ></input>
                <button
                  className="btnTennisMatches addMatchBtn"
                  onClick={() => {
                    addTennisMatch();
                  }}
                >
                  Añadir partido
                </button>
                <button
                  className="btnTennisMatches"
                  onClick={() => {
                    navigate("/selectedTournament");
                  }}
                >
                  Volver
                </button>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </div>
  );
};
