import React, { useEffect, useState } from 'react'
import Teacher from './components/Teacher'
import { useChef } from './context/ChefContext';
import { useAuth } from '../../../../context/AuthContext';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
const getDepProfs = 'http://127.0.0.1:8000/api/chefdep/get-enseignantbydepid/';

const Charge = () => {
  const {profs} = useChef();
  const {user} = useAuth();
  const [prof,setProf] = useState([]);
  const location = useLocation();
  const getProf = async () => {
    const  {data} = await axios.get(`${getDepProfs}${user?.depID}`);
    console.log(data)
    setProf(data);
  }
  useEffect(() => {
    console.log(location.state.palid)
  },[])
  useEffect(() => {
    getProf();
  },[profs])
  return (
    <div className='flex flex-col gap-8'>
        <p className='text-2xl font-bold'>Teacher list</p>
        <div className='flex flex-col gap-8'>
            {prof.map((pro) => {
              const {userName,depid,choix,cours,userID,id} = pro;
              return(
                <Teacher key={userID} nom={userName} id={id} palid={location.state.palid} speid={location.state.speid} annee={location.state.annee} choix={choix} cours={cours} depid={depid} />
              )
            })}
        </div>
    </div>
  )
}

export default Charge