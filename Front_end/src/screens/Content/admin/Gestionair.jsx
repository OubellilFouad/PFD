import React, { useEffect } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import {MdEdit, MdSchool} from 'react-icons/md'
import GestionairCard from './components/GestionairCard'
import { useAdmin } from './context/AdminContext'

const Gestionair = () => {
  const {openGest,setOpenGest, gestionairs} = useAdmin();
  return (
    <div className='flex flex-col gap-6 overflow-x-scroll pb-4'>
       {gestionairs.map((gestionair) => {
        const {userName,email,domain,type,userID,id} = gestionair;
        return(
          <GestionairCard key={userID} userName={userName} id={id} email={email} domain={domain} userID={userID} type={type} />
        )
       })}
        <div className='flex justify-between'>
            <div onClick={() => setOpenGest(true)} className='px-4 py-5 border-[#DADADA] flex-[40%] flex justify-center items-center border gap-4 rounded-lg cursor-pointer hover:text-main'>
                <AiOutlinePlus className='text-xl'/>
                Add Member
            </div>
            <div className='flex-1 flex justify-end items-center'>
                
            </div>
        </div>
    </div>
  )
}

export default Gestionair