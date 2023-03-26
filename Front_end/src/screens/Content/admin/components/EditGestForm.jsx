import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md';
import Drop from '../../../Auth/components/Drop';
import Input from '../../../Auth/components/Input';
import { useAdmin } from '../context/AdminContext';

const EditGestForm = ({id,openGestEdit,setOpenGestEdit}) => {
  const {modifyGestionair,deleteGestionair} = useAdmin();
  const [userName,setUserName] = useState('');
  const [email,setEmail] = useState('');
  const [matricule,setMatricule] = useState('');
  const [date,setDate] = useState('');
  const [domainState,setDomain] = useState('');
  const [type,setType] = useState('');
  const handleEdit = () => {
    const userID = matricule;
    const role = '2';
    const dateNaiss = date;
    let domain;
    console.log(domainState === '')
    if(domainState === ''){
      domain = 0;
    }else{
      domain = domainState
    }
    const formData = {
      userName,
      email,
      userID,
      dateNaiss,
      role, 
      type,
      domain
    }
    modifyGestionair(formData,id);
    setOpenGestEdit(false);
  }  
  const handleDelete = () => {
    deleteGestionair(id);
    setOpenGestEdit(false);
  }
  useEffect(() => {
    console.log(id);
  },[])
  return (
    <div className={`w-full h-full absolute z-30 bg-[rgba(0,0,0,0.5)] top-0 left-0 ${openGestEdit?'flex':'hidden'} justify-center items-center`}>
        <div className='h-[80%] aspect-[9/10] bg-white justify-between rounded-xl flex flex-col'>
          <div className='flex-1 flex justify-between px-3 items-center'>
            <p className='text-base py-4 font-bold'>Edit Gestionair</p>
            <MdClose onClick={() => setOpenGestEdit(false)} className='text-2xl cursor-pointer'/>
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
                    <option value="domain" className='bg-separator hover:bg-black text-black'>Domain</option>
                    <option value="trancC" className='bg-separator hover:bg-black text-black'>tranc commun</option>
                </select>
              </div>
              {type === 'domain' && (<Drop name={'Domain'} setData={setDomain} />)}
            </div>
          </div>
          <div className='flex-1 flex justify-end items-center px-3 pb-3 gap-3'>
            <button onClick={handleDelete} className='py-2 px-5 rounded-lg text-white bg-red'>Delete</button>
            <button onClick={handleEdit} className='py-2 px-5 rounded-lg text-white bg-main'>Add</button>
          </div>
        </div>
    </div>
  )
}

export default EditGestForm