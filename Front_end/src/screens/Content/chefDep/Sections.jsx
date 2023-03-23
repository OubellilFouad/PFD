import React from 'react'
import GestionairCard from '../admin/components/GestionairCard'
import SectionCard from './components/SectionCard'

const Sections = () => {
  return (
    <div className='flex flex-col gap-8'>
        <p className='text-2xl font-bold'>List des Sections</p>
        <div className='flex flex-col gap-8'>
            <SectionCard/>
        </div>
    </div>
  )
}

export default Sections