import React, { useEffect, useState } from 'react'
import { useAdmin } from '../context/AdminContext'
import { BsFillCollectionFill } from 'react-icons/bs'
import { FiPlus } from 'react-icons/fi'
import GestDepForm from './GestDepForm'
import axios from 'axios'
import GestDepCard from './GestDepCard'
import { AiFillDelete } from 'react-icons/ai'
const getGest = 'https://pfeboumerdes.pythonanywhere.com/gestdeps/'

const GestionairCard = ({userName,type,userID,id}) => {
  const [openGestDep,setOpenGestDep] = useState(false);  
  const {gestDep,deleteGestionair,deleteAllGestDeps} = useAdmin();
  const [gests,setGests] = useState([]);
  const getSpeGestDep = async () => {
    const {data} = await axios.get(`${getGest}${userID}`);
    setGests(data);
  }
  useEffect(() => {
    getSpeGestDep();
  },[gestDep])
  return (
    <div className='flex justify-between flex-col border rounded-lg px-4 py-3 gap-2'>
        <div className='border-[#DADADA] flex-[40%] flex gap-4'>
            <div className='p-4 bg-[#F4F4F4] text-2xl rounded-lg text-black'>
                <BsFillCollectionFill/>
            </div>
            <div className='flex justify-between items-center w-full'>
                <div className='flex flex-col justify-between'>
                    <span className='text-sm text-[#828282]'>Gestionair</span>
                    <p className='text-2xl font-semibold'>{userName}</p>
                </div>
                <AiFillDelete onClick={() => {
                    deleteGestionair(id);
                    deleteAllGestDeps(userID);
                }} className='text-lg cursor-pointer hover:text-red'/>
            </div>
        </div>
        <p className='text-xl font-bold'>Departments to supervise</p>
        <div className='grid grid-cols-5 gap-3 items-center'>
            {gests.map((gest) => {
                const {depid,id,gestid} = gest;
                return(
                    <GestDepCard key={id} depid={depid} id={id} type={type}/>
                )
            })}
            {type === 'Tranc Commun' && (
                <GestDepCard type={type}/>
            )}
            {type === 'Department' && (
                <div onClick={() => setOpenGestDep(true)} className='rounded-xl group hover:border-main border-2 border-separator h-20 flex justify-center items-center cursor-pointer'>
                    <FiPlus className='text-2xl group-hover:text-main'/>
                </div>
            )}
        </div>
        <GestDepForm openDepGest={openGestDep} setOpenGestDep={setOpenGestDep} gestid={userID} />
    </div>
  )
}

export default GestionairCard