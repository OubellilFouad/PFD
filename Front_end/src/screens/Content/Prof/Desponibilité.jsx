import React, { useEffect, useState } from 'react'
import Hours from './components/Hours'
import Day from './components/Day'
import axios from 'axios';
import { useAuth } from '../../../../context/AuthContext';
const getDesp = 'http://localhost:8000/api/prof/enseignants-disponibilité/';
const Desponibilité = () => {
  const {user} = useAuth();
  const [desps,setDesps] = useState({});
  const [first,setFirst] = useState([]);  
  const [second,setSecond] = useState([]);  
  const [third,setThird] = useState([]);  
  const [fourth,setFourth] = useState([]);  
  const [fifth,setFifth] = useState([]);  
  const getDesps = async () => {
    const {data} = await axios.get(`${getDesp}${user?.id}`);
    setDesps(JSON.parse(data.disponibilite));
  }
  useEffect(() => {
    getDesps();
  },[])
  useEffect(() => {
    setFirst(desps?.first);
    setSecond(desps?.second);
    setThird(desps?.third);
    setFourth(desps?.fourth);
    setFifth(desps?.fifth);
  },[desps])
  return (
    <div className='flex flex-col gap-8'>
        <p className='text-xl font-bold'>Donnez votre temps de disponibilité</p>
        <div className='grid grid-cols-6'>
            <Hours first={first} second={second} third={third} fourth={fourth} fifth={fifth} />
            <Day day={'Sunday'} data={first} setData={setFirst} />
            <Day day={'Monday'} data={second} setData={setSecond} />
            <Day day={'Tuesday'} data={third} setData={setThird} />
            <Day day={'Wednesday'} data={fourth} setData={setFourth} />
            <Day day={'Thursday'} data={fifth} setData={setFifth} />
        </div>
    </div>
  )
}

export default Desponibilité