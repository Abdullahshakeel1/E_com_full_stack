import React, { useEffect, useState } from 'react'
import axios from "axios"
import { SummaryApi } from '../common'
import moment from "moment"
import { displayCurrencyToPKR } from '../helper/displayCurruncy'
const Order = () => {
  const [orderData, setOrderData] = useState([])
  // const [loading, setLoading] = useState(true)

  const userDataDetails = async ()=>{
    try {
      const {data}= await axios.get(SummaryApi.userOrders.url, {
               headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })

    if(data?.success){
      // setLoading(true)

      setOrderData(data?.data)
      // console.log(data?.data)

      // setLoading(false)

    }
      
    } catch (error) {
      console.log(error)
      
    }
  }
  useEffect(()=>{
    userDataDetails()
  },[])
  return (
    <div className='min-h-[calc(100vh-120px)]'>
      {
        !orderData[0]  && (
          <div className='min-h-[calc(100vh-155px)] flex items-center justify-center text-[30px] text-[#00000060] font-extrabold'>
            <div>No order is Available</div>
          </div>
        )
      }
      <div className='p-4 w-full'>
      {orderData.map((item, index) => (
            <div key={item.userId + index}>
              <p className='font-bold text-zinc-500 text-lg p-3'>{moment(item.createdAt).format('LL')}</p>
              <div
              className='border rounded bg-[#ffffff] md:pt-10  p-3 shadow-md'
              >
                      {/* product details  */}
                      <div className='flex justify-between md:flex-row flex-col md:items-center'>
              <div className='grid gap-2'>
                {
                  item?.productDetails.map((product , i)=>(
                    <div key={ i} className='flex md:h-28 items-center gap-3 shadow-md rounded-md overflow-hidden bg-slate-100 min-w-[calc(100vw-395px)]'>
                     <img className='w-28 h-28 bg-white rounded mix-blend-multiply object-scale-down p-2 border-r-2 border-slate-300' src={product.image[0]} alt="img" />
                     <div>
                     <div className='font-medium text-lg text-ellipsis line-clamp-1'>{product.name}</div>
                      <div className='flex items-center gap-5 mt-1'>
                      <div className='text-lg text-red-500'>{displayCurrencyToPKR(product.price)}</div>
                      <p>Quantity: {product.quantity}</p>
                    </div>
                     </div>
                    </div>
                  ))
                }
              </div>
                <div className='flex flex-col  gap-4 p-2 min-w-[300px]'>
                                {/* payment details  */}
              <div>
                <div className='text-lg font-medium '> Payment Details</div>
                <p className=' ml-1 '>payment method: {item.paymentDetails.payment_method_types[0]}</p>
                <p className=' ml-1 '>payment status: {item.paymentDetails.payment_status}</p>

              </div>

              {/* Shipping Details  */}
              <div>
                <div className='text-lg font-medium '>Shipping Details</div>
                {
                  item?.shipping_options.map((shipping, index)=>(
                    <div key={index} className=' ml-1 '>
                      Shipping Amount: {shipping?.shipping_amount}
                    </div>
                  ))
                }
              </div>
                </div>
                </div>
                
              {/* total amount  */}
              <div className='font-semibold ml-auto w-fit lg:text-lg'>
                Total Amount : {displayCurrencyToPKR(item?.amount_total)}
              </div>
              </div>
            </div>
          ))

      }
      </div>
    </div>
  )
}

export default Order