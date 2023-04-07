import React, { useEffect, useState } from 'react'
import TableRow from '../admin/components/TableRow'
import { useChef } from './context/ChefContext'
import axios from 'axios';
import { useAuth } from '../../../../context/AuthContext';
const getDepProfs = 'http://127.0.0.1:8000/api/chefdep/get-enseignantbydepid/';

const Enseingant = () => {
  const {profs} = useChef();
  const {user} = useAuth();
  const [prof,setProf] = useState([]);
  const getProf = async () => {
    const  {data} = await axios.get(`${getDepProfs}${user?.depID}`);
    setProf(data);
  }
  useEffect(() => {
    getProf();
  },[profs])
  return (
    <div className='flex flex-col gap-8'>
        <p className='text-2xl font-bold'>List des enseignant</p>
        <div className='border border-[#F2F2F2] rounded-lg'>
            <TableRow type='header'/>
            {prof.map((prof) => {
              const {id,userName,depID,email,userID,dateNaiss,grad} = prof;
              return(
                <TableRow key={id} id={id} nom={userName} email={email} grad={grad} dateNaiss={dateNaiss} userID={userID} type='row'/>
              )
            })}
        </div>
    </div>
  )
}

export default Enseingant