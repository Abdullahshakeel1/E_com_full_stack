import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { SummaryApi } from '../common';
import { FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { displayCurrencyToPKR } from '../helper/displayCurruncy';
import CategoryWiseProductDisplayInDetailPage from '../component/CategoryWiseProductDisplayInDetailPage';
import AddToCart from '../helper/AddToCart';
import { AuthContext } from '../context/authContext';


const Productdetails = () => {
    const param =useParams()
  const {fetchUSerAddtoCart } = useContext(AuthContext)
  const navigate =useNavigate()

const [loading ,setLoading]= useState(false)
const productListLoading = new Array(4).fill(null)
const [activeImg, setActiveImg]=useState("")
  const [proData, setProData]=useState(
    {
      productName:"",
      brandName:"",
      category:"",
      productImage:[],
      description:"",
      price:"",
      sellingPrice:"",
    }
  )
  const fetchProductDetails =async()=>{
    try {
      setLoading(true)
const {data}=await axios.post(SummaryApi.ProductDetails.url,{productId :param?.id} )
if(data?.success){
  setLoading(false)

  setProData(data?.data)
  setActiveImg(data?.data?.productImage[0])

    

  // console.log(data?.data)
}
      
    } catch (error) {
      console.log(error)
      setLoading(true)
    }
  }

  useEffect(()=>{
    fetchProductDetails()
  },[param])
  const handleMouseEnterProduct = (imgUrl)=>{
  setActiveImg(imgUrl)


  }
  const [zoomImg ,setZoomImg]=useState(false)
  const [zoomImgCordinator , setZoomImgCordinator]=useState({
    x:0,
    y:0
  })
  const handleZoomImg =useCallback((e)=>{
    setZoomImg(true)
    const{left , top , width , height}= e.target.getBoundingClientRect()
    const x = (e.clientX-left) / width
    const y = (e.clientY-top) / height
    setZoomImgCordinator({x, y})
   

  },[zoomImgCordinator]);
  const handleLeaveImgZoom =()=>{
    setZoomImg(false)

  }
  const handleAddtoCart = async(e, id)=>{
    await AddToCart(e, id)
    fetchUSerAddtoCart()

  }
  const handleBuy = async(e, id)=>{
    await AddToCart(e, id)
    fetchUSerAddtoCart()
    navigate("/cart")

  }
  return (
    <div className='container mx-auto p-4'>
     <div className='min-h-[200px] flex  flex-col lg:flex-row gap-4'>
      <div className='h-96 flex items-center  flex-col lg:flex-row-reverse gap-4'> 
        <div className=' h-[300px] w-[300px] lg:w-96 lg:h-96 bg-slate-200 relative p-2'> 
        <img className='mix-blend-multiply object-scale-down h-full w-full cursor-zoom-in'  src={activeImg} alt="" onMouseMove={handleZoomImg} onMouseLeave={handleLeaveImgZoom}/>
       {
        zoomImg && (
          <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0 '>
          <div className='w-full h-full  min-h-[400px] min-w-[500px] mix-blend-multiply scale-150' 
            style={{
              backgroundImage: `url(${activeImg})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: `${zoomImgCordinator.x * 100}% ${zoomImgCordinator.y * 100}%`,
            }}
          ></div>
        </div>
        )
       }
        </div>
        <div className='h-full'>
          {
            loading ?(
            <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none'>
               {productListLoading?.map((e,i)=>(
                <div
                key={i}
                className='h-20 w-20 bg-slate-200 rounded animate-pulse'></div>
               ))}
            </div>
            ):(
              <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none'>
              {proData?.productImage.map((imgUrl ,index)=>(
               <div key={index} className='h-20 w-20 bg-slate-200 rounded p-1'>
                <img src={imgUrl} alt={imgUrl} className=' w-full h-full object-scale-down mix-blend-multiply cursor-pointer'   
                onMouseEnter={()=>handleMouseEnterProduct(imgUrl)}  onClick={()=>handleMouseEnterProduct(imgUrl)}/>
               </div>
              ))}
           </div>
            )
          }
        </div>
    </div>
        {
          loading?
          (
            <div className=' flex flex-col gap-5 w-full '>
            <p className='bg-slate-200 rounded  py-3 animate-pulse inline-block w-fit'></p>
            <h2 className='bg-slate-200 rounded w-full py-3 animate-pulse'></h2>
            <p className=' bg-slate-200 rounded w-full py-3 animate-pulse'></p>
            <div className='bg-slate-200 rounded w-full py-3 animate-pulse'>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaRegStarHalfStroke />
            </div>
            <div className='flex items-center gap-2 text-2xl md:text-3xl font-medium my-1'>
              <p className=' bg-slate-200 rounded w-full py-3 animate-pulse'>  </p>
              <p className='bg-slate-200 rounded w-full py-3 animate-pulse'> </p>
      
            </div>
            <div className='flex items-center gap-3 my-2  '>
              <button className='bg-slate-200 rounded w-full py-3 animate-pulse'></button>
              <button className='bg-slate-200 rounded w-full py-3 animate-pulse'></button>
      
            </div>
            <div className=''>
              <p className='bg-slate-200 rounded w-full py-3 animate-pulse'></p>
              <p className='bg-slate-200 rounded w-full py-3 animate-pulse'></p>
            </div>
           </div>
          )
          :
          
          (
            <div className=' flex flex-col gap-1'>
            <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{proData?.brandName}</p>
            <h2 className='text-2xl lg:text-4xl font-medium'>{proData.productName}</h2>
            <p className=' capitalize text-slate-400'>{proData.category}</p>
            <div className='text-red-600 flex items-center gap-1'>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaRegStarHalfStroke />
            </div>
            <div className='flex items-center gap-2 text-2xl md:text-3xl font-medium my-1'>
              <p className=' text-red-600'> {displayCurrencyToPKR(proData.sellingPrice)} </p>
              <p className='text-slate-400 line-through'> {displayCurrencyToPKR(proData.price)} </p>
      
            </div>
            <div className='flex items-center gap-3 my-2  '>
              <button
               onClick={(e)=>handleBuy(e, proData?._id)}
               className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white'>Buy</button>
              <button
               onClick={(e)=>handleAddtoCart(e, proData?._id)}
               className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-white font-medium bg-red-600 hover:bg-transparent hover:text-red-600'>Add To Cart</button>
      
            </div>
            <div className=''>
              <p className='text-slate-600 font-medium  my-1'>Description :</p>
              <p className=''>{proData.description}</p>
            </div>
           </div>
          )
        }
    </div>
    {
      proData.category &&(
      <CategoryWiseProductDisplayInDetailPage category ={proData?.category} heading ={"Recomended Product"}/>)
    }
    </div>
  )
}

export default Productdetails