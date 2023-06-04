import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Hour from './Hour'

const Day = ({day,edtSec,edt}) => {
  const [dayName,setDayName] = useState('');

  const [hour1,setHour1] = useState({});
  const [hour2,setHour2] = useState({});
  const [hour3,setHour3] = useState({});
  const [hour4,setHour4] = useState({});
  const [hour5,setHour5] = useState({});
  const [hour6,setHour6] = useState({});

  const [hourSec1,setHourSec1] = useState({});
  const [hourSec2,setHourSec2] = useState({});
  const [hourSec3,setHourSec3] = useState({});
  const [hourSec4,setHourSec4] = useState({});
  const [hourSec5,setHourSec5] = useState({});
  const [hourSec6,setHourSec6] = useState({});

  useEffect(() => {
    switch (day) {
        case 1:
            setDayName('Saturday');
            break;
        case 2:
            setDayName('Sunday');
            break;
        case 3:
            setDayName('Monday');
            break;
        case 4:
            setDayName('Tuesday');
            break;
        case 5:
            setDayName('Wednesday');
            break;
        case 6:
            setDayName('Thursday');
            break;
        default: 
            setDayName('')
    }
  },[])

  useEffect(() => {
    if(edtSec.lenght !== 0){
        edtSec.map((ed) => {
            switch (ed.hour) {
                case 1:
                    setHourSec1(ed);
                    break;
                case 2:
                    setHourSec2(ed);
                    break;
                case 3:
                    setHourSec3(ed);
                    break;
                case 4:
                    setHourSec4(ed);
                    break;
                case 5:
                    setHourSec5(ed);
                    break;
                case 6:
                    setHourSec6(ed);
                    break;        
            }
        })
    }
    if(edtSec.length === 0){
        setHourSec1({});
        setHourSec2({});
        setHourSec3({});
        setHourSec4({});
        setHourSec5({});
        setHourSec6({});
    }
  },[edtSec])

  useEffect(() => {
    if(edt.lenght !== 0){
        edt.map((ed) => {
            switch (ed.hour) {
                case 1:
                    setHour1(ed);
                    break;
                case 2:
                    setHour2(ed);
                    break;
                case 3:
                    setHour3(ed);
                    break;
                case 4:
                    setHour4(ed);
                    break;
                case 5:
                    setHour5(ed);
                    break;
                case 6:
                    setHour6(ed);
                    break;        
            }
        })
    }
    if(edt.length === 0){
        setHour1({});
        setHour2({});
        setHour3({});
        setHour4({});
        setHour5({});
        setHour6({});
    }
  },[edt])
  return (
    <View style={{flexDirection:'row'}}>
      <View style={{flex:1,borderColor:'lightgray',borderWidth:1,display:'flex',justifyContent:'center',alignItems:'center',paddingVertical:20}}><Text style={{fontSize:9}}>{dayName}</Text></View>
      <Hour affSec={hourSec1} aff={hour1}/>
      <Hour affSec={hourSec2} aff={hour2}/>
      <Hour affSec={hourSec3} aff={hour3}/>
      <Hour affSec={hourSec4} aff={hour4}/>
      <Hour affSec={hourSec5} aff={hour5}/>
      <Hour affSec={hourSec6} aff={hour6}/>
    </View>
  )
}

export default Day