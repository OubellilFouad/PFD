import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PalierForm from './components/PalierForm'
import PalierCard from './components/PalierCard'
import axios from 'axios'
import { useChef } from './context/ChefContext'
const getPalier = 'http://127.0.0.1:5000/paliers/';
const getTcPaliers = 'http://127.0.0.1:5000/palierstc/';

const Paliers = () => {
  const {palier} = useChef();  
  const location = useLocation()  
  const [speid,setSpeid] = useState(location.state.speid);
  const [paliers,setPaliers] = useState([]);
  const [tcpaliers,setTcPaliers] = useState([]);
  useEffect(() => {
    setSpeid(location.state.speid);
    if(location.state.type === 'commun'){
      getTcPalier();
    }else{
      getSpePalier();
    }
  },[palier]) 
  const getSpePalier = async () => {
    const {data} = await axios.get(`${getPalier}${speid}`);
    setPaliers(data);
  }
  const getTcPalier = async () => {
    const {data} = await axios.get(`${getTcPaliers}${speid}`);
    setTcPaliers(data)
  }
  return (
    <>
        <div className='flex flex-col gap-8'>
            <div className='grid grid-cols-3 gap-14'>
                {paliers.map((pal) => {
                    const {palid,speid,nom,annee} = pal;
                    return(
                        <PalierCard key={palid} nom={nom} speid={speid} palid={palid} annee={annee} />
                    )
                })}
                {tcpaliers.map((pal) => {
                    const {palid,speid,nom,annee} = pal;
                    return(
                        <PalierCard key={palid} type='commun' nom={nom} speid={speid} palid={palid} annee={annee} />
                    )
                })}
            </div>
        </div>
        <PalierForm speid={speid} obj={paliers} />
    </>
  )
}

export default Paliers