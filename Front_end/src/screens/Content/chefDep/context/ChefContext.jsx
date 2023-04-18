import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'

const Chef = createContext();
// Modules
const addModules = 'https://pfeboumerdes.pythonanywhere.com/module';
const getModules = 'https://pfeboumerdes.pythonanywhere.com/modules';
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
// Sections
const getSections = 'https://pfeboumerdes.pythonanywhere.com/sections';
const addSections = 'https://pfeboumerdes.pythonanywhere.com/section';
const getOneSections = 'https://pfeboumerdes.pythonanywhere.com/section/';
const deleteSections = 'https://pfeboumerdes.pythonanywhere.com/section/';
const editSections = 'https://pfeboumerdes.pythonanywhere.com/section/';
// Groupes 
const getGroupes = 'https://pfeboumerdes.pythonanywhere.com/groupes';
const addGroupes = 'https://pfeboumerdes.pythonanywhere.com/groupe';
const getOneGroupes = 'https://pfeboumerdes.pythonanywhere.com/groupe/';
const deleteGroupes = 'https://pfeboumerdes.pythonanywhere.com/groupe/';
const editGroupes = 'https://pfeboumerdes.pythonanywhere.com/groupe/';
// Profs 
const getProfs = 'http://127.0.0.1:8000/api/chefdep/get-enseignant';
const addProfs = 'http://127.0.0.1:8000/api/chefdep/ajouter-enseignant';
const deleteProfs = 'http://127.0.0.1:8000/api/chefdep/supprimer-enseignant/';
// Palier
const getPaliers = 'https://pfeboumerdes.pythonanywhere.com/paliers';
const addPaliers = 'https://pfeboumerdes.pythonanywhere.com/palier';
export const ChefContext = ({children}) => {
  const [openSec,setOpenSec] = useState(false);  
  const [openGroup,setOpenGroup] = useState(false);  
  const [openModule,setOpenModule] = useState(false);
  const [openSpe,setOpenSpe] = useState(false);
  const [openSalle,setOpenSalle] = useState(false);
  const [openProf,setOpenProf] = useState(false);
  const [openPalier,setOpenPalier] = useState(false);
  const [spes,setSpes] = useState([]);
  const [fils,setFils] = useState([]);
  const [modules,setModules] = useState([]);
  const [chambre,setChambre] = useState([]);
  const [sections,setSections] = useState([]);
  const [groupes,setGroupes] = useState([]);
  const [profs,setProfs] = useState([]);
  const [palier,setPalier] = useState([]);
  // Modules
  const getModule = async () => {
    const response = await axios.get(getModules);
    const result = await response.data;
    console.log(result)
    setModules(result);
  }
  const addModule = async (formData) => {
    const {data} = await axios.post(addModules,formData);
    getModule();
  }
  const deleteModule = async (id) => {
    await axios.delete(`${deleteModules}${id}`);
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
  // Sections
  const getSection = async () => {
    const response = await axios.get(getSections);
    const result = await response.data;
    setSections(result);
  }
  const addSection = async (formData) => {
    await axios.post(addSections,formData)
    getSection();
  }
  // Groupes
  const getGroup = async () => {
    const response = await axios.get(getGroupes);
    const result = await response.data;
    setGroupes(result);
  }
  const addGroupe = async (formData) => {
    await axios.post(addGroupes,formData);
    getGroup();
  }
  const deleteGroup = async (id) => {
    await axios.delete(`${deleteGroupes}${id}`)
    getGroup();
  }
  // Profs
  const getProf = async () => {
    const {data} = await axios.get(getProfs);
    setProfs(data);
  }
  const addProf = async (formData) => {
    await axios.post(addProfs,formData);
    getProf();
  }
  const deleteProf = async (id) => {
    await axios.delete(`${deleteProfs}${id}`);
    getProf();
  }
  // Palier
  const getPalier = async () => {
    const {data} = await axios.get(getPaliers);
    setPalier(data);
  }
  const addPalier = async (formData) => {
    await axios.post(addPaliers,formData);
    getPalier();
  }
  useEffect(() => {
    getSpe();
    getFil();
    getModule();
    getChambre();
    getSection();
    getGroup();
    getProf();
    getPalier();
  },[])
  return (
    <Chef.Provider value={{openSec,setOpenSec,setOpenGroup,openGroup,openModule,setOpenModule,openSpe,setOpenSpe,addSpe,spes,fils,addFil,addModule,deleteModule,modules,openSalle,setOpenSalle,addChambre,chambre,deleteChambre,sections,addSection,addGroupe,groupes,deleteGroup,openProf,setOpenProf,addProf,profs,deleteProf,openPalier,setOpenPalier,addPalier,palier}}>
        {children}
    </Chef.Provider>
  )
}

export const useChef = () => useContext(Chef);