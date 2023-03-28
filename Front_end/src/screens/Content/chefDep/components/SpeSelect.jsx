import React from 'react'
import { useChef } from '../context/ChefContext';

const SpeSelect = ({name,setData}) => {
  const {spes} = useChef();  
  return (
    <div className='flex flex-col w-full'>
        <label htmlFor={name} className='text-paleMain text-base font-medium cursor-pointer'>{name}</label>
        <select onChange={(e) => setData(e.target.value)} name="dropDown" id={name} className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none' placeholder='Domains'>
            <option value="First" className='bg-separator hover:bg-black text-black' unselectable='Domains'>Spécialités</option>
            {spes.map((spe) => {
                const {nom,speid} = spe;
                return(
                    <option key={speid} value={speid} className='bg-separator hover:bg-black text-black' >{nom}</option>
                )
            })}
        </select>
    </div>
  )
}

export default SpeSelect