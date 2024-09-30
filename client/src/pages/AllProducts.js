import React, { useEffect, useState } from 'react'
import UploadProducts from '../component/UploadProducts'
import axios from 'axios'
import { SummaryApi } from '../common'
import AdminProductCard from '../component/AdminProductCard'

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct]=useState(false)
const [  allProducts ,setllProducts] =useState([])

  // fetch all products
  const ShowAllProducts =async ()=>{
    try {
      const Response =await axios.get(SummaryApi.AllProducts.url,{
        withCredentials:true,
        headers:{
          "Content-Type": "application/json"
        }
      })
     if (Response?.data?.success){
      setllProducts(Response?.data?.data)
      console.log(Response?.data?.data)
     }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    ShowAllProducts();
  },[])
  return (
  <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
      <h2 className='font-bold text-lg '> All  Products </h2>
      <button
      onClick={()=>setOpenUploadProduct(true)}
      className='border-2 text-red-500 border-red-600 hover:bg-red-500  hover:text-white transition-all px-3 py-1 rounded-full'>
        Upload Products
      </button>
  </div>
  {/* all products */}
  <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
  {
  allProducts.map((product,index)=>(
    <AdminProductCard data={product} key={index + "allProduct "} fetchData ={ShowAllProducts}/>
    
  ))
 
}
</div>




      {/* Upload product section */}
      {
        openUploadProduct &&(
          <UploadProducts fetchData ={ShowAllProducts}  onClose ={()=>setOpenUploadProduct(false)}/>
        )
      }
    </div>
  )
}

export default AllProducts
