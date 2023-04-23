import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { useAdmin } from '../context/AdminContext';
const getDep = 'https://pfeboumerdes.pythonanywhere.com/dep/';

const GestDepCard = ({depid,type,id}) => {
  const {deleteGestDeps} = useAdmin();  
  const [dep,setDep] = useState({});  
  const getSpeDep = async () => {
    const {data} = await axios.get(`${getDep}${depid}`);
    console.log(data)
    setDep(data);
  }
  useEffect(() => {
    getSpeDep();
  },[])
  return (
    <div className='bg-separator rounded-lg p-4 h-20 flex flex-col justify-between items-end relative z-10'>
        <div className='flex flex-col gap-1 w-full'>
            <div className='flex justify-between items-center'>
                <span className='text-sm font-semibold'>{type}</span>
                {type === 'Department' && (<AiFillDelete onClick={() => deleteGestDeps(id)} className='text-base cursor-pointer hover:text-red'/>)}
            </div>
            <p className='text-lg font-bold'>
                {type === 'Department' && dep?.nom}
                {type === 'Tranc Commun' && 'Tranc Commun'}
            </p>
        </div>
    </div>
  )
}

export default GestDepCard