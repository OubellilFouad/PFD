import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { NavLink } from 'react-router-dom'
import { useAdmin } from "../context/AdminContext";
import { useChef } from '../../chefDep/context/ChefContext';
import { useGest } from '../../Gestionair/context/GestContext';
const getOneDomainUrl = 'http://127.0.0.1:5000/domain/';

const Card = ({nom,depid,domainid}) => { 
  const {deleteDep,deleteAllGestDeps,deleteAllChef} = useAdmin();
  const {deleteAllDepAffect,deleteAllDepPal,deleteAllProf,deleteAllDepGroup,deleteAllDepSection,deleteAllDepFils,deleteAllDepSpe,deleteAllDepModule} = useChef();
  const {deleteAllDepEdt} = useGest();
  const [name,setName] = useState('');
  const getOneDomain = async () => {
    const response = await axios.get(`${getOneDomainUrl}${domainid}`);
    const result = await response.data;
    setName(result.nom);
  }
  useEffect(() => {
    getOneDomain();
  },[])
  return (
    <div className='aspect-[163/104 card relative rounded-lg'>
        <div className='bg-separator rounded-lg p-5 flex flex-col justify-between items-end border relative z-10'>
            <div className='flex flex-col gap-2 h-24 w-full'>
                <div className='flex justify-between items-center'>
                <p className='text-xl font-bold'>{nom}</p>
                  <AiFillDelete onClick={() => {
                    deleteDep(depid);
                    deleteAllGestDeps(depid);
                    deleteAllDepAffect(depid);
                    deleteAllDepPal(depid);
                    deleteAllProf(depid);
                    deleteAllDepGroup(depid);
                    deleteAllDepSection(depid);
                    deleteAllDepFils(depid);
                    deleteAllDepSpe(depid);
                    deleteAllDepModule(depid);
                    deleteAllChef(depid);
                    deleteAllDepEdt(depid);
                  }} className='text-lg cursor-pointer hover:text-red'/>
                </div>
                <span className='text-sm font-semibold'>{name}</span>
            </div>
            <NavLink to={'info'} end state={{
              name: 'Dashboard',
              depid : depid,
              page: 'Info',
              dep: nom
            }}>
              <button className='py-2 px-5 rounded-lg text-white bg-main'>Enter</button>
            </NavLink>
        </div>
    </div>
  )
}

export default Card