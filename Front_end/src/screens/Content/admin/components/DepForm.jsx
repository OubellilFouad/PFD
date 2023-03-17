import React from 'react'
import { MdClose } from 'react-icons/md'

const DepForm = ({open,setOpen}) => {
  const handleAdd = () => {
      setOpen(false);
  }  
  return (
    <div className={`w-full h-full absolute z-30 bg-[rgba(0,0,0,0.5)] top-0 left-0 ${open?'flex':'hidden'} justify-center items-center`}>
        <div className='h-[70%] aspect-[9/9] bg-white rounded-xl flex flex-col'>
          <div className='flex-1 flex justify-between px-3 items-center border-b'>
            <p className='text-base font-bold'>Add departement</p>
            <MdClose onClick={() => setOpen(false)} className='text-2xl cursor-pointer'/>
          </div>
          <div className='flex-[8] p-3'>main</div>
          <div className='flex-1 flex justify-end items-center px-3 pb-3'>
            <button onClick={handleAdd} className='py-2 px-5 rounded-lg text-white bg-main'>Enter</button>
          </div>
        </div>
    </div>
  )
}

export default DepForm