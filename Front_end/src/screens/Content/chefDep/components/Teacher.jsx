import React, { useEffect, useState } from 'react'
import { BsFillCollectionFill } from 'react-icons/bs';
import { FiPlus } from 'react-icons/fi';
import ChargeCard from './ChargeCard';
import ChargeForm from './ChargeForm';
import { useChef } from '../context/ChefContext';
import {useAuth} from '../../../../../context/AuthContext'
import axios from 'axios';
const addCour = 'http://localhost:8000/api/prof/cours-enseignant/';
const getCours = 'http://localhost:8000/api/prof/enseignants-cours/'
const Teacher = ({nom,choix,speid,annee,palid,id,one}) => {
  const [cour,setCour] = useState([]);
  const {setShow,setAddMessage,setColor} = useAuth();
  const [openCharge,setOpenCharge] = useState(false);
  const addCours = async (formData) => {
    await axios.post(`${addCour}${id}`,formData);
  }
  const getCour = async () => {
    const {data} = await axios.get(`${getCours}${id}`);
    if(data.cours){
        setCour(JSON.parse(data.cours));
    }else{
        setCour([])
    }
  }
  const handleSubmit = () => {
    const formData = {
        cours: JSON.stringify(cour)
    }
    addCours(formData);
    setShow(true);
    setAddMessage('Submitted current choices');
    setColor(true)
  }
  useEffect(() => {
    getCour();
  },[])
  return (
    <div className='flex justify-between flex-col border rounded-lg px-4 py-5 gap-4'>
        <div className='border-[#DADADA] flex-[40%] flex gap-4'>
            <div className='p-4 bg-[#F4F4F4] text-2xl rounded-lg text-black'>
                <BsFillCollectionFill/>
            </div>
            <div className='flex justify-between items-center flex-1'>
                <div className='flex flex-col justify-between'>
                    <span className='text-sm text-[#828282]'>Teacher</span>
                    <p className='text-2xl font-semibold'>{nom}</p>
                </div>
                <div className='flex-1 flex justify-end items-center gap-3'>
                    <button onClick={() => handleSubmit()} className='py-2 px-5 rounded-lg text-white bg-main'>Submit</button>
                </div>
            </div>
        </div>
        <p className='text-xl font-bold'>Modules to teach</p>
        <div className='grid grid-cols-4 gap-3'>
            {cour.map((c) => {
                return(
                    <ChargeCard key={c.id}/>
                )
            })}
            <div onClick={() => setOpenCharge(true)} className='rounded-xl group hover:border-main border-2 border-separator h-20 flex justify-center items-center cursor-pointer'>
                <FiPlus className='text-2xl group-hover:text-main'/>
            </div>
        </div>
        <ChargeForm choix={choix} setOpenCharge={setOpenCharge} openCharge={openCharge} one={one} palid={palid} annee={annee} speid={speid} setCour={setCour} cour={cour} />
    </div>
  )
}

export default Teacher