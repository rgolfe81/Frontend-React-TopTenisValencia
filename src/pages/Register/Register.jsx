import React, { useEffect, useState } from "react";
import { InputText } from "../../common/InputText/InputText";
import "./Register.css";
import { checkInputs } from "../../helpers/useful";
import { useNavigate } from "react-router-dom";
import { registerMe } from "../../services/apiCalls";
import { FaCity, FaEnvelope, FaLock, FaPhoneSquareAlt, FaUser, FaUserPlus, FaBirthdayCake } from "react-icons/fa";

export const Register = () => {
  const navigate = useNavigate();

  // Hook datos credenciales del usuario
  const [credenciales, setCredenciales] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    city: "",
    age: "",
    phone: "",
  });
  // Hooks para validación de errores de credenciales de usuario
  const [credencialesError, setCredencialesError] = useState({
    nameError: "",
    surnameError: "",
    emailError: "",
    passwordError: "",
    cityError: "",
    ageError: "",
    phoneError: "",
  });
  const [credencialesIsValid, setCredencialesIsValid] = useState({
    nameIsValid: false,
    surnameIsValid: false,
    emailIsValid: false,
    passwordIsValid: false,
    cityIsValid: false,
    ageIsValid: false,
    phoneIsValid: false,
  });

  // Hook validación final que activa el botón de envío de datos
  const [activeForm, setActiveForm] = useState(false);
  const [congratulations, setCongratulations] = useState("");

  // Manejador de cambios en la entrada de credenciales de los InputText del evento onChange
  const inputHandler = (e) => {
    setCredenciales((preveState) => ({
      ...preveState,
      [e.target.name]: e.target.value,
    }));
  };

  // Manejador de cambios del evento onBlur
  const inputValidate = (e) => {
    let error = "";
    // checkInputs es la función de chequeo de los inputs de useful.js
    let checked = checkInputs(e.target.name, e.target.value, e.target.required);
    error = checked.message;
    // Manejador de cambios en las validaciones de los InputText
    setCredencialesIsValid((prevState) => ({
      ...prevState,
      [e.target.name + "IsValid"]: checked.validated,
    }));
    // Manejador de cambios en los mensajes de error de los InputText
    setCredencialesError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  // Comprobador de los tres hooks de credenciales que activa el botón de envío de datos
  useEffect(() => {
    for (let vacio in credenciales) {
      if (credenciales[vacio] === "") {
        setActiveForm(false);
        return;
      }
    }
    for (let error in credencialesError) {
      if (credencialesError[error] !== "") {
        setActiveForm(false);
        return;
      }
    }
    for (let validated in credencialesIsValid) {
      if (credencialesIsValid[validated] === false) {
        setActiveForm(false);
        return;
      }
    }
    setActiveForm(true);
  });

  const registrame = () => {
    registerMe(credenciales)
      .then((response) => {
        let nameUser = response.data.data.name;
        if (nameUser) {
          setCongratulations(
            `Enhorabuena ${nameUser}, te has registrado correctamente`
          );
          setTimeout(() => {
            navigate("/login");
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
    <div className="registerDesign">
      <div className="boxDesignRegister">
        <div className="titleRegisterDesign">
          <h4>Registro Usuario</h4>
        </div>
        {congratulations !== "" ? (
          <div>{congratulations}</div>
        ) : (
          <>
            <div>
              <FaUser className="iconDesign" />
        <InputText
          className={
            credencialesError.nameError === ""
              ? "inputBasicDesign"
              : "inputBasicDesign inputErrorDesign"
          }
          type="text"
          maxLength="30"
          name="name"
          placeholder="Escribe tu nombre"
          required={true}
          changeFunction={(e) => inputHandler(e)}
          blurValidateFunction={(e) => inputValidate(e)}
        />
        </div>
        <div>{credencialesError.nameError}</div>
        <div>
              <FaUserPlus className="iconDesign" />
        <InputText
          className={
            credencialesError.surnameError === ""
              ? "inputBasicDesign"
              : "inputBasicDesign inputErrorDesign"
          }
          type="text"
          maxLength="50"
          name="surname"
          placeholder="Escribe tus apellidos"
          required={true}
          changeFunction={(e) => inputHandler(e)}
          blurValidateFunction={(e) => inputValidate(e)}
        />
        </div>
        <div>{credencialesError.surnameError}</div>
        <div>
              <FaEnvelope className="iconDesign" />
        <InputText
          className={
            credencialesError.emailError === ""
              ? "inputBasicDesign"
              : "inputBasicDesign inputErrorDesign"
          }
          type="email"
          maxLength="50"
          name="email"
          placeholder="Escribe tu email"
          required={true}
          changeFunction={(e) => inputHandler(e)}
          blurValidateFunction={(e) => inputValidate(e)}
        />
        </div>
        <div>{credencialesError.emailError}</div>
        <div>
              <FaLock className="iconDesign" />
        <InputText
          className={
            credencialesError.passwordError === ""
              ? "inputBasicDesign"
              : "inputBasicDesign inputErrorDesign"
          }
          type="password"
          maxLength="30"
          name="password"
          placeholder="Escribe tu constraseña"
          required={true}
          changeFunction={(e) => inputHandler(e)}
          blurValidateFunction={(e) => inputValidate(e)}
        />
        </div>
        <div>{credencialesError.passwordError}</div>
        <div>
              <FaCity className="iconDesign" />
        <InputText
          className={
            credencialesError.cityError === ""
              ? "inputBasicDesign"
              : "inputBasicDesign inputErrorDesign"
          }
          type="text"
          maxLength="40"
          name="city"
          placeholder="Escribe tu localidad"
          required={true}
          changeFunction={(e) => inputHandler(e)}
          blurValidateFunction={(e) => inputValidate(e)}
        />
        </div>
        <div>{credencialesError.cityError}</div>
        <div>
              <FaBirthdayCake className="iconDesign" />
        <InputText
          className={
            credencialesError.ageError === ""
              ? "inputBasicDesign"
              : "inputBasicDesign inputErrorDesign"
          }
          type="text"
          maxLength="2"
          name="age"
          placeholder="Escribe tu edad"
          required={true}
          changeFunction={(e) => inputHandler(e)}
          blurValidateFunction={(e) => inputValidate(e)}
        />
        </div>
        <div>{credencialesError.ageError}</div>
        <div>
              <FaPhoneSquareAlt className="iconDesign" />
        <InputText
          className={
            credencialesError.phoneError === ""
              ? "inputBasicDesign"
              : "inputBasicDesign inputErrorDesign"
          }
          type="text"
          maxLength="9"
          name="phone"
          placeholder="Escribe tu teléfono de contacto"
          required={true}
          changeFunction={(e) => inputHandler(e)}
          blurValidateFunction={(e) => inputValidate(e)}
        />
        </div>
        <div>{credencialesError.phoneError}</div>
        <div
          className={activeForm ? "buttonOff buttonOn" : "buttonOff"}
          onClick={
            activeForm
              ? () => {
                  registrame();
                }
              : () => {}
          }
        >
          Registrarse
        </div>
        </>
        )}
      </div>
    </div>
  );
};
