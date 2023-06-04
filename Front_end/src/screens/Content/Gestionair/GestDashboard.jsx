import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../../context/AuthContext'
import { useGest } from './context/GestContext'
import { useChef } from '../chefDep/context/ChefContext'
import { useAdmin } from '../admin/context/AdminContext'
import axios from 'axios'
import Piee from './components/Pie'
const getDeps = 'https://pfeboumerdes.pythonanywhere.com/gestdeps/';
const getEdts = 'https://pfeboumerdes.pythonanywhere.com/edts/gestid/';

const GestDashboard = () => {
  const {user} = useAuth();
  const {edts} = useGest();
  const {afects,profs} = useChef();
  const {gestDep} = useAdmin();
  const [deps,setDeps] = useState([]);
  const [affs,setAffs] = useState([]);
  const [edtP,setEdtP] = useState([]);
  const [edt,setEdt] = useState([]);
  const [data,setData] = useState({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
      }
    ]
  })
  const [profData,setProfData] = useState({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
      }
    ]
  })

  const getDep = async () => {
    const {data} = await axios.get(`${getDeps}${user.userID}`);
    setDeps(data);
  }
  const getEdt = async () => {
    const {data} = await axios.get(`${getEdts}${user.userID}`);
    setEdt(data);
  }

  useEffect(() => {
    getDep();
    getEdt();
    let here = [];
    edts.map((edt) => {
      if(!here.includes(edt.profid)){
        here.push(edt.profid);
      }
    })
    setEdtP(here);
  },[edts])
  useEffect(() => {
    setAffs([]);
    deps.map((dep) => {
      let here = [];
      here = affs;
      here.push(...afects.filter(a => a.depid === dep.depid));
      console.log(here);
      setAffs([...here]);
    })
  },[deps])
  useEffect(() => {
    setData({
      labels: ['used','not used'],
      datasets: [
        {
          label: 'Affectations',
          data: [edt.length,affs.length - edt.length],
          backgroundColor: ['#3C486B','#F9D949']
        }
      ]
    })
  },[affs,edt])
  useEffect(() => {
    setProfData({
      labels: ['used','not used'],
      datasets: [
        {
          label: 'Teachers',
          data: [edtP.length,profs.length],
          backgroundColor: ['#3C486B','#F9D949']
        }
      ]
    })
  },[edtP])
  return (
    <div className='flex items-center mx-auto flex-col gap-4 w-full h-full'>
      <p className='text-2xl font-bold'>Stats</p>
      <div className='border flex w-full p-6 rounded-md h-[70%]'>
        <Piee data={profData} label={'Teachers'}/>
        <Piee data={data} label={'Affectations'}/>
      </div>
    </div>
  )
}

export default GestDashboard