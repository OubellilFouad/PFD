import React from 'react'

const GroupCard = ({nom,speid,secid,capacite,grpid}) => {
  return (
    <div className='rounded-xl bg-separator h-20 p-4 gap-3'>
        <p className='text-base font-bold'>{nom}</p>
        <span className='text-xs font-bold'>{capacite} students</span>
    </div>
  )
}

export default GroupCard