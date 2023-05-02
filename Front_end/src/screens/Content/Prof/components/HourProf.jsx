import axios from 'axios'
import React, { useEffect, useState } from 'react'
const getMod = 'https://pfeboumerdes.pythonanywhere.com/module/';
const getTcMod = 'https://pfeboumerdes.pythonanywhere.com/moduletc/';
const getCham = 'https://pfeboumerdes.pythonanywhere.com/chambre/';
const getSecs = 'https://pfeboumerdes.pythonanywhere.com/section/';
const getTcSecs = 'https://pfeboumerdes.pythonanywhere.com/sectiontc/';
const getGrps = 'https://pfeboumerdes.pythonanywhere.com/groupe/';
const getTcGrps = 'https://pfeboumerdes.pythonanywhere.com/groupetc/';
const getSpes = 'https://pfeboumerdes.pythonanywhere.com/specialite/';
const getTcSpes = 'https://pfeboumerdes.pythonanywhere.com/formationtc/';
const getPal = 'https://pfeboumerdes.pythonanywhere.com/palier/';
const getTcPal = 'https://pfeboumerdes.pythonanywhere.com/paliertc/';

const HourProf = ({aff}) => {
  const [oneModule,setOneModule] = useState({});
  const [type,setType] = useState('');
  const [oneChambre,setOneChambre] = useState({});
  const [oneSec,setOneSec] = useState({});  
  const [oneGrp,setOneGrp] = useState({});  
  const [spe,setSpe] = useState({});
  const [pal,setPal] = useState({});
  const getModule = async (id) => {
    const {data} = await axios.get(`${getMod}${id}`); 
    setOneModule(data);
  }
  const getTcModule = async (id) => {
    const {data} = await axios.get(`${getTcMod}${id}`); 
    setOneModule(data);
  }
  const getPlace = async (id) => {
    const {data} = await axios.get(`${getCham}${id}`); 
    setOneChambre(data);
  }
  const getSec = async (id) => {
    const {data} = await axios.get(`${getSecs}${id}`); 
    setOneSec(data);
  }  
  const getTcSec = async (id) => {
    const {data} = await axios.get(`${getTcSecs}${id}`); 
    setOneSec(data);
  }  
  const getGrp = async (id) => {
    const {data} = await axios.get(`${getGrps}${id}`);
    setOneGrp(data)
  }
  const getTcGrp = async (id) => {
    const {data} = await axios.get(`${getTcGrps}${id}`);
    setOneGrp(data)
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
    if(Object.keys(aff).length !== 0){
        if(aff.tc){
          getTcModule(aff.module);
          getTcSec(aff.section);
          getTcGrp(aff.groupe);
        }else{
          getModule(aff.module);
          getSec(aff.section);
          getGrp(aff.groupe);
        }
        getPlace(aff.place);
        setType(aff.type)
    }else{
      setOneModule({});
      setOneChambre({});
      setOneSec({});
      setOneGrp({});
      setSpe({});
      setPal({});
    }
  },[aff])  
  useEffect(() => {
    if(Object.keys(aff).length !== 0 && Object.keys(oneSec).length !== 0){
      if(aff.tc){
        getTcSpe(oneSec.speid);
        getOneTcPal(oneSec.palid);
      }else{
        getSpe(oneSec.speid);
        getOnePal(oneSec.palid);
      }
    }
  },[aff,oneSec])
  return (
    <div className={`flex justify-between py-1 flex-col border-gray-300 border items-center font-bold relative group ${Object.keys(aff).length !== 0 && 'bg-main text-white'} ${Object.keys(aff).length !== 0 && type !== 'cours' && '!bg-blue-500'}`}>
        {Object.keys(aff).length !== 0 && (
            <>
            <p className={`font-normal`}>{Object.keys(oneModule).length !== 0 && oneModule.abbr}</p>
            <p className='text-xs gap-1'>{spe.nom} {`/ ${pal.nom}`}</p>
            <p className='text-sm font-semibold'>{Object.keys(oneSec).length !== 0 && oneSec.nom} {Object.keys(oneGrp).length !== 0 && `/ ${oneGrp.nom}`}</p>
            <p className='text-xs gap-1'>{type} {Object.keys(oneChambre).length !== 0 && `/ ${oneChambre.nom}`}</p>
            </>
        )}
    </div>
  )
}

export default HourProf