import React from 'react'
import { useReactToPrint } from 'react-to-print'
import {SiAdobeacrobatreader} from 'react-icons/si'

const HoursGest = ({handleprint,before}) => {
   
  return (
    <>
        <div onClick={handleprint} className={`border border-gray-300 z-10 flex items-center justify-center ${!before && 'hover:bg-red cursor-pointer'} hover:text-white`}>
            {!before && (<div className='flex gap-2 items-center'>
                <SiAdobeacrobatreader className='text-lg'/>
                <p>PDF</p>
            </div>)}
        </div>
        <div className='border border-gray-300 z-10 text-sm py-2 flex justify-center'>
            08h00 - 09h30
        </div>
        <div className='border border-gray-300 z-10 text-sm py-2 flex justify-center'>
            09h40 - 11h10
        </div>
        <div className='border border-gray-300 z-10 text-sm py-2 flex justify-center'>
            11h20 - 12h50
        </div>
        <div className='border border-gray-300 z-10 text-sm py-2 flex justify-center'>
            13h00 - 14h30
        </div>
        <div className='border border-gray-300 z-10 text-sm py-2 flex justify-center'>
            14h40 - 16h10
        </div>
        <div className='border border-gray-300 z-10 text-sm py-2 flex justify-center'>
            16h20 - 17h50
        </div>
    </>
  )
}

export default HoursGest