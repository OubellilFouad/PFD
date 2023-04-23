import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { useChef } from '../context/ChefContext';
const getSec = 'https://pfeboumerdes.pythonanywhere.com/section/';
const getGrp = 'https://pfeboumerdes.pythonanywhere.com/groupe/';
const ChargeCard = ({group,section,afectid,type}) => {
  const {deleteAffect} = useChef();
  const [sec,setSec] = useState({});
  const [grp,setGrp] = useState({});
  const [typeArr,setTypeArr] = useState([]);
  const getSecs = async () => {
    const {data} = await axios.get(`${getSec}${section}`);
    setSec(data);
  }
  const getGrps = async () => {
    const {data} = await axios.get(`${getGrp}${group}`);
    setGrp(data);
  }
  useEffect(() => {
    getSecs();
    if(group){
      getGrps();
    }
    setTypeArr(JSON.parse(type));
  },[])
  return (
    <div className='rounded-xl bg-separator h-20 p-4 gap-3'>
        <div className='flex justify-between items-center'>
          <p className='text-base font-bold'>Name</p>
          <AiFillDelete onClick={() => deleteAffect(afectid)} className='text-lg cursor-pointer hover:text-red'/>
        </div>
        <span className='text-xs font-bold'>{sec?.nom}{group && `,${grp?.nom}`}</span> /
        <span className='text-xs font-bold'> 
          {typeArr.map(type => ` ${type}`)}
        </span>
    </div>
  )
}

export default ChargeCard