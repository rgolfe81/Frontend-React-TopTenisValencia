import React, { useEffect, useState } from 'react'
import "./Users.css"
import { useSelector } from 'react-redux';
import { userData } from '../userSlice';
import { bringAllUsers } from '../../services/apiCalls';

export const Users = () => {
  const credentialsRdx = useSelector(userData);
  const { token } = credentialsRdx.credentials;
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState (true);

  useEffect (() => {
    const fetchData = async () => {
      try {
        let users = [];
        const response = await bringAllUsers (token);
        console.log(response.data.data)
        users = response.data.data;
        setAllUsers(users);
        setLoading(false);

      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    if (token){
      fetchData();
    }

  }, [token])



  return (
    <div>Users</div>
  )
}
