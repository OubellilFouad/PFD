import React from 'react'
import { BsFillCollectionFill } from 'react-icons/bs'
import { FiPlus } from 'react-icons/fi'
import { MdEdit, MdSchool } from 'react-icons/md'
import { useChef } from '../context/ChefContext'
import GroupCard from './GroupCard'

const SectionCard = () => {
  const {setOpenGroup} = useChef();  
  return (
    <div className='flex justify-between flex-col border rounded-lg px-4 py-5 gap-4'>
        <div className='border-[#DADADA] flex-[40%] flex gap-4'>
            <div className='p-4 bg-[#F4F4F4] text-2xl rounded-lg text-black'>
                <BsFillCollectionFill/>
            </div>
            <div className='flex flex-col justify-between'>
                <span className='text-sm text-[#828282]'>Section</span>
                <p className='text-2xl font-semibold'>Section name</p>
            </div>
            <div className='flex items-end'>
                <span className='text-sm text-[#828282]'>Capacité</span>
            </div>
        </div>
        <p className='text-xl font-bold'>Les groups</p>
        <div className='grid grid-cols-4 gap-3'>
            <GroupCard/>
            <GroupCard/>
            <GroupCard/>
            <div onClick={() => setOpenGroup(true)} className='rounded-xl group hover:border-main border-2 border-separator h-20 flex justify-center items-center cursor-pointer'>
                <FiPlus className='text-2xl group-hover:text-main'/>
            </div>
        </div>
    </div>
  )
}

export default SectionCard