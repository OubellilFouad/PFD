import React, { useEffect, useState } from 'react'
import SpeCard from './components/SpeCard'
import { useChef } from './context/ChefContext'
import axios from 'axios';
import { useAuth } from '../../../../context/AuthContext';
const getSpes = 'https://pfeboumerdes.pythonanywhere.com/specialites/';

const Speciality = () => {
  const {spes} = useChef();
  const {user} = useAuth();
  const [spe,setSpe] = useState([]);
  const getSpeSpes = async () => {
    const {data} = await axios.get(`${getSpes}${user?.depID}`);
    setSpe(data);
  }
  useEffect(() => {
    getSpeSpes();
  },[spes])
  return (
    <div className='flex flex-col gap-8 overflow-hidden'>
        <p className='text-2xl font-bold'>List des Formations</p>
        <div className='grid grid-cols-3 pb-4 gap-14 overflow-x-scroll'>
            {spe.map((spe) => {
              const {nom,fillid,speid,annee} = spe;
              return(
                <SpeCard key={speid} nom={nom} fillid={fillid} speid={speid} annee={annee} />
              )
            })}
        </div>
    </div>
  )
}

export default Speciality