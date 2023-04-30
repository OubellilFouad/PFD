import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Input from './components/Input'
import Select from '../Content/chefDep/components/Select';
import {useAdmin} from '../Content/admin/context/AdminContext'
import axios from 'axios';
const getTCFormation = 'https://pfeboumerdes.pythonanywhere.com/formationstc/';
const getSpes = 'https://pfeboumerdes.pythonanywhere.com/specialites/';
const getPals = 'https://pfeboumerdes.pythonanywhere.com/paliers/';
const getTcPals = 'https://pfeboumerdes.pythonanywhere.com/palierstc/';
const getSecs = 'https://pfeboumerdes.pythonanywhere.com/sections/pal/';
const getTcSecs = 'https://pfeboumerdes.pythonanywhere.com/sectionstc/pal/';
const getGrps = 'https://pfeboumerdes.pythonanywhere.com/groupes/sec/';
const getTcGrps = 'https://pfeboumerdes.pythonanywhere.com/groupestc/';
const signups = 'http://localhost:8000/api/student/signup';

const Signup = () => {
  const {deps} = useAdmin()
  const [number,setNumber] = useState(1);
  const [spes,setSpes] = useState([]);
  const [spestc,setSpestc] = useState([]);
  const [pals,setPals] = useState([]);
  const [secs,setSecs] = useState([]);
  const [grps,setGrps] = useState([]);
  const [userName,setUserName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [dateNaiss,setDateNaiss] = useState('');
  const [userID,setUserID] = useState(null);
  const [dep,setDep] = useState(null);
  const [speType,setSpeType] = useState('');
  const [specialite,setSpecialite] = useState(null);
  const [pallier,setPallier] = useState(null);
  const [section,setSection] = useState(null);
  const [group,setGroup] = useState(null);
  const div = useRef();
  const div2 = useRef();
  const div3 = useRef();
  const div4 = useRef();
  const con = useRef();
  const type = ['Tranc commun','Speciality']

  const getSpe = async (id) => {
    const {data} = await axios.get(`${getSpes}${id}`);
    setSpes(data);
  }
  const getTcSpe = async (id) => {
    const {data} = await axios.get(`${getTCFormation}${id}`);
    setSpestc(data);
  }
  const getPal = async (id) => {
    const {data} = await axios.get(`${getPals}${id}`);
    setPals(data);
    console.log(data)
  }
  const getTcPal = async (id) => {
    const {data} = await axios.get(`${getTcPals}${id}`);
    setPals(data);
  }
  const getSec = async (id) => {
    const {data} = await axios.get(`${getSecs}${id}`);
    setSecs(data);
  }
  const getTcSec = async (id) => {
    const {data} = await axios.get(`${getTcSecs}${id}`);
    setSecs(data);
  }
  const getGrp = async (id) => {
    const {data} = await axios.get(`${getGrps}${id}`);
    setGrps(data);
  }
  const getTcGrp = async (id) => {
    const {data} = await axios.get(`${getTcGrps}${id}`);
    setGrps(data);
  }
  const signup = async (formData) => {
    const {data} = await axios.post(signups,formData);
    console.log(data);
  }
  const handleSubmit = () => {
    const formData = {
      userName,
      userID: parseInt(userID),
      email,
      password,
      dateNaiss,
      dep: parseInt(dep),
      specialite: parseInt(specialite),
      pallier: parseInt(pallier),
      section: parseInt(section),
      group: parseInt(group),
      role: 4
    }
    signup(formData);
  }
  useEffect(() => {
    if(dep){
      if(speType === 'Tranc commun'){
        getTcSpe(dep);
        setSpes([]);
      }else{
        getSpe(dep);
        setSpestc([]);
      }
    }
  },[speType,dep])
  useEffect(() => {
    if(specialite){
      if(speType === 'Tranc commun'){
        getTcPal(specialite);
      }else{
        getPal(specialite);
      }
    }
  },[specialite,speType])
  useEffect(() => {
    if(pallier){
      if(speType === 'Tranc commun'){
        getTcSec(pallier);
      }else{
        getSec(pallier);
      }
    }
  },[pallier,speType])
  useEffect(() => {
    if(section){
      if(speType === 'Tranc commun'){
        getTcGrp(section);
      }else{
        getGrp(section);
      }
    }
  },[section,speType])
  useEffect(() => {
    con.current.style.height = `${div.current.offsetHeight}px`
  },[])
  useEffect(() => {
    if(number === 1){
      // div 1
      div.current.classList.remove('translate-x-full');
      div.current.classList.remove('-translate-x-full');
      div.current.classList.add('translate-x-0');
      // div 2
      div2.current.classList.remove('translate-x-0');
      div2.current.classList.remove('-translate-x-full');
      div2.current.classList.add('translate-x-full');
      // div 3
      div3.current.classList.remove('translate-x-full');
      div3.current.classList.remove('translate-x-0');
      div3.current.classList.add('-translate-x-full');
      // div 4
      div4.current.classList.remove('translate-x-full');
      div4.current.classList.remove('translate-x-0');
      div4.current.classList.add('-translate-x-full');
    }
    if(number === 2){
      // div 1
      div.current.classList.remove('translate-x-0');
      div.current.classList.remove('translate-x-full');
      div.current.classList.add('-translate-x-full');
      // div 2
      div2.current.classList.remove('-translate-x-full');
      div2.current.classList.remove('translate-x-full');
      div2.current.classList.add('translate-x-0');
      // div 3
      div3.current.classList.remove('translate-x-0');
      div3.current.classList.remove('-translate-x-full');
      div3.current.classList.add('translate-x-full');
      // div 4
      div4.current.classList.remove('translate-x-full');
      div4.current.classList.remove('translate-x-0');
      div4.current.classList.add('-translate-x-full');
    }
    if(number === 3){
      // div 1
      div.current.classList.remove('translate-x-0');
      div.current.classList.remove('translate-x-full');
      div.current.classList.add('-translate-x-full');
      // div 2
      div2.current.classList.remove('translate-x-0');
      div2.current.classList.remove('translate-x-full');
      div2.current.classList.add('-translate-x-full');
      // div 3
      div3.current.classList.remove('-translate-x-full');
      div3.current.classList.remove('translate-x-full');
      div3.current.classList.add('translate-x-0');
      // div 4
      div4.current.classList.remove('-translate-x-full');
      div4.current.classList.remove('translate-x-0');
      div4.current.classList.add('translate-x-full');
    }
    if(number === 4){
      // div 1
      div.current.classList.remove('translate-x-0');
      div.current.classList.remove('-translate-x-full');
      div.current.classList.add('translate-x-full');
      // div 2
      div2.current.classList.remove('translate-x-0');
      div2.current.classList.remove('translate-x-full');
      div2.current.classList.add('-translate-x-full');
      // div 3
      div3.current.classList.remove('translate-x-full');
      div3.current.classList.remove('translate-x-0');
      div3.current.classList.add('-translate-x-full');
      // div 4
      div4.current.classList.remove('translate-x-full');
      div4.current.classList.remove('-translate-x-full');
      div4.current.classList.add('translate-x-0');
    }
  },[number])
  return (
    <div className='px-20 w-full flex flex-col items-center gap-8'>
        <h1 className='text-3xl text-main font-bold'>Get started</h1>
        <div ref={con} className='flex overflow-hidden w-full relative'>
          <div ref={div} className='w-full flex flex-col gap-6 flex-shrink-0 absolute'>
            <Input name={'User name'} type={'string'} setData={setUserName} />
            <Input name={'Email'} type={'email'} setData={setEmail}/>
            <Input name={'Password'} type={'password'} setData={setPassword}/>
          </div>
          <div ref={div2} className='w-full flex flex-col gap-6 flex-shrink-0 absolute'>
            <Input name={'Date de naissance'} type={'date'} setData={setDateNaiss}/>
            <Input name={'Matricule'} type={'text'} setData={setUserID} />
            <div className='flex flex-1 flex-col w-full'>
                  <label htmlFor={'module'} className='text-paleMain text-base font-medium cursor-pointer'>Departments</label>
                  <select onChange={e => setDep(e.target.value)} name="dropDown" id={'module'} className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none' placeholder='Domains'>
                      <option value={'modules'} className='bg-separator hover:bg-black text-black' unselectable='on'>Departments</option>
                      {deps.map((dep) => {
                        const {depid,nom} = dep;
                        return(
                          <option key={depid} value={depid} className='bg-separator hover:bg-black text-black' unselectable='on'>{nom}</option>
                        )
                      })}
                  </select>
            </div>
          </div>
          <div ref={div3} className='w-full flex flex-col gap-6 flex-shrink-0 absolute'>
            <Select name={'Speciality type'} array={type} setData={setSpeType} />
            <div className='flex flex-1 flex-col w-full'>
              <label htmlFor={'module'} className='text-paleMain text-base font-medium cursor-pointer'>Speciality</label>
              <select onChange={e => setSpecialite(e.target.value)} name="dropDown" id={'module'} className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none' placeholder='Domains'>
                  <option value={'modules'} className='bg-separator hover:bg-black text-black' unselectable='on'>Speciality</option>
                  {spes.map((spe) => {
                        const {speid,nom} = spe;
                        return(
                          <option key={speid} value={speid} className='bg-separator hover:bg-black text-black' unselectable='on'>{nom}</option>
                        )
                  })}
                  {spestc.map((spe) => {
                        const {ftcid,nom} = spe;
                        return(
                          <option key={ftcid} value={ftcid} className='bg-separator hover:bg-black text-black' unselectable='on'>{nom}</option>
                        )
                  })}
              </select>
            </div>
            <div className='flex flex-1 flex-col w-full'>
              <label htmlFor={'module'} className='text-paleMain text-base font-medium cursor-pointer'>Annee</label>
              <select onChange={e => setPallier(e.target.value)} name="dropDown" id={'module'} className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none' placeholder='Domains'>
                  <option value={'modules'} className='bg-separator hover:bg-black text-black' unselectable='on'>Annee</option>
                  {pals.map((pal) => {
                        const {palid,nom} = pal;
                        return(
                          <option key={palid} value={palid} className='bg-separator hover:bg-black text-black' unselectable='on'>{nom}</option>
                        )
                  })}
              </select>
            </div>
          </div>
          <div ref={div4} className='w-full flex flex-col gap-6 flex-shrink-0 absolute'>
            <div className='flex flex-1 flex-col w-full'>
                <label htmlFor={'module'} className='text-paleMain text-base font-medium cursor-pointer'>Section</label>
                <select onChange={e => setSection(e.target.value)} name="dropDown" id={'module'} className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none' placeholder='Domains'>
                    <option value={'modules'} className='bg-separator hover:bg-black text-black' unselectable='on'>Section</option>
                    {secs.map((sec) => {
                      const {secid,nom} = sec;
                      return(
                        <option key={secid} value={secid} className='bg-separator hover:bg-black text-black' unselectable='on'>{nom}</option>
                      )
                    })}
                </select>
              </div>
              <div className='flex flex-1 flex-col w-full'>
                <label htmlFor={'module'} className='text-paleMain text-base font-medium cursor-pointer'>Groupe</label>
                <select onChange={e => setGroup(e.target.value)} name="dropDown" id={'module'} className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none' placeholder='Domains'>
                    <option value={'modules'} className='bg-separator hover:bg-black text-black' unselectable='on'>Groupe</option>
                    {grps.map((grp) => {
                      const {grpid,nom} = grp;
                      return(
                        <option key={grpid} value={grpid} className='bg-separator hover:bg-black text-black' unselectable='on'>{nom}</option>
                      )
                    })}
                </select>
              </div>
          </div>
        </div>
        <div className='flex justify-between items-center gap-4 w-full'>
          <button onClick={() => {
            if(number > 1){
              setNumber(number - 1);
            }if(number === 1){
              setNumber(4);
            }
          }} className='py-2 flex-1 flex items-center justify-center bg-separator text-blac2 rounded-lg'>Prev</button>
          <button onClick={() => {
            if(number < 4){
              setNumber(number + 1)
            }if(number === 4){
              setNumber(1);
            }
          }} className={`py-2 flex-1 items-center justify-center bg-main text-white rounded-lg ${number !== 4?'flex':'hidden'}`}>Next</button>
          <button onClick={handleSubmit} className={`py-2 flex-1 items-center justify-center bg-main text-white rounded-lg ${number === 4?'flex':'hidden'}`} >SUBMIT</button>
        </div>
        
        <p className='text-sm text-paleMain'>Already have an account? <Link to={'login'} className='text-main font-bold'>Log in</Link></p>
    </div>
  )
}

export default Signup