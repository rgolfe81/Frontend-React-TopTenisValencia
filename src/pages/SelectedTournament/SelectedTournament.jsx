import React, { useEffect, useState } from "react";
import "./SelectedTournament.css";
import { addMeToTournament, bringTournamentById } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { tournamentIdData } from "../tournamentSlice";
import { Col, Container, Row } from "react-bootstrap";
import Img_01 from "../../img/img_default_tournament.jpg";
import { userData } from "../userSlice";

export const SelectedTournament = () => {
const [congratulations, setCongratulations] = useState("");
  const [tournamentById, setTournamentById] = useState();
  const infoTournamentRdx = useSelector(tournamentIdData);
  const selectedTournamentID = infoTournamentRdx.infoTournament;
  const credentialsRdx = useSelector(userData);
  const { token, fullUser} = credentialsRdx.credentials;

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
    return <div className="tournamentDesign">Cargando datos ...</div>;
  }

  // Pasamos la id del usuario almacenda en redux a json, que es lo que espera el backend
  const body = {
    user_id: fullUser.id
  };

  const addUserToTournament = async () => {
    try {
      const response = await addMeToTournament(selectedTournamentID, body, token);
      let nameUser = fullUser.name;
      if (nameUser && token && selectedTournamentID) {
        setCongratulations(
          `Enhorabuena ${nameUser}, te has inscrito al torneo ${tournamentById.data.name}`
        );
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        setCongratulations(`Error: ${response.data}`);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  

  return (
    <div className="tournamentDesign">
      <div className="titleTournamentDesign">
        <h4>{tournamentById.data.name}</h4>
      </div>
      <div>
        desde {tournamentById.data.start_date} hasta{" "}
        {tournamentById.data.end_date}
      </div>
      {congratulations !== "" ? (
          <div>{congratulations}</div>
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
                  // onClick={() => namefunction()}
                >
                  Jugadores inscritos
                </button>
              </div>
              <div>
                <button
                  className="buttonTournamentDesign"
                  // onClick={() => namefunction()}
                >
                  Introducir resultado
                </button>
              </div>
              <div>
                <button
                  className="buttonTournamentDesign"
                  // onClick={() => namefunction()}
                >
                  Resultados
                </button>
              </div>
              <div>
                <button
                  className="buttonTournamentDesign"
                  // onClick={() => namefunction()}
                >
                  Clasificación
                </button>
              </div>
              <div>
                <button
                  className="buttonTournamentDesign"
                  // onClick={() => namefunction()}
                >
                  Modificar torneo
                </button>
              </div>
              <div>
                <button
                  className="buttonTournamentDesign"
                  // onClick={() => namefunction()}
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
