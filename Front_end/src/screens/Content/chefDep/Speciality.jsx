import React, { useEffect, useState } from 'react'
import SpeCard from './components/SpeCard'
import { useChef } from './context/ChefContext'
import axios from 'axios';
import { useAuth } from '../../../../context/AuthContext';
const getSpes = 'https://pfeboumerdes.pythonanywhere.com/specialites/';
const getTcspes = 'https://pfeboumerdes.pythonanywhere.com/formationstc/'

const Speciality = () => {
  const {spes} = useChef();
  const {user} = useAuth();
  const [spe,setSpe] = useState([]);
  const [tcspe,setTcspe] = useState([]);
  const getSpeSpes = async () => {
    const {data} = await axios.get(`${getSpes}${user?.depID}`);
    setSpe(data);
  }
  const getTcspe = async () => {
    const {data} = await axios.get(`${getTcspes}${user?.depID}`);
    setTcspe(data);
  }
  useEffect(() => {
    getSpeSpes();
    getTcspe();
  },[spes])
  return (
    <div className='grid grid-cols-3 pb-4 gap-14 overflow-x-scroll'>
        {spe.map((spe) => {
          const {nom,fillid,speid,annee} = spe;
          return(
            <SpeCard key={speid} nom={nom} fillid={fillid} speid={speid} annee={annee} />
          )
        })}
        {tcspe.map((spe) => {
          const {nom,ftcid,annee} = spe;
          return(
            <SpeCard key={ftcid} nom={nom} speid={ftcid} type='commun' annee={annee} />
          )
        })}
    </div>
  )
}

export default Speciality