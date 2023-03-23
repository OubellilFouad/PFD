import React from 'react'
import { BsArrowRightShort } from 'react-icons/bs'

const Card = () => {
  return (
    <div className='p-5 flex-1 gap-3 flex flex-col rounded-xl bg-separator'>
        <div className='flex justify-between items-center'>
            <p className='text-base font-semibold'>Title</p>
            <BsArrowRightShort className='text-xl cursor-pointer'/>
        </div>
        <p className=' text-2xl font-bold'>1056</p>
    </div>
  )
}

export default Card