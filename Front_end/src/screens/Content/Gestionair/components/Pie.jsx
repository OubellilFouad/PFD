import React from 'react'
import { Pie } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'


const Piee = ({data,label}) => {
  return (
    <div className='flex-[50%] justify-center flex flex-col items-center gap-2'>
      <Pie data={data}/>
      <p className='text-lg font-semibold'> {label} </p>
    </div>
  )
}

export default Piee