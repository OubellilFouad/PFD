import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi'
import {AiFillDelete} from 'react-icons/ai'
import { useChef } from '../context/ChefContext';
const getOneSpes = 'https://pfeboumerdes.pythonanywhere.com/specialite/';

const ModuleCard = ({nom,speid,fillid,moduleid}) => {
  const [spe,setSpe] = useState({});
  const {deleteModule} = useChef();
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
          <AiFillDelete onClick={() => deleteModule(moduleid)} className='text-lg cursor-pointer hover:text-red'/>
        </div>
        <span>{spe.nom}</span>
    </div>
  )
}

export default ModuleCard