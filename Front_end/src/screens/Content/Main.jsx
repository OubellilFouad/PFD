import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigation } from 'react-router-dom'
import {AiOutlinePlus} from 'react-icons/ai'
import { MdClose } from 'react-icons/md';
import DepForm from './admin/components/DepForm';
const Main = () => {
  const location = useLocation();
  const navigation = useNavigation()
  const [title,setTitle] = useState('Dashboard');
  const [page,setPage] = useState('Main');
  const [open,setOpen] = useState(false);
  useEffect(() => {
    location.state?.name? setTitle(location.state.name):setTitle(title);
    location.state?.page? setPage(location.state.page):setPage(page);
    console.log(page);
  },[location.state?.name,location.state?.page])  
  return (
    <div className='py-7 px-12 flex flex-col gap-8 overflow-x-scroll main'>
        <div className='text-5xl font-semibold flex justify-between items-center'>
            <p>{title}</p>
            {page === 'Main' && (
                <button onClick={() => setOpen(true)} className='flex items-center text-base gap-2 py-2 px-4 border rounded-lg hover:text-main hover:border-main'>
                    <AiOutlinePlus className='p-1 bg-palerMain text-main text-xl rounded-md'/>
                    Add Dep
                </button>
            )}
        </div>
        <Outlet/>
        <DepForm open={open} setOpen={setOpen}/>
    </div>
  )
}

export default Main