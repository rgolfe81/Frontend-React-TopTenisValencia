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

  const [newTournamentIsValid, setNewTournamentIsValid] = useState({
    nameIsValid: false,
    start_dateIsValid: false,
    end_dateIsValid: false,
  });

  const [activeForm, setActiveForm] = useState(false);
  const [congratulations, setCongratulations] = useState("");
  const credentialsRdx = useSelector(userData);
  const { token, fullUser } = credentialsRdx.credentials;
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const inputHandler = (e) => {
    setNewTournament((preveState) => ({
      ...preveState,
      [e.target.name]: e.target.value,
    }));
  };

    // Manejador de cambios en la selección de fecha en el calendario, formateando la fecha
    const handleStartDateChange = (date) => {
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        setNewTournament((prevState) => ({
          ...prevState,
          start_date: formattedDate,
        }));
        setStartDate(date);
      };
      
      const handleEndDateChange = (date) => {
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        setNewTournament((prevState) => ({
          ...prevState,
          end_date: formattedDate,
        }));
        setEndDate(date);
      };

  // Manejador de cambios del evento onBlur
  const inputValidate = (e) => {
    let error = "";
    // checkInputs es la función de chequeo de los inputs de useful.js
    let checked = checkInputs(e.target.name, e.target.value, e.target.required);
    error = checked.message;
    // Manejador de cambios en las validaciones de los Input
    setNewTournamentIsValid((prevState) => ({
      ...prevState,
      [e.target.name + "IsValid"]: checked.validated,
    }));
    // Manejador de cambios en los mensajes de error de los Input
    setNewTournamentError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  // Comprobador de los tres hooks de newTournament que activa el botón de envío de datos
  useEffect(() => {
    for (let vacio in newTournament) {
      if (newTournament[vacio] === "") {
        setActiveForm(false);
        return;
      }
    }
    for (let error in newTournamentError) {
      if (newTournamentError[error] !== "") {
        setActiveForm(false);
        return;
      }
    }
    for (let validated in newTournamentIsValid) {
      if (newTournamentIsValid[validated] === false) {
        setActiveForm(false);
        return;
      }
    }
    setActiveForm(true);
  });

  const addNewTournament = () => {
    addTournament(newTournament, token)
        .then((response) => {
            if (token && fullUser.name){
                setCongratulations(
                    `Enhorabuena ${fullUser.name}, has creado un nuevo Torneo correctamente`
                )
                setTimeout(() => {
                    navigate("/tournaments");
                  }, 3000);
            }
            else {
                setCongratulations(`Error: ${response.data}`);
                setTimeout(() => {
                  window.location.reload();
                }, 3000);
            }
        })
        .catch((error) => console.log(error));
  }

  console.log(newTournament.start_date)
  console.log(newTournament.end_date)

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
          blurValidateFunction={(e) => inputValidate(e)}
        />
    <DatePicker
      className=""
      name="start_date"
      placeholderText="Introduce fecha de inicio"
      required={true}
      selected={startDate}
      onChange={(date) => handleStartDateChange(date)}
      dateFormat="dd/MM/yyyy"
    />
    <DatePicker
      className=""
      name="end_date"
      placeholderText="Introduce fecha de fin"
      required={true}
      selected={endDate}
      onChange={(date) => handleEndDateChange(date)}
      dateFormat="dd/MM/yyyy"
    />
        <div
          className={activeForm ? "buttonOff buttonOn" : "buttonOff"}
          onClick={
            activeForm
              ? () => {addNewTournament()}
              : () => {}
          }
        >
          Añadir
        </div>
    </div>
  );
};
