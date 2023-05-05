import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import HoursGest from './HoursGest';
import DayProf from '../../Prof/components/DayProf';
import { useGest } from '../context/GestContext';
import { useReactToPrint } from 'react-to-print';
import { SiAdobeacrobatreader } from 'react-icons/si';
import { useAuth } from '../../../../../context/AuthContext';
const getEdt = 'https://pfeboumerdes.pythonanywhere.com/edts/prof/';
const getDeps = 'https://pfeboumerdes.pythonanywhere.com/dep/';
const getProfs = 'http://127.0.0.1:8000/api/chefdep/get-enseignantbyid/';
const getOneChefs = 'http://localhost:8000/api/admin/get-chefdepbyid/';

const EDTP = () => {
  const {user} = useAuth();
  const {sem} = useGest();
  const location = useLocation(); 
  const [edt,setEdt] = useState([]);
  const [edtSem,setEdtSem] = useState([]);
  const [dep,setDep] = useState({});
  const [prof,setProf] = useState({});

  const [edt1,setEdt1] = useState([]);
  const [edt2,setEdt2] = useState([]);
  const [edt3,setEdt3] = useState([]);
  const [edt4,setEdt4] = useState([]);
  const [edt5,setEdt5] = useState([]);
  const [edt6,setEdt6] = useState([]);

  const [before,setBefore] = useState(false);

  const edtDiv = useRef();

  const handlePrint = useReactToPrint({
    content: () => edtDiv.current,
    documentTitle: `Emploi du temps `,
    onBeforeGetContent: async () => {
      setBefore(true);
    },
    onAfterPrint: () => {
      setBefore(false);
    }
  }) 
  
  const getDep = async (id) => {
    const {data} = await axios.get(`${getDeps}${user?.depID}`);
    setDep(data);
  }
  const getEdts = async (id) => {
    const {data} = await axios.get(`${getEdt}${id}`);
    setEdt(data);
    console.log(data)
  }
  const getProf = async (id) => {
    const {data} = await axios.get(`${getProfs}${id}`);
    setProf(data);
  }
  const getChef = async (id) => {
    const {data} = await axios.get(`${getOneChefs}${id}`);
    setProf(data);
  }
  useEffect(() => {
    if(Object.keys(prof).length !== 0){
      getDep(prof.depID);
    }
  },[prof])
  useEffect(() => {
    setEdt([]);
    if(location.state.profid){
        getEdts(location.state.profid);
        console.log(location.state.chef);
        if(location.state.chef){
          getChef(location.state.profid)
        }else{
          getProf(location.state.profid);
        }
    }
  },[location.state.profid])
  useEffect(() => {
    if(sem === 'first'){
      if(edt.length !== 0){
        let here = edt.filter(e => parseInt(e.semestre) === 5 || parseInt(e.semestre) === 3 || parseInt(e.semestre) === 1);
        setEdtSem(here);
      }else{
        setEdtSem([]);
      }
    }
    if(sem === 'second'){
      if(edt.length !== 0){
        let here = edt.filter(e => parseInt(e.semestre) === 6 || parseInt(e.semestre) === 4 || parseInt(e.semestre) === 2);
        setEdtSem(here);
      }else{
        setEdtSem([]);
      }
    }
  },[edt,sem])
  useEffect(() => {
    setEdt1([]);
    let arr1 = [];
    setEdt2([]);
    let arr2 = [];
    setEdt3([]);
    let arr3 = [];
    setEdt4([]);
    let arr4 = [];
    setEdt5([]);
    let arr5 = [];
    setEdt6([]);
    let arr6 = [];
    if(edtSem.lenght !== 0){
      edtSem.map((edt) => {
        if(edt.day === 1){
            arr1.push(edt);
            setEdt1(arr1);
        }
        if(edt.day === 2){
            arr2.push(edt);
            setEdt2(arr2);
        }
        if(edt.day === 3){
            arr3.push(edt);
            setEdt3(arr3);
        }
        if(edt.day === 4){
            arr4.push(edt);
            setEdt4(arr4);
        }
        if(edt.day === 5){
            arr5.push(edt);
            setEdt5(arr5);
        }
        if(edt.day === 6){
          arr6.push(edt);
          setEdt6(arr6);
      }
      })
    }
    if(edtSem.length === 0){
      setEdt1([]);
      setEdt2([]);
      setEdt3([]);
      setEdt4([]);
      setEdt5([]);
      setEdt6([]);
    }
  },[edtSem])
  return (
    <div className='flex flex-col gap-1 overflow-hidden'>
        <div className='flex gap-2'>
            <div className='flex gap-1 items-center'>
              <span className='w-4 h-4 border bg-main'></span>
              <p>Cours</p>
            </div>
            <div className='flex gap-1 items-center'>
              <span className='w-4 h-4 border bg-blue-500'></span>
              <p>Tp/Td</p>
            </div>
        </div>
        <div className='flex justify-between items-center'>
            <p className='text-xl font-bold flex-1'>Emploi du temps : {prof?.userName}</p>
            <button onClick={handlePrint} className='flex gap-2 items-center bg-red text-white py-1 px-3 rounded-lg hover:bg-darkRed'><SiAdobeacrobatreader/> Print PDF</button>
        </div>
        <div ref={edtDiv} className='flex flex-col items-center overflow-hidden'>
          {before && (
            <div className='flex flex-col items-center gap-1'>
              <div className='flex flex-col items-center mt-5 font-bold'>
                <p>Ministère de l'Enseignement Supérieur et de la Recherche Scientifique</p>
                <p>UNIVERSITE M'Hamed BOUGARA - BOUMERDES</p>
              </div>
              <div className='flex flex-col items-center'>
                <p>Faculté des Sciences</p>
                <p>Departement {dep?.nom}</p>
              </div>
              <p className='text-3xl text-main font-bold'>Emploi du temps</p>
              <p>Teacher {prof.userName} </p>
              <p>{sem === 'first'?'First Semester':'Second Semester'}</p>
            </div>
          )}
          <div className={`grid grid-cols-7 overflow-x-scroll w-full z-20 border-b-gray-300 border-b ${before && 'mt-3'}`}>
            <HoursGest before={true}/>
          </div>
          <div className='grid grid-cols-7 overflow-x-scroll w-full'>
              <DayProf day={1} edt={edt1}/>
              <DayProf day={2} edt={edt2}/>
              <DayProf day={3} edt={edt3}/>
              <DayProf day={4} edt={edt4}/>
              <DayProf day={5} edt={edt5}/>
              <DayProf day={6} edt={edt6}/>
          </div>
        </div>
    </div>
  )
}

export default EDTP