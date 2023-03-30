import React, { useState } from 'react'
import { MdClose } from 'react-icons/md';
import Input from '../../../Auth/components/Input';
import { useAdmin } from '../context/AdminContext';

const ChefForm = ({depID,getOneChef}) => {
  const {openChef,setOpenChef, addChef} = useAdmin();
  const [userName,setUserName] = useState('');
  const [email,setEmail] = useState('');
  const [matricule,setMatricule] = useState('');
  const [date,setDate] = useState('');
  const [error,setError] = useState('');
  const handleAdd = () => {
    const userID = matricule;
    const role = 1;
    const dateNaiss = date;
    const formData = {
      userName,
      email,
      userID,
      dateNaiss,
      role, 
      depID
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
    addChef(formData);
    getOneChef(depID);
    setOpenChef(false);
  }  
  return (
    <div className={`w-full h-full absolute z-30 bg-[rgba(0,0,0,0.5)] top-0 left-0 ${openChef?'flex':'hidden'} justify-center items-center`}>
        <div className='h-[80%] aspect-[9/10] bg-white justify-between rounded-xl flex flex-col'>
          <div className='flex-1 flex justify-between px-3 items-center'>
            <p className='text-base py-4 font-bold'>Add Chef</p>
            <MdClose onClick={() => setOpenChef(false)} className='text-2xl cursor-pointer'/>
          </div>
          <div className='flex-[8] px-10 py-4 gap-6 flex flex-col'>
            <Input name={'Full name'} type={'text'}  data={userName} setData={setUserName} />
            <Input name={'Email'} type={'email'}  data={email} setData={setEmail} />
            <Input name={'Matricule'} type={'text'}  data={matricule} setData={setMatricule} />
            <Input name={'Date naissance'} type={'date'}  data={date} setData={setDate} />
          </div>
          <div className='flex-1 flex justify-between items-center px-3 pb-3'>
            <p className='text-red'> {error} </p>
            <button onClick={handleAdd} className='py-2 px-5 rounded-lg text-white bg-main'>Enter</button>
          </div>
        </div>
    </div>
  )
}

export default ChefForm