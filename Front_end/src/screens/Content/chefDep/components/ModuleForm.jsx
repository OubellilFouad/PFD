import axios from 'axios';
import React, { useState } from 'react'
import { MdClose } from 'react-icons/md';
import Input from '../../../Auth/components/Input';
import { useChef } from '../context/ChefContext'
import FillSelect from './FillSelect';
import SpeSelect from './SpeSelect';
import { useAuth } from '../../../../../context/AuthContext';
const getOneSpes = 'https://pfeboumerdes.pythonanywhere.com/specialite/';

const ModuleForm = () => {
  const {openModule,setOpenModule,addModule} = useChef();
  const {user} = useAuth();
  const [again,setAgain] = useState(false);  
  const [nom,setNom] = useState('');
  const [speid,setSpeid] = useState('');
  // const [fillid,setFillid] = useState('');
  const [spe,setSpe] = useState({});
  const getOneSpe = async (id) => {
    const response = await axios.get(`${getOneSpes}${id}`);
    const result = await response.data;
    setSpe(result);
  }
  const handleAdd = async () => {
    await getOneSpe(speid);
    const fillid = await spe.fillid;
    const depid = user?.depID;
    const formData = {
      nom,
      speid,
      fillid,
      depid
    }
    if(formData.fillid === undefined){
      setAgain(true);
      return;
    }
    setAgain(false)
    addModule(formData)
    setOpenModule(false);
  }
  return (
    <div className={`w-full h-full absolute z-30 bg-[rgba(0,0,0,0.5)] top-0 left-0 ${openModule?'flex':'hidden'} justify-center items-center`}>
        <div className='h-[80%] aspect-[9/10] bg-white justify-between rounded-xl flex flex-col'>
          <div className='flex-1 flex justify-between px-3 items-center'>
            <p className='text-base py-4 font-bold'>Add Module</p>
            <MdClose onClick={() => setOpenModule(false)} className='text-2xl cursor-pointer'/>
          </div>
          <div className='flex-[8] px-10 py-4 gap-6 flex flex-col'>
            <Input name={'Full name'} type={'text'} setData={setNom} />
            <SpeSelect name={'Spécialités'} setData={setSpeid} />
          </div>
          <div className='flex-1 flex justify-end items-center px-3 pb-3 gap-3'>
            <p className={`text-red text-sm ${again?'block':'hidden'}`}>Click again!</p>
            <button onClick={handleAdd} className='py-2 px-5 rounded-lg text-white bg-main'>Enter</button>
          </div>
        </div>
    </div>
  )
}

export default ModuleForm