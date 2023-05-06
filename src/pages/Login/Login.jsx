import React, { useEffect, useState } from "react";
import "./Login.css";
import { InputText } from "../../common/InputText/InputText";
import { FaLock, FaUser } from "react-icons/fa";
import { checkInputs } from "../../helpers/useful";
import { logMe } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice";

export const Login = () => {

  const navigate = useNavigate();

  // Variables Redux
    const dispatch = useDispatch();
    const credentialsRdx = useSelector(userData);

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

  const [congratulations, setCongratulations] = useState("");

  useEffect(() => {
    if (credentialsRdx.credentials?.token) {
      //Si ya existe toquen, redireccionamos a Home
      navigate("/");
    }
  }, []);

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
      .then((response) => {
        let datosBackend = {
          token: response.data.token,
          fullUser: response.data.user
        };

        // Guardado en REDUX
        dispatch(login({ credentials: datosBackend }));

        // Mensaje después de Login
        let nameUser = datosBackend.fullUser.name;
        if (datosBackend.token) {
          setCongratulations(`Hola ${nameUser}, has iniciado sesión correctamente`);
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
      <div className="boxDesignLogin">
        <div className="titleBaseDesign text-decoration-underline text-dark">
          <h4 className="text-dark">Iniciar sesión</h4>
        </div>
        {congratulations !== "" ? (
          <div className="messageUser">{congratulations}</div>
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
            <div className="text-dark">{credencialesError.emailError}</div>
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
            <div className="text-dark">{credencialesError.passwordError}</div>
            <div className="fs-5 mt-2 text-dark textRegister">Si no estás registrado, sigue este enlace para <a href="/register">registrarte</a>
            </div>
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
