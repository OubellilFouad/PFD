import React, { useEffect, useState } from 'react'
import GestionairCard from '../admin/components/GestionairCard'
import SectionCard from './components/SectionCard'
import { useChef } from './context/ChefContext'
import axios from 'axios'
import { useAuth } from '../../../../context/AuthContext'
const getSections = 'https://pfeboumerdes.pythonanywhere.com/sections/';

const Sections = () => {
  const {sections} = useChef();
  const {user} = useAuth();
  const [section,setSection] = useState([]);
  const getSpeSections = async () => {
    const {data} = await axios.get(`${getSections}dep/${user?.depID}`);
    setSection(data);
  }
  useEffect(() => {
    getSpeSections();
  },[sections])
  return (
    <div className='flex flex-col gap-8 overflow-hidden'>
        <p className='text-2xl font-bold'>List des Sections</p>
        <div className='flex flex-col gap-8 overflow-x-scroll'>
            {section.map((section) => {
              const {nom,speid,capacite,secid} = section; 
                return (
                  <SectionCard key={speid} nom={nom} capacite={capacite} speid={speid} secid={secid} />
                )
            })}
        </div>
    </div>
  )
}

export default Sections