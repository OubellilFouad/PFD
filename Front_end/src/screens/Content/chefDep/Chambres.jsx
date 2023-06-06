import React, { useEffect, useState } from 'react'
import ChambreCard from './components/ChambreCard'
import { useChef } from './context/ChefContext'
import { useAuth } from '../../../../context/AuthContext';
import axios from 'axios';
const getChambres = 'http://127.0.0.1:5000/chambres/';

const Chambres = () => {
  const {chambre} = useChef();
  return (
    <div className='flex flex-col gap-8'>
        <div className='grid grid-cols-3 gap-14'>
            {chambre.map((cham) => {
              const {nom,depid,capacite,type,chambreid} = cham;
              return (
                <ChambreCard key={chambreid} chambreid={chambreid} nom={nom} depid={depid} capacite={capacite} type={type} />
              )
            })}
        </div>
    </div>
  )
}

export default Chambres