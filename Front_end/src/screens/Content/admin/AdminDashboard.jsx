import React, { useEffect } from 'react'
import Card from './components/Card'
import { useAdmin } from './context/AdminContext';
const getUrl = 'https://pfeboumerdes.pythonanywhere.com/deps';

const AdminDashboard = () => {
  const {deps} = useAdmin();
  return (
    <div className='flex flex-col gap-8 overflow-hidden'>
        <p className='text-xl font-bold'>Liste des departements</p>
        <div className='grid grid-cols-3 gap-11 overflow-x-scroll'>
            {deps.map((dep) => {
              const {nom,depid,domainid} = dep;
              return(
                <Card key={depid} nom={nom} depid={depid} domainid={domainid} />
              )
            })}
        </div>
    </div>
  )
}

export default AdminDashboard