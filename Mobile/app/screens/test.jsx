import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'
import Hours from '../components/Hours'
import Day from '../components/Day'
const getGrp = 'https://pfeboumerdes.pythonanywhere.com/groupe/';
const getGrpTc = 'https://pfeboumerdes.pythonanywhere.com/groupetc/';
const getProfEdts = 'https://pfeboumerdes.pythonanywhere.com/edts/prof/';
const getEdts = 'https://pfeboumerdes.pythonanywhere.com/edts/grp/';
const getSecEdts = 'https://pfeboumerdes.pythonanywhere.com/edts/sec/';

const Test = () => {
  const {grp,type,userId,user,email} = useAuth();
  const [group,setGroup] = useState({});
  const [edt,setEdt] = useState([]);
  const [edtSec,setEdtSec] = useState([]);

  const [edt1,setEdt1] = useState([]);
  const [edt2,setEdt2] = useState([]);
  const [edt3,setEdt3] = useState([]);
  const [edt4,setEdt4] = useState([]);
  const [edt5,setEdt5] = useState([]);
  const [edt6,setEdt6] = useState([]);

  const [edtSec1,setEdtSec1] = useState([]);
  const [edtSec2,setEdtSec2] = useState([]);
  const [edtSec3,setEdtSec3] = useState([]);
  const [edtSec4,setEdtSec4] = useState([]);
  const [edtSec5,setEdtSec5] = useState([]);
  const [edtSec6,setEdtSec6] = useState([]);

  const getGroup = async () => {
    const {data} = await axios.get(`${getGrp}${grp}`);
    setGroup(data);
  }
  const getTcGroup = async () => {
    const {data} = await axios.get(`${getGrpTc}${grp}`);
    setGroup(data);
  }
  const getProfEdt = async () => {
    try {
      const {data} = await axios.get(`${getProfEdts}${parseInt(userId)}`);
      setEdt(data);
    } catch (error) {
      getProfEdt();
    }
  }
  const getEdt = async () => {
    const {data} = await axios.get(`${getEdts}${grp}`);
    let here;
    if(type === 'commun'){
      here = data.filter(da => da.tc === true);
    }else{
      here = data.filter(da => da.tc === false);
    }
    setEdt(here);
  }
  const getSecEdt = async () => {
    const {data} = await axios.get(`${getSecEdts}${group.secid}`);
    let here;
    if(type === 'commun'){
      here = data.filter(da => da.tc === true);
    }else{
      here = data.filter(da => da.tc === false);
    }
    setEdtSec(here);
  }
  useEffect(() => {
    if(user === 'teacher'){
      getProfEdt();
    }else{
      if(type === 'commun'){
        getTcGroup();
      }else{
        getGroup();
      }
      getEdt();
    }
  },[grp])
  useEffect(() => {
    if(Object.keys(group).length !== 0 && user === 'student'){
      getSecEdt();
    }
  },[group])
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
        if(edt.day === 6){
          arr6.push(edt);
          setEdt6(arr6);
      }
      })
    }
    if(edt.length === 0){
      setEdt1([]);
      setEdt2([]);
      setEdt3([]);
      setEdt4([]);
      setEdt5([]);
      setEdt6([]);
    }
  },[edt])
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
    if(edtSec.lenght !== 0){
      edtSec.map((edt) => {
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
    if(edtSec.length === 0){
      setEdtSec1([]);
      setEdtSec2([]);
      setEdtSec3([]);
      setEdtSec4([]);
      setEdtSec5([]);
      setEdtSec6([]);
    }
  },[edtSec])
  return (
    <View style={{backgroundColor:'white',flex:1,paddingTop:15,gap:40}}>
      <Stack.Screen options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTransparent: false,
          title: '',
          autoHideHomeIndicator: true
        }}>
        </Stack.Screen>
      <Text style={{fontSize:25,marginHorizontal:20}}>Time table: 
        {user === 'student' && (<Text style={{color:'#5030E5',fontSize:20}}>{Object.keys(group).length !== 0 && group.nom}</Text>)}
        {user === 'teacher' && (<Text style={{color:'#5030E5',fontSize:20}}>{email}</Text>)}
      </Text>
      <View style={{display:'flex',flexDirection:'column'}}>
        <Hours/>
        <Day day={1} edtSec={edtSec1} edt={edt1}/>
        <Day day={2} edtSec={edtSec2} edt={edt2}/>
        <Day day={3} edtSec={edtSec3} edt={edt3}/>
        <Day day={4} edtSec={edtSec4} edt={edt4}/>
        <Day day={5} edtSec={edtSec5} edt={edt5}/>
        <Day day={6} edtSec={edtSec6} edt={edt6}/>
      </View>
    </View>
  )
}

export default Test