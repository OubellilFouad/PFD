import React, { useEffect, useRef, useState } from 'react'
import HoursGest from '../Gestionair/components/HoursGest'
import DayProf from './components/DayProf'
import axios from 'axios';
import { useAuth } from '../../../../context/AuthContext';
import { useReactToPrint } from 'react-to-print';
import { SiAdobeacrobatreader } from 'react-icons/si';
import { useGest } from '../Gestionair/context/GestContext';
const getEdt = 'https://pfeboumerdes.pythonanywhere.com/edts/prof/';
const getDeps = 'https://pfeboumerdes.pythonanywhere.com/dep/';
const getProfs = 'http://127.0.0.1:8000/api/chefdep/get-enseignantbyid/';

const EDTProf = () => {
  const {user} = useAuth();
  const {sem} = useGest();
  const [edt,setEdt] = useState([]);
  const [dep,setDep] = useState({});
  const [prof,setProf] = useState({});
  const [before,setBefore] = useState(false);

  const [edt1,setEdt1] = useState([]);
  const [edt2,setEdt2] = useState([]);
  const [edt3,setEdt3] = useState([]);
  const [edt4,setEdt4] = useState([]);
  const [edt5,setEdt5] = useState([]);

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
  const getProf = async (id) => {
    const {data} = await axios.get(`${getProfs}${id}`);
    setProf(data);
  }
  const getEdts = async () => {
    const {data} = await axios.get(`${getEdt}${user?.userID}`);
    setEdt(data);
  }
  useEffect(() => {
    getDep();
    getProf(user.userID);
  },[])
  useEffect(() => {
    getEdts();
  },[])
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
    if(edt.lenght !== 0){
      edt.map((edt) => {
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
      })
    }
    if(edt.length === 0){
      setEdt1([]);
      setEdt2([]);
      setEdt3([]);
      setEdt4([]);
      setEdt5([]);
    }
  },[edt])
  return (
    <div className='flex flex-col -mt-2 overflow-hidden'>
        <div className='flex justify-between items-center'>
            <p className='text-xl font-bold flex-1'>Votre emploi du temps</p>
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
          <div className='grid grid-cols-7 w-full mt-3'>
            <HoursGest before={true}/>
          </div>
          <div className='grid grid-cols-7 w-full overflow-x-scroll'>
              <DayProf day={1} edt={edt1}/>
              <DayProf day={2} edt={edt2}/>
              <DayProf day={3} edt={edt3}/>
              <DayProf day={4} edt={edt4}/>
              <DayProf day={5} edt={edt5}/>
          </div>
        </div>
    </div>
  )
}

export default EDTProf