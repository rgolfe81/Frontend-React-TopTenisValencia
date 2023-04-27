import React, { useEffect, useState } from "react";
import "./SelectedTournament.css";
import { bringTournamentById } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { tournamentIdData } from "../tournamentSlice";
import { Col, Container, Row } from "react-bootstrap";
import Img_01 from "../../img/img_default_tournament.jpg";

export const SelectedTournament = () => {
  const [tournamentById, setTournamentById] = useState();
  const infoTournamentRdx = useSelector(tournamentIdData);
  const selectedTournamentID = infoTournamentRdx.infoTournament;
  console.log(selectedTournamentID);

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

  return (
    <div className="tournamentDesign">
      <div className="titleTournamentDesign">
        <h4>{tournamentById.data.name}</h4>
      </div>
      <div>
        desde {tournamentById.data.start_date} hasta{" "}
        {tournamentById.data.end_date}
      </div>
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
                  // onClick={() => namefunction()}
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
    </div>
  );
};
