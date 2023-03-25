import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { useLocation } from 'react-router-dom'
import ChefCard from './components/ChefCard';
import ChefForm from './components/ChefForm';
import EditForm from './components/EditForm';
import GestionairCard from './components/GestionairCard';
import TableRow from './components/TableRow';
import { useAdmin } from './context/AdminContext';
const getOneUrl = 'https://pfeboumerdes.pythonanywhere.com/dep/';
const getOneChefs = 'http://localhost:8000/api/admin/get-chefdepbydepid/';

const DepInfo = () => {
  const {setOpenChef,openChef,openEdit} = useAdmin();
  const location = useLocation();
  const [dep,setDep] = useState('');
  const [chef,setChef] = useState(null);
  useEffect(() => {
    setDep(location.state.dep);
    getOneChef(location.state.depid);
    console.log(chef);
  },[location.state.dep,openChef,openEdit])
  const getOneDep = async (depID) => {
    const result = await axios.get(`${getOneUrl}${depID}`)
  }
  const getOneChef = async (id) => {
    const response = await axios.get(`${getOneChefs}${id}`)
    const result = await response.data;
    console.log(result);
    if(Object.keys(result).length !== 0){
      setChef(result)
    }else{
      setChef(null)
    }
  }
  return (
    <div className='flex flex-col gap-8'>
        <p className='text-xl font-bold'>{dep}</p>
        <div className='flex flex-col gap-8'>
            {chef && (<ChefCard userName={chef.userName} email={chef.email} userID={chef.userID} />)}
            {!chef && (
              <div className='flex justify-between'>
                <div onClick={() => setOpenChef(true)} className='px-4 py-5 border-[#DADADA] flex-[40%] flex justify-center items-center border gap-4 rounded-lg cursor-pointer hover:text-main'>
                    <AiOutlinePlus className='text-xl'/>
                    Add Chef
                </div>
                <div className='flex-1 flex justify-end items-center'>
                    
                </div>
              </div>
            )}
            <p className='text-2xl font-bold'>Les Prof</p>
            <div className='border border-[#F2F2F2] rounded-lg'>
                <TableRow type='header'/>
            </div>
        </div>
        <ChefForm depID={location.state.depid} getOneChef={getOneChef} />
        <EditForm depID={location.state.depid} getOneChef={getOneChef} chef={chef} />
    </div>
  )
}

export default DepInfo