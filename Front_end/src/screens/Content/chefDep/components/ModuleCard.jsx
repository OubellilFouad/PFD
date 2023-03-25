import React from 'react'
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi'

const ModuleCard = () => {
  return (
    <div className='bg-separator flex flex-col rounded-xl pt-6 px-6 h-32 gap-4'>
        <div className='flex justify-between items-center'>
          <p className='text-2xl font-bold' >Module name</p>
          <HiOutlineDotsCircleHorizontal className='text-2xl cursor-pointer hover:text-main'/>
        </div>
        <span>Specialité name</span>
    </div>
  )
}

export default ModuleCard