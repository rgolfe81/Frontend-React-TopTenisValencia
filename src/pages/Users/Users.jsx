import React, { useEffect, useState } from "react";
import "./Users.css";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { bringAllUsers } from "../../services/apiCalls";
import { Table } from "react-bootstrap";

export const Users = () => {
  const credentialsRdx = useSelector(userData);
  const { token } = credentialsRdx.credentials;
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let users = [];
        const response = await bringAllUsers(token);
        console.log(response.data.data);
        users = response.data.data;
        setAllUsers(users);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <div className="pageBaseDesign">
      <div className="titleBaseDesign">
        <h4>Usuarios Registrados</h4>
      </div>
      <Table striped bordered className="bg-white border-3 tableUsers">
        <thead>
          <tr className="titleRowTable text-center">
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Rol</th>
            <th>Email</th>
            <th>Ciudad</th>
            <th>Edad</th>
            <th>Telefono</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7}>Cargando datos ...</td>
            </tr>
          ) : allUsers.length > 0 ? (
            allUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>
                  {user.role_id === 1 ? "Usuario" : "Administrador"}
                </td>
                <td>{user.email}</td>
                <td>{user.city}</td>
                <td className="text-center">{user.age}</td>
                <td className="text-center">{user.phone}</td>
              </tr>
            ))
          ):(
            <tr>
              <td colSpan={6}>No se encuentran datos de los jugadores</td>
            </tr>
          )}
        </tbody>  
      </Table>
    </div>
  );
};
