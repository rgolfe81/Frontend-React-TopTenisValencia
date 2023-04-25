import React from "react";
import "./Header.css";
import { Navigator } from "../Navigator/Navigator";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userData, userout } from "../../pages/userSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const credentialsRdx = useSelector(userData);
  const navigate = useNavigate();

  const logoutFunction = () => {
    dispatch(userout({ credentials: {} }));
    navigate("/");
  };

  return (
    <div className="headerDesign">
      <Navigator ruta={"Home"} destino={"/"} />
      <Navigator ruta={"Torneos"} destino={"/tournaments"} />
      {!credentialsRdx.credentials.token ? (
        <>
          <Navigator ruta={"Login"} destino={"/login"} />
          <Navigator ruta={"Registro"} destino={"/register"} />
        </>
      ) : (
        <>
          <Navigator ruta={"Perfil"} destino={"/profile"} />
          <div className="navigatorDesign" onClick={() => logoutFunction()}>Logout</div>
          <div>
            {credentialsRdx.credentials.token ? (
              <div>
                <FaUser className="text-white fs-5" />{" "}
                {credentialsRdx.credentials.fullUser.name}
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};
