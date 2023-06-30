import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logoBlack from '../../assets/hora black.png'
import calendar from '../../assets/calendar.svg'
import { BsArrowRight } from 'react-icons/bs'
import { useAuth } from '../../../context/AuthContext'

const Landing = () => {
  const {user} = useAuth();  
  const navigate = useNavigate();
  useEffect(() => {
    if(user){
      navigate('/App');
    }
  },[user])
  return (
    <div className='h-screen flex flex-col relative'>
        <div className='absolute flex justify-between items-center top-0 px-32 w-full'>
            <img src={logoBlack} className='w-24'/>
            <div className='flex gap-4'>
                <Link to={'auth'} className='py-2 px-4 border font-medium border-main hover:border-paleMain hover:text-paleMain text-main rounded-lg'>Sign up</Link>
                <Link to={'auth/login'} className='py-2 px-4 bg-main font-medium hover:bg-paleMain text-white rounded-lg'>Login</Link>
            </div>
        </div>
        <img src={calendar} className='absolute right-24 top-1/2 -translate-y-[50%] w-[450px]'/>
        <div className='flex-[100%] landing pl-32 items-center flex'>
            <div className='gap-7 flex flex-col md:w-[50%]'>
              <p className='text-6xl font-bold leading-tight'>Gagnez du temps et des efforts avec <span className='text-main'>Hora</span></p>
              <p className='text-3xl leading-relaxed'>Simplifiez et optimisez votre vie académique avec notre plateforme de gestion des horaires</p>
              <Link className='hover:bg-main border-2 group xl:border-main lg:border-red sm:border-green-500 px-4 py-3 text-main font-semibold hover:text-white rounded-lg flex gap-4 items-center justify-center text-lg w-[50%]' to={'auth'}>Commencez maintenant <BsArrowRight className='relative group-hover:translate-x-2 transition-all'/></Link>
            </div>
        </div>
    </div>
  )
}

export default Landing