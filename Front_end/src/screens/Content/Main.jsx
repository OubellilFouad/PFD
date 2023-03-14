import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import {AiOutlinePlus} from 'react-icons/ai'
const Main = () => {
  const location = useLocation();
  const [title,setTitle] = useState('Dashboard');
  useEffect(() => {
    location.state.name && setTitle(location.state.name);
  },[location.state.name])  
  return (
    <div className='py-7 px-12 flex flex-col gap-8 overflow-x-scroll main'>
        <div className='text-5xl font-semibold flex justify-between items-center'>
            <p>{title}</p>
            {title === 'Dashboard' && (
                <button className='flex items-center text-base gap-2 py-2 px-4 border rounded-lg hover:text-main hover:border-main'>
                    <AiOutlinePlus className='p-1 bg-palerMain text-main text-xl rounded-md'/>
                    Add Dep
                </button>
            )}
        </div>
        <Outlet/>
    </div>
  )
}

export default Main