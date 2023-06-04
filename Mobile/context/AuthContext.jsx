import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
const depUrl = 'https://pfeboumerdes.pythonanywhere.com/deps'
const getSpe = 'https://pfeboumerdes.pythonanywhere.com/specialites/';
const getSpeTc = 'https://pfeboumerdes.pythonanywhere.com/formationstc/';
const getPal = 'https://pfeboumerdes.pythonanywhere.com/paliers/';
const getPalTc = 'https://pfeboumerdes.pythonanywhere.com/palierstc/';
const getSec = 'https://pfeboumerdes.pythonanywhere.com/sections/pal/';
const getSecTc = 'https://pfeboumerdes.pythonanywhere.com/sectionstc/pal/';
const getGrp = 'https://pfeboumerdes.pythonanywhere.com/groupes/sec/';
const getGrpTc = 'https://pfeboumerdes.pythonanywhere.com/groupestc/';

const Auth = createContext();

export const AuthContext = ({children}) => {
  const [deps,setDeps] = useState([]);
  const [spes,setSpes] = useState([]);
  const [pals,setPals] = useState([]);
  const [secs,setSecs] = useState([]);
  const [grps,setGrps] = useState([]);
  const [grp,setGrp] = useState(null);
  const [type,setType] = useState(null);
  const [userId,setUserId] = useState(null);
  const [user,setUser] = useState('student');
  const [email,setEmail] = useState('');




  const getDeps = async () => {
    try {
      const {data} = await axios.get(depUrl);
      setDeps(data);
    } catch (error) {
      getDeps();
    }
  }
  const getSpes = async (depid) => {
    const {data} = await axios.get(`${getSpe}${depid}`);
    setSpes(data);
  }
  const getSpesTc = async (depid) => {
    const {data} = await axios.get(`${getSpeTc}${depid}`);
    setSpes(data);
  }
  const getPals = async (speid) => {
    const {data} = await axios.get(`${getPal}${speid}`);
    setPals(data);
  }
  const getPalsTc = async (speid) => {
    const {data} = await axios.get(`${getPalTc}${speid}`);
    setPals(data);
  }
  const getSecs = async (secid) => {
    const {data} = await axios.get(`${getSec}${secid}`);
    setSecs(data);
  }
  const getSecsTc = async (secid) => {
    const {data} = await axios.get(`${getSecTc}${secid}`);
    setSecs(data);
  }
  const getGrps = async (grpid) => {
    const {data} = await axios.get(`${getGrp}${grpid}`);
    console.log(data)
    setGrps(data);
  }
  const getGrpsTc = async (grpid) => {
    const {data} = await axios.get(`${getGrpTc}${grpid}`);
    console.log(data)
    setGrps(data);
  }
  useEffect(() => {
    getDeps();
  },[])
  return (
    <Auth.Provider value={{deps,getSpes,spes,getPals,pals,getSecs,secs,getGrps,grps,grp,setGrp,getSpesTc,getPalsTc,getSecsTc,getGrpsTc,type,setType,userId,setUserId,user,setUser,email,setEmail}}>
        {children}
    </Auth.Provider>
  )
}

export const useAuth = () => useContext(Auth);