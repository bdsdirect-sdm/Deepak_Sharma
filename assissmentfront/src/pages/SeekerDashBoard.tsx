import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLogout } from '../services/operations/userAPI'
import { UseDispatch } from 'react-redux'
    
    const SeekerDashBoard = () => {
        const dispatch  = useDispatch()
        const navigate = useNavigate()
        const {token} = useSelector((state: any) =>state.user)
        const {user} = useSelector((state: any) =>state.user)

        const {data, isLoading, isError,error} = useQuery({
            queryKey: ['seekerDashBoard'],
            queryFn: async () => {
                const response = await axios.get(`http://localhost:4400/api/v1/getMyAgency`,{
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                })
                return response.data;
            }
        })
        const logout = useLogout(dispatch,navigate);

        const joinChatHandler = () =>{
            const roomid = (data.agency.id).toString()+(user.id).toString();
            navigate(`/chatbox/${roomid}`)
        }

        if(isLoading){
            return (
                <div className="text-rose-950 text-xl mt-10">
                    <h1>Loading...</h1>
                </div>
            );
        }
        
        if (isError || !data) {
            return (
                <div className="text-red-500 text-xl mt-10">
                    Error fetching data: {error?.message}
                </div>
            );
        }
        
      return (
        <>
	        {/* Main Content Area */}
	        <main className="max-w-screen-lg mx-auto pt-12 pb-8 sm:p-8">
	            {/* Header Section */}
	            <section className="bg-white shadow-md rounded-lg mb-12 p-6 flex items-center justify-between">
	                <div>
	                    <span className="text-xl font-bold">Your Agency Dashboard</span><br />
	                    {data.agency.firstName && (
	                        <>
	                            Agency : {data.agency.firstName}<br/>
	                            Email : {data.agency.email} <br/> 
	                            Phone : {data.agency.phoneNo}  <br/>
                                Your Application Status: {user.status}
	                        </>
                        )}
                    </div>

		            {/* Profile Image Section */}
		            {
		                data.agency.profile_image &&
		                (<img src={`http://localhost:4400/${data.agency.profile_image}`} alt='Profile'  className='rounded-full object-cover w-[30%] mx-auto'/>)
		            }
                    {
                                user.status === "approved" ? (<button className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-fit' onClick={()=>joinChatHandler()}>Join Chat</button>) : 
                                user.status === "pending" ? (<div className=' gap-2'>
                                    wait  for approval
                                </div>) : (<p className=' text-red-600 font-semibold'>Denied</p>)
                            }
                    

		        </section>


		        {/* Action Button Section */}

		        <button type='button'
		            onClick={() => logout()}
		            className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-6'>
		            logout
		        </button>
            

		    </main>	
	    </>
      )
    }
    
    export default SeekerDashBoard