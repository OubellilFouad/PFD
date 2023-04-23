import React from 'react'
import { useChef } from '../context/ChefContext'
import { AiFillDelete } from 'react-icons/ai';
import { useAdmin } from '../../admin/context/AdminContext';
import { useAuth } from '../../../../../context/AuthContext';

const GroupCard = ({nom,type,capacite,grpid}) => {
  const {user} = useAuth();
  const {deleteGroup} = useChef();
  const {deleteGroup:deleteTcGroup} = useAdmin();
  const handleDelete = () => {
    if(type === 'commun'){
      deleteTcGroup(grpid);
    }else{
      deleteGroup(grpid)
    }
  }
  return (
    <div className='rounded-xl bg-separator h-20 p-4 gap-3'>
        <div className='flex justify-between items-center'>
          <p className='text-base font-bold'>{nom}</p>
          {user?.role === 0 && (<AiFillDelete onClick={() => handleDelete()} className='text-lg cursor-pointer hover:text-red'/>)}
        </div>
        <span className='text-xs font-bold'>{capacite} students</span>
    </div>
  )
}

export default GroupCard