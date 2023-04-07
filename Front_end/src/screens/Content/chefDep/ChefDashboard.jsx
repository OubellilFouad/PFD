import React, { useEffect, useState } from 'react'
import Card from './components/Card'
import { useChef } from './context/ChefContext';
import { useAuth } from '../../../../context/AuthContext';
import axios from 'axios';
const getDepProfs = 'http://127.0.0.1:8000/api/chefdep/get-enseignantbydepid/';
const getSpes = 'https://pfeboumerdes.pythonanywhere.com/specialites/';
const getChambres = 'https://pfeboumerdes.pythonanywhere.com/chambres/';
const getModules = 'https://pfeboumerdes.pythonanywhere.com/modules/';

const ChefDashboard = () => {
  const {spes,modules,chambre,profs} = useChef();
  const {user} = useAuth();
  const [prof,setProf] = useState([]);
  const [spe,setSpe] = useState([]);
  const [chambres,setChambres] = useState([]);
  const [module,setModule] = useState([]);

  const getProf = async () => {
    const {data} = await axios.get(`${getDepProfs}${user?.depID}`);
    setProf(data);
  }
  const getSpeSpes = async () => {
    const {data} = await axios.get(`${getSpes}${user?.depID}`);
    setSpe(data);
  }
  const getSpeChambre = async () => {
    const {data} = await axios.get(`${getChambres}${user?.depID}`);
    setChambres(data);
  }
  const getSpeModules = async () => {
    const {data} = await axios.get(`${getModules}${user?.depID}`);
    setModule(data);
  }
  useEffect(() => {
    getProf();
    getSpeSpes();
    getSpeChambre();
    getSpeModules();
  },[profs,spes])
  return (
    <div className='flex justify-between gap-8'>
      <Card data={prof} title={'Les Profs'} singular={'Prof(s)'} />
      <Card data={spe} title={'Les Specialités'} singular={'Specialité(s)'} />
      <Card data={module} title={'Les modules'} singular={'Module(s)'} />
      <Card data={chambres} title={'Les Chambres'} singular={'Chambre(s)'}/>
    </div>
  )
}

export default ChefDashboard