import React, { useEffect, useRef } from 'react'

const MiniInput = ({name,type,data,setData}) => {
  const input = useRef();  
  useEffect(() => {
    input.current.value = '';
  },[])
  return (
    <div className='flex w-[31.3%] flex-col'>
        <label htmlFor={name} className='text-paleMain text-base font-medium cursor-pointer'>{name}</label>
        <input ref={input} value={data} onChange={(e) => setData(e.target.value)} type={type} id={name} className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none'/>
    </div>
  )
}

export default MiniInput