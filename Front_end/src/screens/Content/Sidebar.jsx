import React, { useEffect, useState } from 'react'
import {MdOutlineSpaceDashboard} from 'react-icons/md'
import {HiOutlineUsers} from 'react-icons/hi'
import { NavLink } from 'react-router-dom'
import {BsThreeDots} from 'react-icons/bs'
import Dep from './admin/components/Dep'
import Link from './admin/components/NavLink'
import { useAuth } from '../../../context/AuthContext'
import { useAdmin } from './admin/context/AdminContext'

const admin = [
    {path:'',name:'Dashboard',icon: <MdOutlineSpaceDashboard/>,page: 'Main'},
    {path:'gestionair',name:'Les gestionair',icon: <HiOutlineUsers/>,page: 'Gestionair'},
]

const chef = [
    {path:'',name:'Dashboard',icon: <MdOutlineSpaceDashboard/>,page: 'Main'},
    {path:'enseignant',name:'Les Enseignant',icon: <HiOutlineUsers/>,page: 'Enseignant'},
    {path:'sections',name:'Les Sections',icon: <HiOutlineUsers/>,page: 'Sections'},
]

const Sidebar = () => {
  const {user} = useAuth();
  const {getDeps,deps} = useAdmin();
  const [nav,setNav] = useState([]);  
  useEffect(() => {
    if(user?.type === 0){
        setNav(chef);
    }
  },[user])  
  return (
    <div className='border-r border-r-[#DBDBDB] flex flex-col sidebar'>
        <div className='flex-[50%] py-7 flex flex-col px-6 gap-5'>
            {nav.map((item,index) => {
                const {name,path,icon,page} = item;
                return(
                    <Link key={index} path={path} page={page} name={name} icon={icon} />
                )
            })}
        </div>
        {user?.type === 0 && (
            <div className='flex-[50%] flex flex-col px-3 gap-7 overflow-x-scroll'>
                <hr />
                <div className='flex flex-col gap-5'>
                    <p className='text-[#787486] text-xs font-bold uppercase'>Mes departement</p>
                    <div className='flex flex-col gap-4'>
                        {deps.map((dep) => {
                            const {nom,domainid,depid} = dep;
                            return(
                                <Dep nom={nom} depid={depid} domainid={domainid} key={depid} />
                            )
                        })}
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default Sidebar