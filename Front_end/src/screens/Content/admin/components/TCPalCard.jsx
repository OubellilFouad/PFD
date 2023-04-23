import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { useAdmin } from '../context/AdminContext';
const getOneSpe = 'https://pfeboumerdes.pythonanywhere.com/formationtc/';
const TCPalierCard = ({nom,speid,palid}) => {
  const {deletePaliers} = useAdmin();
  const [spe,setSpe] = useState({});
  const getSpe = async () => {
    const {data} = await axios.get(`${getOneSpe}${speid}`);
    setSpe(data);
  }
  useEffect(() => {
    getSpe();
  },[])
  return (
    <div className='card relative rounded-lg'>
        <div className='bg-separator rounded-lg p-5 flex flex-col justify-between items-end border relative z-10'>
            <div className='flex flex-col gap-2 w-full'>
                <div className='flex justify-between items-center'>
                  <p className='text-xl font-bold'>{nom}</p>
                  <AiFillDelete onClick={() => deletePaliers(palid)} className='text-base cursor-pointer hover:text-red'/>
                </div>
                <span className='text-sm font-semibold'>{spe.nom}</span>
            </div>
        </div>
    </div>
  )
}

export default TCPalierCard