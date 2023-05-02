import React from 'react'
import { IoMdPerson } from 'react-icons/io'
import { NavLink } from 'react-router-dom'

const Prof = ({nom,profid,type,chef}) => {
  return (
    <NavLink to={'edtp'} state={{
        page: type === 'C'?'CEDT':'PEDT',
        profid,
        name: 'Time tables',
        chef
    }} >
        <div className='py-1 cursor-pointer pl-2 bg-separator rounded-md text-base font-semibold flex items-center gap-2 forma'>
            <IoMdPerson/>
            {nom}
        </div>
    </NavLink>
  )
}

export default Prof