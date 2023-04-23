import React, { useEffect, useState } from 'react'
import GestionairCard from '../admin/components/GestionairCard'
import SectionCard from './components/SectionCard'
import { useChef } from './context/ChefContext'
import axios from 'axios'
import { useAuth } from '../../../../context/AuthContext'
import { useAdmin } from '../admin/context/AdminContext'
const getSections = 'https://pfeboumerdes.pythonanywhere.com/sections/';
const getTcSections = 'https://pfeboumerdes.pythonanywhere.com/sectionstc/dep';

const Sections = () => {
  const {sections} = useChef();
  const {tcSections} = useAdmin();
  const {user} = useAuth();
  const [section,setSection] = useState([]);
  const [tcsection,setTcSection] = useState([]);
  const getSpeSections = async () => {
    const {data} = await axios.get(`${getSections}dep/${user?.depID}`);
    setSection(data);
  }
  const getTcSection = async () => {
    const {data} = await axios.get(`${getTcSections}${user?.depID}`);
    setTcSection(data);
  }
  useEffect(() => {
    getSpeSections();
    getTcSection();
  },[sections,tcSections])
  return (
    <div className='flex flex-col gap-8 overflow-hidden'>
        <div className='flex flex-col gap-8 overflow-x-scroll'>
            {section.map((section) => {
              const {nom,speid,capacite,secid} = section; 
                return (
                  <SectionCard key={speid} nom={nom} capacite={capacite} speid={speid} secid={secid} />
                )
            })}
            {tcSections.map((section) => {
              const {nom,speid,capacite,secid} = section; 
                return (
                  <SectionCard key={speid} nom={nom} type={'commun'} capacite={capacite} speid={speid} secid={secid} />
                )
            })}
        </div>
    </div>
  )
}

export default Sections