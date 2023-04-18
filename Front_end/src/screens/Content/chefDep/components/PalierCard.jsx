import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
const getOneSpe = 'https://pfeboumerdes.pythonanywhere.com/specialite/';
const PalierCard = ({nom,speid,palid,annee}) => {
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
            <div className='flex flex-col gap-2 h-24 w-full'>
                <p className='text-xl font-bold'>{nom}</p>
                <span className='text-sm font-semibold'>{spe.nom}</span>
            </div>
            <NavLink to={'../charge'} end state={{
              name: 'Charge pedagogic',
              page: 'charge',
              speid,
              palid,
              annee
            }}>
              <button className='py-2 px-5 rounded-lg text-white bg-main'>Enter</button>
            </NavLink>
        </div>
    </div>
  )
}

export default PalierCard