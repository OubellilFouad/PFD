import React, { useRef, useState } from 'react'
import { MdClose } from 'react-icons/md';
import { useAuth } from '../../../../../context/AuthContext';
import Input from '../../../Auth/components/Input';
import { useChef } from '../context/ChefContext'

const ChambreForm = () => {
  const {openSalle,setOpenSalle,addChambre} = useChef();  
  const {setShow,setAddMessage,setColor} = useAuth();
  const [nom,setNom] = useState('');
  const [capacite,setCapacite] = useState('');
  const [type,setType] = useState('');
  const form = useRef();
  const handleAdd = (e) => {
    e.preventDefault();
    const formData = {
      nom,
      capacite,
      type
    }
    addChambre(formData);
    setOpenSalle(false);
    setShow(true);
    setAddMessage('Added chambre successfuly');
    setColor(true);
    form.current.reset();
  }
  return (
    <div className={`w-full h-full absolute z-30 bg-[rgba(0,0,0,0.5)] top-0 left-0 ${openSalle?'flex':'hidden'} justify-center items-center`}>
        <div className='h-[80%] aspect-[9/10] bg-white justify-between rounded-xl flex flex-col'>
          <div className='flex-1 flex justify-between px-3 items-center'>
            <p className='text-base py-4 font-bold'>Add Chambre</p>
            <MdClose onClick={() => setOpenSalle(false)} className='text-2xl cursor-pointer'/>
          </div>
          <form ref={form} className='flex-[8] px-10 py-4 gap-6 flex flex-col'>
            <Input name={'Nom'} type={'text'} setData={setNom} />
            <Input name={'capacite'} type={'number'} setData={setCapacite} />
            <div className='flex flex-col w-full'>
              <label htmlFor='capacity' className='text-paleMain text-base font-medium cursor-pointer'>Type</label>
              <select onChange={(e) => setType(e.target.value)} name="dropDown" id='capacity' className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none' placeholder='Domains'>
                  <option value="First" className='bg-separator hover:bg-black text-black' unselectable='Domains'>Type</option>
                  <option value="Salle" className='bg-separator hover:bg-black text-black'>Salle</option>
                  <option value="Amphi" className='bg-separator hover:bg-black text-black'>Amphi</option>
              </select>
            </div>
          </form>
          <div className='flex-1 flex justify-end items-center px-3 pb-3'>
            <button onClick={(e) => handleAdd(e)} type='submit' className='py-2 px-5 rounded-lg text-white bg-main'>Enter</button>
          </div>
        </div>
    </div>
  )
}

export default ChambreForm