import React from 'react'
import { AiFillDelete, AiOutlinePlus } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import { useAuth } from '../../../../../context/AuthContext'
import { useChef } from '../../chefDep/context/ChefContext'

const TableRow = ({type,nom,email,dateNaiss,grad,id,userID}) => {
  const {user} = useAuth();
  const {setOpenProf,deleteProf} = useChef();
  if(type === 'header'){
    return(
        <div className='flex gap-3 p-2 text-xs text-dimText font-bold uppercase border-b border-b-separator items-center'>
            <div className='flex-[0.3]'>ID</div>
            <div className='flex-[0.7]'>User name</div>
            <div className='flex-1'>Email</div>
            <div className='flex-1'>Date of birth</div>
            <div className='flex-1'>Grad</div>
            <div className='flex-1 flex justify-end pr-4'>
                {user?.role === 1 && (
                  <button onClick={() => setOpenProf(true)} className='flex items-center text-sm gap-2 hover:text-main hover:border-main'>
                    <AiOutlinePlus className='p-1 bg-palerMain text-main text-xl rounded-md'/>
                    Add Prof
                  </button>
                )}
            </div>
        </div>
    )
  }
  if(type === 'row'){
    return(
        <div className='flex gap-3 px-2 py-4 text-sm font-bold border-b border-b-separator '>
            <div className='flex-[0.3]'>{id}</div>
            <div className='flex-[0.7]'>{nom}</div>
            <div className='flex-1'>{email}</div>
            <div className='flex-1'>{dateNaiss}</div>
            <div className='flex-1'>{grad}</div>
            <div className='flex-1 flex justify-end pr-4'>
                <button>
                  <AiFillDelete onClick={() => deleteProf(id)} className='text-lg cursor-pointer hover:text-red'/>
                </button>
            </div>
        </div>
    )
  }
//   {type === 'row' && (
//     <div className='flex gap-3 p-2 text-sm font-bold'>
//         <div className='flex-[0.5]'>1</div>
//         <div className='flex-1'>User name</div>
//         <div className='flex-1'>basanib467@terkoer.com</div>
//         <div className='flex-1'>03/04/86</div>
//         <div className='flex-1'>Grad</div>
//         <div className='flex-1 flex justify-end pr-4'>
//             <button>Add prof</button>
//         </div>
//     </div>
//   )}
}

export default TableRow