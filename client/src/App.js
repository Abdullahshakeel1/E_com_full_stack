import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './component/Header'
import Footer from './component/Footer'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { SummaryApi } from './common';
import { AuthContext } from './context/authContext';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

const App = () => {
  const [cartProductCount, setCartProductCount] = useState(0)
  const [isAuthenticated, setIsAuthenticated] = useState(false); // New state for authentication status
  const dispatch = useDispatch()

  const userDetails = async () => {
    try {
      
      const { data } = await axios.get(SummaryApi.currentUser.url, {
        method: SummaryApi.currentUser.method,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        },
      })
      if (data?.success) {
        dispatch(setUserDetails(data?.data))
        setIsAuthenticated(true); // Set authentication status
      }
    } catch (error) {
      setIsAuthenticated(false); // User is not authenticated
    }
  }

  const fetchUSerAddtoCart = async () => {
    try {
      const { data } = await axios.get(SummaryApi.CountAddTocartProduct.url, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        },
      })
      if (data?.success) {
        setCartProductCount(data?.data?.count)
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("User is not authorized");
      }
    }
  }

  useEffect(() => {
    userDetails();
  }, [])

  useEffect(() => {
    if (isAuthenticated) { // Only fetch cart details if authenticated
      fetchUSerAddtoCart();
    }
  }, [isAuthenticated])

  return (
    <>
      <AuthContext.Provider value={{ userDetails, cartProductCount, fetchUSerAddtoCart }}>
        <ToastContainer position='top-center' />
        <Header />
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet />
        </main>
        <Footer />
      </AuthContext.Provider>
    </>
  )
}

export default App
