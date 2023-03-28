import React from 'react'
import { useChef } from '../context/ChefContext';
const annee = [1,2,3,4,5];

const FillSelect = ({name,setData}) => {
  const {fils} = useChef();  
  return (
    <div className='flex flex-col w-full'>
        <label htmlFor={name} className='text-paleMain text-base font-medium cursor-pointer'>{name}</label>
        <select onChange={(e) => setData(e.target.value)} name="dropDown" id={name} className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none' placeholder='Domains'>
            <option value="First" className='bg-separator hover:bg-black text-black' unselectable='Domains'>Filliérs</option>
            {fils.map((fil) => {
                const {nom,fillid} = fil;
                return(
                    <option key={fillid} value={fillid} className='bg-separator hover:bg-black text-black' >{nom}</option>
                )
            })}
        </select>
    </div>
  )
}

export default FillSelect