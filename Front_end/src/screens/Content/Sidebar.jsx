import React, { useEffect, useState } from 'react'
import {MdEventAvailable, MdFolderSpecial, MdOutlineSpaceDashboard} from 'react-icons/md'
import {HiOutlineUsers} from 'react-icons/hi'
import {FaChalkboardTeacher} from 'react-icons/fa'
import {ImBooks} from 'react-icons/im'
import {GiTheater} from 'react-icons/gi'
import Dep from './admin/components/Dep'
import Link from './admin/components/NavLink'
import { useAuth } from '../../../context/AuthContext'
import { useAdmin } from './admin/context/AdminContext'
import { BsFillCollectionFill, BsListCheck } from 'react-icons/bs'

const admin = [
    {path:'',name:'Dashboard',icon: <MdOutlineSpaceDashboard/>,page: 'Main'},
    {path:'gestionnaire',name:'Les gestionnaires',icon: <HiOutlineUsers/>,page: 'Gestionnaire'},
    {path:'resource',name:'Les Resources',icon: <GiTheater/>,page: 'Resource'},
]

const chef = [
    {path:'',name:'Dashboard',icon: <MdOutlineSpaceDashboard/>,page: 'Main'},
    {path:'enseignant',name:'Les Enseignants',icon: <FaChalkboardTeacher/>,page: 'Enseignants'},
    {path:'speciality',name:'Les Formations',icon: <MdFolderSpecial/>,page: 'Formations'},
    {path:'sections',name:'Les Sections',icon: <BsFillCollectionFill/>,page: 'Sections'},
    {path:'modules',name:'Les Modules',icon: <ImBooks/>,page: 'Modules'},
    {path:'test',name:'La charge',icon: <ImBooks/>,page: 'Charge'},
]

const prof = [
    {path:'',name:'Disponibilité',icon: <MdEventAvailable/>,page: 'Disponibilité'},
    {path:'choix',name:'Choix de modules',icon: <BsListCheck/>,page: 'Choix'},
]

const Sidebar = () => {
  const {user} = useAuth();
  const {getDeps,deps} = useAdmin();
  const [nav,setNav] = useState([]);  
  useEffect(() => {
    if(user?.role === 0){
        setNav(admin);
    }
    if(user?.role === 1){
        setNav(chef)
    }
    if(user?.role === 3){
        setNav(prof)
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
        {user?.role === 0 && (
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