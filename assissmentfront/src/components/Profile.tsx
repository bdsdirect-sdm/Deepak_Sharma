import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const navigate = useNavigate();
    const  [profile, setProfile] = React.useState<any>(null);
    const location = useLocation(); 
    let id : any = location.pathname.split("/");
    id =  id[id.length - 1];
    console.log(id);

    async  function getProfileData(){
        try{
            console.log("sdfhiodfvghuiodfj")
            const response:any  = await axios.get(`http://localhost:3001/user/profile/${id}`)

            console.log("data full image",response?.data?.userFullDetails)

            setProfile(response?.data?.userFullDetails);
            toast.success("Data fetch successfully")
        } catch(err){
            console.log(err);
            toast.error("error unable to fecth data");

        }
    }

    useEffect(()=>{
        getProfileData();
    },[]);


  return (
    !profile ? (<div>loading</div>) : (<>
        <div  className=" flex flex-col w-[100%] h-screen ">
            <div className=' my-auto mx-auto  w-[60%]'>
                <div className='flex flex-row mx-auto justify-between'>
                    <div>
                        <div className=' text-5xl font-bold font-serif'>
                        {profile.firstName + " "}<span className=' text-blue-600'>{profile?.lastName}</span>
                        </div>
                        <div className=' text-[18px] text-gray-600'>
                            {profile.email}
                        </div>
                    </div>

                    <div>
                        <img src={`http://localhost:3001/${profile.profile_image}`} className='relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0 rounded-full animate-pulse' alt='profile'/>
                    </div>
                </div>
                <div className='flex flex-col text-start'>
                    <div className=' text-3xl font-semibold font-serif'>Address</div>
                    <div className=' text-[14px] text-gray-600'>{profile?.user_address.companyAddress}</div>
                    <div className=' text-[14px] text-gray-600'>{profile?.user_address.companyCity}</div>
                    <div  className=' text-[14px] text-gray-600'>
                        {profile?.user_address.companyZip}
                    </div>
                </div>
                

                <button onClick={()=>{navigate(`/update/${id}`)}} className='w-[70%] bg-blue-600 text-white font-semibold text-xl my-1 rounded-xl  py-1 hover:scale-90 transition-all duration-100'>Update Profile</button>
            </div>
        </div>
    </>)
  )
}

export default Profile