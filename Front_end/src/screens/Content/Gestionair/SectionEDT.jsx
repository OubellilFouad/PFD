import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import HoursGest from './components/HoursGest';
import DayGest from './components/DayGest';
import {motion} from 'framer-motion'
import SalleGest from './components/SalleGest';
import { useGest } from './context/GestContext';
import { useReactToPrint } from 'react-to-print';
const getSection = 'https://pfeboumerdes.pythonanywhere.com/section/';
const getTcSection = 'https://pfeboumerdes.pythonanywhere.com/sectiontc/';
const getPal = 'https://pfeboumerdes.pythonanywhere.com/palier/';
const getTcPal = 'https://pfeboumerdes.pythonanywhere.com/paliertc/';
const getChambre = 'https://pfeboumerdes.pythonanywhere.com/chambres';
const getEdts = 'https://pfeboumerdes.pythonanywhere.com/edts/sec/';
const getDeps = 'https://pfeboumerdes.pythonanywhere.com/dep/';
const getSpes = 'https://pfeboumerdes.pythonanywhere.com/specialite/';
const getTcSpes = 'https://pfeboumerdes.pythonanywhere.com/formationtc/';

const SectionEDT = () => {
  const {edts,typeG,sem} = useGest();  
  const location = useLocation();
  const [reset,setReset] = useState(false);
  const [secid,setSecid] = useState(null);
  const [sec,setSec] = useState({});
  const [pal,setPal] = useState({});
  const [width,setWidth] = useState(0);
  const [chambre,setChambre] = useState([]);
  const [edt,setEdt] = useState([]);
  const [edtTc,setEdtTc] = useState([]);
  const [dep,setDep] = useState({});
  const [spe,setSpe] = useState({});
  const [before,setBefore] = useState(false);

  const [edt1,setEdt1] = useState([]);
  const [edt2,setEdt2] = useState([]);
  const [edt3,setEdt3] = useState([]);
  const [edt4,setEdt4] = useState([]);
  const [edt5,setEdt5] = useState([]);
  const [edt6,setEdt6] = useState([]);

  const [semEdt,setSemEdt] = useState([]);
  const [semestre,setSemestre] = useState(null);

  const edtDiv = useRef();

  const handlePrint = useReactToPrint({
    content: () => edtDiv.current,
    documentTitle: `Emploi du temps ${spe.nom} annee ${pal.annee} ${sec.nom}`,
    onBeforeGetContent: async () => {
      setBefore(true);
    },
    onAfterPrint: () => {
      setBefore(false);
    }
  }) 

  const carousel = useRef();
  const getSec = async () => {
    const {data} = await axios.get(`${getSection}${secid}`);
    setSec(data);
  }
  const getTcSec = async () => {
    const {data} = await axios.get(`${getTcSection}${secid}`);
    setSec(data);
  }
  const getchambres = async () => {
    const {data} = await axios.get(getChambre);
    setChambre(data);
  }
  const getEdt = async (id) => {
    const {data} = await axios.get(`${getEdts}${id}`);
    setEdt(data);
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
  }
  useEffect(() => {
    if(secid){
        getEdt(secid);
    }
  },[secid,edts])
  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  },[chambre,typeG,reset])
  useEffect(() => {
    getchambres();
  },[])
  useEffect(() => {
    setSecid(location.state.secid)
  },[location.state.secid])
  useEffect(() => {
    if(location.state.type === 'tc'){
      if(secid){
        getTcSec();
      }
    }else{
      if(secid){
        getSec();
      }
    }
  },[secid])
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
  useEffect(() => {
    if(Object.keys(sec).length !== 0){
      if(location.state.type === 'tc'){
        getOneTcPal(sec.palid);
        getTcSpe(sec.speid);
      }else{
        getOnePal(sec.palid);
        getSpe(sec.speid)
      }
      getDep(sec.depid);
    }
  },[sec])
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
  },[sem,pal]);
  useEffect(() => {
    if(location.state.type === 'tc'){
      let here = edt.filter(a => a.tc === true);
      setEdtTc(here);
    }else{
      if(semestre){
        let here = edt.filter(ed => parseInt(ed.semestre) === semestre);
        setSemEdt(here);
      }
    }
  },[edt,semestre])
  useEffect(() => {
    if(Object.keys(edtTc).length !== 0){
      if(semestre){
        let here = edtTc.filter(ed => parseInt(ed.semestre) === semestre);
        setSemEdt(here);
      }
    }
  },[edtTc,semestre])
  return (
    <div className='flex flex-col gap-1 -mt-6 overflow-hidden'>
        <div className='flex gap-2'>
            <div className='flex gap-1 items-center'>
              <span className='w-4 h-4 border bg-main'></span>
              <p>Cours</p>
            </div>
            <div></div>
        </div>
        <div className='flex justify-between items-center gap-6'>
            <motion.div ref={carousel} className='cursor-grab w-[100%] overflow-hidden carousel p-2 border-separator border-2 rounded-md'>
                <motion.div drag='x' dragConstraints={{right:0,left: -width}} className='flex gap-2'>
                    {chambre.map((cham) => {
                        const {nom,capacite,type,chambreid} = cham;
                        return(
                            <SalleGest key={chambreid} reset={reset} setReset={setReset} nom={nom} capacity={capacite} type={type} chambreid={chambreid} />
                        )
                    })}
                </motion.div>
            </motion.div>
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
              <p className='text-lg font-bold'>{sec.nom}</p>
            </div>
          )}
          <div className={`grid grid-cols-7 overflow-x-scroll w-full z-20 border-b-gray-300 border-b ${before && 'mt-3'}`}>
            <HoursGest handleprint={handlePrint} before={before} />
          </div>
          <div className='grid grid-cols-7 overflow-x-scroll w-full'>
              <DayGest day={1} edt={edt1} semestre={semestre}/>
              <DayGest day={2} edt={edt2} semestre={semestre}/>
              <DayGest day={3} edt={edt3} semestre={semestre}/>
              <DayGest day={4} edt={edt4} semestre={semestre}/>
              <DayGest day={5} edt={edt5} semestre={semestre}/>
              <DayGest day={6} edt={edt6} semestre={semestre}/>
          </div>
        </div>
    </div>
  )
}

export default SectionEDT