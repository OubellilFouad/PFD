import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'

const Auth = createContext();
const userUrl = 'http://localhost:8000/api/user';
const logOutUrl = 'http://localhost:8000/api/logout';

export const AuthContext = ({children}) => {
  const [user,setUser] = useState(null);
  const [show,setShow] = useState(false);
  const [addMessage,setAddMessage] = useState('');
  const [color,setColor] = useState(true);
  const getUser = async () => {
    try {
      const userReq = await axios.get(userUrl,{
        withCredentials: true,
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });
      const user = await userReq.data;
      if(Object.keys(user).length !== 0){
        setUser(user);
        console.log(user);
      }else{
        setUser(null);
      }
    } catch (error) {
      console.log(error)
      setUser(null);
    }
  }
  const logOut = async () => {
    await axios.get(logOutUrl,{
      withCredentials: true,
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    });
    setUser(null)
  }
  useEffect(() => {
    getUser();
  },[])
  return (
    <Auth.Provider value={{ user,getUser,logOut,show,setShow,addMessage,setAddMessage,color,setColor}}>
      {children}
    </Auth.Provider>
  )
}

export const useAuth = () => useContext(Auth)