import React from 'react'
import { IoIosClose } from 'react-icons/io'

const DisplayImage = ({
    imgUrl,
    onClose
}) => {
  return (
<div className='fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center '>
    <div className='bg-white  shadow-lg rounded max-w-5xl mx-auto p-4'>
    <div
          onClick={onClose}
          className='w-fit ml-auto text-3xl hover:text-red-500 cursor-pointer font-bold'><IoIosClose /> 
          </div>
          <div className='flex justify-center  p-4 max-h-[80vh] max-w-[80vh]'>
        <img
        className='w-full h-full'
        src={imgUrl}  alt="" />
    </div>
    </div>

</div>
  )
}

export default DisplayImage