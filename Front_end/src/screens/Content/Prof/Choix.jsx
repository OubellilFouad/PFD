import React, { useEffect, useState } from 'react'
import {CgSelectR} from 'react-icons/cg'
import Choice from './components/Choice'
import { useChef } from '../chefDep/context/ChefContext'
import axios from 'axios';
import { useAuth } from '../../../../context/AuthContext';
import { useProf } from './context/ProfContext';
const getOneChoix = 'http://127.0.0.1:5000/veuxs/';

const Choix = () => {
  const {modules} = useChef(); 
  const {user,setShow,setAddMessage,setColor} = useAuth();
  const {addChoice,choix,deleteChoice} = useProf()
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

  const [palid1,setPalid1] = useState(null);
  const [palid2,setPalid2] = useState(null);
  const [palid3,setPalid3] = useState(null);
  const [palid4,setPalid4] = useState(null);
  const [palid5,setPalid5] = useState(null);

  const [speid1,setSpeid1] = useState(null);
  const [speid2,setSpeid2] = useState(null);
  const [speid3,setSpeid3] = useState(null);
  const [speid4,setSpeid4] = useState(null);
  const [speid5,setSpeid5] = useState(null);

  const getOneChoice = async () => {
    const {data} = await axios.get(`${getOneChoix}${user?.userID}`);
    setChoices(data);
  }
  useEffect(() => {
    getOneChoice();
  },[choix])
  useEffect(() => {
    if(choices){
        const {choix1,choix2,choix3,choix4,choix5} = choices;
        setMod1(choix1?JSON.parse(choix1).moduleID:null);
        setMod2(choix2?JSON.parse(choix2).moduleID:null);
        setMod3(choix3?JSON.parse(choix3).moduleID:null);
        setMod4(choix4?JSON.parse(choix4).moduleID:null);
        setMod5(choix5?JSON.parse(choix5).moduleID:null);
        setType1(choix1 && JSON.parse(choix1).type);
        setType2(choix2 && JSON.parse(choix2).type);
        setType3(choix3 && JSON.parse(choix3).type);
        setType4(choix4 && JSON.parse(choix4).type);
        setType5(choix5 && JSON.parse(choix5).type);
    }else{
        setMod1(null);
        setMod2(null);
        setMod3(null);
        setMod4(null);
        setMod5(null);
        setType1(null);
        setType2(null);
        setType3(null);
        setType4(null);
        setType5(null);
    }
  },[choices,choix])
  useEffect(() => {
    setModule(modules.filter((module) => {
        if(module.modid !== mod1 && module.modid !== mod2 && module.modid !== mod3 && module.modid !== mod4 && module.modid !== mod5){
            return module;
        }
    }))
  },[mod1,mod2,mod3,mod4,mod5])
  const handleSubmit = () => {
    const formData = {
        teacherid: user?.userID,
        choix1:JSON.stringify({
            moduleID: mod1 || null,
            type:type1 || [],
            palid:palid1,
            speid: speid1
        }),
        choix2:JSON.stringify({
            moduleID: mod2 || null,
            type:type2 || [],
            palid:palid2,
            speid: speid2
        }),
        choix3:JSON.stringify({
            moduleID: mod3 || null,
            type:type3 || [],
            palid:palid3,
            speid: speid3
        }),
        choix4:JSON.stringify({
            moduleID: mod4 || null,
            type:type4 || [],
            palid:palid4,
            speid: speid4
        }),
        choix5:JSON.stringify({
            moduleID: mod5 || null,
            type:type5 || [],
            palid:palid5,
            speid: speid5
        })
    }
    if(mod1 === null || mod2 === null || mod3 === null || mod4 === null || mod5 === null){
        setShow(true);
        setAddMessage('Choose 5 modules first');
        setColor(false);
    }else{
        addChoice(formData)
        setShow(true);
        setAddMessage('Added choice successfuly');
        setColor(true);
    }
  }
  return (
    <div className='flex flex-col gap-8 overflow-hidden'>
        <p className='text-xl font-bold'>Choisissez les modules que vous souhaitez enseigner, l'ordre sera pris en considération</p>
        <div className='flex justify-between flex-col border rounded-lg px-4 py-5 gap-4 overflow-x-scroll'>
            <div className='border-[#DADADA] items-center flex-[40%] flex gap-4'>
                <div className='p-4 bg-[#F4F4F4] text-2xl rounded-lg text-black'>
                    <CgSelectR/>
                </div>
                <div className='flex items-center justify-between w-full'>
                    <p className='text-2xl font-semibold'>Les choix</p>
                    {Object.keys(choices).length !== 0 && (
                        <div className='flex justify-center'>
                            <button onClick={()=>deleteChoice(choices?.veuxid)} className='rounded-l text-red text-lg font-semibold'>Reset</button>
                        </div>
                    )}
                    {Object.keys(choices).length === 0 && (
                        <div className='flex justify-end pt-4'>
                            <button onClick={()=>handleSubmit()} className='font-bold hover:text-paleMain text-main'>Submit</button>
                        </div>
                    )}
                </div>
            </div>
            <Choice modules={module} setModule={setMod1} module={mod1} type={type1} setType={setType1} setPalid={setPalid1} setSpeid={setSpeid1} />
            <Choice modules={module} setModule={setMod2} module={mod2} type={type2} setType={setType2} setPalid={setPalid2} setSpeid={setSpeid2} />
            <Choice modules={module} setModule={setMod3} module={mod3} type={type3} setType={setType3} setPalid={setPalid3} setSpeid={setSpeid3} />
            <Choice modules={module} setModule={setMod4} module={mod4} type={type4} setType={setType4} setPalid={setPalid4} setSpeid={setSpeid4} />
            <Choice modules={module} setModule={setMod5} module={mod5} type={type5} setType={setType5} setPalid={setPalid5} setSpeid={setSpeid5} />
            
        </div>
    </div>
  )
}

export default Choix