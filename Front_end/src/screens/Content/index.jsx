import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import Header from './Header'
import Sidebar from './Sidebar'

const Content = () => {
  const {user} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if(!user){
      console.log(location)
      if(location.pathname === "/App"){
        navigate('/');
      }else{
        console.log('tt')
        navigate('/App');
      }
    }
  },[user])
  return (
    <div className='grid grid-cols-[1fr_5fr] grid-rows-[1fr_8fr] overflow-hidden h-screen'>
        <div className='flex items-center px-6 gap-3 border-b border-b-[#DBDBDB] border-r border-r-[#DBDBDB]'>
            <span className='rounded-full w-6 h-6 bg-main'></span>
            <p className='text-xl font-bold'>Project M.</p>
        </div>
        <Header user={user}/>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}

export default Content