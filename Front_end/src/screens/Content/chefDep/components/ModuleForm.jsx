import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { MdClose } from 'react-icons/md';
import Input from '../../../Auth/components/Input';
import { useChef } from '../context/ChefContext'
import FillSelect from './FillSelect';
import SpeSelect from './SpeSelect';
import { useAuth } from '../../../../../context/AuthContext';
import MiniInput from './MiniInput';
import Select from './Select';
const getOneSpes = 'https://pfeboumerdes.pythonanywhere.com/specialite/';
const getSpes = 'https://pfeboumerdes.pythonanywhere.com/specialites/';
const getTcSpes = 'https://pfeboumerdes.pythonanywhere.com/formationstc/';
const getPalier = 'https://pfeboumerdes.pythonanywhere.com/paliers/';
const getTcPalier = 'https://pfeboumerdes.pythonanywhere.com/palierstc/';
const getOnePalier = 'https://pfeboumerdes.pythonanywhere.com/palier/';

const ModuleForm = () => {
  const {openModule,setOpenModule,addModule} = useChef();
  const {user,setShow,setAddMessage,setColor} = useAuth();
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
  const [spe,setSpe] = useState({});
  const [onePal,setOnePal] = useState({});
  const [pal,setPal] = useState([]);
  const [spes,setSpes] = useState([]);
  const [semestreArr,setSemestreArr] = useState([]);
  const form = useRef();
  const semestre1 = [1,2];
  const semestre2 = [3,4];
  const semestre3 = [5,6];
  const getSpe = async () => {
    const {data} = await axios.get(`${getSpes}${user?.depID}`);
    setSpes(data);
  }
  const getOneSpe = async (id) => {
    const response = await axios.get(`${getOneSpes}${id}`);
    const result = await response.data;
    setSpe(result);
  }
  const getPal = async () => {
    const {data} = await axios.get(`${getPalier}${speid}`);
    setPal(data);
  }
  const getOnePal = async () => {
    const {data} = await axios.get(`${getOnePalier}${palid}`);
    setOnePal(data);
  }
  const handleAdd = async () => {
    const fillid = spe.fillid;
    const depid = user?.depID;
    const formData = {
      nom,
      speid,
      fillid,
      depid,
      vhg,
      hcour,
      htp,
      htd,
      abbr,
      semestre,
      palid
    }
    setAgain(false)
    addModule(formData)
    setOpenModule(false);
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
    setPalid(null);
    form.current.reset();
  }
  useEffect(() => {
    getSpe();
  },[])
  useEffect(() => {
    if(speid){
      getPal();
      getOneSpe(speid);
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
      if(onePal.annee === 3){
        setSemestreArr(semestre3);
      }
      if(onePal.annee === 4){
        setSemestreArr(semestre1);
      }
      if(onePal.annee === 5){
        setSemestreArr(semestre2);
      }
    }
  },[onePal])
  return (
    <div className={`w-full h-full absolute z-30 bg-[rgba(0,0,0,0.5)] top-0 left-0 ${openModule?'flex':'hidden'} justify-center items-center`}>
        <div className='h-[95%] aspect-[9/10] bg-white justify-between rounded-xl flex flex-col'>
          <div className='flex-1 flex justify-between px-3 items-center'>
            <p className='text-base py-4 font-bold'>Add Module</p>
            <MdClose onClick={() => setOpenModule(false)} className='text-2xl cursor-pointer'/>
          </div>
          <form ref={form} className='flex-[8] px-10 py-4 gap-3 flex flex-col'>
            <Input name={'Full name'} data={nom} type={'text'} setData={setNom} />
            <div className='flex flex-col w-full'>
                <label htmlFor={'pallier'} className='text-paleMain text-base font-medium cursor-pointer'>Specialities</label>
                <select onChange={(e) => setSpeid(e.target.value)} name="dropDown" id={'pallier'} className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none' placeholder='Domains'>
                    <option value="First" className='bg-separator hover:bg-black text-black' unselectable='on'>Specialities</option>
                    {spes?.map((spe) => {
                      const {nom,speid} = spe;
                        return(
                            <option key={speid} value={speid} className='bg-separator hover:bg-black text-black' >{nom}</option>
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
            <Select name={'Le semestre'} data={semestre} setData={setSemestre} array={semestreArr}/>
          </form>
          <div className='flex-1 flex justify-end items-center px-3 pb-3 gap-3'>
            <p className={`text-red text-sm ${again?'block':'hidden'}`}>Click again!</p>
            <button onClick={handleAdd} className='py-2 px-5 rounded-lg text-white bg-main'>Enter</button>
          </div>
        </div>
    </div>
  )
}

export default ModuleForm