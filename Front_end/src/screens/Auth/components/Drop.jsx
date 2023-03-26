import React from 'react'
import { useAdmin } from '../../Content/admin/context/AdminContext'

const Drop = ({name,setData}) => {
  const {domains} = useAdmin();
  return (
    <div className='flex flex-col w-full'>
        <label htmlFor={name} className='text-paleMain text-base font-medium cursor-pointer'>{name}</label>
        <select onChange={(e) => setData(e.target.value)} name="dropDown" id={name} className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none' placeholder='Domains'>
            <option value="First" className='bg-separator hover:bg-black text-black' unselectable='Domains'>Domains</option>
            {domains?.map((domain) => {
              const {domainid,nom} = domain;
              return(
                <option key={domainid} value={domainid} className='bg-separator hover:bg-black text-black'>{nom}</option>
              )
            })}
        </select>
    </div>
  )
}

export default Drop