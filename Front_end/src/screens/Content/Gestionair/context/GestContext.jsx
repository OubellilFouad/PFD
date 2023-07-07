import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
const Gestionair = createContext();

// EDTs
const getEDT = 'http://127.0.0.1:5000/edts';
const addEDT = 'http://127.0.0.1:5000/edt';
const deleteEDT = 'http://127.0.0.1:5000/edt/';
const deleteAllModEDT = 'http://127.0.0.1:5000/edts/mod/';
const deleteAllSecEDT = 'http://127.0.0.1:5000/edts/sec/';
const deleteAllGrpEDT = 'http://127.0.0.1:5000/edts/grp/';
const deleteAllDepEDT = 'http://127.0.0.1:5000/edts/dep/';
const deleteAllAffEDT = 'http://127.0.0.1:5000/edts/aff/';
const deleteAllProfEDT = 'http://127.0.0.1:5000/edts/prof/';
const deleteAllPlaceEDT = 'http://127.0.0.1:5000/edts/place/';

export const GestContext = ({children}) => {
  const [edts,setEdts] = useState([]);
  const [profG,setProfG] = useState(null);
  const [typeG,setTypeG] = useState('');
  const [sem,setSem] = useState('');
  const [speType,setSpeType] = useState('');
  const [section,setSection] = useState(null);
  const [activeSection,setActiveSection] = useState(null);
  const [activeGroup,setActiveGroup] = useState(null);
  const [group,setGroup] = useState(null);
  const [commun,setCommun] = useState(true);
  const [salleG,setSalleG] = useState(null);
  // EDTs   
  const getEdts = async () => {
    const {data} = await axios.get(getEDT);
    setEdts(data);
  }
  const addEdts = async (formData) => {
    const {data} = await axios.post(addEDT,formData);
    getEdts();
  }
  const deleteEdt = async (id) => {
    await axios.delete(`${deleteEDT}${id}`); 
    getEdts();
  }
  const deleteAllModEdt = async (modid) => {
    await axios.delete(`${deleteAllModEDT}${modid}`); 
    getEdts();
  }
  const deleteAllSecEdt = async (secid) => {
    await axios.delete(`${deleteAllSecEDT}${secid}`); 
    getEdts();
  }
  const deleteAllGrpEdt = async (grpid) => {
    await axios.delete(`${deleteAllGrpEDT}${grpid}`); 
    getEdts();
  }
  const deleteAllDepEdt = async (depid) => {
    await axios.delete(`${deleteAllDepEDT}${depid}`); 
    getEdts();
  }
  const deleteAllAffEdt = async (affid) => {
    await axios.delete(`${deleteAllAffEDT}${affid}`); 
    getEdts();
  }
  const deleteAllProfEdt = async (profid) => {
    await axios.delete(`${deleteAllProfEDT}${profid}`); 
    getEdts();
  }
  const deleteAllPlaceEdt = async (placeid) => {
    await axios.delete(`${deleteAllPlaceEDT}${placeid}`); 
    getEdts();
  }
  useEffect(() => {
    getEdts();
  },[])
  return (
    <Gestionair.Provider value={{edts,addEdts,deleteEdt,profG,setProfG,typeG,setTypeG,salleG,setSalleG,sem,setSem,speType,setSpeType,section,setSection,group,setGroup,commun,setCommun,deleteAllModEdt,deleteAllSecEdt,deleteAllGrpEdt,deleteAllDepEdt,deleteAllAffEdt,deleteAllProfEdt,deleteAllPlaceEdt,activeSection,setActiveSection,activeGroup,setActiveGroup}}>
        {children}
    </Gestionair.Provider>
  )
}

export const useGest = () => useContext(Gestionair);