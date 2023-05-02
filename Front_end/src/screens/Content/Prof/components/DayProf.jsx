import React, { useEffect, useState } from 'react'
import HourProf from './HourProf';

const DayProf = ({day,edt}) => {
  const [dayName,setDayName] = useState('');
  const [hour1,setHour1] = useState({});
  const [hour2,setHour2] = useState({});
  const [hour3,setHour3] = useState({});
  const [hour4,setHour4] = useState({});
  const [hour5,setHour5] = useState({});
  const [hour6,setHour6] = useState({});
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
    <>
    <div className='flex justify-center py-6 border border-gray-300'>{dayName}</div>
    <HourProf aff={hour1}/>
    <HourProf aff={hour2}/>
    <HourProf aff={hour3}/>
    <HourProf aff={hour4}/>
    <HourProf aff={hour5}/>
    <HourProf aff={hour6}/>
    </>
  )
}

export default DayProf