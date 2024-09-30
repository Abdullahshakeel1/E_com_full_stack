import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { SummaryApi } from '../common';
import { AuthContext } from '../context/authContext';
import { displayCurrencyToPKR } from '../helper/displayCurruncy';
import { MdDelete } from "react-icons/md";
import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const Context = useContext(AuthContext);
  const LoadingCart = new Array(Context.cartProductCount).fill(null);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(SummaryApi.AddToCartViewProduct.url, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (data?.success) {
        setCartData(data?.data);
        // console.log(data?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
const handleloading =async ()=>{
  await fetchData();

}
  useEffect(() => {
    setLoading(true)
    handleloading()
    setLoading(false)

  }, []);
  const increseQty = async (id,qty)=>{

    // console.log(id)
    // console.log(qty)
    try {
      const response =await fetch(SummaryApi.UpdateAddToCart.url,{
        method : SummaryApi.UpdateAddToCart.method,
        credentials : "include",
        headers : {
          "content-type" : "application/json"
        },
        body: JSON.stringify({
          _id: id,
          quantity :qty+1
        })
      })
      const responseData =await response.json()
      if(responseData?.success){
        fetchData()
        // console.log(responseData)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const decreseQty = async (id,qty)=>{

    // console.log(id)
    // console.log(qty)
    try {
    if(qty >= 2){
      const response =await fetch(SummaryApi.UpdateAddToCart.url,{
        method : SummaryApi.UpdateAddToCart.method,
        credentials : "include",
        headers : {
          "content-type" : "application/json"
        },
        body: JSON.stringify({
          _id: id,
          quantity :qty-1
        })
      })
      const responseData =await response.json()
      if(responseData?.success){
        fetchData()
        // console.log(responseData)
      }
    }
    } catch (error) {
      console.log(error)
    }
  }
  const DelAddToCart = async (id)=>{

    // console.log(id)
  
    try {
  
      const response =await fetch(SummaryApi.DelAddToCart.url,{
        method : SummaryApi.UpdateAddToCart.method,
        credentials : "include",
        headers : {
          "content-type" : "application/json"
        },
        body: JSON.stringify({
          _id: id,
    
        })
      })
      const responseData =await response.json()
      if(responseData?.success){
        fetchData()
        Context.fetchUSerAddtoCart()
        // console.log(responseData)
      }
    
    } catch (error) {
      console.log(error)
    }
  }
  const totalQuantity = cartData.reduce((previousValue, currentValue)=>previousValue + currentValue.quantity, 0)
  const totalPrice = cartData.reduce((previousValue, currentValue)=>previousValue + (currentValue?.quantity * currentValue?.productId?.sellingPrice), 0)


  const handlePyament = async () => {
    try {
      const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
      const { data } = await axios.post(
        SummaryApi.checkout.url,
        { caritem: cartData },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer YOUR_SECRET_KEY`,  // Add your Stripe secret key here
          },
        }
      );
      if(data?.id){
        stripePromise.redirectToCheckout({
          sessionId : data?.id
        })
        console.log("payment response", data);

      }
    } catch (error) {
      console.error("Payment error:", error.response ? error.response.data : error.message);
    }
  };
  
  return (
    <div className="container mx-auto min-h-[calc(100vh-135px)]">
      <div className="text-center text-lg my-3">
        {cartData.length === 0 && !loading && (
          <div className="bg-white py-5">No Data</div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/* View product */}
        <div className="max-w-3xl w-full">
          {loading ? (
            LoadingCart.map((_, index) => (
              <div
                key={index}
                className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
              ></div>
            ))
          ) : (
            cartData.map((product) => (
              <div
                key={product?._id}
                className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px_1fr]"
              >
                <div className="w-32 h-32 bg-slate-200 ">
                  <img
                    className="w-full h-full object-scale-down mix-blend-multiply"
                    src={product?.productId?.productImage[0]}
                    alt={product?.productId?.productName || 'Product Image'}
                  />
                </div>
                <div className=' px-4 py-2 relative'>
                  {/* delproduct */}
                  <div 
                  onClick={()=>DelAddToCart(product?._id)}
                  className=' absolute right-0 text-red-500  rounded-full p-2 hover:bg-red-500 hover:text-white cursor-pointer '>
                  <MdDelete />
                  </div>
                  <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName} </h2>
                  <p className='text-slate-500 capitalize'>{product?.productId?.category} </p>
                 
                 <div className='flex items-center justify-between'>
                 <p className='text-red-500 text-lg font-medium'>{displayCurrencyToPKR(product?.productId?.sellingPrice)} </p>
                 <p className='text-slate-500 text-lg  font-semibold'>{displayCurrencyToPKR(product?.productId?.sellingPrice * product?.quantity )} </p>
                 </div>


                
                  <div className=' flex items-center gap-3 mt-2'>
                    <button
                     onClick={()=>decreseQty(product?._id, product?.quantity)}
                     className=' flex justify-center items-center hover:bg-red-500 hover:text-white border border-red-600 text-red-500 w-6 h-6 rounded'>-</button>
                    <span>{product?.quantity}</span>
                    <button
                    onClick={()=>increseQty(product?._id, product?.quantity)}
                     className=' flex justify-center items-center hover:bg-red-500 hover:text-white border border-red-600 text-red-500 w-6 h-6 rounded'>+</button>

                  </div>

                </div>
              </div>
            ))
          )}
        </div>

        {/* Total product summary */}
        {
          cartData[0] && (
            <div className="mt-5 lg:mt-0 w-full max-w-sm">
            {loading ? (
              <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
            ) : (
              <div className="h-36 bg-white">
                <h2 className='text-white bg-red-500  px-4 py-1 '>Summary</h2>
                <div className='flex items-center justify-between px-4 py-2 gap-2 text-slate-600'>
                  <p className=''>Quantity:</p>
  
                  <p className=''>{totalQuantity}</p>
                </div>
                <div className='flex items-center justify-between px-4 py-2 gap-2  text-slate-600'>
                  <p>Total Price:</p>
                  <p>{displayCurrencyToPKR(totalPrice)}</p>
                </div>
                <button
                 onClick={handlePyament}
                 className='bg-blue-500 text-white p-2  w-full '>Payment</button>
               
              </div>
            )}
          </div> 
          )
        }
   
      </div>
    </div>
  );
};

export default Cart;
