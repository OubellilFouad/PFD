import React from 'react'
import { useAuth } from '../../../../../context/AuthContext';
import axios from 'axios';
const addDes = 'http://localhost:8000/api/prof/disponibilité-enseignant/';

const Hours = ({first,second,third,fourth,fifth}) => {
  const {user} = useAuth();
  const  add = async (formData) => {
    const {data,status} = await axios.post(`${addDes}${user?.id}`,formData);
    console.log(data);
  }
  const handleSubmit = () => {
    const formData = {
        first,
        second,
        third,
        fourth,
        fifth
    }
    const result = {
        disponibility: JSON.stringify(formData)
    }
    add(result);
  }  
  return (
    <>
        <div onClick={() => handleSubmit()} className='border border-gray-300 py-3 flex justify-center cursor-pointer hover:bg-main hover:text-white'>
            Submit
        </div>
        <div className='border border-gray-300 py-3 flex justify-center'>
            08h00 - 09h30
        </div>
        <div className='border border-gray-300 py-3 flex justify-center'>
            09h40 - 11h10
        </div>
        <div className='border border-gray-300 py-3 flex justify-center'>
            11h20 - 12h50
        </div>
        <div className='border border-gray-300 py-3 flex justify-center'>
            13h00 - 14h30
        </div>
        <div className='border border-gray-300 py-3 flex justify-center'>
            14h40 - 16h10
        </div>
    </>
  )
}

export default Hours