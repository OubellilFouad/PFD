import axios from 'axios';
import React, { useEffect, useState } from 'react'
const getOneModule = 'https://pfeboumerdes.pythonanywhere.com/module/';

const Choice = ({setModule,modules,module,type,setType}) => {
  const [speModule,setSpeModule] = useState({});
  useEffect(() => {
    if(module){
      getOne();
    }
  },[module])
  const getOne = async () => {
    const {data} = await axios.get(`${getOneModule}${module}`);
    console.log(data)
    setSpeModule(data);
  }
  const handleChange = (e) => {
    let arr = type;
    if(e.target.checked){
        arr.push(e.target.value);
        setType(arr);
    }else{
        let newArr = arr.filter((data) => {
            if(data !== e.target.value){
                return data;
            }
        })
        setType(newArr);
    }
  }
  return (
    <div className='flex justify-between items-center gap-8'>
      <div className='flex flex-col w-2/3'>
          <select onChange={(e) => setModule(parseInt(e.target.value))} name="dropDown" className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none' placeholder='Domains'>
              <option value="First" className='bg-separator hover:bg-black text-black' unselectable='on'>Les module</option>
              {Object.keys(speModule).length !== 0 && (<option key={speModule.modid} value={speModule.modid} selected> {speModule.nom} </option>)}
              {modules.map((modul) => {
                const {nom,modid} = modul;
                return(
                  <option key={modid} value={modid}> {nom} </option>
                )
              })}
          </select>
      </div>
      <div className='flex gap-6'>
        <div className='flex flex-col'>
          <label htmlFor="">Cours</label>
          <input onChange={(e)=>handleChange(e)} type="checkbox" className='accent-main h-4' name="choice" id="cours" value={'cours'} />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="">TP</label>
          <input onChange={(e)=>handleChange(e)} type="checkbox" className='accent-main h-4' name="choice" id="tp" value={'tp'} />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="">TD</label>
          <input onChange={(e)=>handleChange(e)} type="checkbox" className='accent-main h-4' name="choice" id="td" value={'td'} />
        </div>
      </div>
    </div>
  )
}

export default Choice