import React, { useContext, useEffect, useRef, useState } from 'react'
import FetchPRODUCTbyCategory from '../helper/FetchPRODUCTbyCategory'
import { displayCurrencyToPKR } from '../helper/displayCurruncy'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import AddToCart from '../helper/AddToCart'
import { AuthContext } from '../context/authContext'
import { ScrollTop } from '../helper/ScrollTop'

const CategoryWiseProductDisplayInDetailPage = ({category ,heading}) => {
  
  const [data, setData]=useState([])
  const [loading, setLoading]=useState(false)
  const loadingList =new Array(13).fill(null)
  const {fetchUSerAddtoCart } = useContext(AuthContext)
const handleAddTocart = async (e , id)=>{
 await AddToCart(e, id)
 fetchUSerAddtoCart()
}
  const fetchdata =async ()=>{
    setLoading(true)
    const categoryProduct = await FetchPRODUCTbyCategory(category)
    setLoading(false)
    setData(categoryProduct?.data)
  }
  useEffect(()=>{
    fetchdata()
  },[])

  return (
    <div className='container mx-auto px-4 my-6 relative '>
      <h2 className='text-2xl font-semibold py-4 '>{heading}</h2>
   <div className=' grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] gap-6 justify-between overflow-x-scroll scrollbar-none transition-all' >

   {
    loading?(  loadingList.map((product, index)=>(
      <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]   bg-white rounded-sm shadow '>
      <div className='bg-slate-200 h-48 flex justify-center items-center p-4 min-w-[120px] md:min-w-[145px] animate-pulse '>
        <img src={product?.productImage[0]} alt=""  className='object-scale-down h-full hover:scale-110 transition-all mix-blend- animate-pulse '/>
      </div>
      <div className=' p-4 grid gap-3 w-full'>
        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 p-3 text-black animate-pulse rounded-full bg-slate-200 w-full'></h2>
<p className=' capitalize text-slate-500 animate-pulse rounded-full bg-slate-200 w-full p-3'>{product?.category}</p>
<div className='flex gap-2 text-[90%] w-full'>

<p className='text-red-500 font-medium animate-pulse rounded-full bg-slate-200 w-full p-3'></p>
 <p className='text-slate-500 line-through animate-pulse rounded-full bg-slate-200 w-full p-3'></p>


</div>
<button className=' bg-slate-200 w-full text-white px-2 py-3 text-sm animate-pulse rounded-full'>  </button>
      </div>
    </div>
    ))):(
      data.map((product, index)=>(
        <Link to={`/product/${product?._id}`} key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]   bg-white rounded-sm shadow ' onClick={ScrollTop}>
        <div className='bg-slate-200 h-48 flex justify-center items-center p-4 min-w-[120px] md:min-w-[145px]'>
          <img src={product?.productImage[0]} alt=""  className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
        </div>
        <div className=' p-4 grid gap-3'>
          <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
<p className=' capitalize text-slate-500'>{product?.category}</p>
<div className='flex gap-2 text-[90%] w-full'>

  <p className='text-red-500 font-medium '>{displayCurrencyToPKR(product?.sellingPrice)}</p>
   <p className='text-slate-500 line-through'>{displayCurrencyToPKR(product?.price)}</p>


</div>
<button className=' bg-red-500 hover:bg-red-600 text-white px-2 py-0.5 text-sm rounded-full' onClick={(e)=>handleAddTocart(e, product?._id)}> Add to Cart </button>
        </div>
      </Link>
      ))
    )
      
      }
   </div>
    
    </div>
  )
}

export default CategoryWiseProductDisplayInDetailPage