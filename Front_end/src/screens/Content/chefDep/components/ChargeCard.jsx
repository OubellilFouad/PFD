import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { useChef } from '../context/ChefContext';
import { useGest } from '../../Gestionair/context/GestContext';
const getSec = 'http://127.0.0.1:5000/section/';
const getTcSec = 'http://127.0.0.1:5000/sectiontc/';
const getGrp = 'http://127.0.0.1:5000/groupe/';
const getTcGrp = 'http://127.0.0.1:5000/groupetc/';
const getMod = 'http://127.0.0.1:5000/module/';
const getTcMod = 'http://127.0.0.1:5000/moduletc/';

const ChargeCard = ({group,section,afectid,type,module,tc}) => {
  const {deleteAffect} = useChef();
  const {deleteAllAffEdt} = useGest();
  const [sec,setSec] = useState({});
  const [grp,setGrp] = useState({});
  const [mod,setMod] = useState({});
  const [typeArr,setTypeArr] = useState([]);
  const getSecs = async () => {
    const {data} = await axios.get(`${getSec}${section}`);
    setSec(data);
  }
  const getTcSecs = async () => {
    const {data} = await axios.get(`${getTcSec}${section}`);
    setSec(data);
  }
  const getGrps = async () => {
    const {data} = await axios.get(`${getGrp}${group}`);
    setGrp(data);
  }
  const getTcGrps = async () => {
    const {data} = await axios.get(`${getTcGrp}${group}`);
    setGrp(data);
  }
  const getMods = async () => {
    const {data} = await axios.get(`${getMod}${module}`);
    setMod(data);
  }
  const getTcMods = async () => {
    const {data} = await axios.get(`${getTcMod}${module}`);
    setMod(data);
  }
  useEffect(() => {
    if(tc){
      getTcSecs();
      if(group){
        getTcGrps();
      }
      getTcMods();
    }else{
      getSecs();
      if(group){
        getGrps();
      }
      getMods();
    }
    setTypeArr(JSON.parse(type));
  },[])
  return (
    <div className='rounded-xl bg-separator h-20 p-4 gap-3'>
        <div className='flex justify-between items-center'>
          <p className='text-base font-bold'>{mod?.abbr}</p>
          <AiFillDelete onClick={() => {
            deleteAffect(afectid);
            deleteAllAffEdt(afectid);
          }} className='text-lg cursor-pointer hover:text-red'/>
        </div>
        <span className='text-xs font-bold'>{sec?.nom}{group && `,${grp?.nom}`}</span> /
        <span className='text-xs font-bold'> 
          {typeArr.map(type => ` ${type}`)}
        </span>
    </div>
  )
}

export default ChargeCard