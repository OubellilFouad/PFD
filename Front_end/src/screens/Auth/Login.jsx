import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
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
  const [errors,setErrors] = useState([]);
  const [emailErr,setEmailErr] = useState('');
  const [idErr,setIdErr] = useState('');
  const [passErr,setPassErr] = useState('');
  const form = useRef();
  const login = async (formData) => {
    try {
      const response = await axios.post(loginUrl,formData,{
        headers:{
          "Content-Type": 'application/json'
        },
        withCredentials: true
      });
      console.log(response.data.message)
      if(response.data.message === 'Invalid email'){
        setEmailErr('Choose a valid email');
        form.current.reset();
      }else{
        setEmailErr('');
      }
      if(response.data.message === 'Invalid ID'){
        setIdErr('Choose a valid ID');
        form.current.reset();
      }else{
        setIdErr('');
      }
      if(response.data.message === 'Invalid pw'){
        setPassErr('Wrong password');
        form.current.reset();
      }else{
        setPassErr('');
      }
      if(response.data.message === 'Success'){
        getUser();
        console.log('success')
        navigate('/App');
      }
    } catch (error) {
      console.log(error)
      // setErrors(Object.keys(error.response.data.errors));
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
      userID
    }
    console.log(formData)
    login(formData);
    setEmail('');
    setPassword('');
    setUserID('');
  }
  useEffect(() => {
    if(errors.includes('email')){
      if(email === ''){
        setEmailErr('Email field must not be empty');
      }
    }else{
      setEmailErr('');
    }
    if(errors.includes('userID')){
      if(userID === ''){
        setIdErr('ID field must not be empty');
      }
    }else{
      setIdErr('');
    }
    if(errors.includes('password')){
      if(password === ''){
        setPassErr('password field must not be empty');
      }
    }else{
      setPassErr('');
    }
  },[errors,userID,email,password])
  return (
    <form ref={form} onSubmit={(e) => handleSubmit(e)} action="" className='w-full md:px-20 px-10 flex flex-col items-center gap-10 md:pb-0 pb-4'>
        <h1 className='text-3xl text-main font-bold'>Welcome back</h1>
        <div className='w-full flex flex-col gap-8 h-[272px]'>
          <Input name={'Matricule'} type={'string'} setData={setUserID} err={idErr}/>
          <Input name={'Email'} type={'email'} setData={setEmail} err={emailErr}/>
          <Input name={'Password'} type={'password'} setData={setPassword} err={passErr}/>
        </div>
        <button className='w-2/3 py-2 bg-main text-white rounded-lg text-center font-semibold' type="submit" >Login</button>
        <p className='text-sm text-paleMain'>Are you new here? <Link  to={'../'} className='text-main font-bold'>Signup</Link></p>
    </form>
  )
}

export default Login