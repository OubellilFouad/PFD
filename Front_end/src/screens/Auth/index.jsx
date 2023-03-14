import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const Auth = () => {

  return (
    <div className='flex h-screen justify-center items-center'>
        <div className='w-2/3 aspect-video rounded-3xl flex overflow-hidden shadow-2xl'>
            <div className='flex-1 py-12 flex bg-[#FAFAFA]'>
                <Outlet/>
            </div>
            <div className='flex-1 bg-blue-500 authImg'>

            </div>
        </div>
    </div>
  )
}

export default Auth