import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
const getModules = 'https://pfeboumerdes.pythonanywhere.com/module/';
const getPlaces = 'https://pfeboumerdes.pythonanywhere.com/chambre/';
const getSections = 'https://pfeboumerdes.pythonanywhere.com/section/';
const getGroups = 'https://pfeboumerdes.pythonanywhere.com/groupe/';
const getSpes = 'https://pfeboumerdes.pythonanywhere.com/specialite/';
const getPals = 'https://pfeboumerdes.pythonanywhere.com/palier/';

const Hour = ({affSec,aff}) => {  
  const {user,email} = useAuth();
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
  //
  const [affid,setAffid] = useState(null);
  const [tc,setTc] = useState(false);
  const [chef,setChef] = useState(false);
  const [edtid,setEdtid] = useState(null);
  const [module,setModule] = useState(null);
  const [profid,setProfid] = useState(null);
  const [type,setType] = useState([]);
  const [semestre,setSemestre] = useState('');
  const [section,setSection] = useState(null);
  const [groupe,setGroupe] = useState(null);
  const [chambreid,setChambreid] = useState(null);
  //
  const [oneModule,setOneModule] = useState({});   
  const [oneChambre,setOneChambre] = useState({});   
  const [oneSection,setOneSection] = useState({});   
  const [oneGroup,setOneGroup] = useState({});   
  const [oneSpe,setOneSpe] = useState({});   
  const [onePal,setOnePal] = useState({});   

  const getModule = async (id) => {
    const {data} = await axios.get(`${getModules}${id}`);
    setOneModule(data);
  }
  const getPlace = async (id) => {
    const {data} = await axios.get(`${getPlaces}${id}`);
    setOneChambre(data);
  }
  const getSection = async (id) => {
    const {data} = await axios.get(`${getSections}${id}`);
    setOneSection(data);
  }
  const getGroup = async (id) => {
    const {data} = await axios.get(`${getGroups}${id}`);
    setOneGroup(data);
  }
  const getSpe = async (id) => {
    const {data} = await axios.get(`${getSpes}${id}`);
    setOneSpe(data);
  }
  const getPal = async (id) => {
    const {data} = await axios.get(`${getPals}${id}`);
    setOnePal(data);
  }
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
    if(moduleSec){
        getModule(moduleSec);
    }
  },[moduleSec])
  useEffect(() => {
    if(chambreidSec){
        getPlace(chambreidSec);
    }
  },[chambreidSec])
  //   
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
      setAffid(aff.affid);
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
      setAffid(null);
    }
  },[aff])
  useEffect(() => {
    if(module){
        getModule(module);
    }
  },[module])
  useEffect(() => {
    if(chambreid){
        getPlace(chambreid);
    }
  },[chambreid])
  useEffect(() => {
    if(section){
      getSection(section);
    }
  },[section])
  useEffect(() => {
    if(Object.keys(oneSection).length !== 0){
      getSpe(oneSection.speid);
      getPal(oneSection.palid);
    }
  },[oneSection])
  useEffect(() => {
    if(groupe){
      getGroup(groupe);
    }
  },[groupe])
  return (
    <View style={{flex:1,borderColor:'lightgray',borderWidth:1,display:'flex',justifyContent:'center',alignItems:'center',paddingVertical:10,gap:2, backgroundColor:Object.keys(affSec).length !== 0 && user === 'student'?'#F9D949':Object.keys(aff).length !== 0 && user === 'student'?'#3C486B':type[0] === 'cours' && user === 'teacher' ? 'rgb(59 130 246)' :user === 'teacher' && type !== 'cours' && Object.keys(aff).length !== 0 ? '#5030E5' :'transparent'}}>
        {Object.keys(affSec).length !== 0 && user === 'student' && (
            <>
                <Text style={{fontSize:9,color:'white',textAlign:'center'}}>{Object.keys(oneModule).length !== 0 && oneModule.abbr}</Text>
                <Text style={{fontSize:7,color:'white',textAlign:'center'}}>Teacher name</Text>
                <Text style={{fontSize:6,color:'white',textAlign:'center'}}>{typeSec}/{Object.keys(oneChambre).length !== 0 && oneChambre.nom}</Text>
            </>
        )}
        {Object.keys(aff).length !== 0 && user === 'student' && (
            <>
                <Text style={{fontSize:9,color:'white',textAlign:'center'}}>{Object.keys(oneModule).length !== 0 && oneModule.abbr}</Text>
                <Text style={{fontSize:7,color:'white',textAlign:'center'}}>Teacher name</Text>
                <Text style={{fontSize:6,color:'white',textAlign:'center'}}>{type}/{Object.keys(oneChambre).length !== 0 && oneChambre.nom}</Text>
            </>
        )}
        {Object.keys(aff).length !== 0 && user === 'teacher' && (
            <>
                <Text style={{fontSize:9,color:'white',textAlign:'center'}}>{Object.keys(oneModule).length !== 0 && oneModule.abbr}</Text>
                <Text style={{fontSize:6,color:'white',textAlign:'center'}}>{Object.keys(oneSpe).length !== 0 && oneSpe.nom}/{Object.keys(onePal).length !== 0 && ` / ${onePal.nom}`}</Text>
                <Text style={{fontSize:5,color:'white',textAlign:'center'}}>{Object.keys(oneSection).length !== 0 && oneSection.nom}/{Object.keys(oneGroup).length !== 0 && ` / ${oneGroup.nom}`}</Text>
                <Text style={{fontSize:6,color:'white',textAlign:'center'}}>{type}/{Object.keys(oneChambre).length !== 0 && oneChambre.nom}</Text> 
            </>
        )}
    </View>
  )
}

export default Hour