import React, { useContext, useEffect, useRef, useState } from 'react'
import FetchPRODUCTbyCategory from '../helper/FetchPRODUCTbyCategory'
import { displayCurrencyToPKR } from '../helper/displayCurruncy'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import {Link} from "react-router-dom"
import AddToCart from '../helper/AddToCart'
import { AuthContext } from '../context/authContext'
const HorizontalProductCard = ({category ,heading}) => {
  const [data, setData]=useState([])
  const [loading, setLoading]=useState(false)
  const loadingList =new Array(13).fill(null)
  const [scroll ,setScroll]=useState(0)
  const scrollElement = useRef()
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
  const scrollRight =()=>{
    scrollElement.current.scrollLeft +=300  
  }

  const scrollLeft =()=>{
    scrollElement.current.scrollLeft -=300  
  }
  return (
    <div className='container mx-auto px-4 my-6 relative '>
      <h2 className='text-2xl font-semibold py-4 '>{heading}</h2>
   <div className='flex items-center  gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
   <button className='bg-white shadow-md rounded-full absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft/></button>
   <button className='bg-white shadow-md rounded-full absolute right-0 text-lg  hidden md:block' onClick={scrollRight} ><FaAngleRight/></button>
   {
    loading?(  loadingList.map((product, index)=>(
      <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-32 bg-white rounded-sm shadow flex'>
      <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]  animate-pulse '>
        <img src={product?.productImage[0]} alt=""  className='object-scale-down h-full hover:scale-110 transition-all  animate-pulse mix-blend-multiply'/>
      </div>
      <div className=' p-4 grid w-full gap-2 '>
        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse rounded-full'></h2>
<p className=' capitalize text-slate-500 bg-slate-200 animate-pulse rounded-full'></p>
<div className='flex gap-2 text-[90%] w-full'>

<p className='text-red-500 font-medium p-1 bg-slate-200 w-full  animate-pulse rounded-full'></p>
 <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>


</div>
<button className=' bg-slate-200  text-white px-2 py-0.5 text-sm rounded-full animate-pulse w-full '> </button>
      </div>
    </div>
    ))):(
      data.map((product, index)=>(
        <Link key={index} to={`/product/${product?._id}`} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-md overflow-hidden shadow flex'>
        <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
          <img src={product?.productImage[0]} alt=""  className='object-scale-down h-full hover:scale-110 transition-all   mix-blend-multiply'/>
        </div>
        <div   className=' md:p-4 grid pr-2 pl-1 py-1'>
          <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
<p className=' capitalize text-slate-500'>{product?.category}</p>
<div className='flex gap-2 text-[90%] w-full'>

  <p className='text-red-500 font-medium '>{displayCurrencyToPKR(product?.sellingPrice)}</p>
   <p className='text-slate-500 line-through'>{displayCurrencyToPKR(product?.price)}</p>


</div>
<button className=' bg-red-500 hover:bg-red-600 text-white px-3 py-0.5 text-sm rounded-full' onClick={(e) => handleAddTocart(e, product?._id)}> Add to Cart </button>
        </div>
      </Link>
      ))
    )
      
      }
   </div>
    
    </div>
  )
}

export default HorizontalProductCard