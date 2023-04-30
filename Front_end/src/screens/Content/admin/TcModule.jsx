import React from 'react'
import { useAdmin } from './context/AdminContext'
import ModuleCard from '../chefDep/components/ModuleCard';

const TcModule = () => {
  const {tcModules} = useAdmin();
  return (
    <div className='grid grid-cols-3 pb-4 gap-14 overflow-x-scroll'>
        {tcModules.map((mod) => {
            const {nom,speid,fillid,modid,abbr} = mod;
            return(
                <ModuleCard key={modid} type='commun' nom={nom} abbr={abbr} speid={speid} fillid={fillid} moduleid={modid} />
            )
        })}
    </div>
  )
}

export default TcModule