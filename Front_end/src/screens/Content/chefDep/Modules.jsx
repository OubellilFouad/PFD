import React, { useEffect, useState } from 'react'
import {HiDotsCircleHorizontal} from 'react-icons/hi'
import ModuleCard from './components/ModuleCard'
import { useChef } from './context/ChefContext'
import axios from 'axios';
import { useAuth } from '../../../../context/AuthContext';
const getModules = 'https://pfeboumerdes.pythonanywhere.com/modules/';
const getTcModules = 'https://pfeboumerdes.pythonanywhere.com/modulestc/dep/';

const Modules = () => {
  const {modules} = useChef();
  const {user} = useAuth();
  const [module,setModule] = useState([]);
  const [tcmodule,setTcModule] = useState([]);
  const getSpeModules = async () => {
    const {data} = await axios.get(`${getModules}dep/${user?.depID}`);
    console.log(data)
    setModule(data);
  }
  const getTcModule = async () => {
    const {data} = await axios.get(`${getTcModules}${user?.depID}`);
    setTcModule(data);
  }
  useEffect(() => {
    getSpeModules();
    getTcModule();
  },[modules])
  return (
    <div className='flex flex-col gap-8 overflow-hidden'>
        <div className='grid grid-cols-3 gap-14 overflow-x-scroll'>
            {module.map((module) => {
              const {nom,speid,fillid,modid,abbr} = module;
              return (
                <ModuleCard key={modid} nom={nom} speid={speid} abbr={abbr} fillid={fillid} moduleid={modid} />
              )
            })}
            {tcmodule.map((module) => {
              const {nom,speid,fillid,modid,abbr} = module;
              return (
                <ModuleCard key={modid} type={'commun'} nom={nom} abbr={abbr} speid={speid} fillid={fillid} moduleid={modid} />
              )
            })}
        </div>
    </div>
  )
}

export default Modules