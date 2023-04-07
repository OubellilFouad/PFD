import React, { useEffect, useState } from 'react'
import {HiDotsCircleHorizontal} from 'react-icons/hi'
import ModuleCard from './components/ModuleCard'
import { useChef } from './context/ChefContext'
import axios from 'axios';
import { useAuth } from '../../../../context/AuthContext';
const getModules = 'https://pfeboumerdes.pythonanywhere.com/modules/';

const Modules = () => {
  const {modules} = useChef();
  const {user} = useAuth();
  const [module,setModule] = useState([]);
  const getSpeModules = async () => {
    const {data} = await axios.get(`${getModules}${user?.depID}`);
    setModule(data);
  }
  useEffect(() => {
    getSpeModules();
  },[modules])
  return (
    <div className='flex flex-col gap-8'>
        <p className='text-2xl font-bold'>List des Modules</p>
        <div className='grid grid-cols-3 gap-14'>
            {module.map((module) => {
              const {nom,speid,fillid,modid} = module;
              return (
                <ModuleCard nom={nom} speid={speid} fillid={fillid} moduleid={modid} />
              )
            })}
        </div>
    </div>
  )
}

export default Modules