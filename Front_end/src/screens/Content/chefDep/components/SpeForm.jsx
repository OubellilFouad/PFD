import React, { useRef, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';
import { useAuth } from '../../../../../context/AuthContext';
import Input from '../../../Auth/components/Input';
import { useChef } from '../context/ChefContext'
import FillSelect from './FillSelect';
import Select from './Select';

const SpeForm = () => {
  const {openSpe,setOpenSpe,addSpe,addFil} = useChef();  
  const {user,setShow,setAddMessage,setColor} = useAuth();
  const [openFil,setopenFil] = useState(false);
  const [filName,setFilName] = useState('');
  const [nom,setNom] = useState('');
  const [fillid,setFillid] = useState(0);
  const [cycle,setCycle] = useState('');
  const form = useRef();
  const cycleArr = ['Licence','Master'];
  const handleAdd = (e) => {
    e.preventDefault();
    const depid = user?.depID;
    const formData = {
      nom,
      fillid,
      cycle,
      depid
    }
    addSpe(formData);
    setCycle('');
    setFillid('');
    setNom('');
    setOpenSpe(false);
    setShow(true);
    setAddMessage('Added speciality successfuly');
    setColor(true);
    form.current.reset();
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
    <div className={`w-full h-full absolute z-30 bg-[rgba(0,0,0,0.5)] top-0 left-0 ${openSpe?'flex':'hidden'} justify-center items-center`}>
        <div className='h-[80%] aspect-[9/10] bg-white justify-between rounded-xl flex flex-col relative'>
          <div className='flex-1 flex justify-between px-3 items-center'>
            <p className='text-base py-4 font-bold'>Add Spécialités</p>
            <MdClose onClick={() => setOpenSpe(false)} className='text-2xl cursor-pointer'/>
          </div>
          <form ref={form} className='flex-[8] px-10 py-4 items-center gap-6 flex flex-col'>
            <Input name={'Nom'} type={'text'} setData={setNom} />
            <div className='flex w-full'><Select name={'Cycle'} setData={setCycle} array={cycleArr}/></div>
            <div className='flex w-full items-end gap-5'>
              <FillSelect name={'Filliérs'} setData={setFillid} />
              <button onClick={() => setopenFil(!openFil)} className='flex items-center text-base gap-2 py-2 px-4 border rounded-lg hover:text-main hover:border-main'>
                  <AiOutlinePlus className='p-1 bg-palerMain text-main text-xl rounded-md'/>
              </button>
            </div>
            <div className={`p-4 w-2/3 bottom-16 gap-4 ${openFil?'flex':'hidden'} flex-col border rounded-lg absolute`}>
              <Input name={'Filliére'} type='text' data={filName} setData={setFilName} />
              <button onClick={handleFil} className='py-2 px-5 rounded-lg text-white bg-main'>Enter</button>
            </div>
          </form>
          <div className='flex-1 flex justify-end items-center px-3 pb-3'>
            <button onClick={(e) => handleAdd(e)} className='py-2 px-5 rounded-lg text-white bg-main'>Enter</button>
          </div>
        </div>
    </div>
  )
}

export default SpeForm