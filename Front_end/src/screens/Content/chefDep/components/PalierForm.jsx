import React, { useEffect, useRef, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';
import { useAuth } from '../../../../../context/AuthContext';
import Input from '../../../Auth/components/Input';
import { useChef } from '../context/ChefContext'
import Select from './Select';
import SpeSelect from './SpeSelect'

const PalierForm = ({speid,array,obj}) => {
  const {openPalier,setOpenPalier,addPalier} = useChef();  
  const {user,setShow,setAddMessage,setColor} = useAuth();
  const [nom,setNom] = useState('');
  const [annees,setAnnee] = useState(null);
  const [arr,setArr] = useState([]);
  const [nbrsec,setNbrsec] = useState(null);
  const [nbrgrp,setNbrgrp] = useState(null);
  const form = useRef();
  let an = [1,2,3,4,5];
  let annee = [];
  let intersection;
  const handleAdd = () => {
    let annee = parseInt(annees)
    const formData = {
      nom,
      speid,
      annee,
      nbrsec,
      nbrgrp,
      depid: user.depID
    }
    addPalier(formData);
    form.current.reset();
    setAnnee(null);
    setNom('');
    setOpenPalier(false);
    setShow(true);
    setAddMessage('Added paliers successfuly');
    setColor(true);
  }
  useEffect(() => {
    obj?.map((pal) => {
      annee.push(pal.annee);
    })
    intersection = an.filter(x => !annee.includes(x));
    setArr(intersection)
  },[obj])
  return (
    <div className={`w-full h-full absolute z-30 bg-[rgba(0,0,0,0.5)] top-0 left-0 ${openPalier?'flex':'hidden'} justify-center items-center`}>
        <div className='h-[80%] aspect-[9/10] bg-white justify-between rounded-xl flex flex-col relative'>
          <div className='flex-1 flex justify-between px-3 items-center'>
            <p className='text-base py-4 font-bold'>Add Palier</p>
            <MdClose onClick={() => setOpenPalier(false)} className='text-2xl cursor-pointer'/>
          </div>
          <form ref={form} className='flex-[8] px-10 py-4 items-center gap-6 flex flex-col'>
            <Input name={'Nom'} type={'text'} data={nom} setData={setNom} />
            <div className='flex flex-col w-full'>
                <label htmlFor={'annee'} className='text-paleMain text-base font-medium cursor-pointer'>Annee</label>
                <select onChange={(e) => setAnnee(e.target.value)} name="dropDown" id={'annee'} className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none' placeholder='Domains' defaultValue>
                    <option value="First" className='bg-separator hover:bg-black text-black' unselectable='on'>Donneés</option>
                    {arr?.map((an,index) => {
                        return(
                            <option key={index} value={an} className='bg-separator hover:bg-black text-black' >{an}</option>
                        )
                    })}
                </select>
            </div>
            <Input name={'Nombre de sections'} type={'number'} data={nbrsec} setData={setNbrsec} />
            <Input name={'Nombre de group'} type={'number'} data={nbrgrp} setData={setNbrgrp} />
          </form>
          <div className='flex-1 flex justify-end items-center px-3 pb-3'>
            <button onClick={handleAdd} className='py-2 px-5 rounded-lg text-white bg-main'>Enter</button>
          </div>
        </div>
    </div>
  )
}

export default PalierForm