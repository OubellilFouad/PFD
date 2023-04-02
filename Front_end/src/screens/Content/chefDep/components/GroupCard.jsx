import React from 'react'
import { useChef } from '../context/ChefContext'
import { AiFillDelete } from 'react-icons/ai';

const GroupCard = ({nom,speid,secid,capacite,grpid}) => {
  const {deleteGroup} = useChef();
  return (
    <div className='rounded-xl bg-separator h-20 p-4 gap-3'>
        <div className='flex justify-between items-center'>
          <p className='text-base font-bold'>{nom}</p>
          <AiFillDelete onClick={() => deleteGroup(grpid)} className='text-lg cursor-pointer hover:text-red'/>
        </div>
        <span className='text-xs font-bold'>{capacite} students</span>
    </div>
  )
}

export default GroupCard