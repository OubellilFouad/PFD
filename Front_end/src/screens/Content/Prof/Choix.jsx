import React, { useEffect, useState } from 'react'
import {CgSelectR} from 'react-icons/cg'
import Choice from './components/Choice'
import { useChef } from '../chefDep/context/ChefContext'
import axios from 'axios';
import { useAuth } from '../../../../context/AuthContext';
const addChoices = 'http://localhost:8000/api/prof/choixmodules-enseignant/';
const getChoices = 'http://localhost:8000/api/prof/enseignant-choix/';
const Choix = () => {
  const {modules} = useChef(); 
  const {user,setShow,setAddMessage,setColor} = useAuth();
  const [choices,setChoices] = useState({});
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
    await axios.post(`${addChoices}${user?.id}`,formData);
  }
  const getChoice = async () => {
    const {data} = await axios.get(`${getChoices}${user?.id}`);
    setChoices(JSON.parse(data.choices));
  }
  useEffect(() => {
    getChoice();
  },[])
  useEffect(() => {
    if(choices){
        const {choix1,choix2,choix3,choix4,choix5} = choices;
        setMod1(choix1?.moduleID?choix1.moduleID:null);
        setMod2(choix2?.moduleID?choix2.moduleID:null);
        setMod3(choix3?.moduleID?choix3.moduleID:null);
        setMod4(choix4?.moduleID?choix4.moduleID:null);
        setMod5(choix5?.moduleID?choix5.moduleID:null);
        setType1(choix1?.type);
        setType2(choix2?.type);
        setType3(choix3?.type);
        setType4(choix4?.type);
        setType5(choix5?.type);
    }
  },[choices])
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
            moduleID: mod1 || null,
            type:type1 || [],
        },
        choix2:{
            moduleID: mod2 || null,
            type:type2 || [],
        },
        choix3:{
            moduleID: mod3 || null,
            type:type3 || [],
        },
        choix4:{
            moduleID: mod4 || null,
            type:type4 || [],
        },
        choix5:{
            moduleID: mod5 || null,
            type:type5 || [],
        }
    }
    const result = {
        choix: JSON.stringify(formData)
    }
    console.log(formData)
    console.log(mod1,mod2,mod3,mod4,mod5)
    if(mod1 === null || mod2 === null || mod3 === null || mod4 === null || mod5 === null){
        console.log('empty')
        setShow(true);
        setAddMessage('Choose 5 modules first');
        setColor(false);
    }else{
        addChoice(result);
        setShow(true);
        setAddMessage('Added choice successfuly');
        setColor(true);
    }
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