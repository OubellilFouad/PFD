import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

const Main = () => {
  const location = useLocation();
  const [title,setTitle] = useState('Dashboard');
  useEffect(() => {
    location.state.name && setTitle(location.state.name);
  },[location.state.name])  
  return (
    <div className='py-7 px-12 flex flex-col gap-8'>
        <div className='text-5xl font-semibold'>
            {title}
        </div>
        <Outlet/>
    </div>
  )
}

export default Main