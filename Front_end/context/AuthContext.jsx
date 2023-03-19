import axios from 'axios';
import React, { createContext, useContext, useState } from 'react'

const Auth = createContext();
const loginUrl = 'http://localhost:8000/api/test';
const userUrl = 'http://127.0.0.1:8000/api/user';

export const AuthContext = ({children}) => {
  const [user,setUser] = useState({});
  const login = async (formData) => {
    
  }
  const getUser = async () => {
    const userReq = await axios.get(userUrl,{
      withCredentials: true,
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    });
    const user = await userReq.data;
    console.log(userReq);
  }
  return (
    <Auth.Provider value={{login}}>
      {children}
    </Auth.Provider>
  )
}

export const useAuth = () => useContext(Auth)