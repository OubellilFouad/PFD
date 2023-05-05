import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
const userUrl = 'http://192.168.1.67:8000/api/test';
const loginUrl = 'http://10.0.2.2:8000/api/test';
const depUrl = 'https://pfeboumerdes.pythonanywhere.com/deps'
const Auth = createContext();

export const AuthContext = ({children}) => {
  const [test,setTest] = useState('test');  
//   const getUser = async () => {
//     try {
//       const userReq = await axios.get(userUrl,{
//         withCredentials: true,
//         headers:{
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         }
//       });
//       const user = await userReq.data;
//       console.log(user);
//     } catch (error) {
//       console.log(error,'hi')
//     }
//   }  
  const formData = {
    userID: '1234',
    email: 'oubellilfouad4@gmail.com',
    password: '1234'
  }
  const getDeps = async () => {
    try {
        const {data} = await axios.get(loginUrl);
        setTest(data);
    } catch (error) {
        console.log(error)
    }
  } 
  useEffect(() => {
    getDeps();
  },[])
  return (
    <Auth.Provider value={{test}}>
        {children}
    </Auth.Provider>
  )
}

export const useAuth = () => useContext(Auth);