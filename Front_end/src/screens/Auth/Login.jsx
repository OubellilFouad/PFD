import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Input from './components/Input'

const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confPassword,setConfPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/api/test').then((response) => console.log(response));
    console.log('email:' + email);
    console.log('password:' + password);
    console.log('confirm password:' + confPassword);
    setEmail('');
    setPassword('');
    setConfPassword('');
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)} action="" className='w-full px-20 flex flex-col items-center gap-10'>
        <h1 className='text-3xl text-main font-bold'>Welcome back</h1>
        <div className='w-full flex flex-col gap-8'>
          <Input name={'Email'} type={'email'} data={email} setData={setEmail} />
          <Input name={'Password'} type={'password'} data={password} setData={setPassword} />
          <Input name={'Confirm Password'} type={'password'} data={confPassword} setData={setConfPassword} />
        </div>
        <button className='w-2/3 py-2 bg-main text-white rounded-lg text-center' type="submit" >SUBMIT</button>
        <p className='text-sm text-paleMain'>Are you new here? <Link  to={'../'} className='text-main font-bold'>Signup</Link></p>
    </form>
  )
}

export default Login