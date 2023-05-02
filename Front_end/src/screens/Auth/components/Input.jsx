import React, { useEffect, useRef } from 'react'

const Input = ({name,type,setData,err}) => {
  const input = useRef();  
  useEffect(() => {
    input.current.value = '';
  },[])
  return (
    <div className='flex flex-col w-full relative'>
        <label htmlFor={name} className='text-paleMain text-base font-medium cursor-pointer'>{name}</label>
        <input ref={input} onChange={(e) => setData(e.target.value)} type={type} id={name} className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none'/>
        <p className='absolute -bottom-6 text-red'>{err}</p>
    </div>
  )
}

export default Input