import axios from "axios";

const root = "http://localhost:8000/api"

export const logMe = async (body) => {
    return await axios.post(`${root}/login`, body);
} 

export const registerMe = async (body) => {
    return await axios.post(`${root}/register`, body);
}

export const bringProfile = async (token) => {
    let config = {
      headers: { 
        'Authorization': 'Bearer '+ token,  
      }
    };
    return await axios.get(`${root}/users/profile`, config);
}

export const bringTournaments = async () => {
    return await axios.get(`${root}/tournaments`);
}