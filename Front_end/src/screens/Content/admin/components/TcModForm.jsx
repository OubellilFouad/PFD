import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { MdClose } from 'react-icons/md';
import { useAuth } from '../../../../../context/AuthContext';
import Input from '../../../Auth/components/Input';
import Select from '../../chefDep/components/Select';
import { useAdmin } from '../context/AdminContext';
import DepSelect from './DepSelect';
const getTcSpes = 'https://pfeboumerdes.pythonanywhere.com/formationstc';
const getTcPalier = 'https://pfeboumerdes.pythonanywhere.com/palierstc/';
const getOnePalier = 'https://pfeboumerdes.pythonanywhere.com/paliertc/';

const TcModForm = () => {
  const {openTcModules,setOpenTcModules,addTcMod} = useAdmin();
  const {setShow,setAddMessage,setColor} = useAuth();
  const [again,setAgain] = useState(false);  
  const [nom,setNom] = useState('');
  const [speid,setSpeid] = useState(null);
  const [vhg,setvhg] = useState(null);
  const [hcour,setHcour] = useState(null);
  const [htp,setHtp] = useState(null);
  const [htd,setHtd] = useState(null);
  const [abbr,setAbbr] = useState('');
  const [semestre,setSemestre] = useState(null);
  const [palid,setPalid] = useState(null);
  const [onePal,setOnePal] = useState({});
  const [pal,setPal] = useState([]);
  const [tcspes,setTcSpes] = useState([]);
  const [semestreArr,setSemestreArr] = useState([]);
  const [dep1,setDep1] = useState(null);
  const [dep2,setDep2] = useState(null);
  const [dep3,setDep3] = useState(null);
  const form = useRef();
  const semestre1 = [1,2];
  const semestre2 = [3,4];
  const getTcPal = async () => {
    const {data} = await axios.get(`${getTcPalier}${speid}`);
    setPal(data);
  }
  const getOnePal = async () => {
    const {data} = await axios.get(`${getOnePalier}${palid}`);
    setOnePal(data);
  }
  const getTcSpe = async () => {
    const {data} = await axios.get(getTcSpes);
    setTcSpes(data);
  }
  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = {
      nom,
      speid: parseInt(speid),
      vhg: parseInt(vhg),
      hcour: parseInt(hcour),
      htp: parseInt(htp),
      htd: parseInt(htd),
      abbr,
      semestre: parseInt(semestre),
      palid: parseInt(palid),
      dep1: parseInt(dep1),
      dep2: parseInt(dep2),
      dep3: parseInt(dep3)
    }
    addTcMod(formData);
    form.current.reset();
    setOpenTcModules(false);
    setShow(true);
    setAddMessage('Added module successfuly');
    setColor(true);
    setNom('');
    setSpeid(null);
    setvhg(null);
    setHcour(null);
    setHtd(null);
    setHtp(null);
    setAbbr('');
    setSemestre('');
    setPalid(null)
  }
  useEffect(() => {
    getTcSpe();
  },[])
  useEffect(() => {
    if(speid){
      getTcPal();
    }
  },[speid])
  useEffect(() => {
    if(palid){
      getOnePal();
    }
  },[palid])
  useEffect(() => {
    if(onePal){
      if(onePal.annee === 1){
        setSemestreArr(semestre1);
      }
      if(onePal.annee === 2){
        setSemestreArr(semestre2);
      }
    }
  },[onePal])
  return (
    <div className={`w-full h-full absolute z-30 bg-[rgba(0,0,0,0.5)] top-0 left-0 ${openTcModules?'flex':'hidden'} justify-center items-center`}>
        <div className='h-[95%] aspect-[9/10] bg-white justify-between rounded-xl flex flex-col'>
          <div className='flex-1 flex justify-between px-3 items-center'>
            <p className='text-base py-4 font-bold'>Add TC Module</p>
            <MdClose onClick={() => setOpenTcModules(false)} className='text-2xl cursor-pointer'/>
          </div>
          <form ref={form} className='flex-[8] px-10 py-4 gap-3 flex flex-col'>
            <Input name={'Full name'} data={nom} type={'text'} setData={setNom} />
            <div className='flex gap-4'>
                <div className='flex flex-col w-full'>
                    <label htmlFor={'pallier'} className='text-paleMain text-base font-medium cursor-pointer'>Specialities</label>
                    <select onChange={(e) => setSpeid(e.target.value)} name="dropDown" id={'pallier'} className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none' placeholder='Domains'>
                        <option value="First" className='bg-separator hover:bg-black text-black' unselectable='on'>Specialities</option>
                        {tcspes?.map((spe) => {
                        const {nom,ftcid} = spe;
                            return(
                                <option data-type='commun' key={ftcid} value={ftcid} className='bg-separator hover:bg-black text-black' >{nom}</option>
                            )
                        })}
                    </select>
                </div>
                <div className='flex flex-col w-full'>
                    <label htmlFor={'pallier'} className='text-paleMain text-base font-medium cursor-pointer'>Palier</label>
                    <select onChange={(e) => setPalid(e.target.value)} name="dropDown" id={'pallier'} className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none' placeholder='Domains'>
                        <option value="First" className='bg-separator hover:bg-black text-black' unselectable='on'>Paliers</option>
                        {pal?.map((pal) => {
                        const {nom,palid} = pal;
                            return(
                                <option key={palid} value={palid} className='bg-separator hover:bg-black text-black' >{nom}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <Input name={'Volume horaire general'} data={vhg} type={'number'} setData={setvhg} />
            <div className='flex gap-3'>
              <div className='flex flex-1 w-[32%] flex-col'>
                <label htmlFor={'nbcour'} className='text-paleMain text-base font-medium cursor-pointer'>seances cours</label>
                <input value={hcour || undefined} onChange={(e) => setHcour(e.target.value)} type={'number'} id={'nbcour'} className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none'/>
              </div>
              <div className='flex flex-1 w-[32%] flex-col'>
                <label htmlFor={'nbcour'} className='text-paleMain text-base font-medium cursor-pointer'>seances TP</label>
                <input value={htp || undefined} onChange={(e) => setHtp(e.target.value)} type={'number'} id={'nbcour'} className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none'/>
              </div>
              <div className='flex flex-1 w-[32%] flex-col'>
                <label htmlFor={'nbcour'} className='text-paleMain text-base font-medium cursor-pointer'>seances TD</label>
                <input value={htd || undefined} onChange={(e) => setHtd(e.target.value)} type={'number'} id={'nbcour'} className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none'/>
              </div>
            </div>
            <Input name={'Abbreviation'} data={abbr} type={'text'} setData={setAbbr} />
            <Select name={'Le semestre'} setData={setSemestre} array={semestreArr}/>
            <div className='flex gap-4 items-center w-full'>
                <DepSelect name={'Departments'} setData={setDep1}/>
                <DepSelect name={'Departments'} setData={setDep2}/>
                <DepSelect name={'Departments'} setData={setDep3}/>
            </div>
          </form>
          <div className='flex-1 flex justify-end items-center px-3 pb-3 gap-3'>
            <p className={`text-red text-sm ${again?'block':'hidden'}`}>Click again!</p>
            <button onClick={(e) => handleAdd(e)} className='py-2 px-5 rounded-lg text-white bg-main'>Enter</button>
          </div>
        </div>
    </div>
  )
}

export default TcModForm