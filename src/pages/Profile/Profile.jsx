import React, { useEffect, useState } from 'react'
import "./Profile.css"
import { useSelector } from 'react-redux';
import { userData } from '../userSlice';
import { bringProfile } from '../../services/apiCalls';
import { Table } from 'react-bootstrap';

export const Profile = () => {
  const [profile, setProfile] = useState([]);
  const credentialsRdx = useSelector(userData);
  const { token } = credentialsRdx.credentials;

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
    <div className='profileDesign'>
      <div className="titleProfileDesign">
        <h4>Perfil Usuario</h4>
      </div>
      <div className="tableProfileDesign">
        <Table striped bordered className="bg-white border-3">
          <thead>
            <tr>
              <td>Nombre</td>
              <td>{profile.data.name}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Apellidos</td>
              <td>{profile.data.surname}</td>
            </tr>
            <tr>
              <td>Edad</td>
              <td>{profile.data.age}</td>
            </tr>
            <tr>
              <td>Ciudad</td>
              <td>{profile.data.city}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{profile.data.email}</td>
            </tr>
            <tr>
              <td>Teléfono</td>
              <td>{profile.data.phone}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  )
}
