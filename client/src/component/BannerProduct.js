import React, { useEffect, useState } from 'react'
import img1 from "../assest/banner/img1.webp"
import img2 from "../assest/banner/img2.webp"
import img3 from "../assest/banner/img3.jpg"
import img4 from "../assest/banner/img4.jpg"
import img5 from "../assest/banner/img5.webp"
import img1m from "../assest/banner/img1_mobile.jpg"
import img2m from "../assest/banner/img2_mobile.webp"
import img3m from "../assest/banner/img3_mobile.jpg"
import img4m from "../assest/banner/img4_mobile.jpg"
import img5m from "../assest/banner/img5_mobile.png"
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";






const BannerProduct = () => {
  const [currentImg , setCurrentImg]=useState(0)
const destopImages =[
img1,
img2,
img3,
img4,
img5,

]
const mobileImages =[
img1m,
img2m,
img3m,
img4m,
img5m,

]
const nextImage = ()=>{
  if(destopImages.length-1 > currentImg){
setCurrentImg(pre=> pre + 1)
}
}
const preImage = ()=>{
  if( currentImg != 0){
setCurrentImg(pre=> pre - 1)
}
}
useEffect(()=>{
  const interval =setInterval(() => {
  if(destopImages.length-1 > currentImg){
    nextImage()
  }
  else{
    setCurrentImg(0)
  }
  }, 5000);
  return ()=>clearInterval(interval)
},[currentImg])
  return (
    <div className='container mx-auto px-4 rounded '>
      <div className='md:h-72 w-full h-56 bg-slate-200 relative'>
        <div className='absolute z-10 h-full w-full md:flex items-center hidden '>
         <div className='flex justify-between  w-full text-2xl'>
         <button className='bg-white shadow-md rounded-full' onClick={preImage}><FaAngleLeft/></button>
         <button className='bg-white shadow-md rounded-full' onClick={nextImage}><FaAngleRight/></button>
         </div>

        </div>

        {/* destopImages */}
<div className='md:flex w-full h-full overflow-hidden  hidden'>
{
destopImages.map((dImg,index)=>(
<div key={index} className='w-full h-full min-w-full min-h-full transition-all' style={{transform :`translateX(-${currentImg * 100}%`}}>
<img className='w-full h-full  object-cover' src={dImg} alt="" />

</div>
))
}
</div>
        {/* MobileImages */}
        <div className='flex w-full h-full overflow-hidden md:hidden '>
{
mobileImages.map((dImg,index)=>(
<div key={index} className='w-full h-full min-w-full min-h-full transition-all' style={{transform :`translateX(-${currentImg * 100}%`}}>
<img className='w-full h-full object-cover' src={dImg} alt="" />

</div>
))
}
</div>

      </div>
    </div>
  )
}

export default BannerProduct