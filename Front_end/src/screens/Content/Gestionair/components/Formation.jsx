import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiFillCaretRight } from 'react-icons/ai';
import Palier from './Palier';
const getPals = 'https://pfeboumerdes.pythonanywhere.com/paliers/';
const getTcPals = 'https://pfeboumerdes.pythonanywhere.com/palierstc/';

const Formation = ({nom,speid,type}) => {
  const [open,setOpen] = useState(false); 
  const [pals,setPals] = useState([]); 
  const [palstc,setPalstc] = useState([]); 
  const getpal = async () => {
    const {data} = await axios.get(`${getPals}${speid}`);
    setPals(data);
  }
  const getTcpal = async () => {
    const {data} = await axios.get(`${getTcPals}${speid}`);
    setPalstc(data);
  }
  useEffect(() => {
    if(type === 'tc'){
      getTcpal();
    }else{
      getpal();
    }
  },[])
  return (
    <>
        <div className='py-1 pl-2 bg-separator rounded-md text-base font-semibold flex items-center gap-2 forma'>
            <AiFillCaretRight onClick={() => setOpen(!open)} className={`text-sm cursor-pointer transition-[rotate_150ms] ${open?'rotate-90':'rotate-0'}`}/>
            {nom}
        </div>
        {type !== 'tc' && (
          <div className={`flex-col pl-2 transition-[height_250ms] gap-3 ${open?'flex':'hidden'} pal`}>
            {pals.map((pal) => {
                const {nom,palid,annee} = pal;
                return(
                    <Palier key={palid} nom={nom} annee={annee} palid={palid} />
                )
            })}
          </div>
        )}
        {type === 'tc' && (
          <div className={`flex-col pl-2 transition-[height_250ms] gap-3 ${open?'flex':'hidden'} pal`}>
            {palstc.map((pal) => {
                const {nom,palid,annee} = pal;
                return(
                    <Palier key={palid} nom={nom} type={type} annee={annee} palid={palid} />
                )
            })}
          </div>
        )}
    </>
  )
}

export default Formation