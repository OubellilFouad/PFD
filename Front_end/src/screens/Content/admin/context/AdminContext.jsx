import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'

const Admin = createContext();
// Deps URL
const getUrl = 'https://pfeboumerdes.pythonanywhere.com/deps';
const postUrl = 'https://pfeboumerdes.pythonanywhere.com/dep';
const deleteUrl = 'https://pfeboumerdes.pythonanywhere.com/dep/';
// Domains URL
const getDomainsUrl = 'https://pfeboumerdes.pythonanywhere.com/domains';
const postDomainUrl = 'https://pfeboumerdes.pythonanywhere.com/domain';
const deleteDomainUrl = 'https://pfeboumerdes.pythonanywhere.com/domain/';
// Chefs URL
const getChefs = 'http://localhost:8000/api/admin/get-chefdep';
const addChefs = 'http://localhost:8000/api/admin/ajouter-chefdep';
const modifyChefs = 'http://localhost:8000/api/admin/modifier-chefdep/';
const deleteChefs = 'http://localhost:8000/api/admin/supprimer-chefdep/';
const deleteAllChefs = 'http://localhost:8000/api/chefdep/dep/';
// Gestionairs URL*
const getGestionairs = 'http://localhost:8000/api/admin/get-gestionnaire';
const addGestionairs = 'http://localhost:8000/api/admin/ajouter-gestionnaire';
const deleteGestionairs = 'http://localhost:8000/api/admin/supprimer-gestionnaire/';
const ModifyGestionairs = 'http://localhost:8000/api/admin/modifier-gestionnaire/';
// TCFormation
const getTCFormation = 'https://pfeboumerdes.pythonanywhere.com/formationstc';
const addTCFormation = 'https://pfeboumerdes.pythonanywhere.com/formationtc';
const deleteTCFormation = 'https://pfeboumerdes.pythonanywhere.com/formationtc/';
// TCPalier
const getTCPalier = 'https://pfeboumerdes.pythonanywhere.com/palierstc';
const addTCPalier = 'https://pfeboumerdes.pythonanywhere.com/paliertc';
const deleteTCPalier = 'https://pfeboumerdes.pythonanywhere.com/paliertc/';
const deleteAllTCPalier = 'https://pfeboumerdes.pythonanywhere.com/palierstc/';
// Sections
const getTCSections = 'https://pfeboumerdes.pythonanywhere.com/sectionstc';
const addTCSections = 'https://pfeboumerdes.pythonanywhere.com/sectiontc';
const deleteTCSections = 'https://pfeboumerdes.pythonanywhere.com/sectiontc/';
// Groupes
const getTcGroupes = 'https://pfeboumerdes.pythonanywhere.com/groupestc';
const addTcGroupes = 'https://pfeboumerdes.pythonanywhere.com/groupetc';
const deleteTcGroupes = 'https://pfeboumerdes.pythonanywhere.com/groupetc/';
const deleteAllTcGroupes = 'https://pfeboumerdes.pythonanywhere.com/groupestc/';
// GestDep
const getGestDep = 'https://pfeboumerdes.pythonanywhere.com/gestdeps';
const addGestDep = 'https://pfeboumerdes.pythonanywhere.com/gestdep';
const deleteGestDep = 'https://pfeboumerdes.pythonanywhere.com/gestdep/';
const deleteAllGestDep = 'https://pfeboumerdes.pythonanywhere.com/gestdeps/dep/';
// Modules
const getTcModules = 'https://pfeboumerdes.pythonanywhere.com/modulestc';
const addTcModules = 'https://pfeboumerdes.pythonanywhere.com/moduletc';
const deleteTcModules = 'https://pfeboumerdes.pythonanywhere.com/moduletc/';

export const AdminContext = ({children}) => {
  const [openGest,setOpenGest] = useState(false);
  const [openChef,setOpenChef] = useState(false);
  const [openEdit,setOpenEdit] = useState(false);
  const [openForm,setOpenForm] = useState(false);
  const [openPalier,setOpenPaliers] = useState(false);
  const [openSection,setOpenSections] = useState(false);
  const [openTcModules,setOpenTcModules] = useState(false);
  const [deps,setDeps] = useState([]);
  const [domains,setDomains] = useState([]);
  const [gestionairs,setgestionairs] = useState([]);
  const [chefs,setChefs] = useState([]);
  const [tcform,setTcform] = useState([]);
  const [tcPal,setTcPal] = useState([]);
  const [tcSections,setTcSections] = useState([]);
  const [tcGroupes,setTcGroupes] = useState([]);
  const [tcModules,setTcModules] = useState([]);
  const [gestDep,setGestDep] = useState([]);
  // Departement
  const getDeps = async () => {
    const response = await axios.get(getUrl);
    const result = await response.data;
    setDeps(result);
  }
  const addDep = async (formData) => {
    const result = await axios.post(postUrl,formData)
    console.log(result.data);
    getDeps();
  }
  const deleteDep = async (id) => {
    const response = await axios.delete(`${deleteUrl}${id}`);
    getDeps();
  }
  // Domains
  const getDomains = async () => {
    const response = axios.get(getDomainsUrl);
    setDomains((await response).data);
  }
  const addDomain = async (formData) => {
    const result = await axios.post(postDomainUrl,formData)
    console.log(result);
    getDomains();
  }
  const deleteDomain = async () => {
    await axios.delete(`${deleteDomainUrl}2`);
    getDomains();
  }
  // Chef
  const getChef = async () => {
    const response = await axios.get(getChefs);
    const result = await response.data;
    setChefs(result);
  }
  const addChef = async (formData) => {
    const response = await axios.post(addChefs,formData);
    const result = await response.data;
    getChef();
  }
  const deleteChef = async (id) => {
    const response = await axios.delete(`${deleteChefs}${id}`);
    getChef();
  }
  const modifyChef = async (formData,id) => {
    const response = await axios.put(`${modifyChefs}${id}`,formData);
    getChef();
  }
  const deleteAllChef = async (depid) => {
    await axios.delete(`${deleteAllChefs}${depid}/chefDep`);
    getChef();
  }
  // Gestionair
  const getGestionair = async () => {
    const response = await axios.get(getGestionairs);
    const result = await response.data;
    setgestionairs(result);
  }
  const addGestionair = async (formData) => {
    const response = await axios.post(addGestionairs,formData);
    const result = await response.data;
    getGestionair()
  }
  const deleteGestionair = async (id) => {
    const response = await axios.delete(`${deleteGestionairs}${id}`);
    const result = await response.data;
    getGestionair();
  }
  const modifyGestionair = async (formData,id) => {
    const response = await axios.put(`${ModifyGestionairs}${id}`,formData);
    getGestionair();
  }
  // TCFormation
  const getFormation = async () => {
    const {data} = await axios.get(getTCFormation);
    setTcform(data);
  }
  const addFormation = async (formData) => {
    const {data} = await axios.post(addTCFormation,formData)
    console.log(data)
    getFormation();
  }
  const deleteFormation = async (id) => {
    await axios.delete(`${deleteTCFormation}${id}`);
    getFormation();
  }
  // TCPalier
  const getPaliers = async () => {
    const {data} = await axios.get(getTCPalier);
    setTcPal(data);
  }
  const addPaliers = async (formData) => {
    const {data} = await axios.post(addTCPalier,formData);
    getPaliers();
  }
  const deletePaliers = async (id) => {
    await axios.delete(`${deleteTCPalier}${id}`);
    getPaliers();
  }
  const deleteAllTcPaliers = async (speid) => {
    const {data} = await axios.delete(`${deleteAllTCPalier}${speid}`);
    console.log(data)
    getPaliers();
  }
  // TCSections
  const getTcSec = async () => {
    const {data} = await axios.get(getTCSections);
    setTcSections(data);
  }
  const addTcSec = async (formData) => {
    await axios.post(addTCSections,formData)
    getTcSec();
  }
  const deleteSec = async (id) => {
    await axios.delete(`${deleteTCSections}${id}`);
    getTcSec();
  }
  // TcGroupes
  const getTcGroupe = async () => {
    const {data} = await axios.get(getTcGroupes);
    setTcGroupes(data);
  }
  const addTcGroup = async (formData) => {
    await axios.post(addTcGroupes,formData);
    getTcGroupe();
  }
  const deleteGroup = async (id) => {
    await axios.delete(`${deleteTcGroupes}${id}`);
    getTcGroupe();
  }
  const deleteAllGroup = async (secid) => {
    await axios.delete(`${deleteAllTcGroupes}${secid}`);
    getTcGroupe();
  }
  // GestDep
  const getGestDeps = async () => {
    const {data} = await axios.get(getGestDep);
    setGestDep(data);
    console.log(data)
  }
  const addGestDeps = async (formData) => {
    const {data} = await axios.post(addGestDep,formData);
    getGestDeps();
  }
  const deleteGestDeps = async (id) => {
    await axios.delete(`${deleteGestDep}${id}`)
    getGestDeps();
  }
  const deleteAllGestDeps = async (depid) => {
    await axios.delete(`${deleteAllGestDep}${depid}`);
    getGestDeps();
  }
  // Modules
  const getTcMod = async () => {
    const {data} = await axios.get(getTcModules);
    setTcModules(data)
  }
  const addTcMod = async (formData) => {
    await axios.post(addTcModules,formData)
    getTcMod();
  }
  const deleteTcMod = async (id) => {
    await axios.delete(`${deleteTcModules}${id}`);
    getTcMod();
  }
  useEffect(() => {
    getDeps();
    getDomains();
    getGestionair();
    getFormation();
    getGestDeps();
    getPaliers();
    getTcSec();
    getTcMod();
  },[])
  return (
    <Admin.Provider value={{openGest,setOpenGest,openChef,setOpenChef,deps,getDeps,addDep,getDomains,domains,addDomain,deleteDep, addChef, modifyChef,openEdit,setOpenEdit,deleteChef, gestionairs, addGestionair,modifyGestionair,deleteGestionair,chefs,tcform,addFormation,openForm,setOpenForm,gestDep,addGestDeps,deleteGestDeps,tcPal,addPaliers,openPalier,setOpenPaliers,deletePaliers,deleteFormation,tcSections,addTcSec,setOpenSections,openSection,tcGroupes,addTcGroup,deleteGroup,tcModules,addTcMod,setOpenTcModules,openTcModules,deleteTcMod,deleteSec,deleteAllTcPaliers,deleteAllGroup,deleteAllGestDeps,deleteAllChef}}>
        {children}
    </Admin.Provider>
  )
}

export const useAdmin = () => useContext(Admin);