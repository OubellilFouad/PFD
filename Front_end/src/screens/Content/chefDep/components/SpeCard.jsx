import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
const getOneDomainUrl = 'https://pfeboumerdes.pythonanywhere.com/domain/';
const getOneFils = 'https://pfeboumerdes.pythonanywhere.com/filiere/';

const SpeCard = ({nom,fillid,speid,type}) => {
  const [fil,setFil] = useState({});
  useEffect(() => {
    if(type !== 'commun'){
      getOnefil(fillid);
    }
  },[])
  const getOnefil = async (id) => {
    const response = await axios.get(`${getOneFils}${id}`);
    const result = await response.data;
    setFil(result);
  }
  return (
    <div className='card relative rounded-lg'>
        <div className='bg-separator rounded-lg p-5 flex flex-col justify-between items-end border relative z-10'>
            <div className='flex flex-col gap-2 h-24 w-full'>
                <p className='text-xl font-bold'>{nom}</p>
                <span className='text-sm font-semibold'>{type === 'commun'?'Tranc commun':fil?.nom}</span>
            </div>
            <NavLink to={'../paliers'} end state={{
              name: 'Les paliers',
              page: 'paliers',
              spe: nom,
              speid,
              type
            }}>
              <button className='py-2 px-5 rounded-lg text-white bg-main'>Enter</button>
            </NavLink>
        </div>
    </div>
  )
}

export default SpeCard