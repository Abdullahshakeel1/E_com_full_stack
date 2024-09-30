import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { IoSearch } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { SummaryApi } from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import { ROLE } from '../common/Role';
import { AuthContext } from '../context/authContext';
import logo from "../assest/pngegg.png"

const Header = () => {
    const dispatch = useDispatch()
    const Context =useContext(AuthContext)
    const Nagviagte  = useNavigate()
    const SerchInput= useLocation()
    const urlSearch = new URLSearchParams(SerchInput?.search)
    const SearchQuery = urlSearch.getAll("q")
    const[search, setSearch]=useState(SearchQuery)
    const [ menuDisplay, setMenuDisplay]=useState(false)
    const user = useSelector((sate)=>sate?.user?.user)
    const handleLogout= async () => {
        const {data} = await axios.get(SummaryApi.logout.url,{
            withCredentials:true,
            headers: {
                "Content-Type": "application/json"  
            },
        })
        if(data?.success){
           toast.success("logout successfully")
            dispatch(setUserDetails(null))
            Nagviagte("/")
        }
        else{
            toast.error("error logging out" 
             
            )
            // console.log(data)
        }
    }
   const  handleSeaarch= async (e)=>{
    const {value} = e.target
    setSearch(value)
    if(value){
        Nagviagte(`/Search?q=${value}`)
    }else{
        Nagviagte("/Search")

    }
    }
  return (
 <header className='h-16 shadow-md bg-white fixed w-full z-40'>
    <div className='h-full container mx-auto flex items-center px-4 justify-between'>
    <div className=''>
        <Link to={"/"}>
        <img src={logo} alt="" width={90} height={50} />
        {/* <Logo w={90} h={50}/> */}
        </Link>
    </div>
    <div className='hidden lg:flex items-center w-full justify-between  max-w-sm  border-zinc-500 border-2 rounded-full focus-within:shadow-md pl-2'>
        <input
        value={search}
         onChange={handleSeaarch}
         type="text"
         placeholder='Search Products here ...'
         className='w-full outline-none '
         />
        <div className='text-lg h-8 w-[50px] bg-red-500 flex items-center justify-center rounded-r-full text-white'>
            <IoSearch />
        </div>
    </div>

            <div className='flex items-center gap-7    '>
            <div className='relative  flex justify-center'>
       {
        user?._id &&(
            <div className='text-3xl relative cursor-pointer flex justify-center'
            onClick={() => setMenuDisplay(!menuDisplay)}>
                      {user?.profilePic ?(
                          <img src={user.profilePic}
                           alt={user?.user?.name} 
                           className='w-10 h-10 rounded-full ring-2 ring-red-500'
                           />
                      ):( <FaRegCircleUser />)
                      }
                     
                  </div>
        )
       }
              {
                menuDisplay && (
                    <div className='absolute top-11 bottom-0 h-fit p-2  shadow-lg rounded-md  bg-white text-center   '>
                    <nav className='flex flex-col gap-2'>
                     <div className=' hover:bg-slate-100'> 
                     {
                            user?.role === ROLE.ADMIN &&(
                                <Link className='whitespace-nowrap  rounded  ' to={"/admin-panel/all-products"}  onClick={() => setMenuDisplay(!menuDisplay)}> Admin Panel</Link>

                            )
                        }
                     </div>
                       <div className='hover:bg-slate-100 border-t-2'>
                       {
                            user?._id &&(
                                <Link className='whitespace-nowrap  rounded  ' to={"/order"}  onClick={() => setMenuDisplay(!menuDisplay)}> Order</Link>
                            )
                        }
                       </div>
                    </nav>
                 </div>
                )
              }
            </div>
            {
                         user?._id &&(
                            <Link to={"Cart"} className='text-2xl  cursor-pointer relative'>
                            <span> 
                                <FaShoppingCart />
                            </span>
                         
                            <div className='bg-red-500 text-white w-5 p-1 flex items-center justify-center h-5 rounded-full absolute -top-2 -right-3'>
                                <p className='text-xs'>{Context?.cartProductCount}</p>
                            </div>
                        </Link>
                         )
                    }
              
            <div> 
                {user?._id ? (
                    <button onClick={handleLogout} className='px-3  py-1 text-white  bg-red-500 text-center  rounded-full hover:bg-red-600 '>logout</button>

                ):(
                    <Link to={"/login"} className='px-3  py-1 text-white  bg-red-500 text-center  rounded-full hover:bg-red-600 '>Login</Link>

                )}
            </div>
            </div>

    </div>
 
 </header>
  )
}

export default Header