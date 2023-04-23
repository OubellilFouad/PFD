import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'

const Prof = createContext();
// Choix
const getChoix = 'https://pfeboumerdes.pythonanywhere.com/veuxs';
const addChoix = 'https://pfeboumerdes.pythonanywhere.com/veux';
const deleteChoix = 'https://pfeboumerdes.pythonanywhere.com/veux/';
export const ProfContext = ({children}) => {
  const [choix,setChoix] = useState([]);
  // Choix
  const getChoice = async () => {
    const {data} = await axios.get(getChoix);
    setChoix(data);
    console.log(data);
  } 
  const addChoice = async (formData) => {
    const {data} = await axios.post(addChoix,formData);
    getChoice();
  }
  const deleteChoice = async (id) => {
    const {data} = await axios.delete(`${deleteChoix}${id}`);
    console.log(data)
    getChoice();
  }
  useEffect(() => {
    getChoice();
  },[])
  return (
    <Prof.Provider value={{choix,addChoice,deleteChoice}}>
        {children}
    </Prof.Provider>
  )
}
export const useProf = () => useContext(Prof);