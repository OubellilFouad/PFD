import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'

const Prof = createContext();
// Choix
const getChoix = 'http://127.0.0.1:5000/veuxs';
const addChoix = 'http://127.0.0.1:5000/veux';
const deleteChoix = 'http://127.0.0.1:5000/veux/';
const deleteAllChoix = 'http://127.0.0.1:5000/veuxs/';
// Availability
const getAv = 'http://127.0.0.1:5000/availabilitys';
const addAv = 'http://127.0.0.1:5000/availability';
const deleteAv = 'http://127.0.0.1:5000/availability/';

export const ProfContext = ({children}) => {
  const [choix,setChoix] = useState([]);
  const [avails,setAvails] = useState([]);
  // Choix
  const getChoice = async () => {
    const {data} = await axios.get(getChoix);
    setChoix(data);
  } 
  const addChoice = async (formData) => {
    await axios.post(addChoix,formData);
    getChoice();
  }
  const deleteChoice = async (id) => {
    await axios.delete(`${deleteChoix}${id}`);
    getChoice();
  }
  const deleteAllChoice = async (profid) => {
    await axios.delete(`${deleteAllChoix}${profid}`);
    getChoice();
  }
  // Availability
  const getAvail = async () => {
    const {data} = await axios.get(getAv);
    setAvails(data);
  }
  const addAvail = async (formData) => {
    await axios.post(addAv,formData);
    getAvail();
  }
  const deleteAvail = async (id) => {
    await axios.delete(`${deleteAv}${id}`);
    getAvail();
  }
  useEffect(() => {
    getChoice();
    getAvail();
  },[])
  return (
    <Prof.Provider value={{choix,addChoice,deleteChoice,avails,addAvail,deleteAvail,deleteAllChoice}}>
        {children}
    </Prof.Provider>
  )
}
export const useProf = () => useContext(Prof);