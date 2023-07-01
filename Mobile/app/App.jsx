import React, { useEffect, useRef, useState } from 'react'
import { Button, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../context/AuthContext'
import { Link, Stack } from 'expo-router';
import Drop from './components/Drop';
import Input from './components/Input';
import logo from '../assets/hora_zreg.png'

const App = ({navigation}) => {
  const {deps,getSpes,spes,getPals,pals,getSecs,secs,getGrps,grps,grp,setGrp,getSpesTc,getPalsTc,getSecsTc,getGrpsTc,type,setType,setUserId,user,setUser,userId,email,setEmail} = useAuth();  
  const [dep,setDep] = useState(null);
  const [spe,setSpe] = useState(null);
  const [pal,setPal] = useState(null);
  const [sec,setSec] = useState(null);
  const [pass,setPass] = useState(null);
  const [next,setNext] = useState(false);
  const [number,setNumber] = useState(1);
  const [depsArr,setDepsArr] = useState([]);
  const [spesArr,setSpesArr] = useState([]);
  const [palsArr,setPalsArr] = useState([]);
  const [secsArr,setSecsArr] = useState([]);
  const [grpsArr,setGrpsArr] = useState([]);
  const [typeArr,setTypeArr] = useState([
    {value:null,label:'Choose'},
    {value:'commun',label:'Trac commun'},
    {value:'spe',label:'Speciality'},
  ]);


  const handleAdd = () => {
    if(number<2){
      setNumber(number +1);
    }
    if(number === 2){
      setNumber(1);
    }
  }
  const handleLess = () => {
    if(user === 'student'){
      if(number>1){
        setNumber(number -1)
      }
      if(number === 1){
        setNumber(2)
      }
    }
  }
  useEffect(() => {
    let here = deps.map((dep) => {
      return {value:dep.depid,label:dep.nom}
    })
    here.unshift({value:null,label:'Choose'});
    setDepsArr(here);
  },[deps])
  useEffect(() => {
    if(type && dep){
      if(type === 'commun'){
        getSpesTc(dep);
      }else{ 
        getSpes(dep);
      }
    }
  },[type,dep])
  useEffect(() => {
    if(spes.length !== 0){
      if(type === 'commun'){
        let here = spes.map((spe) => {
          return {value:spe.ftcid,label:spe.nom}
        })
        here.unshift({value:null,label:'Choose'});
        setSpesArr(here);
      }else{
        let here = spes.map((spe) => {
          return {value:spe.speid,label:spe.nom}
        })
        here.unshift({value:null,label:'Choose'});
        setSpesArr(here);
      }
    }
  },[spes])
  useEffect(() => {
    if(spe){
      if(type === 'commun'){
        getPalsTc(spe);
      }else{
        getPals(spe);
      }
    }
  },[spe,type])
  useEffect(() => {
    if(pals.length !== 0){
      let here = pals.map((pal) => {
        return {value:pal.palid,label:pal.nom}
      })
      here.unshift({value:null,label:'Choose'});
      setPalsArr(here);
    }
  },[pals])
  useEffect(() => {
    if(pal){
      if(type === 'commun'){
        getSecsTc(pal);
      }else{
        getSecs(pal);
      }
    }
  },[pal,type])
  useEffect(() => {
    if(secs.length !== 0){
      let here = secs.map((sec) => {
        return {value:sec.secid,label:sec.nom}
      })
      here.unshift({value:null,label:'Choose'});
      setSecsArr(here);
    }
  },[secs])
  useEffect(() => {
    if(sec){
      if(type === 'commun'){
        getGrpsTc(sec);
      }else{
        getGrps(sec);
      }
    }
  },[sec,type])
  useEffect(() => {
    if(grps.length !== 0){
      let here = grps.map((grp) => {
        return {value:grp.grpid,label:grp.nom}
      })
      here.unshift({value:null,label:'Choose'});
      setGrpsArr(here);
    }
  },[grps])
  useEffect(() => {
    if(grp){
      setNext(true)
    }else{
      setNext(false);
    }
  },[grp])
  useEffect(() => {
    console.log(userId)
  },[userId])
  return (
    <View style={{backgroundColor:'white',flex:1,justifyContent:'center',alignItems:'center',position:'relative'}}>
      <View style={{backgroundColor:'white', width:'90%',minHeight:'50%',borderRadius:10,padding:20,shadowColor: "#000",shadowOffset: {
        width: 0,
        height: 2,
      },shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,gap:40,justifyContent:'space-between',position:'absolute',top:'27%'}}>
          <Stack.Screen options={{
            headerShown: false,
            headerShadowVisible: false,
            headerTransparent: false,
            title: ''
          }}>
          </Stack.Screen>
          <View style={{width:'100%',alignItems:'center',position:'relative',height:50}}>
            <Image source={logo} style={{width:'35%',height:30,position:'absolute',bottom:'30%'}}/>
          </View>
          <View style={{justifyContent:'space-between',flexDirection:'row',width:'70%',alignSelf:'center',backgroundColor:'#e9ecef',padding:6,borderRadius:8,gap:8,marginVertical:-20}}>
            <TouchableOpacity onPress={()=>setUser('student')} style={{paddingHorizontal:4,paddingVertical:4,backgroundColor:user === 'student'?'white':'transparent',flex:1,alignItems:'center',borderRadius:4}}>
              <Text style={{color:user!=='student'?'gray':'black'}}>Student</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setUser('teacher')} style={{paddingHorizontal:4,paddingVertical:4,backgroundColor:user === 'teacher'?'white':'transparent',flex:1,alignItems:'center',borderRadius:4}}>
              <Text style={{color:user!=='teacher'?'gray':'black'}}>Teacher</Text>
            </TouchableOpacity>
          </View>
          {user === 'student' && (
            <View style={{position:'relative',width:'100%',height:206,overflow:'hidden'}}>
              <View style={{gap:20,position:'absolute',width:'100%',transform: [{translateX:number===1?0:350}]}}>
                <Drop arr={depsArr} setData={setDep} label={'Departments'}/>
                <Drop arr={typeArr} setData={setType} label={'Type'}/>
                <Drop arr={spesArr} setData={setSpe} label={'Specialities'}/>
              </View>
              <View style={{gap:20,position:'absolute',width:'100%',transform: [{translateX:number===2?0:350}]}}>
                <Drop arr={palsArr} setData={setPal} label={'Annee'}/>
                <Drop arr={secsArr} setData={setSec} label={'Sections'}/>
                <Drop arr={grpsArr} setData={setGrp} label={'Groupes'}/>
              </View>
            </View>
          )}
          {user === 'teacher' && (
            <View style={{position:'relative',width:'100%',height:206,overflow:'hidden'}}>
              <View style={{gap:20,position:'absolute',width:'100%'}}>
                <Input placeholder={'User name'} label={'user name'} setData={setEmail} value={email} secure={false}/>
                <Input placeholder={'Matricule'} label={'Matricule'} setData={setUserId} value={userId} secure={false}/>
                <Input placeholder={'Password'} label={'Password'} setData={setPass} value={pass} secure={true}/>
              </View>
            </View>
          )}
          <View style={{flexDirection:'row',gap:20,width:'100%'}}>
            {user === 'student' && (
              <TouchableOpacity onPress={handleAdd} style={{flex: 1,backgroundColor:'lightgray',paddingVertical:10, justifyContent:'center',alignItems:'center',borderRadius:8}}>
                <Text style={{color:'black'}}>Prev</Text>
              </TouchableOpacity>
            )}
            {number === 1 && user === 'student' && (
              <TouchableOpacity onPress={handleLess} style={{flex: 1,backgroundColor:'#5030E5',paddingVertical:10, justifyContent:'center',alignItems:'center',borderRadius:8}}>
                <Text style={{color:'white'}}>Next</Text>
              </TouchableOpacity>
            )}
            {number === 2 && grp && user === 'student' && (
              <TouchableOpacity onPress={() => navigation.navigate('test')} style={{flex: 1,backgroundColor:'#5030E5',paddingVertical:10, justifyContent:'center',alignItems:'center',borderRadius:8}}>
                <Text style={{color:'white'}}>Submit</Text>
              </TouchableOpacity>
            )}
            {user === 'teacher' && (
              <TouchableOpacity onPress={() => navigation.navigate('test')} style={{flex: 1,backgroundColor:'#5030E5',paddingVertical:10, justifyContent:'center',alignItems:'center',borderRadius:8}}>
                <Text style={{color:'white'}}>Submit</Text>
              </TouchableOpacity>
            )}
          </View>
      </View>
    </View>
  )
}

export default App