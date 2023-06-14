import React, { useEffect, useRef, useState } from 'react'
import DisHour from './DisHour';

const Day = ({day,avail}) => { 
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
        if(avail.lenght !== 0){
            setHour1({});
            setHour2({});
            setHour3({});
            setHour4({});
            setHour5({});
            setHour6({});
            avail.map((ed) => {
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
        if(avail.length === 0){
            setHour1({});
            setHour2({});
            setHour3({});
            setHour4({});
            setHour5({});
            setHour6({});
        }
      },[avail])
  return (
    <>
        <div className='flex justify-center py-6 border border-gray-300'>{dayName}</div>
        <DisHour hour={1} day={day} av={hour1} />
        <DisHour hour={2} day={day} av={hour2} />
        <DisHour hour={3} day={day} av={hour3} />
        <DisHour hour={4} day={day} av={hour4} />
        <DisHour hour={5} day={day} av={hour5} />
        <DisHour hour={6} day={day} av={hour6} />
    </>
  )
}

export default Day