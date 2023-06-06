import React, { useEffect, useState } from 'react'
import { BsFillCollectionFill } from 'react-icons/bs'
import { FiPlus } from 'react-icons/fi'
import { MdEdit, MdSchool } from 'react-icons/md'
import { useChef } from '../context/ChefContext'
import GroupCard from './GroupCard'
import GroupForm from './GroupForm'
import axios from 'axios'
import { useAdmin } from '../../admin/context/AdminContext'
import { useAuth } from '../../../../../context/AuthContext'
import { AiFillDelete } from 'react-icons/ai'
import { useGest } from '../../Gestionair/context/GestContext'
const getGroupes = 'http://127.0.0.1:5000/groupes/sec/';
const getTcGroupes = 'http://127.0.0.1:5000/groupestc/';

const SectionCard = ({nom,capacite,speid,secid,type,palid}) => {
  const {user} = useAuth();
  const {tcGroupes,deleteSec,deleteAllGroup} = useAdmin();  
  const {groupes,deleteSection,deleteAllSecGroup,deleteAllSecAffect} = useChef(); 
  const {deleteAllSecEdt} = useGest();
  const [openGroup,setOpenGroup] = useState(false); 
  const [groupesSec,setGroupesSec] = useState([]);
  const getGroup = async (id) => {
    const response = await axios.get(`${getGroupes}${id}`);
    const result = await response.data;
    setGroupesSec(result);
  }
  const getTcGroup = async () => {
    const {data} = await axios.get(`${getTcGroupes}${secid}`);
    setGroupesSec(data);
  }
  const handleDelete = () => {
    if(type === 'commun'){
      deleteSec(secid);
      deleteAllGroup(secid);
    }else{
      deleteSection(secid);
      deleteAllSecGroup(secid);
      deleteAllSecAffect(secid);
      deleteAllSecEdt(secid);
    }
  }
  useEffect(() => {
    console.log(secid);
    if(type === 'commun'){
      getTcGroup();
    }else{
      getGroup(secid);
    }
  },[groupes,tcGroupes])
  return (
    <div className='flex justify-between flex-col border rounded-lg px-4 py-5 gap-4'>
        <div className='flex justify-between items-center'>
          <div className='border-[#DADADA] flex-[40%] flex gap-4'>
              <div className='p-4 bg-[#F4F4F4] text-2xl rounded-lg text-black'>
                  <BsFillCollectionFill/>
              </div>
              <div className='flex flex-col justify-between'>
                  <span className='text-sm text-[#828282]'>Section</span>
                  <p className='text-2xl font-semibold'>{nom}</p>
              </div>
              <div className='flex items-end'>
                  <span className='text-sm text-[#828282]'>{capacite} etudiants</span>
              </div>
          </div>
          <AiFillDelete onClick={() => handleDelete()} className='text-lg cursor-pointer hover:text-red'/>
        </div>
        <p className='text-xl font-bold'>Les groups</p>
        <div className='grid grid-cols-4 gap-3'>
            {groupesSec.map((group) => {
                const {nom,secid,speid,capacite,grpid} = group;
                return(
                    <GroupCard key={grpid} type={type} grpid={grpid} nom={nom} speid={speid} secid={secid} capacite={capacite}  />
                )
            })}
            {type !== 'commun' && user?.role !== 0 && (<div onClick={() => setOpenGroup(true)} className='rounded-xl group hover:border-main border-2 border-separator h-20 flex justify-center items-center cursor-pointer'>
                <FiPlus className='text-2xl group-hover:text-main'/>
            </div>)}
            {type === 'commun' && user?.role === 0 && (<div onClick={() => setOpenGroup(true)} className='rounded-xl group hover:border-main border-2 border-separator h-20 flex justify-center items-center cursor-pointer'>
                <FiPlus className='text-2xl group-hover:text-main'/>
            </div>)}
        </div>
        <GroupForm speid={speid} palid={palid} secid={secid} type={type} openGroup={openGroup} setOpenGroup={setOpenGroup} />
    </div>
  )
}

export default SectionCard