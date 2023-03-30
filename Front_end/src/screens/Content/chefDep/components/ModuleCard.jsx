import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi'
const getOneSpes = 'https://pfeboumerdes.pythonanywhere.com/specialite/';

const ModuleCard = ({nom,speid,fillid}) => {
  const [spe,setSpe] = useState({});
  const getOneSpe = async (id) => {
    const response = await axios.get(`${getOneSpes}${id}`);
    const result = await response.data;
    setSpe(result);
  }
  useEffect(() => {
    getOneSpe(speid);
    console.log(spe)
  },[])
  return (
    <div className='bg-separator flex flex-col rounded-xl pt-6 px-6 h-32 gap-4'>
        <div className='flex justify-between items-center'>
          <p className='text-2xl font-bold' >{nom}</p>
          <HiOutlineDotsCircleHorizontal className='text-2xl cursor-pointer hover:text-main'/>
        </div>
        <span>{spe.nom}</span>
    </div>
  )
}

export default ModuleCard