import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import Header from './Header'
import Sidebar from './Sidebar'

const Content = () => {
  const {user} = useAuth();
  const navigate = useNavigate();
  if(!user){
    navigate('/');
  }
  return (
    <div className='grid grid-cols-[1fr_5fr] grid-rows-[1fr_8fr] h-screen'>
        <div className='flex items-center px-6 gap-3 border-b border-b-[#DBDBDB] border-r border-r-[#DBDBDB]'>
            <span className='rounded-full w-6 h-6 bg-main'></span>
            <p className='text-xl font-bold'>Project M.</p>
        </div>
        <Header/>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}

export default Content