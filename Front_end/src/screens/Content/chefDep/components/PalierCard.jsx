import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
const getOneSpe = 'https://pfeboumerdes.pythonanywhere.com/specialite/';
const getOneTcSpe = 'https://pfeboumerdes.pythonanywhere.com/formationtc/';
const PalierCard = ({nom,speid,type}) => {
  const [spe,setSpe] = useState({});
  const getSpe = async () => {
    const {data} = await axios.get(`${getOneSpe}${speid}`);
    setSpe(data);
  }
  const getTcSpe = async () => {
    const {data} = await axios.get(`${getOneTcSpe}${speid}`);
    setSpe(data);
  }
  useEffect(() => {
    if(type === 'commun'){
      getTcSpe();
    }else{
      getSpe();
    }
  },[])
  return (
    <div className='card relative rounded-lg'>
        <div className='bg-separator rounded-lg p-5 flex flex-col justify-between items-end border relative z-10'>
            <div className='flex flex-col gap-2 w-full'>
                <p className='text-xl font-bold'>{nom}</p>
                <span className='text-sm font-semibold'>{spe.nom}</span>
            </div>
        </div>
    </div>
  )
}

export default PalierCard