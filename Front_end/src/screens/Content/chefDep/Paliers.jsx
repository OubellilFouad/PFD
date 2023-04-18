import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PalierForm from './components/PalierForm'
import PalierCard from './components/PalierCard'
import axios from 'axios'
import { useChef } from './context/ChefContext'
const getPalier = 'https://pfeboumerdes.pythonanywhere.com/paliers/';

const Paliers = () => {
  const {palier} = useChef();  
  const location = useLocation()  
  const [speid,setSpeid] = useState(location.state.speid);
  const [paliers,setPaliers] = useState([]);
  const [array,setArray] = useState([])
  useEffect(() => {
    setSpeid(location.state.speid);
    getSpePalier();
  },[palier]) 
  const getSpePalier = async () => {
    const {data} = await axios.get(`${getPalier}${speid}`);
    setPaliers(data);
  }
  return (
    <>
        <div className='flex flex-col gap-8'>
            <p className='text-2xl font-bold'>List des Palier</p>
            <div className='grid grid-cols-3 gap-14'>
                {paliers.map((pal) => {
                    const {palid,speid,nom,annee} = pal;
                    return(
                        <PalierCard key={palid} nom={nom} speid={speid} palid={palid} annee={annee} />
                    )
                })}
            </div>
        </div>
        <PalierForm speid={speid} obj={paliers} />
    </>
  )
}

export default Paliers