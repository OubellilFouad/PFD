import React from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import { useAdmin } from '../context/AdminContext'

const Dep = ({nom,domainid,depid}) => {
  const {deleteDep,gestdepsgestdeps} = useAdmin();
  const handleDelete = () => {
    deleteDep(depid);
    deleteAllGestDeps(depid);
  }
  return (
    <div className='flex items-center justify-between bg-palerMain px-3 py-1 rounded-lg relative'>
        <div className='flex gap-3 items-center'>
            <span className='text-main text-3xl'>•</span>
            <p className='text-xs font-bold'>{nom}</p>
        </div>
        <AiFillDelete onClick={handleDelete} className='text-base text-red cursor-pointer'/>
    </div>
  )
}

export default Dep