import React from 'react'

const Card = () => {
  return (
    <div className='aspect-[163/104 card relative rounded-lg'>
        <div className='bg-separator rounded-lg p-5 flex flex-col justify-between items-end border relative z-10'>
            <div className='flex flex-col gap-2 w-full'>
                <p className='text-xl font-bold'>Departement de l’informatique</p>
                <span className='text-sm font-semibold'>Domain</span>
            </div>
            <button className=' py-2 px-5 rounded-lg text-white bg-main'>Enter</button>
        </div>
    </div>
  )
}

export default Card