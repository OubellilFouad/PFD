import React from 'react'
import { BsThreeDots } from 'react-icons/bs'

const Dep = () => {
  return (
    <div className='flex items-center justify-between bg-palerMain px-3 py-1 rounded-lg'>
        <div className='flex gap-3 items-center'>
            <span className='text-main text-3xl'>•</span>
            <p className='text-base font-semibold'>Dep</p>
        </div>
        <BsThreeDots className='text-xl cursor-pointer'/>
    </div>
  )
}

export default Dep