import React from 'react'
import TableRow from '../admin/components/TableRow'
import { useChef } from './context/ChefContext'

const Enseingant = () => {
  const {profs} = useChef();
  return (
    <div className='flex flex-col gap-8'>
        <p className='text-2xl font-bold'>List des enseignant</p>
        <div className='border border-[#F2F2F2] rounded-lg'>
            <TableRow type='header'/>
            {profs.map((prof) => {
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