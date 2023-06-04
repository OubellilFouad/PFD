import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {AiFillDelete} from 'react-icons/ai'
import { useChef } from '../context/ChefContext';
import { useAdmin } from '../../admin/context/AdminContext';
import { useAuth } from '../../../../../context/AuthContext';
import { useGest } from '../../Gestionair/context/GestContext';
const getOneSpes = 'https://pfeboumerdes.pythonanywhere.com/specialite/';

const ModuleCard = ({nom,speid,moduleid,type,abbr}) => {
  const [spe,setSpe] = useState({});
  const {deleteAllModEdt} = useGest();
  const {user} = useAuth();
  const {deleteTcMod} = useAdmin();
  const {deleteModule,deleteAllModAffect} = useChef();
  const getOneSpe = async (id) => {
    const response = await axios.get(`${getOneSpes}${id}`);
    const result = await response.data;
    setSpe(result);
  }
  const handleDelete = (id) => {
    if(type === 'commun'){
      deleteTcMod(id)
    }else{
      deleteModule(id);
      deleteAllModAffect(moduleid);
      deleteAllModEdt(moduleid);
    }
  }
  useEffect(() => {
    getOneSpe(speid);
    console.log(spe)
  },[])
  return (
    <div className='bg-separator flex flex-col rounded-xl py-4 px-6 gap-2'>
        <div className='flex justify-between items-center'>
          <p className='text-xl font-bold' >{abbr}</p>
          {type === 'commun' && user.role === 0 && (<AiFillDelete onClick={() => handleDelete(moduleid)} className='text-lg cursor-pointer hover:text-red'/>)}
          {type !== 'commun' && user.role === 1 && (<AiFillDelete onClick={() => handleDelete(moduleid)} className='text-lg cursor-pointer hover:text-red'/>)}
        </div>
        <span>{type === 'commun' ? 'Tranc commun' : spe.nom}</span>
    </div>
  )
}

export default ModuleCard