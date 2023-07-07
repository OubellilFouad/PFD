import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiFillCaretRight } from 'react-icons/ai'
import Group from './Group';
import ModuleSec from './ModuleSec';
import { NavLink } from 'react-router-dom';
import { useGest } from '../context/GestContext';
const getGrp = 'http://127.0.0.1:5000/groupes/sec/';
const getTcGrp = 'http://127.0.0.1:5000/groupestc/';
const getaff = 'http://127.0.0.1:5000/affectations/sec/';

const Section = ({nom,secid,annee,type}) => {
  const {sem,setSection,setGroup,setCommun,setActiveSection,setActiveGroup,activeSection,activeGroup} = useGest();
  const [open,setOpen] = useState(false);
  const [grps,setGrps] = useState([]);
  const [grpstc,setGrpstc] = useState([]);
  const [aff,setAff] = useState([]);
  const [afftc,setAfftc] = useState([]);
  const [affSem,setAffSem] = useState([]);
  const [semestre,setSemestre] = useState(null);
  const [active,setActive] = useState(false);
  const getGrps = async () => {
    const {data} = await axios.get(`${getGrp}${secid}`);
    setGrps(data);
  }
  const getTcGrps = async () => {
    const {data} = await axios.get(`${getTcGrp}${secid}`);
    setGrpstc(data);
  }
  const getAffs = async () => {
    const {data} = await axios.get(`${getaff}${secid}`);
    setAff(data);
  }
  useEffect(() => {
    if(type === 'tc'){
      getTcGrps();
      getAffs();
      setCommun(true);
    }else{
      getGrps();
      getAffs();
      setCommun(false);
    }
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
      let here = aff.filter(a => a.tc === true);
      setAfftc(here);
    }else{
      if(semestre){
        let here = aff.filter(a => parseInt(a.semestre) === semestre);
        setAffSem(here);
      }
    }
  },[semestre,aff])
  useEffect(() => {
    if(Object.keys(afftc).length !== 0){
      if(semestre){
        let here = afftc.filter(a => parseInt(a.semestre) === semestre);
        setAffSem(here);
      }
    }
  },[afftc,semestre])
  useEffect(() => {
    if(activeSection === secid){
      setActive(true);
    }else{
      setActive(false);
    }
  },[activeSection,activeGroup])
  return (
    <>
        <div className={`py-1 pl-2 bg-separator rounded-md text-base font-semibold flex items-center gap-2 forma ${active && '!bg-main text-white'}`}>
            <AiFillCaretRight onClick={() => setOpen(!open)} className={`text-sm cursor-pointer transition-[rotate_150ms] ${open?'rotate-90':'rotate-0'}`}/>
            <NavLink to={'sec'} onClick={() => {
              setSection(secid);
              setActiveSection(secid);
              setGroup(null);
              setActiveGroup(null);
            }} end state={{
              page: 'EDT',
              secid,
              name: 'Time tables',
              type
            }}>
                  <p className={`hover:text-main cursor-pointer ${active && 'hover:!text-separator'}`}>{nom}</p>
            </NavLink>
        </div>
        {type !== 'tc' && (
          <div className={`flex-col pl-2 transition-[height_250ms] gap-3 ${open?'flex':'hidden'} pal`}>
            {affSem.map((a) => {
                const {afecid,module,profid,section,groupe,type,semestre,tc,chef,depid} = a;
                return(
                    <ModuleSec key={afecid} semestre={semestre} tc={tc} chef={chef} depid={depid} module={module} afecid={afecid} profid={profid} section={section} groupe={groupe} type={type} />
                )
            })}
            {grps.map((grp) => {
                const {nom,grpid} = grp;
                return(
                    <Group key={grpid} nom={nom} annee={annee} grpid={grpid}/>
                )
            })}
          </div>
        )}
        {type === 'tc' && (
          <div className={`flex-col pl-2 transition-[height_250ms] gap-3 ${open?'flex':'hidden'} pal`}>
            {affSem.map((a) => {
                const {afecid,module,profid,section,groupe,type,semestre,tc,chef,depid} = a;
                return(
                    <ModuleSec key={afecid} semestre={semestre} tc={tc} chef={chef} depid={depid} module={module} afecid={afecid} profid={profid} section={section} groupe={groupe} type={type} />
                )
            })}
            {grpstc.map((grp) => {
                const {nom,grpid} = grp;
                return(
                    <Group key={grpid} type={type} nom={nom} annee={annee} grpid={grpid}/>
                )
            })}
          </div>
        )}
    </>
  )
}

export default Section