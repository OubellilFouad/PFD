import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi'
import { useChef } from '../context/ChefContext';
const getOneDeps = 'https://pfeboumerdes.pythonanywhere.com/dep/';

const ChambreCard = ({nom,depid,capacite,type,chambreid}) => {
  const {deleteChambre} = useChef();
  const [dep,setDep] = useState('');
  const getOneDep = async () => {
    const response = await axios.get(`${getOneDeps}${depid}`);
    const result = await response.data;
    setDep(result);
  }
  useEffect(() => {
    getOneDep();
  },[])
  return (
    <div className='bg-separator flex flex-col rounded-xl pt-6 px-6 h-40 gap-4'>
        <div className='flex justify-between items-center'>
          <p className='text-2xl font-bold' >{nom}</p>
          <AiFillDelete onClick={() => deleteChambre(chambreid)} className='text-lg cursor-pointer hover:text-red'/>
        </div>
        <span className='text-base font-bold'>{dep?.nom}</span>
        <span className='text-base font-bold'>{type} / {capacite} places</span>
    </div>
  )
}

export default ChambreCard