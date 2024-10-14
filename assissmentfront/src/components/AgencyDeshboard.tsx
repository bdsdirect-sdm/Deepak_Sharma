import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AgencyDeshboard = () => {
    const {token} = useSelector((state:any) => state.user);
    // console.log(token,"token comming from redux")
    const  navigate = useNavigate()
    const {data, isLoading} = useQuery({
        queryKey: ['agency'],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:4400/api/v1/getAllSeekers`,{
                headers: {
                    'Authorization': `Bearer ${token} `
                }
            })
            return response.data;
        }
    })

    if(isLoading){
        return  <div>Loading...</div>
    }
    console.log(data);
  return (
    <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Job Seekers for Your Agency</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.sekeers.map((seeker:any, i:any) => (
                    <div key={i} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
                        <img 
                            src={`http://localhost:4400/${seeker.profile_image}`} 
                            alt={`${seeker.name}'s profile`} 
                            className="w-24 h-24 rounded-full mb-4 object-cover"
                        />
                        <h2 className="text-lg font-semibold">{seeker.name}</h2>
                        <p className="text-gray-600">{seeker.email}</p>
                        <p className="text-gray-600">{seeker.phoneNo}</p>
                    </div>
                ))}

                    <button type='button'
                        onClick={() => {
                            localStorage.clear();
                            navigate("/login")}
                        }
                            
                        className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-6'>
		                Logout
		        </button>
            </div>
        </div>
  )
}

export default AgencyDeshboard;