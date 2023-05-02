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
    <div className='flex flex-col overflow-hidden'>
        <div className='border border-t-separator border-l-separator border-b-transparent border-r-separator rounded-t-lg '>
          <TableRow type='header'/>
        </div>
        <div className='border border-b-separator border-l-separator border-r-separator border-t-separator rounded-b-lg  overflow-y-scroll'>
            {prof.map((prof) => {
              const {id,userName,email,userID,dateNaiss,grad,type} = prof;
              return(
                <TableRow key={id} id={id} nom={userName} typeT={type} email={email} grad={grad} dateNaiss={dateNaiss} userID={userID} type='row'/>
              )
            })}
        </div>
    </div>
  )
}

export default Enseingant