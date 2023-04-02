import React from 'react'
import GestionairCard from '../admin/components/GestionairCard'
import SectionCard from './components/SectionCard'
import { useChef } from './context/ChefContext'

const Sections = () => {
  const {sections} = useChef();
  return (
    <div className='flex flex-col gap-8'>
        <p className='text-2xl font-bold'>List des Sections</p>
        <div className='flex flex-col gap-8'>
            {sections.map((section) => {
              const {nom,speid,capacite,secid} = section; 
                return (
                  <SectionCard key={speid} nom={nom} capacite={capacite} speid={speid} secid={secid} />
                )
            },[])}
        </div>
    </div>
  )
}

export default Sections