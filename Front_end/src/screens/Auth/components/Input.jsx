import { info } from 'autoprefixer';
import React, { useEffect, useRef } from 'react'

const Input = ({name,type}) => {
  const input = useRef();  
  const handleMouseOut = () => {
    if(input.current.value !== ''){
        input.current.style.height = '30px';
    }else{
        input.current.style.height = '0px';
    }
  }
  const handleClick = () => {
    input.current.style.height = '30px'
  }
  return (
    <div className='flex flex-col'>
        <label htmlFor={name} className='text-paleMain text-base font-medium cursor-pointer'>{name}</label>
        <input ref={input} onClick={handleClick} onBlur={handleMouseOut} type={type} id={name} className='px-2 pb-2 h-1 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none'/>
    </div>
  )
}

export default Input