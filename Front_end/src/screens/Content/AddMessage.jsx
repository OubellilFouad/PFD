import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'

const AddMessage = () => {
  const {show,setShow,addMessage,color} = useAuth();
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [show]);
  return (
    <div className={`absolute bottom-6 py-3 z-30 px-10 text-white rounded-full ${color?'bg-green-400':'bg-rose-400'} flex scale-0 justify-center left-2/4 -translate-x-2/4 transition-[scale_100ms] ${show && 'scale-100'}`}>{addMessage}</div>
  )
}

export default AddMessage