import React, { useState } from 'react'
import { MdClose } from 'react-icons/md';
import Input from '../../../Auth/components/Input';
import { useChef } from '../context/ChefContext'
import SpeSelect from './SpeSelect';
import { useAuth } from '../../../../../context/AuthContext';

const SectionForm = () => {
  const {openSec,setOpenSec,addSection} = useChef(); 
  const {user} = useAuth();
  const [nom,setNom] = useState(''); 
  const [capacite,setCapacite] = useState(0); 
  const [speid,setSpeid] = useState(0); 
  const handleAdd = () => {
    const depid = user?.depID;
    const formData = {
      nom,
      capacite,
      speid,
      depid
    }
    addSection(formData);
    setNom('');
    setCapacite(0);
    setSpeid(0);
    setOpenSec(false);
  }
  return (
    <div className={`w-full h-full absolute z-30 bg-[rgba(0,0,0,0.5)] top-0 left-0 ${openSec?'flex':'hidden'} justify-center items-center`}>
        <div className='h-[80%] aspect-[9/10] bg-white justify-between rounded-xl flex flex-col'>
          <div className='flex-1 flex justify-between px-3 items-center'>
            <p className='text-base py-4 font-bold'>Add Section</p>
            <MdClose onClick={() => setOpenSec(false)} className='text-2xl cursor-pointer'/>
          </div>
          <div className='flex-[8] px-10 py-4 gap-6 flex flex-col'>
            <Input name={'Nom'} type={'text'} setData={setNom} data={nom} />
            <Input name={'Capacité'} type={'number'} setData={setCapacite} data={capacite} />
            <SpeSelect name={'Spécialité'} setData={setSpeid} />
          </div>
          <div className='flex-1 flex justify-end items-center px-3 pb-3'>
            <button onClick={handleAdd} className='py-2 px-5 rounded-lg text-white bg-main'>Enter</button>
          </div>
        </div>
    </div>
  )
}

export default SectionForm