import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiFillCaretRight } from 'react-icons/ai'
import Section from './Section';
const getSecs = 'https://pfeboumerdes.pythonanywhere.com/sections/pal/';
const getTcSecs = 'https://pfeboumerdes.pythonanywhere.com/sectionstc/pal/';

const Palier = ({nom,palid,annee,type}) => {
  const [open,setOpen] = useState(false); 
  const [secs,setSecs] = useState([]);
  const [secstc,setSecstc] = useState([]);
  const getSec = async () => {
    const {data} = await axios.get(`${getSecs}${palid}`);
    setSecs(data);
  }
  const getTcSec = async () => {
    const {data} = await axios.get(`${getTcSecs}${palid}`);
    setSecstc(data);
  }
  useEffect(() => {
    if(type === 'tc'){
      getTcSec();
    }else{
      getSec();
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
            {secs.map((sec) => {
                const {nom,secid} = sec;
                return(
                    <Section key={secid} nom={nom} annee={annee} secid={secid}/>
                )
            })}
          </div>
        )}
        {type === 'tc' && (
          <div className={`flex-col pl-2 transition-[height_250ms] gap-3 ${open?'flex':'hidden'} pal`}>
            {secstc.map((sec) => {
                const {nom,secid} = sec;
                return(
                    <Section key={secid} nom={nom} type={type} annee={annee} secid={secid}/>
                )
            })}
          </div>
        )}
    </>
  )
}

export default Palier