import React, { useState } from 'react'
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
  const {addFil} = useChef();
  const {user,setShow,setAddMessage,setColor} = useAuth();
  const [openFil,setopenFil] = useState(false);
  const [filName,setFilName] = useState('');
  const [nom,setNom] = useState('');
  const [fillid,setFillid] = useState(0);
  const [cycle,setCycle] = useState('');
  const [dep1,setDep1] = useState(null);
  const [dep2,setDep2] = useState(null);
  const [dep3,setDep3] = useState(null);
  const cycleArr = ['Licence','Master'];
  const handleAdd = () => {
    const formData = {
      nom,
      cycle,
      dep1: parseInt(dep1),
      dep2: parseInt(dep2),
      dep3: parseInt(dep3)
    }
    addFormation(formData)
    setCycle('');
    setFillid('');
    setNom('');
    setOpenForm(false);
    setShow(true);
    setAddMessage('Added speciality successfuly');
    setColor(true);
  }
  const handleFil = () => {
    const nom = filName;
    const depid = user?.depID;
    const formData = {
      nom,
      depid
    }
    addFil(formData);
    setopenFil(false);
  }
  return (
    <div className={`w-full h-full absolute z-30 bg-[rgba(0,0,0,0.5)] top-0 left-0 ${openForm?'flex':'hidden'} justify-center items-center`}>
        <div className='h-[95%] aspect-[9/10] bg-white justify-between rounded-xl flex flex-col relative'>
          <div className='flex-1 flex justify-between px-3 items-center'>
            <p className='text-base py-4 font-bold'>Add Spécialités</p>
            <MdClose onClick={() => setOpenForm(false)} className='text-2xl cursor-pointer'/>
          </div>
          <div className='flex-[8] px-10 py-4 items-center gap-6 flex flex-col'>
            <Input name={'Nom'} type={'text'} data={nom} setData={setNom} />
            <div className='flex w-full'><Select name={'Cycle'} setData={setCycle} array={cycleArr}/></div>
            <div className='flex gap-4 items-center w-full'>
                <DepSelect name={'Departments'} setData={setDep1}/>
                <DepSelect name={'Departments'} setData={setDep2}/>
                <DepSelect name={'Departments'} setData={setDep3}/>
            </div>
            <div className='flex w-full items-end gap-5'>
              <FillSelect name={'Filliérs'} setData={setFillid} />
              <button onClick={() => setopenFil(!openFil)} className='flex items-center text-base gap-2 py-2 px-4 border rounded-lg hover:text-main hover:border-main'>
                  <AiOutlinePlus className='p-1 bg-palerMain text-main text-xl rounded-md'/>
              </button>
            </div>
            <div className={`p-4 w-2/3 bottom-16 z-10 bg-white gap-4 ${openFil?'flex':'hidden'} flex-col border rounded-lg absolute`}>
              <Input name={'Filliére'} type='text' data={filName} setData={setFilName} />
              <button onClick={handleFil} className='py-2 px-5 rounded-lg text-white bg-main'>Enter</button>
            </div>
          </div>
          <div className='flex-1 flex justify-end items-center px-3 pb-3'>
            <button onClick={handleAdd} className='py-2 px-5 rounded-lg text-white bg-main'>Enter</button>
          </div>
        </div>
    </div>
  )
}

export default FormaForm