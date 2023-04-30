import React, { useEffect, useRef, useState } from 'react'
import { MdClose } from 'react-icons/md';
import axios from 'axios';
import { useAdmin } from '../context/AdminContext';
import { useAuth } from '../../../../../context/AuthContext';
import Input from '../../../Auth/components/Input';
import DepSelect from './DepSelect';
const getTcPal = 'https://pfeboumerdes.pythonanywhere.com/palierstc/';
const getTcSpe = 'https://pfeboumerdes.pythonanywhere.com/formationstc';

const TcSectionForm = () => {
  const {openSection,setOpenSections,addTcSec,tcform} = useAdmin(); 
  const {setShow,setAddMessage,setColor} = useAuth();
  const [nom,setNom] = useState(''); 
  const [capacite,setCapacite] = useState(0); 
  const [speid,setSpeid] = useState(null); 
  const [pals,setPals] = useState([]);
  const [tcspe,setTcSpe] = useState([]);
  const [palid,setPalid] = useState(null);
  const [dep1,setDep1] = useState(null);
  const [dep2,setDep2] = useState(null);
  const [dep3,setDep3] = useState(null);
  const form = useRef()
  const handleAdd = (e) => {
    e.preventDefault();
    const formData = {
      nom,
      capacite: parseInt(capacite),
      speid: parseInt(speid),
      palid: parseInt(palid),
      dep1: parseInt(dep1),
      dep2: parseInt(dep2),
      dep3: parseInt(dep3)
    }
    addTcSec(formData);
    form.current.reset();
    setNom('');
    setCapacite(0);
    setSpeid(0);
    setOpenSections(false);
    setShow(true);
    setAddMessage('Added section successfuly');
    setColor(true);
  }
  const getTcPals = async () => {
    const {data} = await axios.get(`${getTcPal}${speid}`);
    setPals(data);
  }
  const getTcSpes = async () => {
    const {data} = await axios.get(getTcSpe);
    setTcSpe(data);
  }
  useEffect(() => {
    if(speid){
        getTcPals();
    }
  },[speid])
  useEffect(() => {
    getTcSpes();
  },[tcform])
  return (
    <div className={`w-full h-full absolute z-30 bg-[rgba(0,0,0,0.5)] top-0 left-0 ${openSection?'flex':'hidden'} justify-center items-center`}>
        <div className='h-[95%] aspect-[9/10] bg-white justify-between rounded-xl flex flex-col'>
          <div className='flex-1 flex justify-between px-3 items-center'>
            <p className='text-base py-4 font-bold'>Add Section</p>
            <MdClose onClick={() => setOpenSections(false)} className='text-2xl cursor-pointer'/>
          </div>
          <form ref={form} className='flex-[8] px-10 py-4 gap-6 flex flex-col'>
            <Input name={'Nom'} type={'text'} setData={setNom} data={nom} />
            <Input name={'Capacité'} type={'number'} setData={setCapacite} data={capacite} />
            <div className='flex flex-col w-full'>
              <label htmlFor={'pals'} className='text-paleMain text-base font-medium cursor-pointer'>Specialities Tranc commun</label>
              <select onChange={(e) => setSpeid(e.target.value)} name="dropDown" id={'pals'} className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none' placeholder='Domains'>
                  <option value="First" className='bg-separator hover:bg-black text-black' unselectable='Specialité'>Specialities</option>
                  {tcspe.map((tcspe) => {
                      const {nom,ftcid} = tcspe;
                      return(
                          <option key={ftcid} onClick={() => setTc(true)} value={ftcid} className='bg-separator hover:bg-black text-black' >{nom}</option>
                      )
                  })}
              </select>
            </div>
            <div className='flex flex-col w-full'>
              <label htmlFor={'pals'} className='text-paleMain text-base font-medium cursor-pointer'>Paliers</label>
              <select onChange={(e) => setPalid(e.target.value)} name="dropDown" id={'pals'} className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none' placeholder='Domains'>
                  <option value="First" className='bg-separator hover:bg-black text-black' unselectable='Specialité'>Paliers</option>
                  {pals.map((pal) => {
                      const {nom,palid} = pal;
                      return(
                          <option key={palid} value={palid} className='bg-separator hover:bg-black text-black' >{nom}</option>
                      )
                  })}
              </select>
            </div>
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

export default TcSectionForm