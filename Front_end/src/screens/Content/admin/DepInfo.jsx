import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom'
import ChefCard from './components/ChefCard';
import ChefForm from './components/ChefForm';
import EditForm from './components/EditForm';
import GestionairCard from './components/GestionairCard';
import TableRow from './components/TableRow';
import { useAdmin } from './context/AdminContext';
import { useAuth } from '../../../../context/AuthContext';
import { useChef } from '../chefDep/context/ChefContext';
const getOneUrl = 'http://127.0.0.1:5000/dep/';
const getOneChefs = 'http://localhost:8000/api/admin/get-chefdepbydepid/';
const getDepProfs = 'http://127.0.0.1:8000/api/chefdep/get-enseignantbydepid/';

const DepInfo = () => {
  const {setOpenChef,openChef,openEdit,chefs} = useAdmin();
  const {user} = useAuth();
  const {profs} = useChef();
  const location = useLocation();
  const [dep,setDep] = useState('');
  const [chef,setChef] = useState(null);
  const [prof,setProf] = useState([]);
  useEffect(() => {
    setDep(location.state.dep);
    getOneChef(location.state.depid);
  },[location.state.dep,openChef,openEdit,chefs])

  const getOneDep = async (depID) => {
    const result = await axios.get(`${getOneUrl}${depID}`)
  }
  const getProf = async () => {
    const  {data} = await axios.get(`${getDepProfs}${location.state.depid}`);
    setProf(data);
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
  useEffect(() => {
    getProf();
  },[profs])
  return (
    <div className='flex flex-col gap-8 overflow-hidden'>
        <p className='text-xl font-bold'>{dep}</p>
        <div className='flex flex-col gap-8 overflow-y-scroll'>
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
            <div className='flex flex-col'>
              <div className='border border-t-separator border-l-separator border-b-transparent border-r-separator rounded-t-lg '>
                <TableRow type='header'/>
              </div>
              <div className='border border-b-separator border-l-separator border-r-separator border-t-separator rounded-b-lg'>
                  {prof.map((prof) => {
                    const {id,userName,email,userID,dateNaiss,grad,type} = prof;
                    return(
                      <TableRow key={id} id={id} nom={userName} typeT={type} email={email} grad={grad} dateNaiss={dateNaiss} userID={userID} type='row'/>
                    )
                  })}
              </div>
            </div>
        </div>
        <ChefForm depID={location.state.depid} getOneChef={getOneChef} />
        <EditForm depID={location.state.depid} getOneChef={getOneChef} chef={chef} />
    </div>
  )
}

export default DepInfo