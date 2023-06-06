import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from './components/Input'
import Select from '../Content/chefDep/components/Select';
import {useAdmin} from '../Content/admin/context/AdminContext'
import axios from 'axios';
import { useGest } from '../Content/Gestionair/context/GestContext';
const getTCFormation = 'http://127.0.0.1:5000/formationstc/';
const getSpes = 'http://127.0.0.1:5000/specialites/';
const getPals = 'http://127.0.0.1:5000/paliers/';
const getTcPals = 'http://127.0.0.1:5000/palierstc/';
const getSecs = 'http://127.0.0.1:5000/sections/pal/';
const getTcSecs = 'http://127.0.0.1:5000/sectionstc/pal/';
const getGrps = 'http://127.0.0.1:5000/groupes/sec/';
const getTcGrps = 'http://127.0.0.1:5000/groupestc/';
const signups = 'http://localhost:8000/api/etudiant/register-etudiant';

const Signup = () => {
  const {deps} = useAdmin();
  const navigate = useNavigate();
  const {speType,setSpeType} = useGest();
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
  const [specialite,setSpecialite] = useState(null);
  const [pallier,setPallier] = useState(null);
  const [section,setSection] = useState(null);
  const [group,setGroup] = useState(null);
  const [errors,setErrors] = useState([]);
  const [emailErr,setEmailErr] = useState('');
  const [idErr,setIdErr] = useState('');
  const [userErr,setUserErr] = useState('');
  const [passErr,setPassErr] = useState('');
  const [dateErr,setDateErr] = useState('');
  const [depErr,setDepErr] = useState('');
  const [speErr,setSpeErr] = useState('');
  const [palErr,setPalErr] = useState('');
  const [secErr,setSecErr] = useState('');
  const [grpErr,setGrpErr] = useState('');
  const div = useRef();
  const div2 = useRef();
  const div3 = useRef();
  const div4 = useRef();
  const con = useRef();
  const type = ['Tranc commun','Speciality'];

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
    try {
      const response = await axios.post(signups,formData);
      const result = await response.data;
      if(result.split(' ')[0] === 'NULL\nsuccess'){
        navigate('/login');
      }
    } catch (error) {
      console.log(Object.keys(JSON.parse(error.response.data.split('NULL\n')[1]).errors));
      setErrors(Object.keys(JSON.parse(error.response.data.split('NULL\n')[1]).errors));
    }
  }
  const handleSubmit = () => {
    setErrors('');
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
    console.log(formData)
    signup(formData);
  }
  useEffect(() => {
    if(errors.includes('group')){
      setGrpErr('Please select your group');
      setNumber(4);
    }
    if(errors.includes('section')){
      setSecErr('Please select your section');
      setNumber(4);
    }
    if(errors.includes('pallier')){
      setPalErr('Please select your year');
      setNumber(3);
    }
    if(errors.includes('specialite')){
      setSpeErr('Please select your speciality');
      setNumber(3);
    }
    if(errors.includes('dep')){
      setDepErr('Please select your department');
      setNumber(2);
    }
    if(errors.includes('userID')){
      if(userID === null){
        setIdErr('ID field must not be empty');
      }else{
        setIdErr('User ID already in use');
      }
      setNumber(2);
    }
    if(errors.includes('dateNaiss')){
      setDateErr('Birthday field must not be empty');
      setNumber(2);
    }
    if(errors.includes('password')){
      setPassErr('Password field must not be empty');
      setNumber(1);
    }
    if(errors.includes('email')){
      if(email === ''){
        setEmailErr('Email field must not be empty');
      }else{
        setEmailErr('The email has already been taken');
      }
      setNumber(1);
    }
    if(errors.includes('userName')){
      setUserErr('User name field must not be empty');
      setNumber(1);
    }
  },[errors])
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
    con.current.style.height = `${div.current.offsetHeight + 40}px`
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
    <div className='md:px-20 px-10 w-full flex flex-col items-center gap-10'>
        <h1 className='text-3xl text-main font-bold'>Get started</h1>
        <div ref={con} className='flex overflow-x-hidden w-full relative'>
          <div ref={div} className='w-full flex flex-col gap-8 flex-shrink-0 absolute'>
            <Input name={'User name'} type={'string'} setData={setUserName} err={userErr}/>
            <Input name={'Email'} type={'email'} setData={setEmail} err={emailErr}/>
            <Input name={'Password'} type={'password'} setData={setPassword} err={passErr}/>
          </div>
          <div ref={div2} className='w-full flex flex-col gap-8 flex-shrink-0 absolute'>
            <Input name={'Date de naissance'} type={'date'} setData={setDateNaiss} err={dateErr}/>
            <Input name={'Matricule'} type={'text'} setData={setUserID} err={idErr}/>
            <div className='flex flex-1 flex-col w-full relative'>
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
                  <p className='absolute -bottom-6 text-red'>{depErr}</p>
            </div>
          </div>
          <div ref={div3} className='w-full flex flex-col gap-8 flex-shrink-0 absolute'>
            <Select name={'Speciality type'} array={type} setData={setSpeType} />
            <div className='flex flex-1 flex-col w-full relative'>
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
              <p className='absolute -bottom-6 text-red'>{speErr}</p>
            </div>
            <div className='flex flex-1 flex-col w-full relative'>
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
              <p className='absolute -bottom-6 text-red'>{palErr}</p>
            </div>
          </div>
          <div ref={div4} className='w-full flex flex-col gap-8 flex-shrink-0 absolute'>
            <div className='flex flex-1 flex-col w-full relative'>
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
                <p className='absolute -bottom-6 text-red'>{secErr}</p>
            </div>
            <div className='flex flex-1 flex-col w-full relative'>
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
              <p className='absolute -bottom-6 text-red'>{grpErr}</p>
            </div>
          </div>
        </div>
        <div className='flex justify-between items-center gap-4 w-full font-semibold'>
          <button onClick={() => {
            if(number > 1){
              setNumber(number - 1);
            }if(number === 1){
              setNumber(4);
            }
          }} className='py-2 flex-1 flex items-center justify-center bg-gray-300 text-blac2 rounded-lg'>Prev</button>
          <button onClick={() => {
            if(number < 4){
              setNumber(number + 1)
            }if(number === 4){
              setNumber(1);
            }
          }} className={`py-2 flex-1 items-center justify-center bg-main text-white rounded-lg ${number !== 4?'flex':'hidden'}`}>Next</button>
          <button onClick={handleSubmit} className={`py-2 flex-1 items-center justify-center bg-main text-white rounded-lg ${number === 4?'flex':'hidden'}`} >Signup</button>
        </div>
        <div className='flex flex-col gap-1 -mt-6 mb-5 items-center relative w-full'>
          <p className='text-sm text-paleMain'>Already have an account? <Link to={'login'} className='text-main font-bold'>Log in</Link></p>
        </div>
    </div>
  )
}

export default Signup