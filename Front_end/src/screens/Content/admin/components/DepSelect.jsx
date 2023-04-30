import React from 'react'
import { useAdmin } from '../context/AdminContext';

const DepSelect = ({name,setData,type}) => {
  const {deps} = useAdmin();  
  return (
    <div className={`flex flex-col ${type === 'full'?'w-full':'w-[31.2%]'}`}>
        <label htmlFor={name} className='text-paleMain text-base font-medium cursor-pointer'>{name}</label>
        <select onChange={(e) => setData(e.target.value)} name="dropDown" id={name} className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none' placeholder='Domains'>
            <option value="First" className='bg-separator hover:bg-black text-black' unselectable='Specialité'>Departments</option>
            {deps.map((dep) => {
                const {nom,depid} = dep;
                return(
                    <option key={depid} value={depid} className='bg-separator hover:bg-black text-black' >{nom}</option>
                )
            })}
        </select>
    </div>
  )
}

export default DepSelect