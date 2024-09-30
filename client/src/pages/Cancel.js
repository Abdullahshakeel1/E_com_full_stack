
import React from 'react'
import cancel from "../assest/successCancel/c2.webm"
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const Cancel = () => {
return (
<div
  className=' bg-slate-200  w-full max-w-md  mx-auto flex justify-center items-center p-4 flex-col m-2 rounded'>
    <iframe
      className='h-48 '
      src="https://lottie.host/embed/ca1da2e6-6935-4e11-a8b6-4ba996f69967/KYdQDAO3XH.json">
    </iframe> 
  <p className=' text-red-500  font-bold text-xl'> Payment Cancel</p>
  <Link
    to={"/cart"} 
    className='flex items-center justify-between px-3 py-2 mt-5 border-red-500 border-2 gap-4 rounded font-semibold text-red-500  hover:bg-red-500 hover:text-white'>
      < FaArrowLeftLong
        className='text-2xl font-bold '
      />
      back To cart
  </Link>
</div>
)
}

export default Cancel