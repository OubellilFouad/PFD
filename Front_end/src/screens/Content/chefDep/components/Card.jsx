import React from 'react'
import { BsArrowRightShort } from 'react-icons/bs'
import { useChef } from '../context/ChefContext'

const Card = ({data,title,singular}) => {
  
  return (
    <div className='p-5 flex-1 gap-3 flex flex-col rounded-xl bg-separator'>
        <div className='flex justify-between items-center'>
            <p className='text-base font-semibold'>{title}</p>
            <BsArrowRightShort className='text-xl cursor-pointer'/>
        </div>
        <p className=' text-2xl font-bold'>{data?data?.length:0} <span className='text-xl'>{singular}</span></p>
    </div>
  )
}

export default Card