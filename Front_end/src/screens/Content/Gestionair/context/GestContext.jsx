import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
const Gestionair = createContext();

// EDTs
const getEDT = 'https://pfeboumerdes.pythonanywhere.com/edts';
const addEDT = 'https://pfeboumerdes.pythonanywhere.com/edt';
const deleteEDT = 'https://pfeboumerdes.pythonanywhere.com/edt/';
const deleteAllModEDT = 'https://pfeboumerdes.pythonanywhere.com/edts/mod/';
const deleteAllSecEDT = 'https://pfeboumerdes.pythonanywhere.com/edts/sec/';
const deleteAllGrpEDT = 'https://pfeboumerdes.pythonanywhere.com/edts/grp/';
const deleteAllDepEDT = 'https://pfeboumerdes.pythonanywhere.com/edts/dep/';
const deleteAllAffEDT = 'https://pfeboumerdes.pythonanywhere.com/edts/aff/';
const deleteAllProfEDT = 'https://pfeboumerdes.pythonanywhere.com/edts/prof/';
const deleteAllPlaceEDT = 'https://pfeboumerdes.pythonanywhere.com/edts/place/';

export const GestContext = ({children}) => {
  const [edts,setEdts] = useState([]);
  const [profG,setProfG] = useState(null);
  const [typeG,setTypeG] = useState('');
  const [sem,setSem] = useState('');
  const [speType,setSpeType] = useState('');
  const [section,setSection] = useState(null);
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
    <Gestionair.Provider value={{edts,addEdts,deleteEdt,profG,setProfG,typeG,setTypeG,salleG,setSalleG,sem,setSem,speType,setSpeType,section,setSection,group,setGroup,commun,setCommun,deleteAllModEdt,deleteAllSecEdt,deleteAllGrpEdt,deleteAllDepEdt,deleteAllAffEdt,deleteAllProfEdt,deleteAllPlaceEdt}}>
        {children}
    </Gestionair.Provider>
  )
}

export const useGest = () => useContext(Gestionair);