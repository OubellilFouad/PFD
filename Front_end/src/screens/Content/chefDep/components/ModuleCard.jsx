import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {AiFillDelete} from 'react-icons/ai'
import { useChef } from '../context/ChefContext';
import { useAdmin } from '../../admin/context/AdminContext';
import { useAuth } from '../../../../../context/AuthContext';
const getOneSpes = 'https://pfeboumerdes.pythonanywhere.com/specialite/';

const ModuleCard = ({nom,speid,moduleid,type}) => {
  const [spe,setSpe] = useState({});
  const {user} = useAuth();
  const {deleteTcMod} = useAdmin();
  const {deleteModule} = useChef();
  const getOneSpe = async (id) => {
    const response = await axios.get(`${getOneSpes}${id}`);
    const result = await response.data;
    setSpe(result);
  }
  const handleDelete = (id) => {
    if(type === 'commun'){
      deleteTcMod(id)
    }else{
      deleteModule(id)
    }
  }
  useEffect(() => {
    getOneSpe(speid);
    console.log(spe)
  },[])
  return (
    <div className='bg-separator flex flex-col rounded-xl pt-6 px-6 h-32 gap-4'>
        <div className='flex justify-between items-center'>
          <p className='text-2xl font-bold' >{nom}</p>
          {type === 'commun' && user.role === 0 && (<AiFillDelete onClick={() => handleDelete(moduleid)} className='text-lg cursor-pointer hover:text-red'/>)}
          {type !== 'commun' && user.role === 1 && (<AiFillDelete onClick={() => handleDelete(moduleid)} className='text-lg cursor-pointer hover:text-red'/>)}
        </div>
        <span>{type === 'commun' ? 'Tranc commun' : spe.nom}</span>
    </div>
  )
}

export default ModuleCard