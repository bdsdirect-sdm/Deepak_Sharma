import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useLogout } from '../services/operations/userAPI'

const AgencyDeshboard = () => {
    const [status, setStatus] = useState("")
    const dispatch = useDispatch()
    const {token,user} = useSelector((state:any) => state.user);
    const  navigate = useNavigate()
    const logout = useLogout(dispatch,navigate)
    // console.log(token,"token comming from redux")
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

    const joinChatHandler =(seekerId:string) =>{
        const roomid = (user.id).toString() + (seekerId).toString()
        navigate(`/chatbox/${roomid}`)
    }


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
                    <div className='flex flex-row gap-5'>
                        <img 
                            src={`http://localhost:4400/${seeker.profile_image}`} 
                            alt={`${seeker.name}'s profile`} 
                            className="w-24 h-24 rounded-full mb-4 object-cover"
                        />
                       <div className='flex flex-col items-start'>
                            <h2 className="text-lg font-semibold">{seeker.firstName + " "+ seeker.lastName}</h2>
                            <p className="text-gray-600">{seeker.email}</p>
                            <p className="text-gray-600">{seeker.phoneNo}</p>
                            <p>Application Staus: {seeker.satus}</p>
                            <div className='flex flex-row'>
                            <a href={`http://localhost:4400/${seeker.resume}`} download className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-fit'>Download CV</a>

                            {
                                seeker.status === "approved" ? (<button className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-fit' onClick={()=>joinChatHandler(seeker.id)}>Join Chat</button>) : 
                                seeker.status === "pending" ? (<button onClick={() =>setStatus("approved")}>Confirm</button>) : (null)
                            }
                            </div>
                       </div>
                        </div>
                    </div>
                ))}

                    <button type='button'
                        onClick={() =>logout()}
                            
                        className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-6 w-fit mx-auto'>
		                Logout
		        </button>
            </div>
        </div>
  )
}

export default AgencyDeshboard;