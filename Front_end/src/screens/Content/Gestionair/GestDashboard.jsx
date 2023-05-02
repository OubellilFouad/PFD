import React from 'react'
import { useAuth } from '../../../../context/AuthContext'
import { NavLink } from 'react-router-dom';

const GestDashboard = () => {
  const {user} = useAuth();
  return (
    <div className='flex items-center mx-auto flex-col gap-4 w-full text-center'>
      {/* <p className='text-2xl font-bold'>Welcome {user.userName}</p>
      <p className='text-lg font-bold'>Your task is to create and manage time tables for the departments your were assigned</p>
      <p className='text-base font-bold text-center'>to navigate to the departments you were assigned and all the sections and groups that belong to it navigate to the <NavLink to={'edt'} className='text-main cursor-pointer' state={{
        name:'Time tables',
        page: 'EDT'
      }}>Time tables</NavLink> page</p>
      {user?.type !== 'Tranc Commun' &&(<p className='text-base font-bold text-center'>You can also keep track of all the teachers that belong to the departments you were assigned by navigating to the <NavLink to={'edtprof'} className='text-main cursor-pointer' state={{
        name:'Teachers',
        page: 'PEDT'
      }}>Teachers</NavLink> page</p>)} */}
      <p>EDT</p>
    </div>
  )
}

export default GestDashboard