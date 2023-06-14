import React, { useEffect, useRef, useState } from 'react'
import { useChef } from './context/ChefContext'
import axios from 'axios';
import { useAuth } from '../../../../context/AuthContext';
import Teacher from './components/Teacher';
import Select from './components/Select';
import { useProf } from '../Prof/context/ProfContext';
import SpeTeacher from './components/SpeTeacher';
const getpal = 'http://127.0.0.1:5000/paliers/';
const getTcpal = 'http://127.0.0.1:5000/palierstc/';
const getSpe = 'http://127.0.0.1:5000/specialites/';
const getTcSpe = 'http://127.0.0.1:5000/formationstc/';
const getOnepals = 'http://127.0.0.1:5000/palier/';
const getOneTcpals = 'http://127.0.0.1:5000/paliertc/';
const getDepProfs = 'http://127.0.0.1:8000/api/chefdep/get-enseignantbydepid/';

const ChargeTest = () => {
  const {user} = useAuth();
  const {choix} = useProf();
  const {profs} = useChef();  
  const [tc,setTc] = useState(false);
  const [speid,setSpeid] = useState(null);
  const [palid,setPalid] = useState(null);
  const [spes,setSpes] = useState([]);
  const [tcspes,setTcSpes] = useState([]);
  const [pals,setPals] = useState([]);
  const [prof,setProf] = useState([]);
  const [onePals,setOnePals] = useState({});
  const [semestre,setSemestre] = useState([]);
  const [sem,setSem] = useState('');
  const [teachers,setTeachers] = useState([]);
  const [on,setOn] = useState(false);
  const semestre1 = [1,2];
  const semestre2 = [3,4];
  const semestre3 = [5,6];
  const getPals = async () => {
    const {data} = await axios.get(`${getpal}${speid}`);
    setPals(data);
  }
  const getTcPals = async () => {
    const {data} = await axios.get(`${getTcpal}${speid}`);
    setPals(data);
  }
  const getSpes = async () => {
    const {data} = await axios.get(`${getSpe}${user?.depID}`);
    setSpes(data);
  }
  const getTcSpes = async () => {
    const {data} = await axios.get(`${getTcSpe}${user?.depID}`);
    setTcSpes(data);
  }
  const getOnepal = async () => {
    const {data} = await axios.get(`${getOnepals}${palid}`);
    setOnePals(data);
  }
  const getOneTcpal = async () => {
    const {data} = await axios.get(`${getOneTcpals}${palid}`);
    setOnePals(data);
  }
  const getProf = async () => {
    const  {data} = await axios.get(`${getDepProfs}${user?.depID}`);
    setProf(data);
  }
  useEffect(() => {
    getSpes();
    getTcSpes();
  },[])
  useEffect(() => {
    if(speid){
      if(tc){
        getTcPals();
      }else{
        getPals();
      }
    }
  },[speid])
  useEffect(() => {
    if(palid){
      if(tc){
        getOneTcpal()
      }else{
        getOnepal();
      }
    }
  },[palid])
  useEffect(() => {
    getProf();
  },[profs])
  useEffect(() => {
    if(Object.keys(onePals).length > 0){
      switch(onePals.annee){
        case 1 :
          setSemestre(semestre1);
          break;
        case 2 :
          setSemestre(semestre2);
          break;
        case 3 :
          setSemestre(semestre3);
          break;
        default :
          setSemestre([]);
          break;
      }
    }
  },[onePals])
  useEffect(() => {
    let arr = [];
    choix.map((choice) => {
        const {choix1,choix2,choix3,choix4,choix5,teacherid} = choice;
        if(parseInt(palid) === JSON.parse(choix1).palid || parseInt(palid) === JSON.parse(choix2).palid || parseInt(palid) === JSON.parse(choix3).palid || parseInt(palid) === JSON.parse(choix4).palid || parseInt(palid) === JSON.parse(choix5).palid){
          if(!arr.includes(teacherid)){
            arr.push(teacherid);
            setTeachers(arr);
          }
        }
    })
    if(arr.length === 0){
      setTeachers([])
    }
  },[palid])
  const handleTranslate = (id) => {
    const prof = document.getElementById(id);
    prof.scrollIntoView()
  }
  return (
    <div className='flex flex-col gap-6 overflow-hidden'>
        <div className='flex gap-6'>
            <div className='flex flex-1 flex-col w-full'>
                  <label htmlFor={'module'} className='text-paleMain text-base font-medium cursor-pointer'>Specialities</label>
                  <select onChange={(e) => {
                    setSpeid(e.target.value)
                    if(e.target.options[e.target.options.selectedIndex].dataset.type === 'commun'){
                      setTc(true)
                    }else{
                      setTc(false)
                    }
                  }} name="dropDown" id={'module'} className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none' placeholder='Domains'>
                      <option value={'modules'} className='bg-separator hover:bg-black text-black' unselectable='on'>Specialities</option>
                      {spes?.map((spe) => {
                        const {nom,speid} = spe;
                          return(
                              <option data-type='data' key={speid} value={speid} className='bg-separator hover:bg-black text-black' >{nom}</option>
                          )
                      })}
                      {tcspes?.map((spe) => {
                        const {nom,ftcid} = spe;
                          return(
                              <option data-type='commun' key={ftcid} value={ftcid} className='bg-separator hover:bg-black text-black' >{nom}</option>
                          )
                      })}
                  </select>
            </div>
            <div className='flex flex-1 flex-col w-full'>
                  <label htmlFor={'module'} className='text-paleMain text-base font-medium cursor-pointer'>Paliers</label>
                  <select onChange={(e) => setPalid(e.target.value)} name="dropDown" id={'module'} className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none' placeholder='Domains'>
                      <option value={'modules'} className='bg-separator hover:bg-black text-black' unselectable='on'>Paliers</option>
                      {pals?.map((pal) => {
                        const {nom,palid} = pal;
                          return(
                              <option key={palid} value={palid} className='bg-separator hover:bg-black text-black' >{nom}</option>
                          )
                      })}
                  </select>
            </div>
            <Select name={'Semesters'} array={semestre} setData={setSem} />
        </div>
        <div className='flex w-full justify-between gap-6 items-center'>
            <div className='flex flex-1 items-end gap-6'>
              <p className='text-base font-bold'>Scroll to :</p>
              <div className='flex flex-1 flex-col'>
                  <select onChange={(e) => handleTranslate(e.target.value)} name="dropDown" id={'module'} className='px-2 pb-2 h-8 border-b-paleMain text-main font-bold border-b-2 bg-transparent outline-none w-60' placeholder='Domains'>
                      <option value={'modules'} className='bg-separator hover:bg-black text-black' unselectable='on'>Teachers</option>
                      {prof?.map((pro) => {
                        const {userName,userID} = pro;
                          return(
                              <option key={userID} value={userID} className='bg-separator hover:bg-black text-black' >{userName}</option>
                          )
                      })}
                  </select>
              </div>
            </div>
            <div className='flex flex-1 items-center justify-end gap-6'>
              <p className='text-base font-bold'>Show only teachers related to this palier</p>
              <div onClick={() => setOn(!on)} className={`w-14 ${on?'border-main':'border'} border rounded-full h-7 p-2 flex items-center relative cursor-pointer hover:border-main group`}> 
                  <div className={`w-5 h-5 rounded-full absolute transition-[left_300ms_right_300ms] ${on?'bg-main translate-x-[22px]':'bg-gray-300 group-hover:bg-main -translate-x-1'}`}></div>
              </div>
            </div>
        </div>
        <div className='flex flex-col gap-8 overflow-x-scroll scroll-smooth con'>
          {!on && (<Teacher key={user?.userID} grad={'Chef dep'} tc={tc} nom={user?.userName} palid={palid} speid={speid} one={onePals} annee={onePals.annee} semester={sem} profid={user?.userID} type='chef' />)}
          {!on && prof.map((pro) => {
                const {userName,userID,grad} = pro;
                return(
                  <Teacher key={userID} tc={tc} grad={grad} nom={userName} palid={palid} speid={speid} one={onePals} annee={onePals.annee} semester={sem} profid={userID} />
                )
          })}
          {on && teachers.map((teacher) => {
                return(
                  <SpeTeacher on={on} key={teacher} tc={tc} profid={teacher} palid={palid} speid={speid} one={onePals} annee={onePals.annee} semester={sem} />
                )
          })}
        </div>
    </div>
  )
}

export default ChargeTest