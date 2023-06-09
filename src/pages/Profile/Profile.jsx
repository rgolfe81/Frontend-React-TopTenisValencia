import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { bringProfile } from "../../services/apiCalls";
import { Table } from "react-bootstrap";
import { Users } from "../Users/Users";
import { NewTournament } from "../NewTournament/NewTournament";
import { Navigator } from "../../common/Navigator/Navigator";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [profile, setProfile] = useState([]);
  const credentialsRdx = useSelector(userData);
  const { token, fullUser } = credentialsRdx.credentials;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await bringProfile(token);
        setProfile(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (token) {
      fetchData();
    }
  }, [token]);

  if (!profile) {
    return <div>No se encuentran datos del perfil</div>;
  }
  return (
    <div className="pageBaseDesign">
      <div className="titleBaseDesign">
        <h4 className="text-decoration-underline">Perfil Usuario</h4>
      </div>
      <Table striped bordered className="bg-white border-3 tableProfileDesign">
        <thead>
          <tr>
            <th className="titleField">Nombre</th>
            <td>{profile.data?.name}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="titleField">Apellidos</th>
            <td>{profile.data?.surname}</td>
          </tr>
          <tr>
            <th className="titleField">Edad</th>
            <td>{profile.data?.age}</td>
          </tr>
          <tr>
            <th className="titleField">Ciudad</th>
            <td>{profile.data?.city}</td>
          </tr>
          <tr>
            <th className="titleField">Email</th>
            <td>{profile.data?.email}</td>
          </tr>
          <tr>
            <th className="titleField">Teléfono</th>
            <td>{profile.data?.phone}</td>
          </tr>
        </tbody>
      </Table>
      <div className={token && fullUser.role_id === 2 ? "text-center" : "btnsHidden"}>
        <div>
          <h5 className="text-decoration-underline m-4">
            Acciones Administrador
          </h5>
        </div>
        <div className="">
          <button
            className="btnNavigatorProfile"
            onClick={() => {
              navigate("/users");
            }}
          >
            Ver todos Usuarios
          </button>
        </div>
      </div>
    </div>
  );
};
