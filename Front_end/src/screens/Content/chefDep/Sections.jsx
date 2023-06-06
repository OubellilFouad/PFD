import React, { useEffect, useState } from 'react'
import GestionairCard from '../admin/components/GestionairCard'
import SectionCard from './components/SectionCard'
import { useChef } from './context/ChefContext'
import axios from 'axios'
import { useAuth } from '../../../../context/AuthContext'
import { useAdmin } from '../admin/context/AdminContext'
const getSections = 'http://127.0.0.1:5000/sections/';
const getTcSections = 'http://127.0.0.1:5000/sectionstc/dep/';

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
              const {nom,speid,capacite,secid,palid} = section; 
                return (
                  <SectionCard key={secid} nom={nom} palid={palid} capacite={capacite} speid={speid} secid={secid} />
                )
            })}
            {tcSections.map((section) => {
              const {nom,speid,capacite,secid,palid} = section; 
                return (
                  <SectionCard key={secid} nom={nom} palid={palid} type={'commun'} capacite={capacite} speid={speid} secid={secid} />
                )
            })}
        </div>
    </div>
  )
}

export default Sections