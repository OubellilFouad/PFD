import React, { useEffect, useRef, useState } from 'react'

const Day = ({day,data,setData}) => {
  const [first,setFirst] = useState(false);  
  const [second,setSecond] = useState(false);  
  const [third,setThird] = useState(false);  
  const [fourth,setFourth] = useState(false);  
  const [fifth,setFifth] = useState(false);  
  const h1 = useRef();
  const h2 = useRef();
  const h3 = useRef();
  const h4 = useRef();
  const h5 = useRef();
  const handleChange = (e,setToggle,toggle) => {
    setToggle(!toggle);
    let arr = data || [];
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
  useEffect(() => {
    if(data?.includes(h1.current.dataset.value)){
        setFirst(true);
    }
    if(data?.includes(h2.current.dataset.value)){
        setSecond(true);
    }
    if(data?.includes(h3.current.dataset.value)){
        setThird(true);
    }
    if(data?.includes(h4.current.dataset.value)){
        setFourth(true);
    }
    if(data?.includes(h5.current.dataset.value)){
        setFifth(true);
    }
  },[data])
  return (
    <>
        <div className='flex justify-center py-5 border border-gray-300'>{day}</div>
        <div ref={h1} onClick={(e) => handleChange(e,setFirst,first)} data-value='08h00-09h30' className={`flex justify-center border-gray-300 border items-center font-bold cursor-pointer text-white ${first?'bg-main':'hover:bg-paleMain'}`}>
            Selected
        </div>
        <div ref={h2} onClick={(e) => handleChange(e,setSecond,second)} data-value='09h40-11h10' className={`flex justify-center border-gray-300 border items-center font-bold cursor-pointer text-white ${second?'bg-main':'hover:bg-paleMain'}`}>
            Selected
        </div>
        <div ref={h3} onClick={(e) => handleChange(e,setThird,third)} data-value='11h20-12h50' className={`flex justify-center border-gray-300 border items-center font-bold cursor-pointer text-white ${third?'bg-main':'hover:bg-paleMain'}`}>
            Selected
        </div>
        <div ref={h4} onClick={(e) => handleChange(e,setFourth,fourth)} data-value='13h00-14h30' className={`flex justify-center border-gray-300 border items-center font-bold cursor-pointer text-white ${fourth?'bg-main':'hover:bg-paleMain'}`}>
            Selected
        </div>
        <div ref={h5} onClick={(e) => handleChange(e,setFifth,fifth)} data-value='14h40-16h10' className={`flex justify-center border-gray-300 border items-center font-bold cursor-pointer text-white ${fifth?'bg-main':'hover:bg-paleMain'}`}>
            Selected
        </div>
    </>
  )
}

export default Day