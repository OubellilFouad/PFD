import React, { useEffect } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import Header from './Header'
import Sidebar from './Sidebar'
import { BiLeftArrowAlt } from 'react-icons/bi'

const Content = () => {
  const {user} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {

    if(!user){
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
        {location.state?.page !== 'EDT' && location.state?.page !== 'PEDT' && location.state?.page !== 'CEDT' && (
          <div className='flex items-center px-6 gap-3 border-b border-b-[#DBDBDB] border-r border-r-[#DBDBDB]'>
            <span className='rounded-full w-6 h-6 bg-main'></span>
            <p className='text-xl font-bold'>Project M.</p>
          </div>
        )}
        {location.state?.page === 'EDT' && (
          <NavLink to={'../'} className='flex items-center px-6 gap-3 border-b group hover:text-main border-b-[#DBDBDB] border-r border-r-[#DBDBDB]' state={{
            page: 'Main',
            name: 'Dashboard'
          }}>
            <BiLeftArrowAlt className='text-2xl group-hover:-translate-x-1 transition-[translate_200ms] relative cursor-pointer'/>
            <p className='text-xl font-bold'>Dashboard</p>
          </NavLink>
        )}
        {location.state?.page === 'PEDT' && (
          <NavLink to={'../'} className='flex items-center px-6 gap-3 border-b group hover:text-main border-b-[#DBDBDB] border-r border-r-[#DBDBDB]' state={{
              page: 'Main',
              name: 'Dashboard'
          }}>
            <BiLeftArrowAlt className='text-2xl group-hover:-translate-x-1 transition-[translate_200ms] relative cursor-pointer'/>
            <p className='text-xl font-bold'>Dashboard</p>
          </NavLink>
        )}
        {location.state?.page === 'CEDT' && (
          <NavLink to={'../'} className='flex items-center px-6 gap-3 border-b group hover:text-main border-b-[#DBDBDB] border-r border-r-[#DBDBDB]' state={{
              page: 'Main',
              name: 'Dashboard'
          }}>
            <BiLeftArrowAlt className='text-2xl group-hover:-translate-x-1 transition-[translate_200ms] relative cursor-pointer'/>
            <p className='text-xl font-bold'>Dashboard</p>
          </NavLink>
        )}
        <Header user={user}/>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}

export default Content