import React from 'react'
import success from "../assest/successCancel/Mobile Payment.gif"
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const Success = () => {
return (
  <div className=' bg-slate-200  w-full max-w-md  mx-auto flex justify-center items-center p-4 flex-col m-2 rounded'>
    <iframe
      className='h-60 -mt-12'
      src="https://lottie.host/embed/2f77f5d3-d177-4a07-9968-18e6310b5286/34MStWwHid.json">
    </iframe>
    <p className=' text-green-600 font-bold text-xl'> Payment successfully</p>
    <Link 
      to={"/order"}
      className='flex items-center justify-between px-3 py-2 mt-5 border-green-600 border-2 gap-4 rounded           font-semibold text-green-600  hover:bg-green-600 hover:text-white'>
        View Order
      < FaArrowRightLong
        className='text-2xl font-bold '
    />
    </Link>
  </div>
)
}

export default Success