import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'

const Chef = createContext();
// Modules
const addModules = 'https://pfeboumerdes.pythonanywhere.com/module';
const getModules = 'https://pfeboumerdes.pythonanywhere.com/modules';
const getOneModule = 'https://pfeboumerdes.pythonanywhere.com/module/';
const deleteModules = 'https://pfeboumerdes.pythonanywhere.com/module/';
const editModules = 'https://pfeboumerdes.pythonanywhere.com/module/';
// Specialities
const addSpes = 'https://pfeboumerdes.pythonanywhere.com/specialite';
const getSpes = 'https://pfeboumerdes.pythonanywhere.com/specialites';
const deleteSpes = 'https://pfeboumerdes.pythonanywhere.com/specialite/';
const editSpes = 'https://pfeboumerdes.pythonanywhere.com/specialite/';
// Filliére
const getFils = 'https://pfeboumerdes.pythonanywhere.com/filieres';
const addFils = 'https://pfeboumerdes.pythonanywhere.com/filiere';
const deleteFils = 'https://pfeboumerdes.pythonanywhere.com/filiere/';
const editFils = 'https://pfeboumerdes.pythonanywhere.com/filiere/';
// Chambres
const getChambres = 'https://pfeboumerdes.pythonanywhere.com/chambres';
const addChambres = 'https://pfeboumerdes.pythonanywhere.com/chambre';
const getOneChambres = 'https://pfeboumerdes.pythonanywhere.com/chambre/';
const deleteChambres = 'https://pfeboumerdes.pythonanywhere.com/chambre/';
const editChambres = 'https://pfeboumerdes.pythonanywhere.com/chambre/';
export const ChefContext = ({children}) => {
  const [openSec,setOpenSec] = useState(false);  
  const [openGroup,setOpenGroup] = useState(false);  
  const [openModule,setOpenModule] = useState(false);
  const [openSpe,setOpenSpe] = useState(false);
  const [openSalle,setOpenSalle] = useState(false);
  const [spes,setSpes] = useState([]);
  const [fils,setFils] = useState([]);
  const [modules,setModules] = useState([]);
  const [chambre,setChambre] = useState([]);
  // Modules
  const getModule = async () => {
    const response = await axios.get(getModules);
    const result = await response.data;
    setModules(result);
  }
  const addModule = async (formData) => {
    const response = await axios.post(addModules,formData)
    getModule();
  }
  // Specialities
  const getSpe = async () => {
    const response = await axios.get(getSpes);
    const result = await response.data;
    setSpes(result);
  }
  const addSpe = async (formData) => {
    const response = await axios.post(addSpes,formData);
    getSpe();
  }
  // Filliére
  const getFil = async () => {
    const response = await axios.get(getFils);
    const result = await response.data;
    setFils(result);
  }
  const addFil = async (formData) => {
    const response = await axios.post(addFils,formData);
    const result = await response.data;
    getFil();
  }
  // Chambre
  const getChambre = async () => {
    const response = await axios.get(getChambres);
    const result = await response.data;
    setChambre(result);
  }
  const addChambre = async (formData) => {
    const response = await axios.post(addChambres,formData);
    getChambre();
  }
  const deleteChambre = async (id) => {
    await axios.delete(`${deleteChambres}${id}`);
    getChambre();
  }
  useEffect(() => {
    getSpe();
    getFil();
    getModule();
    getChambre();
  },[])
  return (
    <Chef.Provider value={{openSec,setOpenSec,setOpenGroup,openGroup,openModule,setOpenModule,openSpe,setOpenSpe,addSpe,spes,fils,addFil,addModule,modules,openSalle,setOpenSalle,addChambre,chambre,deleteChambre}}>
        {children}
    </Chef.Provider>
  )
}

export const useChef = () => useContext(Chef);