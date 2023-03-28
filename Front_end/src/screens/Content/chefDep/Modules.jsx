import React from 'react'
import {HiDotsCircleHorizontal} from 'react-icons/hi'
import ModuleCard from './components/ModuleCard'
import { useChef } from './context/ChefContext'

const Modules = () => {
  const {modules} = useChef();
  return (
    <div className='flex flex-col gap-8'>
        <p className='text-2xl font-bold'>List des Modules</p>
        <div className='grid grid-cols-3 gap-14'>
            {modules.map((module) => {
              const {nom,speid,fillid} = module;
              return (
                <ModuleCard nom={nom} speid={speid} fillid={fillid} />
              )
            })}
        </div>
    </div>
  )
}

export default Modules