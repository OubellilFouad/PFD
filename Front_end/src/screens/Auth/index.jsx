import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'

const Auth = () => {
  const {user} = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if(user){
      navigate('/App');
    }
  },[user])
  return (
    <div className='flex h-screen justify-center items-center md:px-0 px-5'>
        <div className='md:w-2/3 w-full md:aspect-video rounded-3xl flex overflow-hidden shadow-2xl'>
            <div className='md:w-2/4 w-full pt-12 flex bg-[#FAFAFA] overflow-hidden'>
                <Outlet/>
            </div>
            <div className='w-2/4 bg-blue-500 authImg md:block hidden'>

            </div>
        </div>
    </div>
  )
}

export default Auth