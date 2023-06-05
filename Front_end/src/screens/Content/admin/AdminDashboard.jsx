import React, { useEffect } from 'react'
import Card from './components/Card'
import { useAdmin } from './context/AdminContext';
const getUrl = 'http://127.0.0.1:5000/deps';

const AdminDashboard = () => {
  const {deps} = useAdmin();
  return (
    <div className='flex flex-col gap-8 overflow-hidden'>
      <div className='grid grid-cols-3 pb-4 gap-14 overflow-x-scroll'>
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