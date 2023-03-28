import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi'
import { useChef } from '../context/ChefContext';
const getOneSpes = 'https://pfeboumerdes.pythonanywhere.com/specialite/';

const ChambreCard = ({nom,depid,capacite,type,chambreid}) => {
  const {deleteChambre} = useChef();
  return (
    <div className='bg-separator flex flex-col rounded-xl pt-6 px-6 h-40 gap-4'>
        <div className='flex justify-between items-center'>
          <p className='text-2xl font-bold' >{nom}</p>
          <AiFillDelete onClick={() => deleteChambre(chambreid)} className='text-lg cursor-pointer text-red'/>
        </div>
        <span className='text-base font-bold'>Dep name</span>
        <span className='text-base font-bold'>{type} / {capacite} places</span>
    </div>
  )
}

export default ChambreCard