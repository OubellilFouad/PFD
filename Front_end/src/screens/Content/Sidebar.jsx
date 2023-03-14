import React from 'react'
import {MdOutlineSpaceDashboard} from 'react-icons/md'
import {HiOutlineUsers} from 'react-icons/hi'
import { NavLink } from 'react-router-dom'
import {BsThreeDots} from 'react-icons/bs'
import Dep from './components/Dep'
import Link from './components/NavLink'

const admin = [
    {path:'',name:'Dashboard',icon: <MdOutlineSpaceDashboard/>},
    {path:'gestionair',name:'Les gestionair',icon: <HiOutlineUsers/>},
]

const Sidebar = () => {
  return (
    <div className='border-r border-r-[#DBDBDB] flex flex-col'>
        <div className='flex-[80%] py-7 flex flex-col px-6 gap-5'>
            {admin.map((item) => {
                const {name,path,icon} = item;
                return(
                    <Link path={path} name={name} icon={icon} />
                )
            })}
        </div>
        <div className='flex-[100%] flex flex-col px-3 gap-7'>
            <hr />
            <div className='flex flex-col gap-5'>
                <p className='text-[#787486] text-xs font-bold uppercase'>Mes departement</p>
                <div className='flex flex-col gap-4'>
                    <Dep/>
                    <Dep/>
                    <Dep/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Sidebar