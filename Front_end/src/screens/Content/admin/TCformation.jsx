import React from 'react'
import { useAdmin } from './context/AdminContext'
import TCFromCard from './components/TCFromCard';

const TCformation = () => {
  const {tcform} = useAdmin();  
  return (
    <div className='grid grid-cols-3 pb-4 gap-14 overflow-x-scroll'>
        {tcform.map((tc) => {
            const {fillid,cycle,nom,dep1,dep2,dep3,ftcid} = tc;
            return(
                <TCFromCard key={ftcid} nom={nom} cycle={cycle} dep1={dep1} dep2={dep2} dep3={dep3} ftcid={ftcid} />
            )
        })}
    </div>
  )
}

export default TCformation