import React, { useEffect, useState } from 'react'
import Hours from './components/Hours'
import Day from './components/Day'
import axios from 'axios';
import { useAuth } from '../../../../context/AuthContext';
import { useProf } from './context/ProfContext';
const getDesp = 'https://pfeboumerdes.pythonanywhere.com/availabilitys/';
const Desponibilité = () => {
  const {user} = useAuth();
  const {avails} = useProf();
  const [avail,setAvail] = useState([]); 

  const [avail1,setAvail1] = useState([]);
  const [avail2,setAvail2] = useState([]);
  const [avail3,setAvail3] = useState([]);
  const [avail4,setAvail4] = useState([]);
  const [avail5,setAvail5] = useState([]);
  const [avail6,setAvail6] = useState([]);

  const getDesps = async () => {
    const {data} = await axios.get(`${getDesp}${user?.userID}`);
    setAvail(data);
  }
  useEffect(() => {
    getDesps();
  },[avails])
  useEffect(() => {
    setAvail1([]);
    let arr1 = [];
    setAvail2([]);
    let arr2 = [];
    setAvail3([]);
    let arr3 = [];
    setAvail4([]);
    let arr4 = [];
    setAvail5([]);
    let arr5 = [];
    setAvail6([]);
    let arr6 = [];
    if(avail.lenght !== 0){
      avail.map((avail) => {
        if(avail.day === 1){
            arr1.push(avail);
            setAvail1(arr1);
        }
        if(avail.day === 2){
            arr2.push(avail);
            setAvail2(arr2);
        }
        if(avail.day === 3){
            arr3.push(avail);
            setAvail3(arr3);
        }
        if(avail.day === 4){
            arr4.push(avail);
            setAvail4(arr4);
        }
        if(avail.day === 5){
            arr5.push(avail);
            setAvail5(arr5);
        }
        if(avail.day === 6){
          arr6.push(avail);
          setAvail6(arr6);
      }
      })
    }
    if(avail.length === 0){
      setAvail1([]);
      setAvail2([]);
      setAvail3([]);
      setAvail4([]);
      setAvail5([]);
      setAvail6([]);
    }
  },[avail])
  return (
    <div className='flex flex-col gap-6 overflow-hidden'>
        <p className='text-xl font-bold'>Donnez votre temps de disponibilité</p>
        <div className='flex flex-col overflow-hidden'>
          <div className='grid grid-cols-7'>
            <Hours/>
          </div>
          <div className='grid grid-cols-7 overflow-y-scroll'>
              <Day day={1} avail={avail1} />
              <Day day={2} avail={avail2} />
              <Day day={3} avail={avail3} />
              <Day day={4} avail={avail4} />
              <Day day={5} avail={avail5} />
              <Day day={6} avail={avail6} />
          </div>
        </div>
    </div>
  )
}

export default Desponibilité