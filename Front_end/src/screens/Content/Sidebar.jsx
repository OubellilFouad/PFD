import React, { useEffect, useState } from 'react'
import {MdEventAvailable, MdFolderSpecial, MdOutlineCollectionsBookmark, MdOutlineSpaceDashboard, MdWork} from 'react-icons/md'
import {HiOutlineUsers} from 'react-icons/hi'
import {FaChalkboardTeacher} from 'react-icons/fa'
import {ImBooks} from 'react-icons/im'
import {GiTheater} from 'react-icons/gi'
import Link from './admin/components/NavLink'
import { useAuth } from '../../../context/AuthContext'
import { BsFillCollectionFill, BsFillPersonLinesFill, BsListCheck } from 'react-icons/bs'
import { BiCalendarEvent } from 'react-icons/bi'
import { useLocation } from 'react-router-dom'
import Department from './Gestionair/components/Department'
import axios from 'axios'
const getDeps = 'http://127.0.0.1:5000/gestdeps/'

const admin = [
    {path:'',name:'Dashboard',icon: <MdOutlineSpaceDashboard/>,page: 'Main'},
    {path:'gestionnaire',name:'Les gestionnaires',icon: <HiOutlineUsers/>,page: 'Gestionnaire'},
    {path:'resource',name:'Les Resources',icon: <GiTheater/>,page: 'Resource'},
    {path:'tcformation',name:'Les Formations',icon: <MdOutlineCollectionsBookmark/>,page: 'TCFormations'},
    {path:'tcsec',name:'Les Sections',icon: <BsFillCollectionFill/>,page: 'TCSections'},
    {path:'tcmod',name:'Les Modules',icon: <ImBooks/>,page: 'TCModules'},
]

const chef = [
    {path:'',name:'Les Enseignants',icon: <FaChalkboardTeacher/>,page: 'Enseignants'},
    {path:'speciality',name:'Les Formations',icon: <MdFolderSpecial/>,page: 'Formations'},
    {path:'sections',name:'Les Sections',icon: <BsFillCollectionFill/>,page: 'Sections'},
    {path:'modules',name:'Les Modules',icon: <ImBooks/>,page: 'Modules'},
    {path:'charge',name:'La charge',icon: <MdWork/>,page: 'Charge'},
    {type:'line'},
    {path:'disp',name:'Disponibilité',icon: <MdEventAvailable/>,page: 'Disponibilité'},
    {path:'choix',name:'Choix de modules',icon: <BsListCheck/>,page: 'Choix'},
    {path:'edtprof',name:'Teachers',icon: <BsFillPersonLinesFill className='text-lg'/>,page: 'CEDT'},
]
const gest = [
    {path:'',name:'Dashboard',icon: <MdOutlineSpaceDashboard/>,page: 'Main'},
    {path:'edt',name:'Time tables',icon: <BiCalendarEvent/>,page: 'EDT'},
    {path:'edtprof',name:'Teachers',icon: <BsFillPersonLinesFill className='text-lg'/>,page: 'PEDT'},
]
const gestTc = [
    {path:'',name:'Dashboard',icon: <MdOutlineSpaceDashboard/>,page: 'Main'},
    {path:'edt',name:'Time tables',icon: <BiCalendarEvent/>,page: 'EDT'},
]
const prof = [
    {path:'',name:'Disponibilité',icon: <MdEventAvailable/>,page: 'Disponibilité'},
    {path:'choix',name:'Choix de modules',icon: <BsListCheck/>,page: 'Choix'},
    {path:'edt',name:'Emploi du temps',icon: <BiCalendarEvent/>,page: 'EDTP'},
]
const student = [
    {path:'',name:'Emploi du temps',icon: <BiCalendarEvent/>,page: 'EDTS'},
]

const Sidebar = () => {
  const location = useLocation();  
  const {user} = useAuth();
  const [nav,setNav] = useState([]);  
  const [deps,setDeps] = useState([]);
  const getGestDep = async () => {
    const {data} = await axios.get(`${getDeps}${user?.userID}`);
    setDeps(data);
  }
  useEffect(() => {
    if(user?.role === 0){
        setNav(admin);
    }
    if(user?.role === 1){
        setNav(chef)
    }
    if(user?.role === 2 && user?.type === 'Department'){
        setNav(gest)
        getGestDep();
    }
    if(user?.role === 2 && user?.type === 'Tranc Commun'){
        setNav(gestTc)
    }
    if(user?.role === 3){
        setNav(prof)
    }
    if(user?.role === 4){
        setNav(student)
    }
  },[user])
  return (
    <div className='border-r border-r-[#DBDBDB] md:flex hidden flex-col sidebar overflow-hidden'>
        {location?.state?.page !== 'EDT' && location?.state?.page !== 'PEDT' && location?.state?.page !== 'CEDT' && (
            <div className='py-7 flex flex-col px-6 gap-5'>
                {nav.map((item,index) => {
                    const {name,path,icon,page,type} = item;
                    if(type !== 'line'){
                        return(
                            <Link key={index} path={path} page={page} name={name} icon={icon} />
                        )
                    }
                    if(type === 'line'){
                        return(
                            <p className='w-full border'></p>
                        )
                    }
                })}
            </div>
        )}
        {location?.state?.page === 'EDT' && user?.type === 'Department' && (
            <div className='py-7 flex flex-col px-6 gap-4 overflow-y-scroll'>
                {deps.map((dep) => {
                    const {depid,id} = dep
                    return(
                        <Department key={id} depid={depid} />
                    )
                })}
            </div>
        )}
        {location?.state?.page === 'EDT' && user?.type === 'Tranc Commun' && (
            <div className='py-7 flex flex-col px-6 gap-4 overflow-y-scroll'>
                <Department type={'tc'} />
            </div>
        )}
        {location?.state?.page === 'PEDT' && (
            <div className='py-7 flex flex-col px-6 gap-4 overflow-y-scroll'>
                {deps.map((dep) => {
                    const {depid,id} = dep
                    return(
                        <Department key={id} type={'prof'} depid={depid} />
                    )
                })}
            </div>
        )}
        {location?.state?.page === 'CEDT' && (
            <div className='py-7 flex flex-col px-6 gap-4 overflow-y-scroll'>
                <Department type={'profC'} depid={user?.depID} />
            </div>
        )}
    </div>
  )
}

export default Sidebar