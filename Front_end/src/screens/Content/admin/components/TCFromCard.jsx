import React from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext'

const TCFromCard = ({nom,fillid,cycle,dep1,dep2,dep3,ftcid}) => {
  const {deleteFormation,deleteAllTcPaliers} = useAdmin();
  return (
    <div className='aspect-[163/104 card relative rounded-lg'>
        <div className='bg-separator rounded-lg p-5 flex flex-col justify-between items-end border relative z-10'>
            <div className='flex flex-col gap-2 h-24 w-full'>
                <div className='flex justify-between items-center'>
                  <p className='text-xl font-bold'>{nom}</p>
                  <AiFillDelete onClick={() => {
                    deleteFormation(ftcid);
                    deleteAllTcPaliers(ftcid);
                  }} className='text-lg cursor-pointer hover:text-red'/>
                </div>
                <span className='text-sm font-semibold'>{cycle}</span>
            </div>
            <NavLink to={'../tcpal'} end state={{
              ftcid,
              page: 'TCPal',
              name: 'Les Paliers'
            }}>
              <button className='py-2 px-5 rounded-lg text-white bg-main'>Enter</button>
            </NavLink>
        </div>
    </div>
  )
}

export default TCFromCard