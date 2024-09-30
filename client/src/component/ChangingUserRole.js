import React, { useState } from 'react';
import { ROLE } from '../common/Role';
import { IoMdClose } from "react-icons/io";
import axios from 'axios';
import { SummaryApi } from '../common/index';
import { toast } from 'react-toastify';

const ChangingUserRole = ({ name, email, role, onClose ,UserId, relod}) => {
    const [userRole, setUserRole] = useState(role);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
 

    const updateUserRole = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(SummaryApi.updateUsers.url, 
                { 
                    UserId: UserId,
                    role: userRole , 
                }, 
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.success) {
               toast.success(response.data.message); // Log or handle success message
                onClose(); 
                relod()
            } else {
                setError(response.data.message || "Failed to update user role");
            }
        } catch (err) {
            setError(err.message || "An error occurred while updating the user role");
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = (e) => {
        setUserRole(e.target.value);
    };

    return (
        <div className='w-full top-0 left-0 bottom-0 right-0 h-full z-10 fixed flex justify-center items-center bg-slate-200 bg-opacity-70 '>
            <div className='mx-auto bg-white shadow-md p-4 max-w-sm w-full rounded-md'>
                <button className='ml-auto block' onClick={onClose}>
                    <IoMdClose />
                </button>
                <h1 className='pb-4 text-lg font-medium'>Changing User Role</h1>
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <div className='flex justify-between items-center my-4'>
                    <p>Role</p>
                    <select className='border px-4 py-1 rounded-md ' value={userRole} onChange={handleRoleChange}>
                        {
                            Object.values(ROLE).map(role => (
                                <option className=' ' value={role} key={role}>{role}</option>
                            ))
                        }
                    </select>
                </div>
                {error && <div className='text-red-500 mb-4'>{error}</div>}
                <button
                    onClick={updateUserRole}
                    className='w-fit mx-auto block py-1 px-3 rounded-full bg-red-500 text-white hover:bg-red-600'
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Change Role'}
                </button>
            </div>
        </div>
    );
};

export default ChangingUserRole;
