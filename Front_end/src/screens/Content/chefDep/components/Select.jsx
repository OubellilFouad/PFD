import React, { useEffect, useRef, useState } from 'react'

const Select = ({name,setData,array,no}) => {
  return (
    <div className='flex flex-col flex-1'>
        <label htmlFor={name} className='text-paleMain !text-base font-medium cursor-pointer'>{!no && name}</label>
        <select onChange={(e) => setData(e.target.value)} name="dropDown" id={name} className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none' placeholder='Domains'>
            <option value={null} className='bg-separator hover:bg-black text-black text-base' unselectable='on'>{name}</option>
            {array?.map((an,index) => {
                return(
                    <option key={index} value={an} className='bg-separator hover:bg-black text-black' >{an}</option>
                )
            })}
        </select>
    </div>
  )
}

export default Select