import React, { useState } from 'react'

const Day = ({day,data,setData}) => {
  const [first,setFirst] = useState('');  
  const [second,setSecond] = useState('');  
  const [third,setThird] = useState('');  
  const [fourth,setFourth] = useState('');  
  const [fifth,setFifth] = useState('');  
  const handleChange = (e,setToggle,toggle) => {
    setToggle(!toggle);
    let arr = data;
    if(!toggle){
        arr.push(e.target.dataset.value);
        setData(arr);
    }else{
        let newArr = arr.filter((data) => {
            if(data !== e.target.dataset.value){
                return data;
            }
        })
        setData(newArr);
    }
  }
  return (
    <>
        <div className='flex justify-center py-5 border border-gray-300'>{day}</div>
        <div onClick={(e) => handleChange(e,setFirst,first)} data-value='08h00-09h30' className={`flex justify-center border-gray-300 border items-center font-bold cursor-pointer hover:bg-paleMain text-white ${first&&'bg-main'}`}>
            Selected
        </div>
        <div onClick={(e) => handleChange(e,setSecond,second)} data-value='09h40-11h10' className={`flex justify-center border-gray-300 border items-center font-bold cursor-pointer hover:bg-paleMain text-white ${second&&'bg-main'}`}>
            Selected
        </div>
        <div onClick={(e) => handleChange(e,setThird,third)} data-value='11h20-12h50' className={`flex justify-center border-gray-300 border items-center font-bold cursor-pointer hover:bg-paleMain text-white ${third&&'bg-main'}`}>
            Selected
        </div>
        <div onClick={(e) => handleChange(e,setFourth,fourth)} data-value='13h00-14h30' className={`flex justify-center border-gray-300 border items-center font-bold cursor-pointer hover:bg-paleMain text-white ${fourth&&'bg-main'}`}>
            Selected
        </div>
        <div onClick={(e) => handleChange(e,setFifth,fifth)} data-value='14h40-16h10' className={`flex justify-center border-gray-300 border items-center font-bold cursor-pointer hover:bg-paleMain text-white ${fifth&&'bg-main'}`}>
            Selected
        </div>
    </>
  )
}

export default Day