import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ChefCard from './components/ChefCard';
import GestionairCard from './components/GestionairCard';
import TableRow from './components/TableRow';

const DepInfo = () => {
  const location = useLocation();
  const [dep,setDep] = useState('');
  useEffect(() => {
    setDep(location.state.dep);
  },[location.state.dep])  
  return (
    <div className='flex flex-col gap-8'>
        <p className='text-xl font-bold'>{dep}</p>
        <div className='flex flex-col gap-8'>
            <ChefCard/>
            <p className='text-2xl font-bold'>Les Prof</p>
            <div className='border border-[#F2F2F2] rounded-lg'>
                <TableRow type='header'/>
                <TableRow type='row'/>
                <TableRow type='row'/>
                <TableRow type='row'/>
                <TableRow type='row'/>
                <TableRow type='row'/>
            </div>
        </div>
    </div>
  )
}

export default DepInfo