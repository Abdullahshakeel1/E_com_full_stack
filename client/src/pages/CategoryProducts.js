import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ProductCategory } from '../helper/ProductCategory'
import VerticalCard from '../component/VerticalCard'
import axios from 'axios'
import { FiFilter } from "react-icons/fi";
import { SummaryApi } from '../common'
import { ImCancelCircle } from "react-icons/im";

const CategoryProducts = () => {
  const [data, setData] =useState([])
  const navigate =useNavigate()
  const [loading, setLoading] =useState(false)
  const [sortBy, setSortBy] =useState("")
  const [sideOpen, setSideOpen] = useState(false)
  const handleside= ()=>{
    setSideOpen((pre)=>!pre)
  }
 
  // console.log("sortBy",sortBy)

  const [filterCategoryList, setFilterCategoryList] =useState([])
  const loaction =useLocation()
  const urlSearch = new URLSearchParams(loaction.search)
  const urlListCategoryinArry =urlSearch.getAll("category")
  const urlListCategoryinObject = {}
  urlListCategoryinArry.forEach(el=>{
    urlListCategoryinObject[el]=true
  })
  
  const [selectCategory, setSelectCategory] =useState(urlListCategoryinObject)
// console.log("urlListCategoryinArry", urlListCategoryinArry)
// console.log("urlListCategoryinObject", urlListCategoryinObject)



  const fetchData =async()=>{{
    const {data}= await axios.post(SummaryApi.FiltterProduct.url , {
      category : filterCategoryList
    },{
      headers : {
        "Content-Type": "application/json"
      }
    }
   
 
  )
    setLoading(true)
    try {
      setLoading(false)
      setData(data?.data || [])
      // console.log( "prorrr", data?.data)
    } catch (error) {
      console.log(error)
    }
  }}
  const handleSelectCategory=(e)=>{
    const {name, value , checked } = e.target
    setSelectCategory((prev)=>{
      return{
        ...prev,
        [value]: checked
      }
    })
  }
useEffect(()=>{fetchData()},[filterCategoryList])
  useEffect(()=>{
const arryOfCategory = Object.keys(selectCategory).map((categoryKeyName)=>{
  if(selectCategory[categoryKeyName]){
    return categoryKeyName
  }
  return null  
}).filter(el=>el  )
setFilterCategoryList(arryOfCategory)

// format for the url change when change on the chexkbox
const urlFormat = arryOfCategory.map((el, index)=>{
  if((arryOfCategory.length -1 )=== index){
    return `category=${el}`
  }
  return `category=${el}&&`

})    
// console.log("urlFormat", urlFormat.join(""))
navigate("/product-category?"+urlFormat.join(""))
},[selectCategory])


const handleChangeSortBy =(e)=>{
  const {value} =e.target
  setSortBy(value)
  if(value === "asc"){
    setData((prev)=>prev.sort((a,b)=>a.sellingPrice - b.sellingPrice))
  }
  if(value === "dsc"){
    setData((prev)=>prev.sort((a,b)=>b.sellingPrice - a.sellingPrice))
  }
}
useEffect(()=>{},[sortBy])

  return (
    <div className='p-2'>
      {/* destop Version */}
      <div className=' md:grid grid-cols-[200px,1fr]'>
        {/* left side */}
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll scrollbar-none md:block hidden'>

          {/* dort by */}
          <div className=''>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>
              Sort By
            </h3>
            <form 
              className=' text-sm flex  flex-col gap-2 py-2'>
                <div
                  className='flex items-center gap-3'>
                  <input 
                    onChange={handleChangeSortBy}
                    checked={sortBy === "asc"}
                    type="radio" 
                    name='sortBy'
                    value={"asc"}
                    className=''
                    />
                  <label>Price - Low to High</label>  
                </div>
                <div 
                 className='flex items-center gap-3'>
                  <input 
                    onChange={handleChangeSortBy}
                    checked={sortBy === "dsc"}
                    type="radio" 
                    name='sortBy'
                    value={"dsc"}
                    className=''
                    />
                  <label>Price - High to Low</label>  
                </div>
            </form>
          </div>
                    
          {/* filter by */}
          <div className=''>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>
              Category
            </h3>
            <form 
              className=' text-sm flex  flex-col gap-2 py-2'>
                {
                  ProductCategory.map((categoryName ,index)=>(
                    <div 
                    key={index}
                      className='flex items-center gap-3'>
                        <input 
                          onChange={handleSelectCategory}
                          value={categoryName?.value}
                          checked={selectCategory[categoryName?.value]}
                          type="checkbox" 
                          name={"category"}
                          id={categoryName?.value}
                        />
                        <label 
                          htmlFor={categoryName.value}
                        >
                          {categoryName?.lable}
                          
                        </label>

                    </div>
                  ))
                }
            </form>
          </div>
     
        </div>



      {/* right side (product)*/}
        <div className='px-4 '>
          <div className='flex py-2'> 
         <div className='flex md:hidden  h-10 justify-center gap-2 items-center min-w-32  border rounded-full bg-red-500 text-white font-medium text-lg cursor-pointer ' onClick={handleside}>
         <button
          className='  text-ellipsis '
          > Filter </button>
           <div className='text-lg font-extrabold text-ellipsis text-center '><FiFilter /></div>
         </div>
          {
            sideOpen== true && (<div>
               {/* left side */}
        <div className='bg-white min-w-52 mt-2 p-2 min-h-[calc(100vh-120px)] overflow-y-scroll scrollbar-none  absolute z-10 left-2 top-16 shadow-md rounded-md  '>

{/* dort by */}
<div className=''>
<div className='flex items-center justify-between border-b pb-1 border-slate-300'>
<h3 className='text-base uppercase font-medium text-slate-500 '>
    Sort By 
  </h3>
  <span onClick={handleside} className='text-red-500 hover:scale-125 transition-all cursor-pointer'><ImCancelCircle /></span>
</div>
  <form 
    className=' text-sm flex  flex-col gap-2 py-2'>
      <div
        className='flex items-center gap-3'>
        <input 
          onChange={handleChangeSortBy}
          checked={sortBy === "asc"}
          type="radio" 
          name='sortBy'
          value={"asc"}
          className=''
          />
        <label>Price - Low to High</label>  
      </div>
      <div 
       className='flex items-center gap-3'>
        <input 
          onChange={handleChangeSortBy}
          checked={sortBy === "dsc"}
          type="radio" 
          name='sortBy'
          value={"dsc"}
          className=''
          />
        <label>Price - High to Low</label>  
      </div>
  </form>
</div>
          
{/* filter by */}
<div className=''>
  <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>
    Category
  </h3>
  <form 
    className=' text-sm flex  flex-col gap-2 py-2'>
      {
        ProductCategory.map((categoryName ,index)=>(
          <div 
          key={index}
            className='flex items-center gap-3'>
              <input 
                onChange={handleSelectCategory}
                value={categoryName?.value}
                checked={selectCategory[categoryName?.value]}
                type="checkbox" 
                name={"category"}
                id={categoryName?.value}
              />
              <label 
                htmlFor={categoryName.value}
              >
                {categoryName?.lable}
                
              </label>

          </div>
        ))
      }
  </form>
</div>

</div>
            </div>)
          }


          <p className='font-medium text-lg text-slate-600 my-2 ml-auto'>Search Results : <span className='text-red-500'>{data.length}</span></p> </div>
     <div className="min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] overflow-y-scroll scrollbar-none">
     {
        data.length !== 0 &&(
          <VerticalCard  loading={loading} data={data}/>
        )
      }
     </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryProducts