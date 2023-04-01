import React from 'react'
import Card from './components/Card'
import { useChef } from './context/ChefContext';

const ChefDashboard = () => {
  const {spes,modules,chambre} = useChef();
  return (
    <div className='flex justify-between gap-8'>
      <Card data={undefined} title={'Les Profs'} singular={'Prof(s)'} />
      <Card data={spes} title={'Les Specialités'} singular={'Specialité(s)'} />
      <Card data={modules} title={'Les modules'} singular={'Module(s)'} />
      <Card data={chambre} title={'Les Chambres'} singular={'Chambre(s)'}/>
    </div>
  )
}

export default ChefDashboard