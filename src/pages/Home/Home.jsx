import React from "react";
import "./Home.css";
import { Container } from "react-bootstrap";
import Pista_tenis from "../../img/pista_tenis.jpg";

export const Home = () => {
  return (
      <div className="pageBaseDesign text-dark">
        <Container className="mt-4 mb-3 bg-white border boxContainer">
            <h5 className="text-decoration-underline">Bienvenidos a Top Tenis Valencia</h5>
            <p>
                En Top Tenis Valencia, jugamos al tenis durante todo el año.
                Tenemos un torneo para cada estación del año, donde podrás jugar partidos en modo liga contra 8 participantes
            </p>
            <h5 className="text-decoration-underline">Participantes de los torneos</h5>
            <p>
              Son torneos abiertos, en los que pueden participar tanto jugadores principiantes que se inician, como jugadores que quieren seguir practicando el tenis.
              Para participar debes <a href="/register"><strong>registrarte</strong></a>, para poder acceder a los torneos disponibles e inscribirte al que quieras jugar.
              Cuando empiece cada torneo, tendrás acceso al calendario de partidos, a la información de tus rivales para poder confirmar el día del partido, a los resultados de los partidos jugados y a la clasificación del torneo.
              Cuando finalices para partido, los participantes son los encargados de actualizar el resultado de cada partido disputado.
            </p>
            <h5 className="text-decoration-underline">Pistas de tenis</h5>
            <p>
              Los partidos de tenis se jugarán en polideportivos municipales de los alrrededores de Valencia, donde los participantes serán los encargados de confirmar la asistencia en el lugar donde se vaya a disputar el partido
            </p>
            <img src={Pista_tenis} alt="Imangen Pista Tenis" className="imgHome"></img>
        </Container>
      </div>
  );
};
