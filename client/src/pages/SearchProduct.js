import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from "axios"
import { SummaryApi } from '../common'
import VerticalCard from '../component/VerticalCard'
const SearchProduct = () => {
  const [proData, setProData] =useState([])
  const [Loading, setLoading] =useState(false)

  const querry =useLocation()
    // console.log("querry", querry)
    const fetchData =async ()=>{
      try {
        setLoading(true)
        const {data}=await axios.get(SummaryApi.SearchProduct.url+querry.search)
        if(data.success){
        setLoading(false)

          // console.log(data?.data)
          setProData(data?.data)
        }
        
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{fetchData()},[querry])
  return (
    <div className='container mx-auto p-4'>
{
  Loading &&(
    <p className='text-lg text-center'>loading......</p>

  )
}
    <p className='text-lg font-semibold my-3'>Search Results : {proData?.length}</p>
    {
  proData.length === 0 && !Loading &&(
    <p className='bg-white text-lg text-center p-4'>No Data Found..... </p>
  )
}
{
  proData.length !== 0 && !Loading &&(
  <VerticalCard Loading={Loading} data={proData}/>
  )
}
 
    </div>
  )
}

export default SearchProduct