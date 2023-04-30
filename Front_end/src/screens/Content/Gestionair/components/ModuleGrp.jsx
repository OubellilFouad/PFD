import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDrag } from 'react-dnd';
import { RxDragHandleDots2 } from 'react-icons/rx'
import { useGest } from '../context/GestContext';
const getOneModule = 'https://pfeboumerdes.pythonanywhere.com/module/'; 
const getOneTcModule = 'https://pfeboumerdes.pythonanywhere.com/moduletc/';

const ModuleGrp = ({afecid,module,profid,section,groupe,type,semestre,tc}) => {
  const [{isDraggin},drag] = useDrag(() => ({
    type: "group",
    item: {afecid,module,profid,section,groupe,type,semestre,tc,nature:'module'},
    collect: (monitor) => ({
        isDraggin: !!monitor.isDragging(),
    })
  })); 
  const {setProfG,setTypeG} = useGest();
  const [click,setClick] = useState(false);
  const [oneModule,setOneModule] = useState({});
  const [typeArr,setTypeArr] = useState([]);
  const getOneMod = async () => {
    const {data} = await axios.get(`${getOneModule}${module}`);
    setOneModule(data);
  }
  const getOneTcMod = async () => {
    const {data} = await axios.get(`${getOneTcModule}${module}`);
    setOneModule(data);
  }  
  const handleClick = () => {
    setClick(!click)
    if(!click){
      setProfG(profid);
      setTypeG(JSON.parse(type)[0]);
    }else{
      setProfG(null);
      setTypeG('');
    }
  }
  useEffect(() => {
    setTypeArr(JSON.parse(type));
    if(tc){
      getOneTcMod();
    }else{
      getOneMod();
    }
  },[])
  return (
    <div ref={drag} onClick={() => {handleClick()}} className={`py-1 pl-2 rounded-md text-sm font-semibold flex items-center gap-2 forma cursor-grab ${isDraggin && 'text-main'} ${click?'bg-main text-white':'bg-separator'}`}>
        <RxDragHandleDots2/>
        <p className=''>
            {`${oneModule.abbr} `}
            -
            {` ${typeArr.toString()}`}
        </p>
    </div>
  )
}

export default ModuleGrp