import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Input from './components/Input'

const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [matricule,setMatricule] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail('');
    setPassword('');
    setMatricule('');
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)} action="" className='w-full px-20 flex flex-col items-center gap-10'>
        <h1 className='text-3xl text-main font-bold'>Welcome back</h1>
        <div className='w-full flex flex-col gap-8'>
          <Input name={'Matricule'} type={'string'} data={matricule} setData={setMatricule} />
          <Input name={'Email'} type={'email'} data={email} setData={setEmail} />
          <Input name={'Password'} type={'password'} data={password} setData={setPassword} />
        </div>
        <button className='w-2/3 py-2 bg-main text-white rounded-lg text-center' type="submit" >SUBMIT</button>
        <p className='text-sm text-paleMain'>Are you new here? <Link  to={'../'} className='text-main font-bold'>Signup</Link></p>
    </form>
  )
}

export default Login