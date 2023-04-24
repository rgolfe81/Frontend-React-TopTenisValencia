import React, { useState } from "react";
import { InputText } from "../../common/InputText/InputText";
import "./Register.css";

export const Register = () => {

    // Hook validación final que activa el botón de envío de datos
    const [activeForm, setActiveForm] = useState(false);

  return (
    <div className="registerDesign">
      <div className="boxDesignRegister">
        <div className="titleDesign">
          <h2>Registro Usuario</h2>
        </div>
        <InputText
          className="inputBasicDesign"
          type="text"
          maxLength="30"
          name="name"
          placeholder="Escribe tu nombre"
          required={true}
          changeFunction={(e) => inputHandler(e)}
          blurValidateFunction={(e) => inputValidate(e)}
        />
        <InputText
          className="inputBasicDesign"
          type="text"
          maxLength="50"
          name="surname"
          placeholder="Escribe tus apellidos"
          required={true}
          changeFunction={(e) => inputHandler(e)}
          blurValidateFunction={(e) => inputValidate(e)}
        />
        <InputText
          className="inputBasicDesign"
          type="email"
          maxLength="50"
          name="email"
          placeholder="Escribe tu email"
          required={true}
          changeFunction={(e) => inputHandler(e)}
          blurValidateFunction={(e) => inputValidate(e)}
        />
        <InputText
          className="inputBasicDesign"
          type="password"
          maxLength="30"
          name="password"
          placeholder="Escribe tu constraseña"
          required={true}
          changeFunction={(e) => inputHandler(e)}
          blurValidateFunction={(e) => inputValidate(e)}
        />
        <InputText
          className="inputBasicDesign"
          type="text"
          maxLength="40"
          name="city"
          placeholder="Escribe tu localidad"
          required={true}
          changeFunction={(e) => inputHandler(e)}
          blurValidateFunction={(e) => inputValidate(e)}
        />
        <InputText
          className="inputBasicDesign"
          type="text"
          maxLength="2"
          name="age"
          placeholder="Escribe tu edad"
          required={false}
          changeFunction={(e) => inputHandler(e)}
          blurValidateFunction={(e) => inputValidate(e)}
        />
        <InputText
          className="inputBasicDesign"
          type="text"
          maxLength="9"
          name="phone"
          placeholder="Escribe tu teléfono de contacto"
          required={true}
          changeFunction={(e) => inputHandler(e)}
          blurValidateFunction={(e) => inputValidate(e)}
        />
        <div
          className={activeForm ? "buttonOff buttonOn" : "buttonOff"}
          onClick={
            activeForm
              ? () => {
                  // registrame();
                }
              : () => {}
          }
        >
          Registrarse
        </div>
      </div>
    </div>
  );
};
