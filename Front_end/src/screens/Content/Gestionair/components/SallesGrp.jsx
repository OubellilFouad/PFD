import React, { useEffect, useState } from 'react'
import { useDrag } from 'react-dnd';
import { motion } from 'framer-motion';
import { useGest } from '../context/GestContext';

const SalleGrp = ({nom,type,capacity,chambreid}) => {
  const {typeG,setSalleG} = useGest();
  const [click,setClick] = useState(false);
  const [salle,setSalle] = useState(false);
  const [{isDraggin},drag] = useDrag(() => ({
      type: "group",
      item: {chambreid,nature:'chambre'},
      collect: (monitor) => ({
          isDraggin: !!monitor.isDragging(),
      })
  }));   
  const handleClick = () => {
    setClick(!click);
    if(!click){
      setSalleG(chambreid);
    }else{
      setSalleG(null)
    }
  }
  useEffect(() => {
    console.log(typeG)
    if(typeG === 'tp' || typeG === 'td'){
      setSalle(true);
    }
    if(typeG === ''){
      setSalle(false);
    }
  },[typeG])
  return (
    <motion.div className={`py-2 px-3 rounded-md text-sm border-separator border-2 min-w-[230px] hidden ${!salle?'!flex':'hidden'} ${salle && type === 'Salle' && '!flex'}`}>
        <p onClick={()=>handleClick()} ref={drag} className={`py-1 px-2 ${click?'bg-main text-white':'bg-separator text-black'} rounded-md flex items-center justify-center w-full`}>
            <span className='font-bold'>{nom}</span> / <span className='font-bold'>{capacity}</span> places / <span className='font-bold'>{type}</span> 
        </p>        
    </motion.div>
  )
}

export default SalleGrp