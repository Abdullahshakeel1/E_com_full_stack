import React, { useState } from 'react'
import { FaPen } from "react-icons/fa6";
import AdminProductEidt from './AdminProductEidt';
import { displayCurrencyToPKR } from '../helper/displayCurruncy';

const AdminProductCard = ({data, index, fetchData}) => {
    const [eidtProduct , setEidtProduct]=useState(false)
  return (
    <div key={index} className='bg-white p-4 rounded '>
      <div className='w-40 flex items-center flex-col '>
        <div className='w-32 h-32 flex items-center justify-center'>
         <img
         className='object-fill mx-auto h-full'
         src={data.productImage[0]} 
         alt="" />

        </div>
         <h1 className='text-ellipsis line-clamp-1'>{data.productName}</h1>
         <p className='font-semibold'> {
          displayCurrencyToPKR(data.price)
         }</p>
      <div className='w-fit ml-auto p-2  bg-green-100 cursor-pointer hover:bg-green-600 rounded-full hover:text-white' onClick={()=>{setEidtProduct(true)}}><FaPen /></div>
      </div>
      {
        eidtProduct &&(
            <AdminProductEidt Productdata={data} onClose={()=>setEidtProduct(false)} fetchData={fetchData}/>

        )
    }
  </div>
  )
}

export default AdminProductCard