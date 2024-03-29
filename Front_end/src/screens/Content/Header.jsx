import React from 'react'
import {FiSearch} from 'react-icons/fi'
import {BsChevronDown} from 'react-icons/bs'
import user from '../../assets/user.jpg'

const Header = () => {
  return (
    <div className='border-b border-b-[#DBDBDB] px-12 flex items-center justify-between relative'>
        <div>
            <input type="text" className=' w-96 bg-[#F5F5F5] border border-[#DBDBDB] rounded-lg py-1 outline-none px-12 text-[#787486]' placeholder='Search anything'/>
            <FiSearch className='absolute text-xl text-[#787486] left-16 top-2/4 -translate-y-2/4'/>
        </div>
        <div className='flex gap-6'>
            <div className='flex flex-col items-end'>
                <p className=' text-base font-bold'>User name</p>
                <span className='text-sm text-[#787486]'>email</span>
            </div>
            <div className='flex items-center gap-3 cursor-pointer'>
                <div style={{backgroundImage: `url(${user})`}} className='w-10 h-10 rounded-full overflow-hidden bg-cover bg-center flex justify-center items-center'>
                </div>
                <BsChevronDown className='text-lg font-bold'/>
            </div>
        </div>
    </div>
  )
}

export default Header