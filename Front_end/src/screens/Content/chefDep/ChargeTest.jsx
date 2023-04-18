import React, { useEffect, useRef, useState } from 'react'
import { useChef } from './context/ChefContext'
import axios from 'axios';
import { useAuth } from '../../../../context/AuthContext';
import Teacher from './components/Teacher';
const getpal = 'https://pfeboumerdes.pythonanywhere.com/paliers/';
const getOnepals = 'https://pfeboumerdes.pythonanywhere.com/palier/';
const getDepProfs = 'http://127.0.0.1:8000/api/chefdep/get-enseignantbydepid/';

const ChargeTest = () => {
  const {user} = useAuth();
  const {spes,profs} = useChef();  
  const [speid,setSpeid] = useState(null);
  const [palid,setPalid] = useState(null);
  const [pals,setPals] = useState([]);
  const [prof,setProf] = useState([]);
  const [onePals,setOnePals] = useState({});
  const handleClick = (e) => {
    document.querySelectorAll('.cardSpe').forEach((card)=>{
        card.classList.add('!bg-transparent','!text-black','hover:!text-main')
        card.classList.remove('!bg-main','!text-white','hover:!text-white')
    })
    if(speid !== e.target.dataset.value){
      e.target.classList.remove('!bg-transparent','!text-black','hover:!text-main');
      e.target.classList.add('!bg-main','!text-white','hover:!text-white');
      setSpeid(e.target.dataset.value);
    }else{
      e.target.classList.add('!bg-transparent','!text-black','hover:!text-main')
      e.target.classList.remove('!bg-main','!text-white','hover:!text-white')
      setSpeid(null);
    }
  }
  const handlePalClick = (e) => {
    document.querySelectorAll('.cardPal').forEach((card)=>{
      card.classList.add('!bg-transparent','!text-black','hover:!text-main')
      card.classList.remove('!bg-main','!text-white','hover:!text-white')
    })
    if(palid !== e.target.dataset.value){
      e.target.classList.remove('!bg-transparent','!text-black','hover:!text-main');
      e.target.classList.add('!bg-main','!text-white','hover:!text-white');
      setPalid(e.target.dataset.value);
    }else{
      e.target.classList.add('!bg-transparent','!text-black','hover:!text-main')
      e.target.classList.remove('!bg-main','!text-white','hover:!text-white')
      setPalid(null);
    }
  }
  const getPals = async () => {
    const {data} = await axios.get(`${getpal}${speid}`);
    setPals(data);
  }
  const getOnepal = async () => {
    const {data} = await axios.get(`${getOnepals}${palid}`);
    setOnePals(data);
  }
  const getProf = async () => {
    const  {data} = await axios.get(`${getDepProfs}${user?.depID}`);
    setProf(data);
  }
  useEffect(() => {
    if(speid){
      getPals();
    }
  },[speid])
  useEffect(() => {
    if(palid){
      getOnepal();
    }
  },[palid])
  useEffect(() => {
    getProf();
  },[profs])
  return (
    <div className='flex flex-col gap-8 overflow-hidden'>
        <div className='flex gap-6 items-center'>
          <div className='flex gap-2 items-center'>
            <p className='text-2xl font-bold'>Speciality</p>
            <div className='flex gap-2'>
                {spes.map((spe) => {
                    return(
                        <p key={spe.speid} onClick={(e) => handleClick(e)} data-value={spe.speid} className='py-2 border px-6 text-base rounded-md cursor-pointer hover:!text-main hover:border-main cardSpe'> {spe.nom} </p>
                    )
                })}
            </div>
          </div>
          <div className='flex gap-2 items-center'>
            <p className='text-2xl font-bold'>Pallier</p>
            <div className='flex gap-2'>
                {pals.map((pal) => {
                    return(
                        <p key={pal.palid} onClick={(e) => handlePalClick(e)} data-value={pal.palid} className='py-2 border px-6 text-base rounded-md cursor-pointer hover:!text-main hover:border-main cardPal'> {pal.nom} </p>
                    )
                })}
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-8 overflow-x-scroll'>
          {prof.map((pro) => {
                const {userName,depid,choix,cours,userID,id} = pro;
                return(
                  <Teacher key={userID} nom={userName} id={id} palid={palid} speid={speid} one={onePals} annee={onePals.annee} choix={choix} cours={cours} depid={depid} />
                )
          })}
        </div>
    </div>
  )
}

export default ChargeTest