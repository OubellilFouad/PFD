import React, { useRef, useState } from 'react'
import { MdClose } from 'react-icons/md';
import Drop from '../../../Auth/components/Drop';
import Input from '../../../Auth/components/Input';
import { useAuth } from '../../../../../context/AuthContext';
import { useAdmin } from '../../admin/context/AdminContext';
import { useChef } from '../context/ChefContext';
import Select from './Select';

const ProfForm = () => {
  const {user,setShow,setAddMessage,setColor} = useAuth();  
  const {openProf,setOpenProf,addProf} = useChef();
  const [userName,setUserName] = useState('');
  const [email,setEmail] = useState('');
  const [matricule,setMatricule] = useState('');
  const [date,setDate] = useState('');
  const [grad,setGrad] = useState('');
  const [error,setError] = useState('');
  const [type,setType] = useState('');
  const form = useRef();
  const typeArr = ['Permanant','Vaccatair']
  const handleAdd = () => {
    const userID = matricule;
    const role = 3;
    const dateNaiss = date;
    const depID = user?.depID;
    const formData = {
      userName,
      email,
      userID,
      dateNaiss,
      role, 
      grad,
      depID,
      type
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
    if(grad === ''){
      setError('Grad field must not be empty');
      return;
    }
    addProf(formData);
    setError('');
    setDate('');
    setEmail('');
    setGrad('');
    setMatricule('');
    setUserName('');
    setOpenProf(false);
    setShow(true);
    setAddMessage('Added prof successfuly');
    setColor(true);
    form.current.reset();
  }  
  return (
    <div className={`w-full h-full absolute z-30 bg-[rgba(0,0,0,0.5)] top-0 left-0 ${openProf?'flex':'hidden'} justify-center items-center`}>
        <div className='h-[95%] aspect-[9/10] bg-white justify-between rounded-xl flex flex-col'>
          <div className='flex-1 flex justify-between px-3 items-center'>
            <p className='text-base py-4 font-bold'>Add Prof</p>
            <MdClose onClick={() => setOpenProf(false)} className='text-2xl cursor-pointer'/>
          </div>
          <form ref={form} className='flex-[8] px-10 py-4 gap-6 flex flex-col'>
            <Input name={'Full name'} type={'text'} setData={setUserName} />
            <Input name={'Email'} type={'email'} setData={setEmail} />
            <Input name={'Matricule'} type={'text'} setData={setMatricule} />
            <Input name={'Date naissance'} type={'date'} setData={setDate} />
            <div className='flex gap-3'>
              <div className='flex flex-col w-full'>
                <label htmlFor='grad' className='text-paleMain text-base font-medium cursor-pointer'>Grad</label>
                <select onChange={(e) => setGrad(e.target.value)} name="dropDown" id='grad' className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none' placeholder='Domains'>
                    <option className='bg-separator hover:bg-black text-black' unselectable='on'>Grad</option>
                    <option value="MAA" className='bg-separator hover:bg-black text-black'>Maitre assistant A</option>
                    <option value="MAB" className='bg-separator hover:bg-black text-black'>Maitre assistant B</option>
                    <option value="MCA" className='bg-separator hover:bg-black text-black'>Maitre Conference A</option>
                    <option value="MCB" className='bg-separator hover:bg-black text-black'>Maitre Conference B</option>
                </select>
              </div>
            </div>
            <Select name={'Type'} array={typeArr} setData={setType} />
          </form>
          <div className='flex-1 flex justify-between items-center px-3 pb-3'>
            <p className='text-red'> {error} </p>
            <button onClick={handleAdd} className='py-2 px-5 rounded-lg text-white bg-main'>Ajouter</button>
          </div>
        </div>
    </div>
  )
}

export default ProfForm