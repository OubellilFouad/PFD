import React, { useState } from 'react'
import { MdClose } from 'react-icons/md';
import Input from '../../../Auth/components/Input';
import { useAdmin } from '../context/AdminContext';

const EditForm = ({depID,getOneChef,chef}) => {
  const {openEdit,setOpenEdit, modifyChef, deleteChef} = useAdmin();
  const [userName,setUserName] = useState(chef?.userName);
  const [email,setEmail] = useState(chef?.email);
  const [matricule,setMatricule] = useState(chef?.userID);
  const [date,setDate] = useState(chef?.dateNaiss);
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
    modifyChef(formData,chef.id);
    getOneChef(depID);
    setOpenEdit(false);
  }  
  const handleDelete = () => {
    deleteChef(chef.id);
    getOneChef(depID);
    setOpenEdit(false);
  }
  return (
    <div className={`w-full h-full absolute z-30 bg-[rgba(0,0,0,0.5)] top-0 left-0 ${openEdit?'flex':'hidden'} justify-center items-center`}>
        <div className='h-[80%] aspect-[9/10] bg-white justify-between rounded-xl flex flex-col'>
          <div className='flex-1 flex justify-between px-3 items-center'>
            <p className='text-base py-4 font-bold'>Edit Chef</p>
            <MdClose onClick={() => setOpenEdit(false)} className='text-2xl cursor-pointer'/>
          </div>
          <div className='flex-[8] px-10 py-4 gap-6 flex flex-col'>
            <Input name={'Full name'} type={'text'}  data={userName} setData={setUserName} />
            <Input name={'Email'} type={'email'}  data={email} setData={setEmail} />
            <Input name={'Matricule'} type={'text'}  data={matricule} setData={setMatricule} />
            <Input name={'Date naissance'} type={'date'}  data={date} setData={setDate} />
          </div>
          <div className='flex-1 gap-3 flex justify-end items-center px-3 pb-3'>
            <button onClick={handleDelete} className='py-2 px-5 rounded-lg text-white bg-red'>Delete</button>
            <button onClick={handleAdd} className='py-2 px-5 rounded-lg text-white bg-main'>Edit</button>
          </div>
        </div>
    </div>
  )
}

export default EditForm