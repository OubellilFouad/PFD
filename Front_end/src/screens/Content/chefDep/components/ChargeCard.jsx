import React from 'react'
import { AiFillDelete } from 'react-icons/ai'

const ChargeCard = () => {
  return (
    <div className='rounded-xl bg-separator h-20 p-4 gap-3'>
        <div className='flex justify-between items-center'>
          <p className='text-base font-bold'>Name</p>
          <AiFillDelete className='text-lg cursor-pointer hover:text-red'/>
        </div>
        <span className='text-xs font-bold'>Specialite</span>
    </div>
  )
}

export default ChargeCard