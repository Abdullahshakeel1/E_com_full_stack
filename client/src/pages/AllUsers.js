import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SummaryApi } from '../common';
import moment from 'moment';
import { FaPen } from "react-icons/fa";
import ChangingUserRole from '../component/ChangingUserRole';

const AllUsers = () => {
    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(null); // State for error
    const [openUpdateRole, setopenUpdateRole] = useState(false); 
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email:"",
        name:"",
        role:"",
        _id:"",
    });


    const allUserData = async () => {
        try {
            const { data } = await axios.get(SummaryApi.allUsers.url, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (data.success) {
                setUsersData(data.users || []); // Assuming `data.users` contains the array of users
            } else {
                setError(data.message || "Failed to fetch data");
            }
        } catch (error) {
            setError(error.message || "An error occurred");
        } finally {
            setLoading(false); // Set loading to false after request completes
        }
    };

    useEffect(() => {
        allUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Error state
    }

    return (
        <div className='bg-white p-4'>
            <table className='w-full usertable'>
              <thead>
               <tr className='bg-zinc-800 text-white '>
               <th>Sr.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>role</th>
                  <th>created Date</th>
                  <th>Actions</th>
               </tr>

              </thead>
              <tbody className='text-center'>
                {usersData.map((user, index) => (
                    <tr key={user._id} className='text-center'>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{moment(user.createdAt).format("LL")}</td>
                    <td>
                      <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                      onClick={()=>{
                        setUpdateUserDetails(user)
                        setopenUpdateRole(true)
                        
                        }}>
                        <FaPen /></button>
                    </td>

                  </tr>
                ))}
                
              </tbody>
            </table>
            {
                openUpdateRole&&(
                    <ChangingUserRole onClose={()=>setopenUpdateRole(false)}
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    UserId={updateUserDetails._id}
                    relod ={allUserData}


                    />
                )
            }
    
        </div>
    );
};

export default AllUsers;
