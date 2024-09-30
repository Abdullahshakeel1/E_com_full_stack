import React, { useState } from 'react';
import loginIcon from "../assest/signin.gif";
import { FaRegEye } from "react-icons/fa";
import { BsEyeSlashFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { imageToBase64 } from '../helper/imageToBase64';
import axios from "axios";
import { SummaryApi } from '../common';
import { toast } from 'react-toastify';

const SiginUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfrimPassword, setConfrimPassword] = useState(false);
    const navigate = useNavigate()
    const [value, setValue] = useState({
        name: "",
        email: '',
        password: '',
        confrim_password: "",
        profilePic: ""
    });

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
if(value.password === value.confrim_password){
                // Send POST request to the API
                const response = await axios.post(SummaryApi.SignUP.url, value, {
                    method: SummaryApi.SignUP.method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                  
                });
    
                // Check if the response was successful
                if (response.data.success) {
                    toast.success('Registration Successful');
                    setValue({ name: "", email: '', password: '', confrim_password: "", profilePic: "" });
                    e.target.reset();
                    navigate("/login")
                } else {
                    toast.error('Registration Failed');
                }
}else{
    toast.error('Passwords do not match');
}
        } catch (error) {
            toast.dark('An error occurred while registering.');
        }
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const imagePic = await imageToBase64(file);
            setValue({ ...value, profilePic: imagePic });
        }
    };

    return (
        <section id='SiginUp'>
            <div className='mx-auto container p-4'>
                <div className='bg-white w-full max-w-sm mx-auto rounded-md p-5 py-7'>
                    <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                        <div><img src={value.profilePic || loginIcon} alt="login icon" /></div>
                        <form>
                            <label>
                                <div className='text-xs bg-opacity-70 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>Upload image</div>
                                <input type="file" className='hidden' onChange={handleUpload} />
                            </label>
                        </form>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label className='text-md pt-2'>Name: </label>
                            <div className='bg-slate-200 p-2 rounded-lg'>
                                <input
                                    className='w-full h-full outline-none bg-transparent'
                                    name='name'
                                    value={value.name}
                                    type="text"
                                    placeholder='Enter Your Name'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className='grid'>
                            <label className='text-md pt-2'>Email: </label>
                            <div className='bg-slate-200 p-2 rounded-lg'>
                                <input
                                    className='w-full h-full outline-none bg-transparent'
                                    name='email'
                                    value={value.email}
                                    type="email"
                                    placeholder='Enter Email'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className='grid'>
                            <label className='text-md pt-2'>Password: </label>
                            <div className='bg-slate-200 p-2 flex rounded-lg'>
                                <input
                                    className='w-full h-full outline-none bg-transparent'
                                    name='password'
                                    value={value.password}
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Enter Password'
                                    onChange={handleChange}
                                    required
                                />
                                <div className='cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaRegEye /> : <BsEyeSlashFill />}
                                </div>
                            </div>
                        </div>
                        <div className='grid'>
                            <label className='text-md pt-2'>Confirm Password: </label>
                            <div className='bg-slate-200 p-2 flex rounded-lg'>
                                <input
                                    className='w-full h-full outline-none bg-transparent'
                                    name='confrim_password'
                                    value={value.confrim_password}
                                    type={showConfrimPassword ? "text" : "password"}
                                    placeholder='Confirm Password'
                                    onChange={handleChange}
                                    required
                                />
                                <div className='cursor-pointer' onClick={() => setConfrimPassword(!showConfrimPassword)}>
                                    {showConfrimPassword ? <FaRegEye /> : <BsEyeSlashFill />}
                                </div>
                            </div>
                        </div>
                        <button className='bg-red-500 text-white px-6 py-2 w-full max-w-[150px] hover:bg-red-600 font-semibold rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
                            Sign Up
                        </button>
                        <div className='mt-5 text-sm'>
                            <span className='text-red-300'>Already have an account? </span>
                            <Link to={"/login"} className='hover:underline hover:text-red-500 cursor-pointer font-semibold'>Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SiginUp;
