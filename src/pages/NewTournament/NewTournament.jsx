import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addTournament } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { useNavigate } from "react-router";
import { InputText } from "../../common/InputText/InputText";
import dayjs from "dayjs";
import "./NewTournament.css";

export const NewTournament = () => {
  const [newTournament, setNewTournament] = useState({
    name: "",
    start_date: "",
    end_date: "",
  });

  const [newTournamentError, setNewTournamentError] = useState({
    nameError: "",
    intervalDatesError: "",
  });

  const [nameTournamentIsValid, setNameTournamentIsValid] = useState(false);
  const [datesTournamentIsValid, setDatesTournamentIsValid] = useState(false);

  const [activeForm, setActiveForm] = useState(false);
  const [congratulations, setCongratulations] = useState("");
  const credentialsRdx = useSelector(userData);
  const { token, fullUser } = credentialsRdx.credentials;
  const navigate = useNavigate();

  // Estos dos hooks 'startDate' y 'endDate' solamente sirven para mostar al usuario la fecha marcada en el DatePicker
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const inputHandler = (e) => {
    setNewTournament((preveState) => ({
      ...preveState,
      [e.target.name]: e.target.value,
    }));
  };

  // Manejador de cambios en la selección de fecha en el DatePicker, formateando la fecha
  const handleStartDateChange = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setNewTournament((prevState) => ({
      ...prevState,
      start_date: formattedDate,
    }));
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setNewTournament((prevState) => ({
      ...prevState,
      end_date: formattedDate,
    }));
    setEndDate(date);
  };

  // Validaciones
  const validateName = () => {
    if (newTournament.name === "") {
      setNewTournamentError((prevState) => ({
        ...prevState,
        nameError: "El nombre del torneo no puede estar vacío",
      }));
      setNameTournamentIsValid(false);
    } else {
      setNewTournamentError((prevState) => ({
        ...prevState,
        nameError: "",
      }));
      setNameTournamentIsValid(true);
    }
  };

  const isDateValid = (date) => {
    return date !== "" && !isNaN(Date.parse(date));
  };

  const validateIntervalDates = () => {
    const { start_date, end_date } = newTournament;

    if (!isDateValid(start_date) || !isDateValid(end_date)) {
      setNewTournamentError((prevState) => ({
        ...prevState,
        intervalDatesError: "El intervalo de fechas debe estar completo",
      }));
      setDatesTournamentIsValid(false);
    } else if (end_date < start_date) {
      setNewTournamentError((prevState) => ({
        ...prevState,
        intervalDatesError:
          "La fecha de inicio debe ser inferior a la fecha final",
      }));
      setDatesTournamentIsValid(false);
    } else {
      setNewTournamentError((prevState) => ({
        ...prevState,
        intervalDatesError: "",
      }));
      setDatesTournamentIsValid(true);
    }
  };

  // Comprobador de las validaciones de newTournament que activa el botón de envío de datos
  useEffect(() => {
    if (nameTournamentIsValid && datesTournamentIsValid) {
      setActiveForm(true);
    } else {
      setActiveForm(false);
    }
  });

  const addNewTournament = () => {
    addTournament(newTournament, token)
      .then((response) => {
        if (token && fullUser.name) {
          setCongratulations(
            `Enhorabuena ${fullUser.name}, has creado un nuevo Torneo correctamente`
          );
          setTimeout(() => {
            navigate("/tournaments");
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
      <div className="boxDesignNewTournament">
        <div className="titleBaseDesign">
          <div className="fs-3 text-decoration-underline text-dark">Nuevo Torneo</div>
        </div>
        {congratulations !== "" ? (
          <div className="text-black mb-2 mt-2 fs-5">{congratulations}</div>
        ) : (
          <>
            <div>
              <InputText
                className={
                  newTournamentError.nameError === ""
                    ? "inputBasicDesign"
                    : "inputBasicDesign inputErrorDesign"
                }
                type="text"
                maxLength="40"
                name="name"
                placeholder="Nombre del Torneo"
                required={true}
                changeFunction={(e) => inputHandler(e)}
                blurValidateFunction={() => validateName()}
              />
            </div>
            <div className="text-dark">{newTournamentError.nameError}</div>
            <div>
              <DatePicker
                className={
                  newTournamentError.intervalDatesError === ""
                    ? "inputBasicDesign longDatePicker"
                    : "inputBasicDesign inputErrorDesign longDatePicker"
                }
                name="start_date"
                placeholderText="Fecha de inicio"
                required={true}
                selected={startDate}
                onChange={(date) => handleStartDateChange(date)}
                onBlur={() => validateIntervalDates()}
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div>
              <DatePicker
                className={
                  newTournamentError.intervalDatesError === ""
                    ? "inputBasicDesign longDatePicker"
                    : "inputBasicDesign inputErrorDesign longDatePicker"
                }
                name="end_date"
                placeholderText="Fecha final"
                required={true}
                selected={endDate}
                onChange={(date) => handleEndDateChange(date)}
                onBlur={() => validateIntervalDates()}
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div className="text-dark">{newTournamentError.intervalDatesError}</div>
            <div
              className={activeForm ? "buttonOff buttonOn" : "buttonOff"}
              onClick={
                activeForm
                  ? () => {
                      addNewTournament();
                    }
                  : () => {}
              }
            >
              Añadir
            </div>
          </>
        )}
      </div>
    </div>
  );
};
