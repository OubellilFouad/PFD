import axios from 'axios';
import React, { useEffect, useState } from 'react'
const getOneModule = 'http://127.0.0.1:5000/module/';

const ChoixModuleCard = ({moduleID,type}) => {
  const [module,setModule] = useState({});
  const getModule = async () => {
    const {data} = await axios.get(`${getOneModule}${moduleID}`);
    setModule(data);
  }  
  useEffect(() => {
    getModule();
  },[])
  return (
    <div className='rounded-xl bg-separator h-20 p-4 gap-3'>
        <div className='flex items-center'>
          <p className='text-base font-bold'>{module.abbr}</p>
        </div>
        <span className='text-xs font-bold'>
            {type.map((t,i) => {
                return(
                    <span key={i}> {t} </span>
                )
            })}
        </span>
    </div>
  )
}

export default ChoixModuleCard