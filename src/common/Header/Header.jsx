import React from "react";
import "./Header.css";
import { Navigator } from "../Navigator/Navigator";
import { FaHome, FaUser, FaKey, FaFileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userData, userout } from "../../pages/userSlice";
import { IoTennisballOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { RiLogoutCircleRLine } from "react-icons/ri";
import Img_header from "../../img/img_header.jpg";

export const Header = () => {
  const dispatch = useDispatch();
  const credentialsRdx = useSelector(userData);
  const navigate = useNavigate();

  const logoutFunction = () => {
    dispatch(userout({ credentials: {} }));
    navigate("/");
  };

  return (
    <>
    <img src={Img_header} alt="Imagen Header" className="imgHeader" />
    <div className="headerDesign">
        <div className="headerAdjustment">
          <Navigator
            ruta={
              <span>
                <FaHome className="fs-5" />{" "}
                <span className="textNavigator">Home</span>
              </span>
            }
            destino={"/"}
          />

          <Navigator
            ruta={
              <span>
                <IoTennisballOutline className="fs-5" />{" "}
                <span className="textNavigator">Torneos</span>
              </span>
            }
            destino={"/tournaments"}
          />
          {!credentialsRdx.credentials.token ? (
            <>
              <Navigator
                ruta={
                  <span>
                    <FaKey className="fs-5" />{" "}
                    <span className="textNavigator">Login</span>
                  </span>
                }
                destino={"/login"}
              />
              <Navigator
                ruta={
                  <span>
                    <FaFileAlt className="fs-5" />{" "}
                    <span className="textNavigator">Registro</span>
                  </span>
                }
                destino={"/register"}
              />
            </>
          ) : (
            <>
              <Navigator
                ruta={
                  <span>
                    <AiOutlineUser className="fs-5" />{" "}
                    <span className="textNavigator">Perfil</span>
                  </span>
                }
                destino={"/profile"}
              />
              <div className="navigatorDesign" onClick={() => logoutFunction()}>
                <span>
                  <RiLogoutCircleRLine className="fs-5" />{" "}
                  <span className="textNavigator">Logout</span>
                </span>
              </div>
              <div>
                {credentialsRdx.credentials.token ? (
                  <div>
                    <FaUser className="text-white fs-5 textNavigator" />{" "}
                    {credentialsRdx.credentials.fullUser.name}
                  </div>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
