import React from 'react'
import { Link } from 'react-router-dom'
import Input from './components/Input'

const Login = () => {
  return (
    <form action="" className='w-full px-20 flex flex-col items-center gap-10'>
        <h1 className='text-3xl text-main font-bold'>Welcome back</h1>
        <div className='w-full flex flex-col gap-8'>
          <Input name={'Email'} type={'email'}/>
          <Input name={'Password'} type={'password'}/>
          <Input name={'Confirm Password'} type={'password'}/>
        </div>
        <Link to={'../../App'} className='w-2/3 py-2 bg-main text-white rounded-lg text-center'>
          <button type="submit" >SUBMIT</button>
        </Link>
        <p className='text-sm text-paleMain'>Are you new here? <Link  to={'../'} className='text-main font-bold'>Signup</Link></p>
    </form>
  )
}

export default Login