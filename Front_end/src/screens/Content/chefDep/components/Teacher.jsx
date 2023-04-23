import React, { useEffect, useState } from 'react'
import { BsFillCollectionFill } from 'react-icons/bs';
import { FiPlus } from 'react-icons/fi';
import ChargeCard from './ChargeCard';
import ChargeForm from './ChargeForm';
import { useChef } from '../context/ChefContext';
import {useAuth} from '../../../../../context/AuthContext'
import axios from 'axios';
import { useProf } from '../../Prof/context/ProfContext';
const getSpeCours = 'https://pfeboumerdes.pythonanywhere.com/affectations/';

const Teacher = ({nom,speid,annee,palid,one,semester,profid,tc}) => {
  const [cour,setCour] = useState([]);
  const {afects} = useChef();
  const [openCharge,setOpenCharge] = useState(false);
  const [number,setNumber] = useState(0);
  const getSpeCour = async () => {
    const {data} = await axios.get(`${getSpeCours}${profid}`)
    setCour(data)
  }
  useEffect(() => {
    getSpeCour();
  },[afects])
  useEffect(() => {
    let val = 0;
    if(cour.length > 0){
        cour.map((co) => {
            const {type} = co
            JSON.parse(type).map((ty) => {
                if(ty === 'cours'){
                    val = val + (1*2.25)
                }
                if(ty === 'tp'){
                    val = val + (1*1.125)
                }
                if(ty === 'td'){
                    val = val + (1*1.5)
                }
            })
            setNumber(val)
        })
    }else{
        setNumber(0)
    }
  },[cour,afects])
  return (
    <div className='flex justify-between flex-col border rounded-lg px-4 py-3 gap-2' id={profid}>
        <div className='border-[#DADADA] flex-[40%] flex gap-4'>
            <div className='p-4 bg-[#F4F4F4] text-2xl rounded-lg text-black'>
                <BsFillCollectionFill/>
            </div>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col justify-between'>
                    <span className='text-sm text-[#828282]'>Teacher</span>
                    <p className='text-2xl font-semibold'>{nom}</p>
                </div>
            </div>
            <div className='flex items-end text-xs'>
                <p className={`py-1 px-3 ${number<9 && 'bg-orange-400'} ${number === 9 && 'bg-main'} ${number > 9 && 'bg-red'} text-white rounded-md`}>{number} seance</p>
            </div>
        </div>
        <p className='text-xl font-bold'>Modules to teach</p>
        <div className='grid grid-cols-4 gap-3'>
            {cour.map((c) => {
                const {afecid,groupe,section,semestre,type} = c;
                return(
                    <ChargeCard key={afecid} afectid={afecid} group={groupe} section={section} semestre={semestre} type={type} />  
                )
            })}
            <div onClick={() => setOpenCharge(true)} className='rounded-xl group hover:border-main border-2 border-separator h-20 flex justify-center items-center cursor-pointer'>
                <FiPlus className='text-2xl group-hover:text-main'/>
            </div>
        </div>
        <ChargeForm setOpenCharge={setOpenCharge} tc={tc} openCharge={openCharge} one={one} palid={palid} annee={annee} speid={speid} cours={cour} profid={profid} setCour={setCour} semestre={semester} cour={cour} />
    </div>
  )
}

export default Teacher