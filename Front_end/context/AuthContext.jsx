import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'

const Auth = createContext();
const userUrl = 'http://localhost:8000/api/user';

export const AuthContext = ({children}) => {
  const [user,setUser] = useState({});
  
  const getUser = async () => {
    const userReq = await axios.get(userUrl,{
      withCredentials: true,
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    });
    const user = await userReq.data;
    setUser(user);
  }
  useEffect(() => {
    getUser();
  },[])
  return (
    <Auth.Provider value={{ user,getUser}}>
      {children}
    </Auth.Provider>
  )
}

export const useAuth = () => useContext(Auth)