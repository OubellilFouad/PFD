import React, { useEffect, useRef, useState } from 'react'
import { MdClose } from 'react-icons/md';
import Input from '../../../Auth/components/Input';
import { useChef } from '../context/ChefContext'
import SpeSelect from './SpeSelect';
import { useAuth } from '../../../../../context/AuthContext';
import axios from 'axios';
const getPal = 'http://127.0.0.1:5000/paliers/';
const getTcPal = 'http://127.0.0.1:5000/palierstc/';
const getSpe = 'http://127.0.0.1:5000/specialites/';
const getTcSpe = 'http://127.0.0.1:5000/formationstc/';

const SectionForm = () => {
  const {openSec,setOpenSec,addSection,spes} = useChef(); 
  const {user,setShow,setAddMessage,setColor} = useAuth();
  const [nom,setNom] = useState(''); 
  const [capacite,setCapacite] = useState(0); 
  const [speid,setSpeid] = useState(null); 
  const [tc,setTc] = useState(false);
  const [pals,setPals] = useState([]);
  const [spe,setSpe] = useState([]);
  const [tcspe,setTcSpe] = useState([]);
  const [palid,setPalid] = useState(null);
  const form = useRef();
  const handleAdd = () => {
    const depid = user?.depID;
    const formData = {
      nom,
      capacite,
      speid,
      depid,
      palid
    }
    addSection(formData);
    setNom('');
    setCapacite(0);
    setSpeid(0);
    setOpenSec(false);
    setShow(true);
    setAddMessage('Added section successfuly');
    setColor(true);
    form.current.reset();
  }
  const getPals = async () => {
    const {data} = await axios.get(`${getPal}${speid}`);
    setPals(data);
  }
  const getTcPals = async () => {
    const {data} = await axios.get(`${getTcPal}${speid}`);
    setPals(data);
  }
  const getSpes = async () => {
    const {data} = await axios.get(`${getSpe}${user?.depID}`);
    setSpe(data);
  }
  const getTcSpes = async () => {
    const {data} = await axios.get(`${getTcSpe}${user?.depID}`);
    setTcSpe(data);
  }
  useEffect(() => {
    if(speid){
      if(tc){
        getTcPals();
        console.log(tc)
      }else{
        getPals();
      }
    }
  },[speid])
  useEffect(() => {
    getSpes();
    getTcSpes();
  },[spes])
  return (
    <div className={`w-full h-full absolute z-30 bg-[rgba(0,0,0,0.5)] top-0 left-0 ${openSec?'flex':'hidden'} justify-center items-center`}>
        <div className='h-[90%] aspect-[9/10] bg-white justify-between rounded-xl flex flex-col'>
          <div className='flex-1 flex justify-between px-3 items-center'>
            <p className='text-base py-4 font-bold'>Ajouter Section</p>
            <MdClose onClick={() => setOpenSec(false)} className='text-2xl cursor-pointer'/>
          </div>
          <form ref={form} className='flex-[8] px-10 py-4 gap-6 flex flex-col'>
            <Input name={'Nom'} type={'text'} setData={setNom} />
            <Input name={'Capacité'} type={'number'} setData={setCapacite} />
            <div className='flex flex-col w-full'>
              <label htmlFor={'pals'} className='text-paleMain text-base font-medium cursor-pointer'>Specialities</label>
              <select onChange={(e) => {
                setSpeid(e.target.value);
                setTc(false);
              }} name="dropDown" id={'pals'} className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none' placeholder='Domains'>
                  <option value="First" className='bg-separator hover:bg-black text-black' unselectable='Specialité'>Specialities</option>
                  {spe.map((spe) => {
                      const {nom,speid} = spe;
                      return(
                          <option key={speid} value={speid} onClick={() => setTc(false)} className='bg-separator hover:bg-black text-black' >{nom}</option>
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
          </form>
          <div className='flex-1 flex justify-end items-center px-3 pb-3'>
            <button onClick={handleAdd} className='py-2 px-5 rounded-lg text-white bg-main'>Ajouter</button>
          </div>
        </div>
    </div>
  )
}

export default SectionForm