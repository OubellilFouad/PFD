import React, { useEffect, useState } from 'react'
import {CgSelectR} from 'react-icons/cg'
import Choice from './components/Choice'
import { useChef } from '../chefDep/context/ChefContext'
import axios from 'axios';
import { useAuth } from '../../../../context/AuthContext';
const addChoices = 'http://localhost:8000/api/prof/choixmodules-enseignant/';

const Choix = () => {
  const {modules} = useChef(); 
  const {user} = useAuth();
  const [module,setModule] = useState([]);
  const [mod1,setMod1] = useState(null);
  const [mod2,setMod2] = useState(null);
  const [mod3,setMod3] = useState(null);
  const [mod4,setMod4] = useState(null);
  const [mod5,setMod5] = useState(null);

  const [type1,setType1] = useState([]);
  const [type2,setType2] = useState([]);
  const [type3,setType3] = useState([]);
  const [type4,setType4] = useState([]);
  const [type5,setType5] = useState([]);
  const addChoice = async (formData) => {
    const {data,status} = await axios.post(`${addChoices}${user?.id}`,formData);
    console.log('data:',data);
    console.log('status:',status);
  }
  useEffect(() => {
    setModule(modules.filter((module) => {
        if(module.modid !== mod1 && module.modid !== mod2 && module.modid !== mod3 && module.modid !== mod4 && module.modid !== mod5){
            return module;
        }
    }))
  },[mod1,mod2,mod3,mod4,mod5])
  const handleSubmit = () => {
    const formData = {
        choix1:{
            moduleID: mod1,
            type:type1,
        },
        choix2:{
            moduleID: mod2,
            type:type2,
        },
        choix3:{
            moduleID: mod3,
            type:type3,
        },
        choix4:{
            moduleID: mod4,
            type:type4,
        },
        choix5:{
            moduleID: mod5,
            type:type5,
        }
    }
    const result = {
        choix: JSON.stringify(formData)
    }
    addChoice(result);
  }
  return (
    <div className='flex flex-col gap-8'>
        <p className='text-xl font-bold'>Choisissez les modules que vous souhaitez enseigner, l'ordre sera pris en considération</p>
        <div className='flex justify-between flex-col border rounded-lg px-4 py-5 gap-4'>
            <div className='border-[#DADADA] items-center flex-[40%] flex gap-4'>
                <div className='p-4 bg-[#F4F4F4] text-2xl rounded-lg text-black'>
                    <CgSelectR/>
                </div>
                <div className='flex flex-col justify-between'>
                    <p className='text-2xl font-semibold'>Les choix</p>
                </div>
            </div>
            <Choice modules={module} setModule={setMod1} module={mod1} type={type1} setType={setType1} />
            <Choice modules={module} setModule={setMod2} module={mod2} type={type2} setType={setType2} />
            <Choice modules={module} setModule={setMod3} module={mod3} type={type3} setType={setType3} />
            <Choice modules={module} setModule={setMod4} module={mod4} type={type4} setType={setType4} />
            <Choice modules={module} setModule={setMod5} module={mod5} type={type5} setType={setType5} />
            <div className='flex justify-end pt-4'>
                <button onClick={()=>handleSubmit()} className='py-2 px-5 rounded-lg text-white bg-main'>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default Choix