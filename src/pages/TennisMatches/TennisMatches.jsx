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
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";

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
    date: "",
    location: "",
    player1_user_id: "",
    player2_user_id: "",
  });
  // Manejador de cambios en los input/select
  const inputHandler = (e) => {
    setNewTennisMatch((preveState) => ({
      ...preveState,
      [e.target.name]: e.target.value,
    }));
  };

  // Manejador de cambios en la selección de fecha en el calendario, formateando la fecha
  const handleDateChange = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setNewTennisMatch((prevState) => ({
      ...prevState,
      date: formattedDate,
    }));
    setDateForTransform(date);
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
          setCongratulations(`Error: ${response.data.message}`);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      })
      .catch((error) => {
        setCongratulations(`Error: ${error.response.data.message}`);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
  };

  return (
    <div className="pageBaseDesign">
      <div className="titleBaseDesign">
        <h4>{selectedtournamentName}</h4>
      </div>
      <h5 className="mb-4">
        {formatedStartDateTournament} a {formatedEndDateTournament}
      </h5>
      {congratulations !== "" ? (
        <div className="messageTournamentDesign">{congratulations}</div>
      ) : (
        <>
          <Container className="containerTennisMatches">
            <Row>
              <Col sm={12} md={6} className="col1TennisMatches">
                <div className="calendarDesign">
                  <Calendar
                    className="incalendarDesign"
                    onChange={(date) => handleDateChange(date)}
                    value={dateForTransform}
                  />
                </div>
              </Col>
              <Col sm={12} md={6} className="col2TennisMatches">
                <div className="dateSelected">
                  <BsFillCalendar2DateFill className="iconDesign" /> Fecha
                  seleccionada: {dateForTransform.toLocaleDateString("es-ES")}
                </div>

                {/* Verifica si los datos de los jugadores han sido cargados */}
                {loading ? (
                  <div>Cargando datos de jugadores ...</div>
                ) : (
                  <>
                    <div className="labelPlayerAlign">
                      <span className="textPlayer">Jugador 1</span>
                      <select
                        className="inputsTennisMatchesDesign longSelect"
                        name="player1_user_id"
                        onChange={(e) => inputHandler(e)}
                      >
                        <option value="">Seleccione jugador 1</option>
                        {playersTournament.map((player) => (
                          <option key={player.id} value={player.id}>
                            {player.name} {player.surname}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="labelPlayerAlign">
                      <span className="textPlayer"> Jugador 2</span>
                      <select
                        className="inputsTennisMatchesDesign longSelect"
                        name="player2_user_id"
                        onChange={(e) => inputHandler(e)}
                      >
                        <option value="">Seleccione jugador 2</option>
                        {playersTournament.map((player) => (
                          <option key={player.id} value={player.id}>
                            {player.name} {player.surname}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
                <div className="labelPlayerAlign">
                <span className="textPlayer">Lugar</span>
                  <input
                    className="inputsTennisMatchesDesign longSelect"
                    type="text"
                    name="location"
                    placeholder="Introduce localización"
                    maxLength="40"
                    onChange={(e) => inputHandler(e)}
                  ></input>
                </div>
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
