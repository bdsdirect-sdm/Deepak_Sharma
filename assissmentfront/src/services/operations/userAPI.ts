import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { setUserType,setToken } from "../../Slices/userSlice"
import { toast } from "react-toastify"



export const useLoginContext = (dispatch:any,navigate:any) =>{

    return(
         useMutation({
            mutationFn : async(data) =>{
                return await axios.post("http://localhost:4400/api/v1/login",data)
            },
            onSuccess : (data) =>{
                localStorage.setItem("token",JSON.stringify(data.data.token))
                localStorage.setItem("user_type",JSON.stringify(data?.data?.user?.user_type))
                dispatch(setToken(data.data.token))
                dispatch(setUserType(data.data.user.user_type))
                navigate("/dashboard")
            }
        })
    )
}

export const useResisterContext = (navigate:any) => {
    return (
        useMutation({
            mutationFn: async (data) => {
                return await axios.post(  "http://localhost:4400/api/v1/signup", data)
            },
            onSuccess:(data) =>{
                localStorage.clear();
                navigate("/login")
            }
        })
        
    )
}