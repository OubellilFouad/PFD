import React, { useState } from 'react'
import { MdClose } from 'react-icons/md';
import Drop from '../../../Auth/components/Drop';
import Input from '../../../Auth/components/Input';
import { useAdmin } from '../context/AdminContext';
import { useAuth } from '../../../../../context/AuthContext';

const GestForm = () => {
  const {openGest,setOpenGest, addGestionair} = useAdmin();
  const {setShow,setAddMessage,setColor} = useAuth();
  const [userName,setUserName] = useState('');
  const [email,setEmail] = useState('');
  const [matricule,setMatricule] = useState('');
  const [date,setDate] = useState('');
  const [type,setType] = useState('');
  const [error,setError] = useState('');
  const handleAdd = () => {
    const userID = matricule;
    const role = 2;
    const dateNaiss = date;
    const formData = {
      userName,
      email,
      userID,
      dateNaiss,
      role, 
      type,
    }
    if(userName === ''){
      setError('Name field must not be empty');
      return;
    }
    if(email === ''){
      setError('Email field must not be empty');
      return;
    }
    if(userID === ''){
      setError('UserID field must not be empty');
      return;
    }
    if(dateNaiss === ''){
      setError('Date field must not be empty');
      return;
    }
    if(role === ''){
      setError('Role field must not be empty');
      return;
    }
    if(type === ''){
      setError('type field must not be empty');
      return;
    }
    addGestionair(formData);
    setError('');
    setOpenGest(false);
    setShow(true);
    setAddMessage('Added gestionair successfuly');
    setColor(true);
  }  
  return (
    <div className={`w-full h-full absolute z-30 bg-[rgba(0,0,0,0.5)] top-0 left-0 ${openGest?'flex':'hidden'} justify-center items-center`}>
        <div className='h-[90%] aspect-[9/10] bg-white justify-between rounded-xl flex flex-col'>
          <div className='flex-1 flex justify-between px-3 items-center'>
            <p className='text-base py-4 font-bold'>Add Gestionair</p>
            <MdClose onClick={() => setOpenGest(false)} className='text-2xl cursor-pointer'/>
          </div>
          <div className='flex-[8] px-10 py-4 gap-6 flex flex-col'>
            <Input name={'Full name'} type={'text'}  data={userName} setData={setUserName} />
            <Input name={'Email'} type={'email'}  data={email} setData={setEmail} />
            <Input name={'Matricule'} type={'text'}  data={matricule} setData={setMatricule} />
            <Input name={'Date naissance'} type={'date'}  data={date} setData={setDate} />
            <div className='flex gap-3'>
              <div className='flex flex-col w-full'>
                <label htmlFor='type' className='text-paleMain text-base font-medium cursor-pointer'>Type</label>
                <select onChange={(e) => setType(e.target.value)} name="dropDown" id='type' className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none' placeholder='Domains'>
                    <option className='bg-separator hover:bg-black text-black' unselectable='on'>Type</option>
                    <option value="Department" className='bg-separator hover:bg-black text-black'>Departement</option>
                    <option value="Tranc Commun" className='bg-separator hover:bg-black text-black'>tranc commun</option>
                </select>
              </div>
            </div>
          </div>
          <div className='flex-1 flex justify-between items-center px-3 pb-3'>
            <p className='text-red'> {error} </p>
            <button onClick={handleAdd} className='py-2 px-5 rounded-lg text-white bg-main'>Add</button>
          </div>
        </div>
    </div>
  )
}

export default GestForm