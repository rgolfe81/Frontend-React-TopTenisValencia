import React, { useEffect, useState } from "react";
import "./Login.css";
import { InputText } from "../../common/InputText/InputText";
import { FaLock, FaUser } from "react-icons/fa";
import { checkInputs } from "../../helpers/useful";
import { logMe } from "../../services/apiCalls";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  // Hook datos credenciales del usuario
  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  });
  // Hooks para validación de errores de credenciales de usuario
  const [credencialesError, setCredencialesError] = useState({
    emailError: "",
    passwordError: "",
  });
  const [credencialesIsValid, setCredencialesIsValid] = useState({
    emailIsValid: false,
    passwordIsValid: false,
  });
  // Hook validación final que activa el botón de envío de datos
  const [activeForm, setActiveForm] = useState(false);

  // Manejador de cambios en la entrada de credenciales de los InputText del evento onChange
  const inputHandler = (e) => {
    setCredenciales((preveState) => ({
      ...preveState,
      [e.target.name]: e.target.value,
    }));
  };

  const [welcome, setWelcome] = useState("");

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
    for (let error in credencialesError) {
      if (credencialesError[error] !== "") {
        setActiveForm(false);
        return;
      }
    }
    for (let vacio in credenciales) {
      if (credenciales[vacio] === "") {
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

  const logeame = () => {
    logMe(credenciales)
      .then((respuesta) => {
        let decodificado = decodeToken(respuesta.data.token);
        let nameUser = respuesta.data.name;
        let datosBackend = {
          token: respuesta.data.token,
          usuario: decodificado,
          nameUser: nameUser,
        };

        //Este es el momento en el que guardo en REDUX
        // dispatch(login({ credentials: datosBackend }));

        //Mensaje después de Login
        if (datosBackend.token) {
          setWelcome(`Hola ${nameUser}, has iniciado sesión correctamente`);
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          setWelcome(`Error: ${respuesta.data}`);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      })

      .catch((error) => console.log(error));
  };

  return (
    <div className="loginDesign">
      <div className="boxDesignLogin">
        <div className="titleDesign">
          <h4>Iniciar sesión</h4>
        </div>
        {welcome !== "" ? (
          <div>{welcome}</div>
        ) : (
          <>
            <div>
              <FaUser className="iconDesign" />
              <InputText
                className={
                  credencialesError.emailError === ""
                    ? "inputBasicDesign"
                    : "inputBasicDesign inputErrorDesign"
                }
                type="email"
                maxLength="50"
                name="email"
                placeholder="Escribe el email"
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
                placeholder="Escribe la contraseña"
                required={true}
                changeFunction={(e) => inputHandler(e)}
                blurValidateFunction={(e) => inputValidate(e)}
              />
            </div>
            <div>{credencialesError.passwordError}</div>
            <div
              className={activeForm ? "buttonOff buttonOn" : "buttonOff"}
              onClick={
                activeForm
                  ? () => {
                      logeame();
                    }
                  : () => {}
              }
            >
              Login
            </div>
          </>
        )}
      </div>
    </div>
  );
};
