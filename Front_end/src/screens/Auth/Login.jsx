import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext';
import Input from './components/Input'
const loginUrl = 'http://localhost:8000/api/login';

const Login = () => {
  const {getUser,user} = useAuth();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [userID,setUserID] = useState('');
  const navigate = useNavigate();
  const login = async (formData) => {
    try {
      const response = await axios.post(loginUrl,formData,{
        headers:{
          "Content-Type": 'application/json'
        },
        withCredentials: true
      });
      if(response.data.message === 'Success'){
        getUser();
        navigate('/App');
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
      userID
    }
    console.log(formData);
    login(formData);
    setEmail('');
    setPassword('');
    setUserID('');
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)} action="" className='w-full px-20 flex flex-col items-center gap-10'>
        <h1 className='text-3xl text-main font-bold'>Welcome back</h1>
        <div className='w-full flex flex-col gap-8'>
          <Input name={'Matricule'} type={'string'} setData={setUserID} />
          <Input name={'Email'} type={'email'} setData={setEmail} />
          <Input name={'Password'} type={'password'} setData={setPassword} />
        </div>
        <button className='w-2/3 py-2 bg-main text-white rounded-lg text-center' type="submit" >SUBMIT</button>
        <p className='text-sm text-paleMain'>Are you new here? <Link  to={'../'} className='text-main font-bold'>Signup</Link></p>
    </form>
  )
}

export default Login