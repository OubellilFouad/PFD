import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiFillCaretRight } from 'react-icons/ai'
import ModuleGrp from './ModuleGrp';
import { NavLink } from 'react-router-dom';
import { useGest } from '../context/GestContext';
const getAffs = 'https://pfeboumerdes.pythonanywhere.com/affectations/grp/';

const Group = ({nom,grpid,annee,type}) => {
  const {sem,setSection,setGroup,setCommun} = useGest();
  const [open,setOpen] = useState(false);  
  const [affects,setAffects] = useState([]);
  const [affSem,setAffSem] = useState([]);
  const [afftc,setAfftc] = useState([]);
  const [semestre,setSemestre] = useState(null);
  const getAff = async () => {
    const {data} = await axios.get(`${getAffs}${grpid}`);
    setAffects(data);
  }
  useEffect(() => {
    getAff();
  },[])
  useEffect(() => {
    // First
    if(annee === 1 && sem === 'first'){
      setSemestre(1);
    }
    if(annee === 2 && sem === 'first'){
      setSemestre(3);
    }
    if(annee === 3 && sem === 'first'){
      setSemestre(5);
    }
    if(annee === 4 && sem === 'first'){
      setSemestre(1);
    }
    if(annee === 5 && sem === 'first'){
      setSemestre(3);
    }
    // Second
    if(annee === 1 && sem === 'second'){
      setSemestre(2);
    }
    if(annee === 2 && sem === 'second'){
      setSemestre(4);
    }
    if(annee === 3 && sem === 'second'){
      setSemestre(6);
    }
    if(annee === 4 && sem === 'second'){
      setSemestre(2);
    }
    if(annee === 5 && sem === 'second'){
      setSemestre(4);
    }
  },[sem])
  useEffect(() => {
    if(type === 'tc'){
      let here = affects.filter(a => a.tc === true);
      setAfftc(here);
      setCommun(true);
    }else{
      setCommun(false);
      if(semestre){
        let here = affects.filter(a => parseInt(a.semestre) === semestre);
        setAffSem(here);
      }
    }
  },[semestre,affects])
  useEffect(() => {
    if(Object.keys(afftc).length !== 0){
      if(semestre){
        let here = afftc.filter(a => parseInt(a.semestre) === semestre);
        setAffSem(here);
      }
    }
  },[afftc,semestre])
  return (
    <>
        <div className='py-1 pl-2 bg-separator rounded-md text-base font-semibold flex items-center gap-2 forma'>
            <AiFillCaretRight onClick={() => setOpen(!open)} className={`text-sm cursor-pointer transition-[rotate_150ms] ${open?'rotate-90':'rotate-0'}`}/>
            <NavLink to={'grp'} onClick={() => {
              setGroup(grpid);
              setSection(null);
            }} end state={{
              page: 'EDT',
              grpid,
              name: 'Time tables',
              type
            }}>
              
              <p className='hover:text-main cursor-pointer'>{nom}</p>
            </NavLink>
        </div>
        <div className={`flex-col pl-2 transition-[height_250ms] gap-3 ${open?'flex':'hidden'} pal`}>
            {affSem.map((a) => {
                const {afecid,module,profid,section,groupe,type,semestre,tc,chef} = a;
                return(
                    <ModuleGrp key={afecid} module={module} tc={tc} chef={chef} afecid={afecid} semestre={semestre} profid={profid} section={section} groupe={groupe} type={type} />
                )
            })}
        </div>
    </>
  )
}

export default Group