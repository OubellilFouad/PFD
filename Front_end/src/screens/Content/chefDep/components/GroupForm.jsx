import React, { useEffect, useRef, useState } from 'react'
import { MdClose } from 'react-icons/md';
import Input from '../../../Auth/components/Input';
import { useChef } from '../context/ChefContext'
import { useAuth } from '../../../../../context/AuthContext';
import { useAdmin } from '../../admin/context/AdminContext';

const GroupForm = ({speid,secid,type,openGroup,setOpenGroup,palid}) => {
  const {addTcGroup} = useAdmin();
  const {addGroupe} = useChef();  
  const {user,setShow,setAddMessage,setColor} = useAuth();
  const [nom,setNom] = useState('');
  const [capacite,setCapacite] = useState(null);
  const [error,setError] = useState('');
  const form = useRef();
  const handleAdd = (e) => {
    e.preventDefault();
    const depid = user?.depID;
    const formData = {
      nom,
      speid,
      secid,
      capacite,
      depid,
      palid
    }
    if(nom === ''){
      setError('Name field must not be empty');
      return;
    }
    if(capacite === null){
      setError('Capacité field must not be empty');
      return;
    }
    if(type === 'commun'){
      addTcGroup(formData)
    }else{
      addGroupe(formData)
    }
    console.log(formData)
    form.current.reset();
    setOpenGroup(false);
    setShow(true);
    setAddMessage('Added group successfuly');
    setColor(true);
  }
  useEffect(() => {
    console.log(secid)
  },[])
  return (
    <div className={`w-full h-full absolute z-30 bg-[rgba(0,0,0,0.5)] top-0 left-0 ${openGroup?'flex':'hidden'} justify-center items-center`}>
        <div className='h-[60%] aspect-[9/10] bg-white justify-between rounded-xl flex flex-col'>
          <div className='flex-1 flex justify-between px-3 items-center'>
            <p className='text-base py-4 font-bold'>Ajouter Groupe</p>
            <MdClose onClick={() => {
              setOpenGroup(false);
              setError('');
            }} className='text-2xl cursor-pointer'/>
          </div>
          <form ref={form} className='flex-[8] px-10 py-4 gap-6 flex flex-col'>
            <Input name={'Nom'} type={'text'} data={nom} setData={setNom} />
            <Input name={'Capacité'} type={'number'} data={capacite} setData={setCapacite} />
          </form>
          <div className='flex-1 flex justify-between items-center px-3 pb-3'>
            <p className='text-red'> {error} </p>
            <button onClick={(e) => handleAdd(e)} className='py-2 px-5 rounded-lg text-white bg-main'>Ajouter</button>
          </div>
        </div>
    </div>
  )
}

export default GroupForm