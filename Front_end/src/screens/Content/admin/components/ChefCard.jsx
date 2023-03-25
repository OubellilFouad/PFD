import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { MdEdit, MdSchool } from 'react-icons/md'
import { useAdmin } from '../context/AdminContext'

const ChefCard = ({userName,email,userID}) => {
  const {setOpenEdit,openEdit} = useAdmin();  
  return (
    <div className='flex justify-between'>
        <div className='px-4 py-5 border-[#DADADA] flex-[40%] flex border gap-4 rounded-lg'>
            <div className='p-4 bg-[#F4F4F4] text-2xl rounded-lg text-black'>
                <MdSchool/>
            </div>
            <div className='flex flex-col justify-between'>
                <span className='text-sm text-[#828282]'>Chef dep</span>
                <p className='text-2xl font-semibold'>{userName}</p>
            </div>
            <div className='flex items-end'>
                <span className='text-sm text-[#828282]'>{email}</span>
            </div>
        </div>
        <div className='flex-1 flex justify-end items-center'>
            <button onClick={() => setOpenEdit(true)} className='flex items-center text-base gap-2 py-2 px-4 border rounded-lg hover:text-main hover:border-main'>
                <MdEdit className='p-1 bg-palerMain text-main text-xl rounded-md'/>
                Edit chef
            </button>
        </div>
    </div>
  )
}

export default ChefCard