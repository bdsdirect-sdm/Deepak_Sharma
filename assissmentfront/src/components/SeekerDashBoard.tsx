import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
    
    const SeekerDashBoard = () => {
        const navigate = useNavigate()
        const {data, isLoading, isError,error} = useQuery({
            queryKey: ['seekerDashBoard'],
            queryFn: async () => {
                const response = await axios.get(`http://localhost:4400/api/v1/getMyAgency`,{
                    headers:{
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                return response.data;
            }
        })
        
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
	                    {data.firstName && (
	                        <>
	                            Your Agency Name : {data.firstName}<br/>
	                            Email : {data.email} <br/> 
	                            Phone : {data.phone}
	                        </>
                        )}
                    </div>

		            {/* Profile Image Section */}
		            {
		                data.profile_image &&
		                (<img src={`http://localhost:4400/${data.profile_image}`} alt='Profile' width={150} height={150} className='rounded-full object-cover w-auto mx-auto'/>)
		            }

		        </section>


		        {/* Action Button Section */}

		        <button type='button'
		            onClick={() => navigate("/login")}
		            className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-6'>
		            logout
		        </button>

		    </main>	
	    </>
      )
    }
    
    export default SeekerDashBoard