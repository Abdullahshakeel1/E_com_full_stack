import React, { useContext, useState } from 'react';
import loginIcon from "../assest/signin.gif";
import { FaRegEye } from "react-icons/fa";
import { BsEyeSlashFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import { SummaryApi } from '../common';
import { AuthContext } from '../context/authContext';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { userDetails, fetchUSerAddtoCart } = useContext(AuthContext);
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(SummaryApi.LOGIN.url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (response?.data?.success) {
        toast.success(response.data.message || "Login Successful!");
        navigate("/");
        userDetails();
        fetchUSerAddtoCart();
      }
    } catch (error) {
      // Handling different types of errors
      if (error.response && error.response.status === 401) {
        toast.error("Invalid email or password. Please try again.");
      } else if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <section id='login'>
      <div className='mx-auto container p-4'>
        <div className='bg-white w-full max-w-sm mx-auto rounded-md p-5 py-7'>
          <div className='w-20 h-20 mx-auto'>
            <img className='rounded-full overflow-hidden' src={loginIcon} alt="login icon" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className='grid'>
              <label className='text-md pt-2'>Email:</label>
              <div className='bg-slate-200 p-2 rounded-lg'>
                <input
                  className='w-full h-full outline-none bg-transparent'
                  name='email'
                  value={data.email}
                  type="email"  // Changed to email input type for validation
                  placeholder='Enter Email'
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className='grid'>
              <label className='text-md pt-2'>Password:</label>
              <div className='bg-slate-200 p-2 flex rounded-lg'>
                <input
                  className='w-full h-full outline-none bg-transparent'
                  name='password'
                  value={data.password}
                  type={showPassword ? "text" : "password"}
                  placeholder='Enter Password'
                  onChange={handleChange}
                  required
                />
                <div className='cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaRegEye /> : <BsEyeSlashFill />}
                </div>
              </div>
              <Link to={"/forgot-password"} className='block w-fit ml-auto hover:underline hover:text-red-600 text-xs mt-2 font-semibold'>Forgot Password</Link>
              <button
                className='bg-red-500 text-white px-6 py-2 w-full max-w-[150px] hover:bg-red-600 font-semibold rounded-full hover:scale-110 transition-all mx-auto block mt-6'
              >
                Login
              </button>
              <div className='mt-5 text-sm'>
                <span className='text-red-300'>Don't have an account?</span>
                <Link to={"/sign-up"} className='hover:underline hover:text-red-500 cursor-pointer font-semibold'>Sign Up</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
