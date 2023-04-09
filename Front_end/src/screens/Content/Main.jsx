import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {AiOutlinePlus} from 'react-icons/ai'
import DepForm from './admin/components/DepForm';
import { useAuth } from '../../../context/AuthContext';
import GestForm from './admin/components/GestForm';
import ChefForm from './admin/components/ChefForm';
import SectionForm from './chefDep/components/SectionForm';
import { useChef } from './chefDep/context/ChefContext';
import GroupForm from './chefDep/components/GroupForm';
import ModuleForm from './chefDep/components/ModuleForm';
import SpeForm from './chefDep/components/SpeForm';
import ChambreForm from './chefDep/components/ChambreForm';
import ProfForm from './chefDep/components/ProfForm';
import AddMessage from './AddMessage';

const Main = () => {
  const location = useLocation();
  const {user} = useAuth();
  const {setOpenSec,setOpenModule,setOpenSpe,setOpenSalle} = useChef();
  const [title,setTitle] = useState('Dashboard');
  const [page,setPage] = useState('Main');
  const [open,setOpen] = useState(false);
  useEffect(() => {
    location.state?.name? setTitle(location.state.name):setTitle(title);
    location.state?.page? setPage(location.state.page):setPage(page);
  },[location.state?.name,location.state?.page])  
  return (
    <div className='py-7 px-12 flex flex-col gap-8 overflow-x-scroll main'>
        <div className='text-5xl font-semibold flex justify-between items-center'>
            <p>{title}</p>
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
            {page === 'Spécialités' && (
                <button onClick={() => setOpenSpe(true)} className='flex items-center text-base gap-2 py-2 px-4 border rounded-lg hover:text-main hover:border-main'>
                    <AiOutlinePlus className='p-1 bg-palerMain text-main text-xl rounded-md'/>
                    Add Spécialité
                </button>
            )}
            {page === 'Salles' && (
                <button onClick={() => setOpenSalle(true)} className='flex items-center text-base gap-2 py-2 px-4 border rounded-lg hover:text-main hover:border-main'>
                    <AiOutlinePlus className='p-1 bg-palerMain text-main text-xl rounded-md'/>
                    Add Chambre
                </button>
            )}
        </div>
        <Outlet/>
        <DepForm open={open} setOpen={setOpen}/>
        <GestForm/>
        <SectionForm/>
        <ModuleForm/>
        <SpeForm/>
        <ChambreForm/>
        <ProfForm/>
        <AddMessage/>
    </div>
  )
}

export default Main