import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print';
import HoursGest from '../Gestionair/components/HoursGest';
import DayGrp from '../Gestionair/components/DayGrp';
import { useGest } from '../Gestionair/context/GestContext';
import { useAuth } from '../../../../context/AuthContext';
import { SiAdobeacrobatreader } from 'react-icons/si';

const getGrp = 'https://pfeboumerdes.pythonanywhere.com/groupe/';
const getTcGrp = 'https://pfeboumerdes.pythonanywhere.com/groupetc/';
const getChambre = 'https://pfeboumerdes.pythonanywhere.com/chambres';
const getEdts = 'https://pfeboumerdes.pythonanywhere.com/edts/sec/';
const getGrpEdts = 'https://pfeboumerdes.pythonanywhere.com/edts/grp/';
const getDeps = 'https://pfeboumerdes.pythonanywhere.com/dep/';
const getSpes = 'https://pfeboumerdes.pythonanywhere.com/specialite/';
const getSection = 'https://pfeboumerdes.pythonanywhere.com/section/';
const getTcSection = 'https://pfeboumerdes.pythonanywhere.com/sectiontc/';
const getPal = 'https://pfeboumerdes.pythonanywhere.com/palier/';
const getTcSpes = 'https://pfeboumerdes.pythonanywhere.com/formationtc/';
const getTcPal = 'https://pfeboumerdes.pythonanywhere.com/paliertc/';

const Emplois = () => {
  const {user} = useAuth();  
  const {edts,sem,speType} = useGest();
  const [chambre,setChambre] = useState([]); 
  const [grpid,setGrpid] = useState(null);
  const [groupe,setGroup] = useState({});
  const [edtSec,setEdtSec] = useState([]);
  const [edtTcSec,setEdtTcSec] = useState([]);
  const [edt,setEdt] = useState([]);
  const [edtTc,setEdtTc] = useState([]);
  const [dep,setDep] = useState({});
  const [spe,setSpe] = useState({});
  const [sec,setSec] = useState({});
  const [pal,setPal] = useState({});
  const [semestre,setSemestre] = useState(null);
  const [before,setBefore] = useState(false);
  // EDT sec
  const [semEdtSec,setSemEdtSec] = useState([]);
  const [edtSec1,setEdtSec1] = useState([]);
  const [edtSec2,setEdtSec2] = useState([]);
  const [edtSec3,setEdtSec3] = useState([]);
  const [edtSec4,setEdtSec4] = useState([]);
  const [edtSec5,setEdtSec5] = useState([]);
  const [edtSec6,setEdtSec6] = useState([]);
  // EDT grp
  const [semEdt,setSemEdt] = useState([]);
  const [edt1,setEdt1] = useState([]);
  const [edt2,setEdt2] = useState([]);
  const [edt3,setEdt3] = useState([]);
  const [edt4,setEdt4] = useState([]);
  const [edt5,setEdt5] = useState([]);
  const [edt6,setEdt6] = useState([]);
  const edtDiv = useRef();

  const handlePrint = useReactToPrint({
    content: () => edtDiv.current,
    documentTitle: `Emploi du temps ${spe.nom} annee ${pal.annee} ${sec.nom} ${groupe.nom}`,
    onBeforeGetContent: async () => {
      setBefore(true);
    },
    onAfterPrint: () => {
      setBefore(false);
    }
  })

  const getchambres = async () => {
      const {data} = await axios.get(getChambre);
      setChambre(data);
  }
  const getGroup = async () => {
    const {data} = await axios.get(`${getGrp}${grpid}`);
    setGroup(data);
  }
  const getTcGroup = async () => {
    const {data} = await axios.get(`${getTcGrp}${grpid}`);
    setGroup(data);
  }
  const getEdt = async (id) => {
    const {data} = await axios.get(`${getEdts}${id}`);
    setEdtSec(data);
  }
  const getGrpEdt = async (id) => {
    const {data} = await axios.get(`${getGrpEdts}${id}`);
    setEdt(data);
  }
  const getSec = async (id) => {
    const {data} = await axios.get(`${getSection}${id}`);
    setSec(data);
  }
  const getTcSec = async (id) => {
    const {data} = await axios.get(`${getTcSection}${id}`);
    setSec(data);
  }
  const getDep = async (id) => {
    const {data} = await axios.get(`${getDeps}${id}`);
    setDep(data);
  }
  const getSpe = async (id) => {
    const {data} = await axios.get(`${getSpes}${id}`);
    setSpe(data);
  }
  const getTcSpe = async (id) => {
    const {data} = await axios.get(`${getTcSpes}${id}`);
    setSpe(data);
  }
  const getOnePal = async (id) => {
    const {data} = await axios.get(`${getPal}${id}`);
    setPal(data);
  }
  const getOneTcPal = async (id) => {
    const {data} = await axios.get(`${getTcPal}${id}`);
    setPal(data);
    console.log(data);
  }
  // 
  useEffect(() => {
    getchambres();
  },[])
  useEffect(() => {
    setGrpid(user?.group);
  },[])
  useEffect(() => {
    if(grpid){
      if(speType === 'Tranc commun'){
        getTcGroup();
      }else{
        getGroup();
      }
      getGrpEdt(grpid);
    }
  },[grpid,edts])
  useEffect(() => {
    if(Object.keys(groupe)){
      if(speType === 'Tranc commun'){
        getTcSpe(groupe.speid);
        getTcSec(groupe.secid);
      }else{
        getSec(groupe.secid);
        getSpe(groupe.speid);
      }
      getEdt(groupe.secid);
      getDep(groupe.depid);
    }
  },[groupe])
  useEffect(() => {
    if(Object.keys(sec).length !== 0){
      if(speType === 'Tranc commun'){
        getOneTcPal(sec.palid);
      }else{
        getOnePal(sec.palid);
      }
    }
  },[sec])
  // 
  useEffect(() => {
    if(speType === 'Tranc commun'){
      if(Object.keys(edtSec).length !== 0){
        let here = edtSec.filter(e => e.tc === true);
        setEdtTcSec(here);
      }
    }else{
      if(semestre){
        let here = edtSec.filter(ed => parseInt(ed.semestre) === semestre);
        setSemEdtSec(here);
      }
    }
  },[edtSec,semestre])
  useEffect(() => {
    if(Object.keys(edtTcSec).length !== 0){
      let here = edtTcSec.filter(ed => parseInt(ed.semestre) === semestre);
      setSemEdtSec(here);
    }
  },[edtTcSec])
  useEffect(() => {
    setEdtSec1([]);
    let arr1 = [];
    setEdtSec2([]);
    let arr2 = [];
    setEdtSec3([]);
    let arr3 = [];
    setEdtSec4([]);
    let arr4 = [];
    setEdtSec5([]);
    let arr5 = [];
    setEdtSec6([]);
    let arr6 = [];
    if(semEdtSec.lenght !== 0){
      semEdtSec.map((edt) => {
        if(edt.day === 1){
            arr1.push(edt);
            setEdtSec1(arr1);
        }
        if(edt.day === 2){
            arr2.push(edt);
            setEdtSec2(arr2);
        }
        if(edt.day === 3){
            arr3.push(edt);
            setEdtSec3(arr3);
        }
        if(edt.day === 4){
            arr4.push(edt);
            setEdtSec4(arr4);
        }
        if(edt.day === 5){
            arr5.push(edt);
            setEdtSec5(arr5);
        }
        if(edt.day === 6){
          arr6.push(edt);
          setEdtSec6(arr6);
      }
      })
    }
    if(semEdtSec.length === 0){
      setEdtSec1([]);
      setEdtSec2([]);
      setEdtSec3([]);
      setEdtSec4([]);
      setEdtSec5([]);
      setEdtSec6([]);
    }
  },[semEdtSec])
  // 
  useEffect(() => {
    if(speType === 'Tranc commun'){
      if(Object.keys(edt).length !== 0){
        let here = edt.filter(e => e.tc === true);
        setEdtTc(here);
      }
    }else{
      if(semestre){
        let here = edt.filter(ed => parseInt(ed.semestre) === semestre);
        setSemEdt(here);
      }
    }
  },[edt,semestre])
  useEffect(() => {
    if(Object.keys(edtTc).length !== 0){
      let here = edtTc.filter(ed => parseInt(ed.semestre) === semestre);
      setSemEdt(here);
    }
  },[edtTc])
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
    if(semEdt.lenght !== 0){
      semEdt.map((edt) => {
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
    if(semEdt.length === 0){
      setEdt1([]);
      setEdt2([]);
      setEdt3([]);
      setEdt4([]);
      setEdt5([]);
      setEdt6([]);
    }
  },[semEdt])
  // 
  useEffect(() => {
    if(Object.keys(pal).length !== 0){
      // First
      if(pal.annee === 1 && sem === 'first'){
        setSemestre(1);
      }
      if(pal.annee === 2 && sem === 'first'){
        setSemestre(3);
      }
      if(pal.annee === 3 && sem === 'first'){
        setSemestre(5);
      }
      if(pal.annee === 4 && sem === 'first'){
        setSemestre(1);
      }
      if(pal.annee === 5 && sem === 'first'){
        setSemestre(3);
      }
      // Second
      if(pal.annee === 1 && sem === 'second'){
        setSemestre(2);
      }
      if(pal.annee === 2 && sem === 'second'){
        setSemestre(4);
      }
      if(pal.annee === 3 && sem === 'second'){
        setSemestre(6);
      }
      if(pal.annee === 4 && sem === 'second'){
        setSemestre(2);
      }
      if(pal.annee === 5 && sem === 'second'){
        setSemestre(4);
      }
  }
},[sem,pal])
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
            <p className='font-bold'>Scroll to see all the days</p>
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
              <p>{spe.nom}</p>
              <p className='text-3xl text-main font-bold'>Emploi du temps</p>
              <p>{spe.cycle} {pal.annee} - Semestre {semestre}</p>
              <p className='text-lg font-bold'>{sec.nom} / {groupe.nom}</p>
            </div>
          )}
          <div className={`grid grid-cols-7 overflow-x-scroll w-full z-20 border-b-gray-300 border-b ${before && 'mt-3'}`}>
            <HoursGest before={true} />
          </div>
          <div className='grid grid-cols-7 overflow-x-scroll w-full'>
              <DayGrp day={1} edtSec={edtSec1} edt={edt1} student={true}/>
              <DayGrp day={2} edtSec={edtSec2} edt={edt2} student={true}/>
              <DayGrp day={3} edtSec={edtSec3} edt={edt3} student={true}/>
              <DayGrp day={4} edtSec={edtSec4} edt={edt4} student={true}/>
              <DayGrp day={5} edtSec={edtSec5} edt={edt5} student={true}/>
              <DayGrp day={6} edtSec={edtSec6} edt={edt6} student={true}/>
          </div>
        </div>
    </div>
  )
}

export default Emplois