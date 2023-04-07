import React, { useEffect, useState } from 'react'
import ChambreCard from './components/ChambreCard'
import { useChef } from './context/ChefContext'
import { useAuth } from '../../../../context/AuthContext';
import axios from 'axios';
const getChambres = 'https://pfeboumerdes.pythonanywhere.com/chambres/';

const Chambres = () => {
  const {chambre} = useChef();
  const {user} = useAuth();
  const [chambres,setChambres] = useState([]);
  const getSpeChambre = async () => {
    const {data} = await axios.get(`${getChambres}${user?.depID}`);
    setChambres(data);
  }
  useEffect(() => {
    getSpeChambre();
  },[chambre])
  return (
    <div className='flex flex-col gap-8'>
        <p className='text-2xl font-bold'>List des Chambres</p>
        <div className='grid grid-cols-3 gap-14'>
            {chambres.map((cham) => {
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