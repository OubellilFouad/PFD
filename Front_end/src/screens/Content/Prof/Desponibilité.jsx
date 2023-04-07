import React, { useState } from 'react'
import Hours from './components/Hours'
import Day from './components/Day'

const Desponibilité = () => {
  const [first,setFirst] = useState([]);  
  const [second,setSecond] = useState([]);  
  const [third,setThird] = useState([]);  
  const [fourth,setFourth] = useState([]);  
  const [fifth,setFifth] = useState([]);  
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