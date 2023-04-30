import React, { useRef, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';
import DepSelect from './DepSelect';
import { useAuth } from '../../../../../context/AuthContext';
import FillSelect from '../../chefDep/components/FillSelect';
import Input from '../../../Auth/components/Input';
import Select from '../../chefDep/components/Select';
import { useAdmin } from '../context/AdminContext';
import { useChef } from '../../chefDep/context/ChefContext';

const FormaForm = () => {
  const {openForm,setOpenForm,addFormation} = useAdmin();  
  const {setShow,setAddMessage,setColor} = useAuth();
  const [nom,setNom] = useState('');
  const [cycle,setCycle] = useState('');
  const [dep1,setDep1] = useState(null);
  const [dep2,setDep2] = useState(null);
  const [dep3,setDep3] = useState(null);
  const form = useRef();
  const cycleArr = ['Licence','Master'];
  const handleAdd = (e) => {
    e.preventDefault();
    const formData = {
      nom,
      cycle,
      dep1: parseInt(dep1),
      dep2: parseInt(dep2),
      dep3: parseInt(dep3)
    }
    addFormation(formData)
    form.current.reset();
    setCycle('');
    setNom('');
    setOpenForm(false);
    setShow(true);
    setAddMessage('Added speciality successfuly');
    setColor(true);
  }
  return (
    <div className={`w-full h-full absolute z-30 bg-[rgba(0,0,0,0.5)] top-0 left-0 ${openForm?'flex':'hidden'} justify-center items-center`}>
        <div className='h-[80%] aspect-[9/10] bg-white justify-between rounded-xl flex flex-col relative'>
          <div className='flex-1 flex justify-between px-3 items-center'>
            <p className='text-base py-4 font-bold'>Add Spécialités</p>
            <MdClose onClick={() => setOpenForm(false)} className='text-2xl cursor-pointer'/>
          </div>
          <form ref={form} className='flex-[8] px-10 py-4 items-center gap-6 flex flex-col'>
            <Input name={'Nom'} type={'text'} data={nom} setData={setNom} />
            <div className='flex w-full'><Select name={'Cycle'} setData={setCycle} array={cycleArr}/></div>
            <div className='flex gap-4 items-center w-full'>
                <DepSelect name={'Departments'} setData={setDep1}/>
                <DepSelect name={'Departments'} setData={setDep2}/>
                <DepSelect name={'Departments'} setData={setDep3}/>
            </div>
          </form>
          <div className='flex-1 flex justify-end items-center px-3 pb-3'>
            <button onClick={(e) => handleAdd(e)} className='py-2 px-5 rounded-lg text-white bg-main'>Enter</button>
          </div>
        </div>
    </div>
  )
}

export default FormaForm