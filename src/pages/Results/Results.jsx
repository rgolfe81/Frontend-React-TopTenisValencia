import React, { useEffect, useState } from "react";
import "./Results.css";
import { useSelector } from "react-redux";
import { tournamentIdData } from "../tournamentSlice";
import { userData } from "../userSlice";
import {
  bringResultFortWinner,
  updateWinnerToResult,
} from "../../services/apiCalls";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Results = () => {
  const infoTournamentRdx = useSelector(tournamentIdData);
  const { id, name } = infoTournamentRdx.infoTournament;
  const selectedTournamentId = id;
  const selectedTournamentName = name;
  const credentialsRdx = useSelector(userData);
  const { token, fullUser } = credentialsRdx.credentials;
  const [resultWithPlayers, setResultWithPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [winnerToResult, setWinnerToResult] = useState({
    winner_user_id: "",
    score_result: ""
  });
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [congratulations, setCongratulations] = useState("");
  const navigate = useNavigate();

  // Manejador de cambios en los input/select
  const inputHandler = (e) => {
    setWinnerToResult((preveState) => ({
      ...preveState,
      [e.target.name]: e.target.value,
    }));
  };

  // Manejador de cambios en el input/checkbox
  const handleCheckboxChange = (e) => {
    setSelectedCheckboxes((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.checked,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let resultPlayers = [];
        const response = await bringResultFortWinner(
          selectedTournamentId,
          token
        );
        resultPlayers = response.data.data;

        setResultWithPlayers(resultPlayers);
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

  // Actualizamos el valor del id del partido seleccionado en el checkbox, para enviarlo por parametros a la función updateWinnerToResult()
  useEffect(() => {
    const matchId = Object.keys(selectedCheckboxes).find(
      (id) => selectedCheckboxes[id] === true
    );
    setSelectedMatchId(matchId);
  }, [selectedCheckboxes]);

  const sendUpdateWinnerToResult = () => {
    // console.log("ganador dentro de objeto ... ",winnerToResult)
    // console.log("ganador fuera de objeto ... ",winnerToResult.winner_user_id)
    winnerToResult.winner_user_id = parseInt(winnerToResult.winner_user_id)
    updateWinnerToResult(selectedMatchId, winnerToResult, token)
      .then((response) => {   
        // console.log("respuesta ......  ",response)   
        if (fullUser.name) {
          setCongratulations(
            `Enhorabuena ${fullUser.name}, has actualizado el resultado del partido correctamente`
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
      })
      .catch((error) => {
        setCongratulations(`Error: ${error.response.data.message}`);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      console.log(error)
      });
      // console.log("ganador .......  ",winnerToResult.winner_user_id);
      // console.log("partido .......  ",selectedMatchId);
  };

  return (
    <div className="pageBaseDesign">
      <div className="titleBaseDesign">
        <h4 className="text-decoration-underline">Actualizar mis Partidos</h4>
      </div>
      <h5>{selectedTournamentName}</h5>
      {congratulations !== "" ? (
        <div className="messageTournamentDesign">{congratulations}</div>
      ) : (
        <>
          <Table
            striped
            bordered
            className="bg-white border-3 tableResultsDesign"
          >
            <thead>
              <tr className="text-center titleRowTable">
                <th>Partido</th>
                <th>Jugador 1</th>
                <th>Jugador 2</th>
                <th>Resultado</th>
                <th>Ganador</th>
              </tr>
            </thead>
            <tbody>
              {/* Verifica si los datos han sido cargados */}
              {loading ? (
                <tr>
                  <td colSpan={5}>Cargando datos ...</td>
                </tr>
              ) : resultWithPlayers.length > 0 ? (
                resultWithPlayers.map((result) => (
                  <tr key={result.id}>
                    <td className="text-center">
                      <input
                        className={!result.winner_name ? "" : "btnsHidden"}
                        type="checkbox"
                        value=""
                        id={result.tennis_match_id}
                        checked={selectedCheckboxes[result.tennis_match_id]}
                        onChange={(e) => handleCheckboxChange(e)}
                      />
                    </td>
                    <td>
                      {result.player1_name} {result.player1_surname}
                    </td>
                    <td>
                      {result.player2_name} {result.player2_surname}
                    </td>
                    <td className="text-center">
                      <div>
                        {selectedCheckboxes[result.tennis_match_id] ? (
                          <input
                            className="inputsResultDesign"
                            name="score_result"
                            type="text"
                            placeholder="Ejemplo: 6-4 3-6 7-5"
                            onChange={(e) => inputHandler(e)}
                          ></input>
                        ) : (
                          <div className="text-center">{result.score_result}</div>
                        )}
                      </div>
                    </td>
                    <td className="text-center">
                      <div>
                        {selectedCheckboxes[result.tennis_match_id] ? (
                          <select
                            className="inputsResultDesign"
                            name="winner_user_id"
                            onChange={(e) => inputHandler(e)}
                          >
                            <option value={null}>Seleccione ganador</option>
                            <option
                              key={result.player1_user_id}
                              value={result.player1_user_id}
                            >
                              {result.player1_name} {result.player1_surname}
                            </option>
                            <option
                              key={result.player2_user_id}
                              value={result.player2_user_id}
                            >
                              {result.player2_name} {result.player2_surname}
                            </option>
                          </select>
                        ) : (
                          <div>
                            {result.winner_name} {result.winner_surname}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>
                    No se encuentran datos de jugadores para introducir ganador
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <div className="sectionBtnsBottomTable">
            <button
              className="btnTennisMatches"
              onClick={() => {
                navigate("/selectedTournament");
              }}
            >
              Volver
            </button>
            <button
              className="btnTennisMatches addMatchBtn"
              onClick={() => {
                sendUpdateWinnerToResult();
              }}
            >
              Enviar
            </button>
          </div>
        </>
      )}
    </div>
  );
};
