import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import { useChef } from '../context/ChefContext'
import {MdClose} from 'react-icons/md'
import ChoixCard from './ChoixCard';
import {useAuth} from '../../../../../context/AuthContext'
import Select from './Select';
import axios from 'axios';
const getSections = 'http://127.0.0.1:5000/sections/';
const getTcSections = 'http://127.0.0.1:5000/sectionstc/spe/';
const getGroups = 'http://127.0.0.1:5000/groupes/'
const getTcGroups = 'http://127.0.0.1:5000/groupestc/'
const getModules = 'http://127.0.0.1:5000/modules/';
const getTcModules = 'http://127.0.0.1:5000/modulestc/';
const getChoix = 'http://127.0.0.1:5000/veuxs/';

const ChargeForm = ({speid,palid,one,setOpenCharge,openCharge,semestre,profid,cours,tc,typpe}) => {
  const {setShow,setAddMessage,setColor,user} = useAuth();
  const {addAffect} = useChef();
  const [level,setLevel] = useState('');
  const [sections,setSections] = useState([]);
  const [section,setSection] = useState(null);
  const [groups,setGroups] = useState([]);
  const [group,setGroup] = useState(null);
  const [modules,setModules] = useState([]);
  const [module,setModule] = useState(null);
  const [moduleArr,setModuleArr] = useState([]);
  const [type,setType] = useState([]);
  const [show,setShoww] = useState(false);
  const [choix,setChoix] = useState({});
  const [submit,setSubmit] = useState(false);
  const [exists,setExists] = useState(false);
  const [error,setError] = useState('');
  const levelArr = ['section','group'];
  const courss = useRef();
  const tp = useRef();
  const td = useRef();
  const form = useRef();
  const select = useRef();
  const select2 = useRef();
  const select3 = useRef();
  const select4 = useRef();
  const getSection = async () => {
    const {data} = await axios.get(`${getSections}spe/${speid}`);
    setSections(data);
  }
  const getTCSection = async () => {
    const {data} = await axios.get(`${getTcSections}${speid}`)
    setSections(data);
  }
  const getGroup = async () => {
    const {data} = await axios.get(`${getGroups}sec/${section}`);
    setGroups(data);
  }
  const getTcGroup = async () => {
    const {data} = await axios.get(`${getTcGroups}${section}`);
    setGroups(data);
  }
  const getChoice = async () => {
    const {data} = await axios.get(`${getChoix}${profid}`);
    setChoix(data);
  }
  const getModule = async () => {
    const {data} = await axios.get(`${getModules}pal/${palid}`);
    setModules(data);
  }
  const getTcModule = async () => {
    const {data} = await axios.get(`${getTcModules}pal/${palid}`);
    setModules(data);
  }
  useEffect(() => {
    getChoice();
  },[])
  useEffect(() => {
    cours?.map((cour) => {
      if(level === 'section' && cour.module === parseInt(module) && cour.section === parseInt(section)){
        setExists(true);
      }else{
        setExists(false);
      }
    })
    console.log(type)
  },[module,type,section])
  useEffect(() => {
    if(level === 'section'){
      setShoww(false);
      setGroup(null);
      setType([]);
      tp.current.checked = false;
      td.current.checked = false;
    }
    if(level === 'group'){
      setShoww(true);
      setType([]);
      courss.current.checked = false;
    }
  },[level])
  useEffect(() => {
    if(palid && speid){
      if(tc){
        getTCSection();
        getTcModule();
      }else{
        getSection();
        getModule();
      }
    }
  },[palid,speid,one,tc])
  useEffect(() => {
    if(section){
      if(tc){
        getTcGroup();
      }else{
        getGroup();
      }
    }
  },[section])
  useEffect(() => {
    if(semestre){
      let arr = modules.filter((module) => {
        if(module.semestre === parseInt(semestre)){
          return module;
        }
      });
      setModuleArr(arr);
    }
  },[modules,semestre])
  const handleChange = (e) => {
    let arr = [];
    if(e.target.checked){
        arr.push(e.target.value);
        setType(arr);
    }
  }
  const handleSubmit = () => {
    const formData = {
      profid,
      semestre,
      module: parseInt(module),
      section: parseInt(section),
      groupe: level === 'group'?parseInt(group):null,
      type: JSON.stringify(type),
      tc,
      chef: typpe === 'chef'?true:false,
      depid: user.depID
    }
    if(section === null){
      setError('Section field must not be empty');
      return;
    }
    if(group === null && level === 'group'){
      setError('Group field must not be empty');
      return;
    }
    if(module === null){
      setError('Module field must not be empty');
      return;
    }
    if(type.length === 0){
      setError('Choose class type');
      return;
    }
    addAffect(formData);
    setSubmit(true)
    setModule(null);
    setSection(null);
    setGroup(null);
    setType([]);
    courss.current.checked = false;
    tp.current.checked = false;
    td.current.checked = false;
    form.current.reset();
    setOpenCharge(false);
    setShow(true);
    setAddMessage('Added cours successfuly');
    setColor(true);
  }
  return (
    <div className={`w-full h-full absolute z-30 bg-[rgba(0,0,0,0.5)] top-0 left-0 ${openCharge?'flex':'hidden'} justify-center items-center`}>
        <div className='h-[95%] aspect-[15/10] bg-white justify-between rounded-xl flex flex-col'>
          <div className='flex-1 flex justify-between px-3 items-center'>
            <p className='text-base py-4 font-bold'>Charge</p>
            <MdClose onClick={() => {
              setOpenCharge(false);
              setError('');
            }} className='text-2xl cursor-pointer'/>
          </div>
          <div className='flex-[8] px-10 py-4 gap-3 flex flex-col'>
            <ChoixCard choix={choix}/>
            <form ref={form} className='gap-4 flex flex-col border rounded-lg px-4 py-3'>
                <div className='flex gap-4'>
                      <Select name={'Level'} submit={submit} setSubmit={setSubmit} array={levelArr} setData={setLevel}/>
                      {level === 'group' && (<div className='flex flex-1 gap-2'>
                        <div className='flex flex-1 flex-col w-full'>
                            <label htmlFor={'section'} className='text-paleMain text-base font-medium cursor-pointer'>Sections</label>
                            <select ref={select2} onChange={(e) => setSection(e.target.value)} name="dropDown" id={'section'} className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none' placeholder='Domains'>
                                <option value={'sections'} className='bg-separator hover:bg-black text-black' unselectable='on'>Sections</option>
                                {sections?.map((sec) => {
                                  const {nom,secid} = sec;
                                    return(
                                        <option key={secid} value={secid} className='bg-separator hover:bg-black text-black' >{nom}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='flex flex-1 flex-col w-full'>
                            <label htmlFor={'group'} className='text-paleMain text-base font-medium cursor-pointer'>Groups</label>
                            <select ref={select3} onChange={(e) => setGroup(e.target.value)} name="dropDown" id={'group'} className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none' placeholder='Domains'>
                                <option value={'groups'} className='bg-separator hover:bg-black text-black' unselectable='on'>Groups</option>
                                {groups?.map((sec) => {
                                  const {nom,grpid} = sec;
                                    return(
                                        <option key={grpid} value={grpid} className='bg-separator hover:bg-black text-black' >{nom}</option>
                                    )
                                })}
                            </select>
                        </div>
                      </div>)}
                      {level === 'section' && (
                        <div className='flex flex-1 flex-col w-full'>
                            <label htmlFor={'section'} className='text-paleMain text-base font-medium cursor-pointer'>Sections</label>
                            <select ref={select4} onChange={(e) => setSection(e.target.value)} name="dropDown" id={'section'} className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none' placeholder='Domains'>
                                <option value={'sections'} className='bg-separator hover:bg-black text-black' unselectable='on'>Sections</option>
                                {sections?.map((sec) => {
                                  const {nom,secid} = sec;
                                    return(
                                        <option key={secid} value={secid} className='bg-separator hover:bg-black text-black' >{nom}</option>
                                    )
                                })}
                            </select>
                        </div>)}
                </div>
                <div className='flex gap-4'>
                    <div className='flex flex-1 flex-col w-full'>
                          <label htmlFor={'module'} className='text-paleMain text-base font-medium cursor-pointer'>Modules</label>
                          <select ref={select} onChange={(e) => setModule(e.target.value)} name="dropDown" id={'module'} className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none' placeholder='Domains'>
                              <option value={'modules'} className='bg-separator hover:bg-black text-black' unselectable='on'>Modules</option>
                              {moduleArr?.map((sec) => {
                                const {nom,modid} = sec;
                                  return(
                                      <option key={modid} value={modid} className='bg-separator hover:bg-black text-black' >{nom}</option>
                                  )
                              })}
                          </select>
                    </div>
                </div>
                <div className={`flex items-center gap-6 ${!show && 'hidden'} mt-4`}>
                      <p>Sélectionnez le type de classe:</p>
                      <div className='flex gap-6'>
                        <div className='flex items-center gap-3'>
                          <label htmlFor="">TD</label>
                          <input ref={td} onChange={(e) => handleChange(e)} type="radio" className='accent-main h-4' name="choice" id="td" value={'td'} />
                        </div>
                        <div className='flex items-center gap-3'>
                          <label htmlFor="">TP</label>
                          <input ref={tp} onChange={(e) => handleChange(e)} type="radio" className='accent-main h-4' name="choice" id="tp" value={'tp'} />
                        </div>
                      </div>
                </div>
                <div className={`flex items-center gap-6 ${show && 'hidden'} mt-4`}>
                      <p>Sélectionnez le type de classe:</p>
                      <div className='flex gap-6'>
                        <div className='flex items-center gap-3'>
                          <label htmlFor="">Cours</label>
                          <input ref={courss} onChange={(e) => handleChange(e)} type="radio" className='accent-main h-4' name="choice" id="td" value={'cours'} />
                        </div>
                      </div>
                </div>
            </form>
          </div>
          <div className='flex-1 flex justify-between items-center px-3 pb-3 gap-3'>
            <p className='text-base w-96 text-red'>{exists && ('this module is already being taught in this section, please pick another section or module')}</p>
            <p className='text-red'> {error} </p>
            <button onClick={() => handleSubmit()} className={`py-2 px-5 rounded-lg text-white ${exists?'bg-paleMain pointer-events-none':'bg-main'}`}>Ajouter</button>
          </div>
        </div>
    </div>
  )
}

export default ChargeForm