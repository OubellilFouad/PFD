import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi'
import { useChef } from '../context/ChefContext';
import { useGest } from '../../Gestionair/context/GestContext';
const getOneDeps = 'https://pfeboumerdes.pythonanywhere.com/dep/';

const ChambreCard = ({nom,depid,capacite,type,chambreid}) => {
  const {deleteChambre} = useChef();
  const {deleteAllPlaceEdt} = useGest();
  return (
    <div className='bg-separator flex flex-col rounded-xl py-6 px-6 gap-4'>
        <div className='flex justify-between items-center'>
          <p className='text-2xl font-bold' >{nom}</p>
          <AiFillDelete onClick={() => {
            deleteChambre(chambreid);
            deleteAllPlaceEdt(chambreid);
          }} className='text-lg cursor-pointer hover:text-red'/>
        </div>
        <span className='text-base font-bold'>{type} / {capacite} places</span>
    </div>
  )
}

export default ChambreCard