import React from 'react'
import TableRow from '../admin/components/TableRow'

const Enseingant = () => {
  return (
    <div className='flex flex-col gap-8'>
        <p className='text-2xl font-bold'>List des enseignant</p>
        <div className='border border-[#F2F2F2] rounded-lg'>
            <TableRow type='header'/>
            <TableRow type='row'/>
            <TableRow type='row'/>
            <TableRow type='row'/>
        </div>
    </div>
  )
}

export default Enseingant