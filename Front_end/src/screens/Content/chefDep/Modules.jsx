import React from 'react'
import {HiDotsCircleHorizontal} from 'react-icons/hi'
import ModuleCard from './components/ModuleCard'

const Modules = () => {
  return (
    <div className='flex flex-col gap-8'>
        <p className='text-2xl font-bold'>List des Modules</p>
        <div className='grid grid-cols-3 gap-14'>
            <ModuleCard/>
            <ModuleCard/>
            <ModuleCard/>
            <ModuleCard/>
            <ModuleCard/>
            <ModuleCard/>
        </div>
    </div>
  )
}

export default Modules