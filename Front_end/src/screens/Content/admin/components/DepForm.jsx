import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { MdClose } from 'react-icons/md'
import Drop from '../../../Auth/components/Drop';
import Input from '../../../Auth/components/Input';
import { useAdmin } from '../context/AdminContext';

const DepForm = ({open,setOpen}) => {
  const {addDep,addDomain} = useAdmin();
  const [nom,setNom] = useState('');
  const [domainid,setDomain] = useState(null);
  const [domainOpen,setDomainOpen] = useState(false);
  const [domainName,setDomainName] = useState('');
  const [error,setError] = useState('');
  const handleAdd = () => {
    const formData = {
      nom,
      domainid,
    }
    if(nom === ''){
      setError('Name field must not be empty');
      return;
    }
    addDep(formData);
    setError('');
    setNom('');
    setDomain(null)
    setOpen(false);
  }  
  const handleDomain = () => {
    const nom = domainName;
    const formData = {
      nom,
    }
    if(nom === ''){
      setError('Domain Name field must not be empty');
      return;
    }
    addDomain(formData);
    setDomainOpen(false)
  }
  return (
    <div className={`w-full h-full absolute z-30 bg-[rgba(0,0,0,0.5)] top-0 left-0 ${open?'flex':'hidden'} justify-center items-center`}>
        <div className='h-[70%] aspect-[8/9] bg-white rounded-xl flex flex-col relative justify-between'>
          <div className='flex-1 flex justify-between px-3 py-2 items-center'>
            <p className='text-base font-bold'>Add departement</p>
            <MdClose onClick={() => setOpen(false)} className='text-2xl cursor-pointer'/>
          </div>
          <div className='flex-[8] flex flex-col items-center px-10 py-8 gap-10'>
            <Input name={'Nom'} type={'text'} data={nom} setData={setNom} />
            <div className='flex w-full items-end gap-5'>
              <Drop name={'Domains'} data={domainid} setData={setDomain} />
              <button onClick={() => setDomainOpen(!domainOpen)} className='flex items-center text-base gap-2 py-2 px-4 border rounded-lg hover:text-main hover:border-main'>
                  <AiOutlinePlus className='p-1 bg-palerMain text-main text-xl rounded-md'/>
              </button>
            </div>
            <div className={`p-4 w-2/3 bottom-16 gap-4 ${domainOpen?'flex':'hidden'} flex-col border rounded-lg absolute`}>
              <Input name={'Domain'} type='text' data={domainName} setData={setDomainName} />
              <button onClick={handleDomain} className='py-2 px-5 rounded-lg text-white bg-main'>Enter</button>
            </div>
          </div>
          <div className='flex-1 flex justify-between items-center px-3 pb-3'>
            <p className='text-red'>{error}</p>
            <button onClick={handleAdd} className='py-2 px-5 rounded-lg text-white bg-main'>Enter</button>
          </div>
        </div>
    </div>
  )
}

export default DepForm