import React, { useEffect } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ROLE } from '../common/Role'

const AdminPanel = () => {
    const navigate =useNavigate()
    const user = useSelector((sate)=>sate?.user?.user)
    useEffect(()=>{
        if(user?.role !== ROLE?.ADMIN){
            navigate('/')
            return
        }
    },[user])

  return (
    <div className='   min-h-[calc(100vh-120px)] flex'>
        {/* checkekekkekekeke */}
        <aside className='bg-white min-h-full w-full max-w-60 custumShadow md:block hidden'>
            <div className='h-32    flex justify-center items-center  flex-col'>
            <div className='text-5xl relative cursor-pointer flex justify-center'>
                    {user?.profilePic ?(
                        <img src={user.profilePic}
                         alt={user?.user?.name} 
                         className='w-20 h-20 rounded-full ring-2 ring-red-500'
                         />
                    ):( <FaRegCircleUser />)
                    }
                   
                </div>
                <p className='capitalize font-semibold text-lg '>{user?.name}</p>
                <p className='capitalize font-semibold text-sm '>{user?.role}</p>

            </div>
            <div>
                <nav className=' grid p-4'>
                     <Link to={"all-user"} className='px-2 py-1 hover:bg-slate-100 rounded' >  All Users</Link>
                     <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-100 rounded' >All Products</Link>
                     <Link to={"all-order"} className='px-2 py-1 hover:bg-slate-100 rounded' >All Orders</Link>

                </nav>
            </div>
        </aside>
        <main className='w-full h-full p-2'>
            <Outlet/>
        </main>
    </div>
  )
}

export default AdminPanel