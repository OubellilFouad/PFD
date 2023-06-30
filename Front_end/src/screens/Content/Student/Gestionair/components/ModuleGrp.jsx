import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDrag } from 'react-dnd';
import { RxDragHandleDots2 } from 'react-icons/rx'
import { useGest } from '../context/GestContext';
const getOneModule = 'http://127.0.0.1:5000/module/'; 
const getOneTcModule = 'http://127.0.0.1:5000/moduletc/';
const getProfs = 'http://127.0.0.1:8000/api/chefdep/get-enseignantbyid/';
const getOneChefs = 'http://localhost:8000/api/admin/get-chefdepbyid/';

const ModuleGrp = ({afecid,module,profid,section,groupe,type,semestre,tc,chef,depid}) => {
  const [{isDraggin},drag] = useDrag(() => ({
    type: "group",
    item: {afecid,module,profid,section,groupe,type,semestre,tc,nature:'module',chef,depid},
    collect: (monitor) => ({
        isDraggin: !!monitor.isDragging(),
    })
  })); 
  const {setProfG,setTypeG} = useGest();
  const [click,setClick] = useState(false);
  const [oneModule,setOneModule] = useState({});
  const [prof,setProf] = useState({});
  const [typeArr,setTypeArr] = useState([]);
  const getOneMod = async () => {
    const {data} = await axios.get(`${getOneModule}${module}`);
    setOneModule(data);
  }
  const getOneTcMod = async () => {
    const {data} = await axios.get(`${getOneTcModule}${module}`);
    setOneModule(data);
  }  
  const getProf = async () => {
    const {data} = await axios.get(`${getProfs}${profid}`);
    setProf(data);
  }
  const getChef = async (id) => {
    const {data} = await axios.get(`${getOneChefs}${profid}`);
    setProf(data);
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
    if(chef){
      getChef();
    }else{
      getProf();
    }
  },[])
  return (
    <div ref={drag} onClick={() => {handleClick()}} className={`py-1 pl-2 rounded-md text-sm font-semibold flex flex-col gap-2 forma cursor-grab ${isDraggin && 'text-main'} ${click?'bg-main text-white':'bg-separator'} group`}>
        <div className='flex gap-2 items-center'>
          <RxDragHandleDots2/>
          <p className=''>
              {`${oneModule.abbr} `}
              -
              {` ${typeArr.toString()}`}
          </p>
        </div>
        <p className={`hidden ${!isDraggin && 'group-hover:block'}`}>Teacher: {prof.userName} </p>
    </div>
  )
}

export default ModuleGrp