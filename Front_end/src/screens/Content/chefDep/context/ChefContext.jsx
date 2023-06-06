import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'

const Chef = createContext();
// Modules
const addModules = 'http://127.0.0.1:5000/module';
const getModules = 'http://127.0.0.1:5000/modules';
const deleteModules = 'http://127.0.0.1:5000/module/';
const editModules = 'http://127.0.0.1:5000/module/';
const deleteAllDepModules = 'http://127.0.0.1:5000/modules/dep/';
const deleteAllSpeModules = 'http://127.0.0.1:5000/modules/spe/';
const deleteAllPalModules = 'http://127.0.0.1:5000/modules/pal/';
// Specialities
const addSpes = 'http://127.0.0.1:5000/specialite';
const getSpes = 'http://127.0.0.1:5000/specialites';
const deleteSpes = 'http://127.0.0.1:5000/specialite/';
const editSpes = 'http://127.0.0.1:5000/specialite/';
const deleteAllDepSpes = 'http://127.0.0.1:5000/specialites/';
// Filliére
const getFils = 'http://127.0.0.1:5000/filieres';
const addFils = 'http://127.0.0.1:5000/filiere';
const deleteFils = 'http://127.0.0.1:5000/filiere/';
const editFils = 'http://127.0.0.1:5000/filiere/';
const deleteAllFils = 'http://127.0.0.1:5000/filieres/';
// Chambres
const getChambres = 'http://127.0.0.1:5000/chambres';
const addChambres = 'http://127.0.0.1:5000/chambre';
const getOneChambres = 'http://127.0.0.1:5000/chambre/';
const deleteChambres = 'http://127.0.0.1:5000/chambre/';
const editChambres = 'http://127.0.0.1:5000/chambre/';
// Sections
const getSections = 'http://127.0.0.1:5000/sections';
const addSections = 'http://127.0.0.1:5000/section';
const getOneSections = 'http://127.0.0.1:5000/section/';
const deleteSections = 'http://127.0.0.1:5000/section/';
const editSections = 'http://127.0.0.1:5000/section/';
const deleteAllDepSections = 'http://127.0.0.1:5000/sections/dep/';
const deleteAllSpeSections = 'http://127.0.0.1:5000/sections/spe/';
const deleteAllPalSections = 'http://127.0.0.1:5000/sections/pal/';
// Groupes 
const getGroupes = 'http://127.0.0.1:5000/groupes';
const addGroupes = 'http://127.0.0.1:5000/groupe';
const getOneGroupes = 'http://127.0.0.1:5000/groupe/';
const deleteGroupes = 'http://127.0.0.1:5000/groupe/';
const editGroupes = 'http://127.0.0.1:5000/groupe/';
const deleteAllSecGroupes = 'http://127.0.0.1:5000/groupes/sec/';
const deleteAllDepGroupes = 'http://127.0.0.1:5000/groupes/dep/';
const deleteAllSpeGroupes = 'http://127.0.0.1:5000/groupes/spe/';
const deleteAllPalGroupes = 'http://127.0.0.1:5000/groupes/pal/';
// Profs 
const getProfs = 'http://127.0.0.1:8000/api/chefdep/get-enseignant';
const addProfs = 'http://127.0.0.1:8000/api/chefdep/ajouter-enseignant';
const deleteProfs = 'http://127.0.0.1:8000/api/chefdep/supprimer-enseignant/';
const deleteAllProfs = 'http://127.0.0.1:8000/api/prof/departments/';
// Palier
const getPaliers = 'http://127.0.0.1:5000/paliers';
const addPaliers = 'http://127.0.0.1:5000/palier';
const deletePaliers = 'http://127.0.0.1:5000/palier/';
const deleteAllPaliers = 'http://127.0.0.1:5000/paliers/dep/';
const deleteAllSpePaliers = 'http://127.0.0.1:5000/paliers/spe/';
// Affectation
const getAffects = 'http://127.0.0.1:5000/affectations';
const addAffects = 'http://127.0.0.1:5000/affectation';
const deleteAffects = 'http://127.0.0.1:5000/affectation/';
const deleteAllModAffects = 'http://127.0.0.1:5000/affectations/mod/';
const deleteAllSecAffects = 'http://127.0.0.1:5000/affectations/sec/';
const deleteAllGrpAffects = 'http://127.0.0.1:5000/affectations/grp/';
const deleteAllDepAffects = 'http://127.0.0.1:5000/affectations/dep/';
const deleteAllProfAffects = 'http://127.0.0.1:5000/affectations/prof/';

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
  const [afects,setAfects] = useState([]);
  // Modules
    const getModule = async () => {
      const response = await axios.get(getModules);
      const result = await response.data;
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
    const deleteAllDepModule = async (depid) => {
      await axios.delete(`${deleteAllDepModules}${depid}`);
      getModule();
    }
    const deleteAllSpeModule = async (speid) => {
      await axios.delete(`${deleteAllSpeModules}${speid}`);
      getModule();
    }
    const deleteAllPalModule = async (palid) => {
      await axios.delete(`${deleteAllPalModules}${palid}`);
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
    const deleteSpe = async (id) => {
      await axios.delete(`${deleteSpes}${id}`);
      getSpe();
    }
    const deleteAllDepSpe = async (depid) => {
      await axios.delete(`${deleteAllDepSpes}${depid}`);
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
    const deleteAllDepFils = async (depid) => {
      await axios.delete(`${deleteAllFils}${depid}`);
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
    const deleteSection = async (id) => {
      await axios.delete(`${deleteSections}${id}`);
      getSection();
    }
    const deleteAllDepSection = async (depid) => {
      await axios.delete(`${deleteAllDepSections}${depid}`);
      getSection();
    }
    const deleteAllSpeSection = async (speid) => {
      await axios.delete(`${deleteAllSpeSections}${speid}`);
      getSection();
    }
    const deleteAllPalSection = async (palid) => {
      await axios.delete(`${deleteAllPalSections}${palid}`);
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
    const deleteAllSecGroup = async (secid) => {
      await axios.delete(`${deleteAllSecGroupes}${secid}`);
      getGroup();
    }
    const deleteAllDepGroup = async (depid) => {
      await axios.delete(`${deleteAllDepGroupes}${depid}`);
      getGroup();
    }
    const deleteAllSpeGroup = async (speid) => {
      await axios.delete(`${deleteAllSpeGroupes}${speid}`);
      getGroup();
    }
    const deleteAllPalGroup = async (palid) => {
      await axios.delete(`${deleteAllPalGroupes}${palid}`);
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
    const deleteAllProf = async (depid) => {
      const {data} = await axios.delete(`${deleteAllProfs}${depid}/teachers`);
      console.log(data);
      getProf();
    }
  // Palier
    const getPalier = async () => {
      const {data} = await axios.get(getPaliers);
      setPalier(data);
    }
    const addPalier = async (formData) => {
      const {data} = await axios.post(addPaliers,formData);
      console.log(data)
      getPalier();
    }
    const deletePal = async (id) => {
      await axios.delete(`${deletePaliers}${id}`);
      getPalier();
    }
    const deleteAllSpePal = async (speid) => {
      await axios.delete(`${deleteAllSpePaliers}${speid}`);
      getPalier();
    }
    const deleteAllDepPal = async (speid) => {
      await axios.delete(`${deleteAllPaliers}${speid}`);
      getPalier();
    }
  // Affectation
    const getAffect = async () => {
      const {data} = await axios.get(getAffects);
      setAfects(data);
    }
    const addAffect = async (formData) => {
      const {data} = await axios.post(addAffects,formData);
      console.log(data)
      getAffect();
    }
    const deleteAffect = async (id) => {
      await axios.delete(`${deleteAffects}${id}`);
      getAffect();
    }
    const deleteAllModAffect = async (modid) => {
      await axios.delete(`${deleteAllModAffects}${modid}`);
      getAffect();
    }
    const deleteAllSecAffect = async (secid) => {
      await axios.delete(`${deleteAllSecAffects}${secid}`);
      getAffect();
    }
    const deleteAllGrpAffect = async (grpid) => {
      await axios.delete(`${deleteAllGrpAffects}${grpid}`);
      getAffect();
    }
    const deleteAllDepAffect = async (depid) => {
      await axios.delete(`${deleteAllDepAffects}${depid}`);
      getAffect();
    }
    const deleteAllProfAffect = async (profid) => {
      await axios.delete(`${deleteAllProfAffects}${profid}`);
      getAffect();
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
    getAffect();
    deleteAllDepModule(24);
  },[])
  return (
    <Chef.Provider value={{openSec,setOpenSec,setOpenGroup,openGroup,openModule,setOpenModule,openSpe,setOpenSpe,addSpe,spes,fils,addFil,addModule,deleteModule,modules,openSalle,setOpenSalle,addChambre,chambre,deleteChambre,sections,addSection,addGroupe,groupes,deleteGroup,openProf,setOpenProf,addProf,profs,deleteProf,openPalier,setOpenPalier,addPalier,palier,afects,addAffect,deleteAffect,deleteSection,deleteSpe,deletePal,deleteAllSpePal,deleteAllSecGroup,deleteAllModAffect,deleteAllSecAffect,deleteAllGrpAffect,deleteAllDepAffect,deleteAllDepPal,deleteAllProf,deleteAllDepGroup,deleteAllDepSection,deleteAllDepFils,deleteAllDepSpe,deleteAllDepModule,deleteAllSpeModule,deleteAllSpeSection,deleteAllPalSection,deleteAllSpeGroup,deleteAllPalGroup,deleteAllProfAffect,deleteAllPalModule}}>
        {children}
    </Chef.Provider>
  )
}

export const useChef = () => useContext(Chef);