import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import {MdEdit, MdSchool} from 'react-icons/md'
import GestionairCard from './components/GestionairCard'

const Gestionair = () => {
  return (
    <div className='flex flex-col gap-8'>
        <GestionairCard/>
        <GestionairCard/>
        <GestionairCard/>
        <div className='flex justify-between'>
            <div className='px-4 py-5 border-[#DADADA] flex-[40%] flex justify-center items-center border gap-4 rounded-lg cursor-pointer hover:text-main'>
                <AiOutlinePlus className='text-xl'/>
                Add Member
            </div>
            <div className='flex-1 flex justify-end items-center'>
                
            </div>
        </div>
    </div>
  )
}

export default Gestionair