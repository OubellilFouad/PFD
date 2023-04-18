import React, { useEffect, useState } from 'react'
import { BsFillCollectionFill } from 'react-icons/bs'
import ChoixModuleCard from './ChoixModuleCard';

const ChoixCard = ({choix}) => {
  const [modules,setModules] = useState([]);  
  useEffect(() => {
    if(choix){
        setModules(Object.values(JSON.parse(choix)));
    }
  },[])  
  return (
    <div className='flex justify-between flex-col border rounded-lg px-4 py-3 gap-2'>
        <div className='border-[#DADADA] flex-[40%] flex gap-4'>
            <div className='p-4 bg-[#F4F4F4] text-2xl rounded-lg text-black'>
                <BsFillCollectionFill/>
            </div>
            <div className='flex flex-col justify-center'>
                <p className='text-2xl font-semibold'>The choices</p>
            </div>
        </div>
        <p className='text-xl font-bold'>Modules</p>
        <div className='grid grid-cols-5 gap-3'>
            {modules.length === 0 && (<p className='text-base font-bold'>Teacher didn't make a choice yet</p>)}
            {modules.map((module) => {
                const {moduleID,type} = module;
                return(
                    <ChoixModuleCard moduleID={moduleID} type={type}/>
                )
            })}
        </div>
    </div>
  )
}

export default ChoixCard