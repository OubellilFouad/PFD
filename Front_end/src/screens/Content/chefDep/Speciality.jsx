import React from 'react'
import SpeCard from './components/SpeCard'
import { useChef } from './context/ChefContext'

const Speciality = () => {
  const {spes} = useChef();
  return (
    <div className='flex flex-col gap-8'>
        <p className='text-2xl font-bold'>List des Spécialités</p>
        <div className='grid grid-cols-3 gap-14'>
            {spes.map((spe) => {
              const {nom,fillid,speid,annee} = spe;
              return(
                <SpeCard nom={nom} fillid={fillid} speid={speid} annee={annee} />
              )
            })}
        </div>
    </div>
  )
}

export default Speciality