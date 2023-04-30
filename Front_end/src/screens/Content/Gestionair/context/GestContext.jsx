import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
const Gestionair = createContext();

// EDTs
const getEDT = 'https://pfeboumerdes.pythonanywhere.com/edts';
const addEDT = 'https://pfeboumerdes.pythonanywhere.com/edt';
const deleteEDT = 'https://pfeboumerdes.pythonanywhere.com/edt/';

export const GestContext = ({children}) => {
  const [edts,setEdts] = useState([]);
  const [profG,setProfG] = useState(null);
  const [typeG,setTypeG] = useState('');
  const [sem,setSem] = useState('');
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
  useEffect(() => {
    getEdts();
  },[])
  return (
    <Gestionair.Provider value={{edts,addEdts,deleteEdt,profG,setProfG,typeG,setTypeG,salleG,setSalleG,sem,setSem}}>
        {children}
    </Gestionair.Provider>
  )
}

export const useGest = () => useContext(Gestionair);