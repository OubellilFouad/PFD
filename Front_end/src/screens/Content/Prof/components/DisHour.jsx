import React, { useEffect } from 'react'
import { useAuth } from '../../../../../context/AuthContext'
import { useProf } from '../context/ProfContext';

const DisHour = ({hour,day,av}) => {
  const {user} = useAuth();
  const {addAvail,deleteAvail} = useProf();
  const handleClick = () => {
    if(Object.keys(av).length === 0){
      const formData = {
        day,
        hour,
        profid: user?.userID
      }
      addAvail(formData);
    }else{
      deleteAvail(av.avaid);
    }
  }
  return (
    <div onClick={() => handleClick()} className={`flex justify-center border-gray-300 border items-center font-bold cursor-pointer text-white ${Object.keys(av).length !== 0?'bg-main':'hover:bg-paleMain'}`}>
        {Object.keys(av).length !== 0?'Selected':'Select'}
    </div>
  )
}

export default DisHour