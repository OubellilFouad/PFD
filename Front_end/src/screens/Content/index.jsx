import React, { useEffect } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import Header from './Header'
import Sidebar from './Sidebar'
import { BiLeftArrowAlt } from 'react-icons/bi'
import horaZreg from '../../assets/hora zreg.png'
import { useGest } from './Gestionair/context/GestContext'

const Content = () => {
  const {user} = useAuth();
  const {setActiveSection,setActiveGroup,setSem} = useGest();
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
    <div className='grid md:grid-cols-[1fr_5fr] grid-rows-[0.8fr_8fr] grid-cols-1 overflow-hidden h-screen'>
        {location.state?.page !== 'EDT' && location.state?.page !== 'PEDT' && location.state?.page !== 'CEDT' && (
          <div className='hidden items-center px-6 border-b md:flex border-b-[#DBDBDB] border-r border-r-[#DBDBDB] relative'>
            <img src={horaZreg} className='w-20 absolute' alt="" />
          </div>
        )}
        {location.state?.page === 'EDT' && (
          <NavLink to={'../'} onClick={() => {
            setActiveGroup(null);
            setActiveSection(null);
            setSem(null);
          }} className='flex items-center px-6 gap-3 border-b group hover:text-main border-b-[#DBDBDB] border-r border-r-[#DBDBDB]' state={{
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