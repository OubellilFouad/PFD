import React from 'react'
import Card from './components/Card'

const Dashboard = () => {
  return (
    <div className='flex flex-col gap-8'>
        <p className='text-xl font-bold'>Liste des departements</p>
        <div className='grid grid-cols-3 gap-11'>
            <Card/>
            <Card/>
            <Card/>
        </div>
    </div>
  )
}

export default Dashboard