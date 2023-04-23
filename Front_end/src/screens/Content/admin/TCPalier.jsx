import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useAdmin } from './context/AdminContext'
import TCPalierCard from './components/TCPalCard'
import TCPalForm from './components/TCPalForm'
const getPalier = 'https://pfeboumerdes.pythonanywhere.com/palierstc/';

const TCPaliers = () => {
  const {tcPal} = useAdmin();
  const location = useLocation()  
  const [speid,setSpeid] = useState(location.state.ftcid);
  const [paliers,setPaliers] = useState([]);
  useEffect(() => {
    console.log(location.state.ftcid);
    setSpeid(location.state.ftcid);
    getSpePalier();
  },[tcPal]) 
  const getSpePalier = async () => {
    const {data} = await axios.get(`${getPalier}${speid}`);
    console.log(data)
    setPaliers(data);
  }
  return (
    <>
        <div className='flex flex-col gap-8'>
            <p className='text-2xl font-bold'>List des Palier</p>
            <div className='grid grid-cols-3 gap-14'>
                {paliers.map((pal) => {
                    const {palid,speid,nom} = pal;
                    return(
                        <TCPalierCard key={palid} palid={palid} nom={nom} speid={speid} />
                    )
                })}
            </div>
        </div>
        <TCPalForm speid={speid} obj={paliers} />
    </>
  )
}

export default TCPaliers