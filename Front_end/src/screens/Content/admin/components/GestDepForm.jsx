import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import Drop from '../../../Auth/components/Drop'
import { useAdmin } from '../context/AdminContext'
import { useAuth } from '../../../../../context/AuthContext'
import DepSelect from './DepSelect'
const GestDepForm = ({setOpenGestDep,openDepGest,gestid}) => {
  const {addGestDeps} = useAdmin();  
  const {setShow,setAddMessage,setColor} = useAuth();
  const [depid,setDepid] = useState(null);
  const handleSubmit = () => {
    const formData = {
        depid: parseInt(depid),
        gestid: parseInt(gestid)
    }
    if(depid === '' || depid === null){
        setShow(true);
        setAddMessage('Select a department first');
        setColor(false);
    }else{
        addGestDeps(formData);
        setOpenGestDep(false);
        setShow(true);
        setAddMessage('Added dep for gestionair successfully');
        setColor(true)
    }
  }
  return (
    <div className={`w-full h-full absolute z-30 bg-[rgba(0,0,0,0.5)] top-0 left-0 ${openDepGest?'flex':'hidden'} justify-center items-center`}>
        <div className='h-[35%] aspect-[12/9] bg-white rounded-xl flex flex-col relative justify-between'>
          <div className='flex-1 flex justify-between px-3 py-2 items-center'>
            <p className='text-base font-bold'>Add departement</p>
            <MdClose onClick={() => setOpenGestDep(false)} className='text-2xl cursor-pointer'/>
          </div>
          <div className='flex-[8] flex flex-col items-center px-10 py-8 gap-10'>
            <DepSelect name={'Departments'} setData={setDepid}/>
          </div>
          <div className='flex-1 flex justify-end items-center px-3 pb-3'>
            <button onClick={() => handleSubmit()} className='py-2 px-5 rounded-lg text-white bg-main'>Enter</button>
          </div>
        </div>
    </div>
  )
}

export default GestDepForm