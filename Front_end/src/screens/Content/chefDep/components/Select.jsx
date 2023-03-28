import React from 'react'
const annee = [1,2,3,4,5];

const Select = ({name,setData}) => {
  return (
    <div className='flex flex-col w-full'>
        <label htmlFor={name} className='text-paleMain text-base font-medium cursor-pointer'>{name}</label>
        <select onChange={(e) => setData(e.target.value)} name="dropDown" id={name} className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none' placeholder='Domains'>
            <option value="First" className='bg-separator hover:bg-black text-black' unselectable='Domains'>Annees</option>
            {annee.map((an,index) => {
                return(
                    <option key={index} value={an} className='bg-separator hover:bg-black text-black' >{an}</option>
                )
            })}
        </select>
    </div>
  )
}

export default Select