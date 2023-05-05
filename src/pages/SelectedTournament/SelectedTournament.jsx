import React, { useEffect, useState } from "react";
import "./SelectedTournament.css";
import dayjs from "dayjs";
import {
  addMeToTournament,
  bringTournamentById,
} from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { tournamentIdData } from "../tournamentSlice";
import { Col, Container, Row } from "react-bootstrap";
import Img_01 from "../../img/img_default_tournament.jpg";
import { userData } from "../userSlice";
import { useNavigate } from "react-router-dom";

export const SelectedTournament = () => {
  const [congratulations, setCongratulations] = useState("");
  const [tournamentById, setTournamentById] = useState();
  const infoTournamentRdx = useSelector(tournamentIdData);
  const { id, start_date, end_date } = infoTournamentRdx.infoTournament;
  const selectedTournamentStartDate = start_date;
  const selectedTournamentEndDate = end_date;
  const selectedTournamentID = id;
  const navigate = useNavigate();
  const credentialsRdx = useSelector(userData);
  const { token, fullUser } = credentialsRdx.credentials;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await bringTournamentById(selectedTournamentID);
        setTournamentById(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (!tournamentById) {
    return (
      <div className="tournamentDesign tournamentMessageDesign">
        Cargando datos ...
      </div>
    );
  }

  // Pasamos la id del usuario almacenda en redux a json, que es lo que espera el backend
  const body = {
    user_id: fullUser.id,
  };

  const addUserToTournament = async () => {
    try {
      const response = await addMeToTournament(
        selectedTournamentID,
        body,
        token
      );
      let nameUser = fullUser.name;
      if (nameUser && token && selectedTournamentID) {
        setCongratulations(
          `Enhorabuena ${nameUser}, te has inscrito al torneo ${tournamentById.data.name}`
        );
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        setCongratulations(`Error: ${response.data.message}`);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      setCongratulations(`Error: ${error.response.data.message}`);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
    }
  };

  return (
    <div className="pageBaseDesign">
      <div className="titleBaseDesign">
        <h4 className="text-decoration-underline">{tournamentById.data.name}</h4>
      </div>
      <h5>
        {new Date(selectedTournamentStartDate).toLocaleDateString("es-ES")} a {new Date(selectedTournamentEndDate).toLocaleDateString("es-ES")}
      </h5>
      {congratulations !== "" ? (
        <div className="messageTournamentDesign">{congratulations}</div>
      ) : (
        <>
          <Container>
            <Row>
              <Col sm={12} md={6}>
                <div className="boxImageTournamentDesign">
                  <img
                    src={Img_01}
                    alt="Imagen Torneo"
                    className="imgTournamentDesign"
                  />
                </div>
              </Col>
              <Col sm={12} md={6}>
                <div className="boxButtonsDesign">
                  <div>
                    <button
                      className="buttonTournamentDesign"
                      onClick={() => addUserToTournament()}
                    >
                      Inscribirse
                    </button>
                  </div>
                  <div>
                    <button
                      className="buttonTournamentDesign"
                      onClick={() => navigate("/playersTournament")}
                    >
                      Jugadores inscritos
                    </button>
                  </div>
                  <div>
                    <button
                      className="buttonTournamentDesign"
                      onClick={() => navigate("/matchesToPlay")}
                    >
                      Partidos
                    </button>
                    </div>
                    <div>
                    <button
                      className="buttonTournamentDesign"
                      onClick={() => navigate("/result")}
                    >
                      Introducir mis resultados
                    </button>
                  </div>
                  <div>
                    <button
                      className="buttonTournamentDesign"
                      onClick={() => navigate("/resultsTennisMatches")}
                    >
                      Resultados
                    </button>
                  </div>
                  <div>
                    <button
                      className="buttonTournamentDesign"
                      onClick={() => navigate("/clasification")}
                    >
                      Clasificación
                    </button>
                  </div>
                  <div>
                    <button
                      className="buttonTournamentDesign"
                      onClick={() => navigate("/tennisMatches")}
                    >
                      Crear emparejamientos
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </div>
  );
};
