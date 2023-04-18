import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import { useChef } from '../context/ChefContext'
import {MdClose} from 'react-icons/md'
import ChoixCard from './ChoixCard';
import {useAuth} from '../../../../../context/AuthContext'
import Input from '../../../Auth/components/Input';
import Select from './Select';
import axios from 'axios';
const getSections = 'https://pfeboumerdes.pythonanywhere.com/sections/';
const getGroups = 'https://pfeboumerdes.pythonanywhere.com/groupes/'
const getModules = 'https://pfeboumerdes.pythonanywhere.com/modules/'

const ChargeForm = ({choix,annee,speid,palid,cour,one,setCour,setOpenCharge,openCharge}) => {
  const [semestre,setSemestre] = useState([]);
  const {setShow,setAddMessage,setColor} = useAuth();
  const [sem,setSem] = useState(null);
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
  const [submit,setSubmit] = useState(false);
  const semestre1 = [1,2];
  const semestre2 = [3,4];
  const semestre3 = [5,6];
  const levelArr = ['section','group'];
  const cours = useRef();
  const tp = useRef();
  const td = useRef();
  const select = useRef();
  const select2 = useRef();
  const select3 = useRef();
  const select4 = useRef();
  const getSection = async () => {
    const {data} = await axios.get(`${getSections}spe/${speid}`);
    setSections(data);
  }
  const getGroup = async () => {
    const {data} = await axios.get(`${getGroups}sec/${section}`);
    setGroups(data);
  }
  const getModule = async () => {
    const {data} = await axios.get(`${getModules}pal/${palid}`);
    setModules(data);
  }
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
      cours.current.checked = false;
    }
  },[level])
  useEffect(() => {
    if(palid && speid){
      console.log(palid,speid)
      if(annee === 1){
        setSemestre(semestre1)
      }
      if(annee === 2){
        setSemestre(semestre2)
      }
      if(annee === 3){
        setSemestre(semestre3)
      }
      if(annee === 4){
        setSemestre(semestre1)
      }
      if(annee === 5){
        setSemestre(semestre2)
      }
      getSection();
      getModule();
    }
  },[palid,speid,one])
  useEffect(() => {
    if(section){
      getGroup();
    }
  },[section])
  useEffect(() => {
    if(sem){
      let arr = modules.filter((module) => {
        if(module.semestre === parseInt(sem)){
          return module;
        }
      });
      setModuleArr(arr);
    }
  },[modules,sem])
  const handleChange = (e) => {
    let arr = type || [];
    if(e.target.checked){
        arr.push(e.target.value);
        setType(arr);
    }else{
        let newArr = arr.filter((data) => {
            if(data !== e.target.value){
                return data;
            }
        })
        console.log(newArr)
        setType(newArr);
    }
  }
  const handleSubmit = () => {
    let arr = cour || [];
    console.log()
    const formData = {
      id: uuidv4(),
      semestre: sem,
      module: parseInt(module),
      section: parseInt(section),
      group: level === 'group'?parseInt(group):null,
      type
    }
    arr.push(formData);
    setCour(arr)
    setSubmit(true)
    setSem(null);
    setModule(null);
    setSection(null);
    setGroup(null);
    setType('');
    cours.current.checked = false;
    tp.current.checked = false;
    td.current.checked = false;
    if(select) select.current.value = 'modules';
    if(select4) select4.current.value = 'sections';
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
            <MdClose onClick={() => setOpenCharge(false)} className='text-2xl cursor-pointer'/>
          </div>
          <div className='flex-[8] px-10 py-4 gap-3 flex flex-col'>
            <ChoixCard choix={choix}/>
            <div className='gap-4 flex flex-col border rounded-lg px-4 py-3'>
                <div className='flex gap-4'>
                    <Select name={'Semestre'} submit={submit} setSubmit={setSubmit} setData={setSem} array={semestre}/>
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
                <div className={`flex items-center gap-6 ${!show && 'hidden'} mt-4`}>
                      <p>Select the type of class:</p>
                      <div className='flex gap-6'>
                        <div className='flex items-center gap-3'>
                          <label htmlFor="">TD</label>
                          <input ref={td} onChange={(e) => handleChange(e)} type="checkbox" className='accent-main h-4' name="choice" id="td" value={'td'} />
                        </div>
                        <div className='flex items-center gap-3'>
                          <label htmlFor="">TP</label>
                          <input ref={tp} onChange={(e) => handleChange(e)} type="checkbox" className='accent-main h-4' name="choice" id="tp" value={'tp'} />
                        </div>
                      </div>
                </div>
                <div className={`flex items-center gap-6 ${show && 'hidden'} mt-4`}>
                      <p>Select the type of class:</p>
                      <div className='flex gap-6'>
                        <div className='flex items-center gap-3'>
                          <label htmlFor="">Cours</label>
                          <input ref={cours} onChange={(e) => handleChange(e)} type="checkbox" className='accent-main h-4' name="choice" id="td" value={'cours'} />
                        </div>
                      </div>
                </div>
            </div>
          </div>
          <div className='flex-1 flex justify-end items-center px-3 pb-3 gap-3'>
            <button onClick={() => handleSubmit()} className='py-2 px-5 rounded-lg text-white bg-main'>Submit</button>
          </div>
        </div>
    </div>
  )
}

export default ChargeForm