import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'

const Prof = createContext();
// Choix
const getChoix = 'https://pfeboumerdes.pythonanywhere.com/veuxs';
const addChoix = 'https://pfeboumerdes.pythonanywhere.com/veux';
const deleteChoix = 'https://pfeboumerdes.pythonanywhere.com/veux/';
// Availability
const getAv = 'https://pfeboumerdes.pythonanywhere.com/availabilitys';
const addAv = 'https://pfeboumerdes.pythonanywhere.com/availability';
const deleteAv = 'https://pfeboumerdes.pythonanywhere.com/availability/';

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
    <Prof.Provider value={{choix,addChoice,deleteChoice,avails,addAvail,deleteAvail}}>
        {children}
    </Prof.Provider>
  )
}
export const useProf = () => useContext(Prof);