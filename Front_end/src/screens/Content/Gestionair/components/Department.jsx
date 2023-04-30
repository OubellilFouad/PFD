import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { AiFillCaretRight } from 'react-icons/ai'
import Formation from './Formation';
import Prof from './Prof';
const getOnedep = 'https://pfeboumerdes.pythonanywhere.com/dep/';
const getSpes = 'https://pfeboumerdes.pythonanywhere.com/specialites/';
const getTcSpes = 'https://pfeboumerdes.pythonanywhere.com/formationstc';
const getProfs = 'http://127.0.0.1:8000/api/chefdep/get-enseignantbydepid/';

const Department = ({depid,type}) => {
  const [open,setOpen] = useState(false)  
  const [oneDep,setOneDep] = useState({});
  const [spes,setSpes] = useState([]);
  const [spestc,setSpestc] = useState([]);
  const [profs,setProfs] = useState([]);
  const forma = useRef();
  const getOneDep = async () => {
    const {data} = await axios.get(`${getOnedep}${depid}`);
    setOneDep(data)
  }
  const getSpe = async () => {
    const {data} = await axios.get(`${getSpes}${oneDep.depid}`);
    setSpes(data);
  }
  const getProf = async () => {
    const {data} = await axios.get(`${getProfs}${oneDep.depid}`);
    setProfs(data);
  }
  const getSpeTc = async () => {
    const {data} = await axios.get(getTcSpes);
    setSpestc(data);
  }
  useEffect(() => {
    if(depid){
      getOneDep();
    }
    getSpeTc();
  },[])
  useEffect(() => {
    if(oneDep){
        getSpe();
        getProf();
    }
  },[oneDep])
  return (
    <>
        <div className='py-1 pl-2 bg-separator rounded-md text-base font-semibold flex items-center gap-2'>
            <AiFillCaretRight onClick={() => setOpen(!open)} className={`text-sm cursor-pointer transition-[rotate_150ms] ${open?'rotate-90':'rotate-0'}`}/>
            {type === 'tc'?'Tranc commun':oneDep?.nom}
        </div>
        {type !== 'prof' && type !== 'tc' && type !== 'profC' && (
          <div className={`flex-col pl-2 z-10 transition-[height_250ms] -mt-1 gap-3 ${open?'flex':'hidden'}`}>
            {spes.map((spe) => {
                const {nom,speid} = spe;
                return(
                    <Formation key={speid} nom={nom} speid={speid}/>
                )
            })}
          </div>
        )}
        {type === 'prof' && (
          <div className={`flex-col pl-2 z-10 transition-[height_250ms] -mt-1 gap-3 ${open?'flex':'hidden'}`}>
            {profs.map((prof) => {
                const {userName,userID} = prof;
                return(
                    <Prof nom={userName} profid={userID} />
                )
            })}
          </div>
        )}
        {type === 'profC' && (
          <div className={`flex-col pl-2 z-10 transition-[height_250ms] -mt-1 gap-3 ${open?'flex':'hidden'}`}>
            {profs.map((prof) => {
                const {userName,userID} = prof;
                return(
                    <Prof nom={userName} type='C' profid={userID} />
                )
            })}
          </div>
        )}
        {type === 'tc' && (
          <div className={`flex-col pl-2 z-10 transition-[height_250ms] -mt-1 gap-3 ${open?'flex':'hidden'}`}>
            {spestc.map((spe) => {
                const {nom,ftcid} = spe;
                return(
                    <Formation key={ftcid} type={type} nom={nom} speid={ftcid}/>
                )
            })}
          </div>
        )}
    </>
  )
}

export default Department