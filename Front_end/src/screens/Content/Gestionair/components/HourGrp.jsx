import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDrop } from 'react-dnd';
import { useAuth } from '../../../../../context/AuthContext';
import { useGest } from '../context/GestContext';
import { BsCheckCircle } from 'react-icons/bs';
import { SlClose } from 'react-icons/sl';
import { useProf } from '../../Prof/context/ProfContext';
const getModules = 'https://pfeboumerdes.pythonanywhere.com/module/';
const getTcModules = 'https://pfeboumerdes.pythonanywhere.com/moduletc/';
const getChambres = 'https://pfeboumerdes.pythonanywhere.com/chambre/';
const getProfs = 'http://127.0.0.1:8000/api/chefdep/get-enseignantbyid/';
const getOneChefs = 'http://localhost:8000/api/admin/get-chefdepbyid/';

const HourGrp = ({hour,day,affSec,aff,student}) => {
  const {setShow,setAddMessage,setColor} = useAuth();
  const {edts,addEdts,deleteEdt,profG,salleG} = useGest();
  const {avails} = useProf();
  const [avail,setAvail] = useState(false);
  const [all,setAll] = useState([]);
  const [place,setPlace] = useState(false);
  const [color,setColorr] = useState(false);
  const [edtid,setEdtid] = useState(null);
  const [module,setModule] = useState(null); 
  const [type,setType] = useState([]);
  const [profid,setProfid] = useState(null); 
  const [chambreid,setChambreid] = useState(null);
  const [semestre,setSemestre] = useState('');
  const [section,setSection] = useState(null);
  const [groupe,setGroupe] = useState(null);
  const [oneModule,setOneModule] = useState({}); 
  const [oneProf,setOneProf] = useState({}); 
  const [oneChambre,setOneChambre] = useState({}); 
  const [depid,setDepid] = useState(null); 
  const [tc,setTc] = useState(false);
  const [chef,setChef] = useState(false);
  const [item,setItem] = useState({});
  // Aff sec 
  const [tcSec,setTcSec] = useState(false);
  const [cheftc,setCheftc] = useState(false);
  const [edtidSec,setEdtidSec] = useState(null);
  const [moduleSec,setModuleSec] = useState(null);
  const [profidSec,setProfidSec] = useState(null);
  const [typeSec,setTypeSec] = useState([]);
  const [semestreSec,setSemestreSec] = useState('');
  const [sectionSec,setSectionSec] = useState(null);
  const [groupeSec,setGroupeSec] = useState(null);
  const [chambreidSec,setChambreidSec] = useState(null);
  const [{isOver},drop] = useDrop(() => ({
      accept: 'group',
      drop: (item) => setItem(item),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
    })
    }));
  const addItem = (item) => {
    if(Object.keys(affSec).length === 0){
      if(item.nature === 'chambre' && Object.keys(aff).length === 0){
        let exists = all.filter(edt => edt.place === item.chambreid);
        let is = exists.some((ex) => {
          return ex.day === day && ex.hour === hour;
        })
        if(is){
          setShow(true);
          setColor(false);
          setAddMessage("Unavailable");
        }else{
          setChambreid(item.chambreid);
        }
      }
      if(item.nature === 'module' && Object.keys(aff).length === 0){
        let exists = all.filter(edt => edt.profid === item.profid);
        let is = exists.some((ex) => {
          return ex.day === day && ex.hour === hour;
        })
        if(is){
          setShow(true);
          setColor(false);
          setAddMessage("Unavailable");
        }else{
          setModule(item.module);
          setProfid(item.profid);
          setType(JSON.parse(item.type));
          setSection(item.section);
          setGroupe(item.groupe);
          setSemestre(item.semestre);
          setTc(item.tc);
          setChef(item.chef);
          setDepid(item.depid);
        }
      }
    }else{
      setShow(true);
      setColor(false);
      setAddMessage("Spot is already taken");
    }
  }
  const getModule = async (id) => {
    const {data} = await axios.get(`${getModules}${id}`);
    setOneModule(data);
  }
  const getTcModule = async (id) => {
    const {data} = await axios.get(`${getTcModules}${id}`);
    setOneModule(data);
  }
  const getProf = async (id) => {
    const {data} = await axios.get(`${getProfs}${id}`);
    setOneProf(data);
  }
  const getChef = async (id) => {
    const {data} = await axios.get(`${getOneChefs}${id}`);
    setOneProf(data);
  }
  const getChambre = async (id) => {
    const {data} = await axios.get(`${getChambres}${id}`);
    setOneChambre(data);
  }
  const accept = () => {
    const formData = {
      profid,
      semestre,
      section,
      groupe,
      module,
      type,
      day,
      hour,
      place: chambreid,
      tc,
      chef,
      depid
    }
    addEdts(formData);
  }
  const reset = () => {
    if(!edtid){
      setModule(null);
      setProfid(null);
      setType([]);
      setSection(null);
      setGroupe(null);
      setSemestre('');
      setChambreid(null);
      setDepid(null);
    }else{
      deleteEdt(edtid);
      setEdtid(null);
      setModule(null);
      setProfid(null);
      setType([]);
      setSection(null);
      setGroupe(null);
      setSemestre('');
      setChambreid(null);
      setDepid(null);
    }
  }
  useEffect(() => {
    if(profG){
      let exists = edts.filter(edt => edt.profid === profG);
      let avais = avails.filter(av => av.profid === profG);
      exists.map((ex) => {
        if(ex.day === day && ex.hour === hour){
          setColorr(true);
        }
      })
      avais.map((av) => {
        if(av.day === day && av.hour === hour){
          setAvail(true);
        }
      })
    }else{
      setColorr(false);
      setAvail(false);
    }
  },[profG])
  useEffect(() => {
    if(salleG){
      let exists = edts.filter(edt => edt.place === salleG);
      exists.map((ex) => {
        if(ex.day === day && ex.hour === hour){
          setPlace(true);
        }
      })
    }else{
      setPlace(false)
    }
  },[salleG])
  useEffect(() => {
    if(module){
        if(tc){
          getTcModule(module)
        }else{
          getModule(module)
        }
    }else{
      setOneModule({});
    }
  },[module])
  useEffect(() => {
    if(profid){
        if(chef){
          getChef(profid);
        }else{
          getProf(profid)
        }
    }else{
      setOneProf({});
    }
  },[profid])
  useEffect(() => {
    if(chambreid){
        getChambre(chambreid);
    }else{
      setOneChambre({})
    }
  },[chambreid])
  useEffect(() => {
    if(moduleSec){
      if(tcSec){
        getTcModule(moduleSec)
      }else{
        getModule(moduleSec)
      }
    }else{
      setOneModule({});
    }
  },[moduleSec])
  useEffect(() => {
    if(profidSec){
      if(cheftc){
        getChef(profidSec);
      }else{
        getProf(profidSec);
      }
    }else{
      setOneProf({});
    }
  },[profidSec])
  useEffect(() => {
    if(chambreidSec){
      getChambre(chambreidSec);
    }else{
      setOneChambre({});
    }
  },[chambreidSec])
  useEffect(() => {
    if(Object.keys(affSec).length !== 0){
      setEdtidSec(affSec?.edtid);
      setModuleSec(affSec?.module);
      setProfidSec(affSec?.profid);
      setTypeSec([affSec?.type]);
      setSemestreSec(affSec?.semestre);
      setSectionSec(affSec?.section);
      setGroupeSec(affSec?.groupe);
      setChambreidSec(affSec.place)
      setTcSec(affSec?.tc);
      setCheftc(affSec.chef);
    }else{
      setEdtidSec(null);
      setModuleSec(null);
      setProfidSec(null);
      setTypeSec([]);
      setSectionSec(null);
      setGroupeSec(null);
      setSemestreSec('');
      setChambreidSec(null);
      setTcSec(false);
      setCheftc(false);
    }
  },[affSec])
  useEffect(() => {
    if(Object.keys(aff).length !== 0){
      setEdtid(aff?.edtid);
      setModule(aff?.module);
      setProfid(aff?.profid);
      setType([aff?.type]);
      setSemestre(aff?.semestre);
      setSection(aff?.section);
      setGroupe(aff?.groupe);
      setChambreid(aff.place);
      setTc(aff.tc);
      setChef(aff.chef);
      setDepid(aff.depid);
    }else{
      setEdtid(null);
      setModule(null);
      setProfid(null);
      setType([]);
      setSection(null);
      setGroupe(null);
      setSemestre('');
      setChambreid(null);
      setTc(false);
      setChef(false);
      setDepid(null);
    }
  },[aff])
  useEffect(() => {
    if(Object.keys(item).length !== 0){
      addItem(item);
    }
  },[item,edts]);
  useEffect(() => {
    setAll(edts);
  },[edts]);
  return (
    <div ref={drop} data-value='08h00-09h30' className={`flex justify-between py-1 flex-col border-gray-300 border items-center font-bold ${isOver && !color && !place && 'bg-main text-white'} ${Object.keys(affSec).length !== 0 && '!bg-blue-500 !text-white'} ${edtid && '!bg-main !text-white'} relative group ${color && !edtid && !place && Object.keys(affSec).length === 0 && '!bg-red'} ${place && !edtid && !color && '!bg-orange-500'} ${avail && !place && !color && !edtid && !module && 'bg-green-500'}`}>
        {Object.keys(affSec).length === 0 && Object.keys(aff).length === 0 && (
          <>
          <p className={`${isOver?'text-white':'text-main'} font-normal`}>{Object.keys(oneModule).length !== 0 && oneModule.abbr}</p>
          <p className='text-sm font-semibold'>{Object.keys(oneProf).length !== 0 && oneProf.userName}</p>
          <p className={`text-xs gap-1 ${isOver?'text-white':'text-black'}`}>{`${type.toString()}`} {Object.keys(oneChambre).length !== 0 && `/ ${oneChambre.nom}`}</p>
          </>
        )}
        {Object.keys(affSec).length !== 0 && (
          <>
          <p className={`font-normal`}>{Object.keys(oneModule).length !== 0 && oneModule.abbr}</p>
          <p className='text-sm font-semibold'>{Object.keys(oneProf).length !== 0 && oneProf.userName}</p>
          <p className={`text-xs gap-1`}>{`${typeSec.toString()}`} {Object.keys(oneChambre).length !== 0 && `/ ${oneChambre.nom}`}</p>
          </>
        )}
        {Object.keys(aff).length !== 0 && (
          <>
          <p className={`font-normal`}>{Object.keys(oneModule).length !== 0 && oneModule.abbr}</p>
          <p className='text-sm font-semibold'>{Object.keys(oneProf).length !== 0 && oneProf.userName}</p>
          <p className={`text-xs gap-1`}>{`${type.toString()}`} {Object.keys(oneChambre).length !== 0 && `/ ${oneChambre.nom}`}</p>
          </>
        )}
        <BsCheckCircle onClick={() => accept()} className={`hidden absolute right-2 top-2/4 -translate-y-2/4 ${chambreid && !isOver && !edtid && !place ?'group-hover:block':'hidden'} cursor-pointer hover:text-main text-xl z-10`}/>
        <SlClose onClick={() => reset()} className={`hidden absolute left-2 top-2/4 -translate-y-2/4 ${!isOver && !place && !color && Object.keys(affSec).length === 0 && !student ?'group-hover:block':'hidden'} cursor-pointer hover:text-red text-xl z-10`}/>
    </div>
  )
}

export default HourGrp