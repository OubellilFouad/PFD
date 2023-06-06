import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import {AiOutlinePlus} from 'react-icons/ai'
import DepForm from './admin/components/DepForm';
import { useAuth } from '../../../context/AuthContext';
import GestForm from './admin/components/GestForm';
import SectionForm from './chefDep/components/SectionForm';
import { useChef } from './chefDep/context/ChefContext';
import ModuleForm from './chefDep/components/ModuleForm';
import SpeForm from './chefDep/components/SpeForm';
import ChambreForm from './chefDep/components/ChambreForm';
import ProfForm from './chefDep/components/ProfForm';
import AddMessage from './AddMessage';
import FormaForm from './admin/components/FormaForm';
import { useAdmin } from './admin/context/AdminContext';
import TcSectionForm from './admin/components/TcSectionForm';
import TcModForm from './admin/components/TcModForm';
import Select from './chefDep/components/Select';
import { useGest } from './Gestionair/context/GestContext';
import axios from 'axios';
const getSecs = 'http://127.0.0.1:5000/section/';
const getTcSecs = 'http://127.0.0.1:5000/sectiontc/';
const getGrps = 'http://127.0.0.1:5000/groupe/';
const getTcGrps = 'http://127.0.0.1:5000/groupetc/';

const Main = () => {
  const location = useLocation();
  const {user} = useAuth();
  const {setOpenForm,setOpenPaliers,setOpenSections,setOpenTcModules} = useAdmin()
  const {setOpenSec,setOpenModule,setOpenSpe,setOpenSalle,setOpenPalier} = useChef();
  const {setSem,section,group,commun} = useGest();
  const [title,setTitle] = useState('Dashboard');
  const [page,setPage] = useState('Main');
  const [open,setOpen] = useState(false);
  const [sec,setSec] = useState({});
  const [grp,setGrp] = useState({});
  const getSection = async (id) => {
    const {data} = await axios.get(`${getSecs}${id}`);
    setSec(data);
  }
  const getTcSection = async (id) => {
    const {data} = await axios.get(`${getTcSecs}${id}`);
    setSec(data);
  }
  const getGroup = async (id) => {
    const {data} = await axios.get(`${getGrps}${id}`);
    setGrp(data);
  }
  const getTcGroup = async (id) => {
    const {data} = await axios.get(`${getTcGrps}${id}`);
    setGrp(data);
  }
  useEffect(() => {
    location.state?.name? setTitle(location.state.name):setTitle(title);
    location.state?.page? setPage(location.state.page):setPage(page);
  },[location.state?.name,location.state?.page]) 
  useEffect(() => {
    if(user.role === 4){
        setTitle('Emploi du temps');
        setPage('EDTS');
    }
    if(user.role === 1){
        setTitle('Les Enseignants');
        setPage('Enseignants');
    }
  },[user]); 
  useEffect(() => {
    if(section){
        if(commun){
            getTcSection(section);
        }else{
            getSection(section);
        }
    }else{
        setSec({});
    }
  },[section])
  useEffect(() => {
    if(group){
        if(commun){
            getTcGroup(group);
        }else{
            getGroup(group);
        }
    }else{
        setSec({});
    }
  },[group])
  return (
    <div className='pt-7 pb-4 md:px-12 px-6 flex flex-col gap-8 main overflow-hidden'>
        <div className='flex justify-between items-center'>
            <p className='md:text-4xl text-3xl font-semibold'>
                {title}
                {Object.keys(sec).length !== 0 && (<span className='text-3xl text-main'>{page === 'EDT' && section && `: ${sec.nom}`}</span>)}
                {Object.keys(grp).length !== 0 && (<span className='text-3xl text-main'>{page === 'EDT' && group && `: ${grp.nom}`}</span>)}
            </p>
            {page === 'Main' && user?.role === 0 && (
                <button onClick={() => setOpen(true)} className='flex items-center text-base gap-2 py-2 px-4 border rounded-lg hover:text-main hover:border-main'>
                    <AiOutlinePlus className='p-1 bg-palerMain text-main text-xl rounded-md'/>
                    Add Dep
                </button>
            )}
            {page === 'Sections' && (
                <button onClick={() => setOpenSec(true)} className='flex items-center text-base gap-2 py-2 px-4 border rounded-lg hover:text-main hover:border-main'>
                    <AiOutlinePlus className='p-1 bg-palerMain text-main text-xl rounded-md'/>
                    Add Section
                </button>
            )}
            {page === 'Modules' && (
                <button onClick={() => setOpenModule(true)} className='flex items-center text-base gap-2 py-2 px-4 border rounded-lg hover:text-main hover:border-main'>
                    <AiOutlinePlus className='p-1 bg-palerMain text-main text-xl rounded-md'/>
                    Add Module
                </button>
            )}
            {page === 'Formations' && (
                <button onClick={() => setOpenSpe(true)} className='flex items-center text-base gap-2 py-2 px-4 border rounded-lg hover:text-main hover:border-main'>
                    <AiOutlinePlus className='p-1 bg-palerMain text-main text-xl rounded-md'/>
                    Add Formations
                </button>
            )}
            {page === 'Resource' && (
                <button onClick={() => setOpenSalle(true)} className='flex items-center text-base gap-2 py-2 px-4 border rounded-lg hover:text-main hover:border-main'>
                    <AiOutlinePlus className='p-1 bg-palerMain text-main text-xl rounded-md'/>
                    Add Chambre
                </button>
            )}
            {page === 'paliers' && (
                <button onClick={() => setOpenPalier(true)} className='flex items-center text-base gap-2 py-2 px-4 border rounded-lg hover:text-main hover:border-main'>
                    <AiOutlinePlus className='p-1 bg-palerMain text-main text-xl rounded-md'/>
                    Add Paliers
                </button>
            )}
            {page === 'TCFormations' && (
                <button onClick={() => setOpenForm(true)} className='flex items-center text-base gap-2 py-2 px-4 border rounded-lg hover:text-main hover:border-main'>
                    <AiOutlinePlus className='p-1 bg-palerMain text-main text-xl rounded-md'/>
                    Add Formations
                </button>
            )}
            {page === 'TCPal' && (
                <button onClick={() => setOpenPaliers(true)} className='flex items-center text-base gap-2 py-2 px-4 border rounded-lg hover:text-main hover:border-main'>
                    <AiOutlinePlus className='p-1 bg-palerMain text-main text-xl rounded-md'/>
                    Add Palier
                </button>
            )}
            {page === 'TCSections' && (
                <button onClick={() => setOpenSections(true)} className='flex items-center text-base gap-2 py-2 px-4 border rounded-lg hover:text-main hover:border-main'>
                    <AiOutlinePlus className='p-1 bg-palerMain text-main text-xl rounded-md'/>
                    Add Section
                </button>
            )}
            {page === 'TCModules' && (
                <button onClick={() => setOpenTcModules(true)} className='flex items-center text-base gap-2 py-2 px-4 border rounded-lg hover:text-main hover:border-main'>
                    <AiOutlinePlus className='p-1 bg-palerMain text-main text-xl rounded-md'/>
                    Add Module
                </button>
            )}
            {page === 'EDT' && (<div className='flex items-center justify-end'>
                <Select name={'Tranche'} no={true} array={['first','second']} setData={setSem}/>
            </div>)}
            {page === 'PEDT' && (<div className='flex items-center justify-end'>
                <Select name={'Tranche'} no={true} array={['first','second']} setData={setSem}/>
            </div>)}
            {page === 'CEDT' && (<div className='flex items-center justify-end'>
                <Select name={'Tranche'} no={true} array={['first','second']} setData={setSem}/>
            </div>)}
            {page === 'EDTP' && (<div className='flex items-center justify-end'>
                <Select name={'Tranche'} no={true} array={['first','second']} setData={setSem}/>
            </div>)}
            {page === 'EDTS' && (<div className='flex items-center justify-end'>
                <Select name={'Tranche'} no={true} array={['first','second']} setData={setSem}/>
            </div>)}
        </div>
        <Outlet/>
        <DepForm open={open} setOpen={setOpen}/>
        <GestForm/>
        <SectionForm/>
        <ModuleForm/>
        <SpeForm/>
        <ChambreForm/>
        <ProfForm/>
        <FormaForm/>
        <AddMessage/>
        <TcSectionForm/>
        <TcModForm/>
    </div>
  )
}

export default Main