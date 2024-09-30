import React, { useState } from 'react'
import { IoIosClose } from "react-icons/io";
import { ProductCategory } from '../helper/ProductCategory';
import { IoMdCloudUpload } from "react-icons/io";
import UploadImages from '../helper/UploadImages';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import axios from "axios"
import {toast} from "react-toastify"
import { SummaryApi } from '../common';
const AdminProductEidt = ({Productdata,onClose ,fetchData}) => {
    const [data,setData]=useState({
      ...Productdata,
      
        productName:  Productdata?.productName,
        brandName:    Productdata?.brandName,
        category:     Productdata?.category,
        productImage: Productdata?.productImage || [],
        description:  Productdata?.description,
        price:        Productdata?.price,
        sellingPrice: Productdata?.sellingPrice,
      })
      const [fullImg, setFullImg]= useState("")
      const [openFullScreenImg, setOpenFullScreenImg]= useState(false)
      const handleDeleteproductImg = async(index)=>{
        console.log(index + "img index:")
        const newProductimg =[...data.productImage ]
        newProductimg.splice(index,1)
        setData((preve)=>{
          return{
            ...preve,
            productImage :[ ...newProductimg ]
          }
        })
    
      }
    
      const handleChange =(e)=>{
        const {name, value} = e.target
        setData((preve)=>{
          return{
         ...preve,
            [name]:value
          } 
        })
    
      }
    const handleUploadImage =async (e)=>{
      const file = e.target.files[0]
      const uploadImageCloudnary = await UploadImages(file)
      setData((preve)=>{
        return{
          ...preve,
          productImage :[...preve.productImage, uploadImageCloudnary.url]
        }
      })
    }
    // uploadProducte
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      console.log("Submitting data:", data); // Debugging: Check what data is being sent
    
      try {
        const response = await axios.post(SummaryApi.UpdatePRoduct.url, data, {
          withCredentials : true,
          headers: {
            "Content-Type": "application/json"
          }
        });
    
        if (response.data.success) {
          toast.success(response.data.message || 'Product updated successfully');
          onClose(); // Close modal or redirect
          fetchData()
          setData({
            productName: '',
            brandName: '',
            category: '',
            productImage: [],
            description: '',
            price: '',
            sellingPrice: ''
          });
        } else {
          toast.error(response.data.message || 'Failed to update product');
        }
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message); // Log detailed error
        toast.error('An error occurred while updating the product');
      }
    };
    
    
  return (
    <div className='fixed w-full h-full bg-slate-200  bg-opacity-35 top-0 left-0 bottom-0 right-0 flex justify-center items-center  '>
    <div className='bg-white p-4 rounded w-full max-w-2xl  h-full max-h-[80%] overflow-hidden'>
      <div className='flex justify-between items-center pb-3'>
        <h2  className=' font-bold text-lg  '> Eidt Products </h2>
        <div
        onClick={onClose}
        className='w-fit ml-auto text-3xl hover:text-red-500 cursor-pointer font-bold'><IoIosClose /> 
        </div>
      </div>

      <form
      onSubmit={handleSubmit}
      className='p-4 grid gap-2 overflow-y-scroll h-full pb-5'>
        <label htmlFor='productName'> Product Name</label>
        <input
        type="text"
        id='productName'
        name='productName'
        placeholder='Enter Product Name'
        value={data.productName}
        onChange={handleChange} 
        className='p-2 bg-slate-100 rounded-sm border'
        />
         <label className='mt-3' htmlFor='brandName'> Brand Name</label>
        <input
        type="text"
        id='brandName'
        name='brandName'
        placeholder='Enter Brand  Name'
        onChange={handleChange} 
        value={data.brandName}
        className='p-2 bg-slate-100 rounded-sm border'
        />
        <label className='mt-3' htmlFor='category'> Category</label>
        <select
        value={data.category}
        name='category'
        onChange={handleChange}
        className='p-2 bg-slate-100 rounded-sm border'
        >
          <option value="" key="">Select Category</option>
          {
            ProductCategory.map((category, index) => {
              return <option key={index} value={category.value}>{category.lable}</option>
            })
          }

        </select>
        <label className='mt-3' htmlFor='productImage'> Product Images</label>
          <label className='cursor-pointer' htmlFor='uploadimageinput'>
        <div className=' p-2 bg-slate-100  border rounded h-32  w-full flex justify-center items-center'>

        <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
         
              <span className='text-4xl '>
                <IoMdCloudUpload />
              </span>
              <p className=' text-sm'>Upload Product image</p>
              <input type="file" id='uploadimageinput' className='hidden' onChange={handleUploadImage} />

        </div> 
         </div>
        </label>  
        <div>
          {
            data?.productImage[0] ? (
          <div className='flex items-center gap-2'>
            {
                  data.productImage.map((img, index)=>{
                    return  (
                  <div className='relative group '>
                        <img
                       src={img} 
                       height={80} 
                       width={80}  
                       className="bg-slate-100  border cursor-pointer " 
                       alt="imgf" 
                       onClick={()=>
                        {setOpenFullScreenImg(true)
                        setFullImg(img)
                       }}
                       />
                       <div
                       onClick={()=>handleDeleteproductImg(index)}
                       className='absolute cursor-pointer bottom-0 right-0 p-1 text-white bg-red-600  rounded-full hover:bg-black hidden group-hover:block '>
                        <MdDelete />
                        </div>
                  </div>
                    )
                  })
            }
          </div>

            ):(
              <p>* please Upload Product image</p>
            )
          }
        </div>
        <label className='mt-3' htmlFor='price'> Price :</label>
        <input
        type="number"
        id='price'
        name='price'
        placeholder='Enter price '
        onChange={handleChange} 
        value={data.price}
        className='p-2 bg-slate-100 rounded-sm border'
        />
         <label className='mt-3' htmlFor='sellingPrice'> sellingPrice :</label>
        <input
        type="number"
        id='sellingPrice'
        name='sellingPrice'
        placeholder='Enter sellingPrice '
        onChange={handleChange} 
        value={data.sellingPrice}
        className='p-2 bg-slate-100 rounded-sm border'
        />
           <label className='mt-3' htmlFor='description'>Description:</label>
        <textarea
          id='description'
          name='description'
          value={data.description}
          onChange={handleChange}
          className='h-28 bg-slate-100 resize-none border p-1'
          placeholder='Enter product description'
          rows="3"
        ></textarea>


        <button className='px-3 py-1  bg-red-500 text-white mb-10 hover:bg-red-600 '>Update Prouct</button>

      </form>
    </div>
    {/* img fullScreen   */}
{
openFullScreenImg &&(
  <DisplayImage  onClose={()=>setOpenFullScreenImg(false)} imgUrl={fullImg}/>

)
}
  </div>
  )
}

export default AdminProductEidt