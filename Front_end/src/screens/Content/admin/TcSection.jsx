import React from 'react'
import { useAdmin } from './context/AdminContext';
import SectionCard from '../chefDep/components/SectionCard'
const TcSection = () => {
  const {tcSections} = useAdmin(); 
  return (
    <div className='flex flex-col gap-8 overflow-x-scroll'>
        {tcSections.map((section) => {
          const {nom,speid,capacite,secid} = section; 
            return (
              <SectionCard key={speid} nom={nom} capacite={capacite} type={'commun'} speid={speid} secid={secid} />
            )
        })}
    </div>
  )
}

export default TcSection