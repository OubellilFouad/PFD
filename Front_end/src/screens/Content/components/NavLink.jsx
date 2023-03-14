import React from 'react'
import { NavLink } from 'react-router-dom'

const Link = ({path,name,icon}) => {
  return (
    <NavLink state={{
      name: name
    }} to={path} end className={({ isActive }) => isActive?'flex items-center gap-2 text-main hover:text-main cursor-pointer':'flex items-center gap-2 text-[#787486] hover:text-main cursor-pointer'}>
        <span className='text-xl'>
            {icon}
        </span>
        <p className='text-base font-medium'>{name}</p>
    </NavLink>
  )
}

export default Link