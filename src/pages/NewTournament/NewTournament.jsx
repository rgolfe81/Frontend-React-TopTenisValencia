import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { checkInputs } from "../../helpers/useful";
import { addTournament } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { useNavigate } from "react-router";
import { InputText } from "../../common/InputText/InputText";
import dayjs from "dayjs";

export const NewTournament = () => {
  const [newTournament, setNewTournament] = useState({
    name: "",
    start_date: "",
    end_date: "",
  });

  const [newTournamentError, setNewTournamentError] = useState({
    nameError: "",
    start_dateError: "",
    end_dateError: "",
  });

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

  // Comprobador de los tres hooks de newTournament que activa el botón de envío de datos

  const validateForm = () => {
    if (newTournament.end_date <= newTournament.start_date) {
      setNewTournamentError((prevState) => ({
        ...prevState,
        start_dateError: "La fecha inicial debe ser inferior a la fecha final",
      }));
      return;
    }
    if (newTournament.name === "") {
      setNewTournamentError((prevState) => ({
        ...prevState,
        name: "El nombre del torneo no puede estar vacío",
      }));
      return;
    }
    if (newTournament.start_date === "") {
      setNewTournamentError((prevState) => ({
        ...prevState,
        start_date: "La fecha inicial no puede estar vacía",
      }));
      return;
    }
    if (newTournament.end_date === "") {
      setNewTournamentError((prevState) => ({
        ...prevState,
        end_date: "La fecha final no puede estar vacía",
      }));
      return;
    }
    setActiveForm(true);

    console.log("entro en validateForm");
    console.log(newTournamentError.start_dateError);
  };

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

  console.log(newTournament.start_date);
  console.log(newTournament.end_date);

  return (
    <div>
      <div>Nuevo Torneo</div>
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
        blurValidateFunction={() => validateForm()}
      />
      <div>{newTournamentError.nameError}</div>
      <DatePicker
        className={
          newTournamentError.start_dateError === ""
            ? "inputBasicDesign"
            : "inputBasicDesign inputErrorDesign"
        }
        name="start_date"
        placeholderText="Introduce fecha de inicio"
        required={true}
        selected={startDate}
        onChange={(date) => handleStartDateChange(date)}
        onBlur={() => validateForm()}
        dateFormat="dd/MM/yyyy"
      />
      <div>{newTournamentError.start_date}</div>
      <DatePicker
        className={
          newTournamentError.end_dateError === ""
            ? "inputBasicDesign"
            : "inputBasicDesign inputErrorDesign"
        }
        name="end_date"
        placeholderText="Introduce fecha de fin"
        required={true}
        selected={endDate}
        onChange={(date) => handleEndDateChange(date)}
        onBlur={() => validateForm()}
        dateFormat="dd/MM/yyyy"
      />
      <div>{newTournamentError.end_date}</div>
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
    </div>
  );
};
