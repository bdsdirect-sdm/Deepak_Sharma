import  {Request, Response} from "express"
import jwt from "jsonwebtoken"
import UserDetail from "../models/userDetail"
import Hobbies from "../models/hobbiesModel"
import {generateRandomCode} from "../utilities/generateRandomCode"
import { sendMail } from "../config/mailConnect"
import bcrypt   from "bcrypt"
import { passwordToHassed } from "../utilities/hassedPassword"
import { welcomeEmail } from "../emailTemplates/welcomeEmail"

interface payloadInterface{
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    phoneNo:string,
    gender:string,
    user_type:string,
    agency?:string,
    resume?:string,
    isActive:boolean
}


export const userSignup = async(req:any, res:Response) => {
    try{

        const {firstName, lastName,email,phoneNo, gender, user_type,hobbies,isActive = false} = req.body;  
        
        const password = generateRandomCode(8);
        console.log("passwordpassword",password)

        const  hashedPassword = await passwordToHassed(password);


        let payload : payloadInterface  = {firstName,lastName,email,phoneNo,gender,user_type,password : hashedPassword,isActive};

        if(user_type === "Job_Seeker"){
            const {agency} =  req.body;
            payload.agency = agency;
            const {resume} = req?.files;
            const resumePath = resume.path;
            payload.resume = resumePath 
        }

        // const existUser = await UserDetail.findOne({where:{email:email}});

        // if(existUser){  
        //     res.status(409).json({
        //         message:"User Already exist",
        //         success:false
        //     })
        //     return;
        // }
        
        const  userDetail : any = await UserDetail.create(payload as any);
        console.log("cretateuser")

        const insertAllHobbies:any = hobbies?.map((hobbi : string) =>Hobbies.create({
            hobbi,
            userId:userDetail?.id
        }))
        const hobbiDetail:any =await Promise.all(insertAllHobbies);




        if(!userDetail  ||  !hobbiDetail){
            res.status(500).json({
                message:"Failed to create user",
                success:false
            })
        }


        await sendMail(email,"Welcome Message",welcomeEmail(user_type,firstName+" "+lastName))


        res.status(200).json({
            success:true,
            message:"Successfully created user", 
            userDetail,
            hobbiDetail
        })

    } catch(error){
        res.status(500).json({
            message:"problem in creating user profile",
            success:false
        })
        console.log(error)
    }
}

export const getAllAgencies = async (req:any, res:Response) => {
    try{
        const allAgencies = await UserDetail.findAll({
            where:{
                user_type:"Agency",
                isActive:true
            }
        })

        res.status(200).json({
            success:true,
            data:allAgencies
        })
        return;
    } catch(error:any){
        res.status(500).json({
            error:error.message,
            message:"problem in getting all agencies",
            success:false
        })
    }
}

// export const userProfile = async(req:any, res:Response) =>{

//     try{
//         const  userId = req?.params?.id;
//         console.log('params', req?.params);
//         console.log('userId', userId);

//         const userFullDetails : any = await UserDetail.findOne({where:{id :userId},
//             include:[{model:AddressDetail, as : "user_address"}]
//         })

//         // const userFullDetails = await UserDetail.findByPk(userId);
//         // console.log(userFullDetails,"userDetailsbeforev:::::::")

//         // Object.keys(userFullDetails.user_address).forEach((key) =>{
//         //     userFullDetails[key] =  userFullDetails.user_address[key];
//         // }

//         if(!userFullDetails){
//             res.status(404).json({
//                 message:"User not found",
//                 success:false
//             })
//             return;
//         }

//         res.status(200).json({
//             message:"User Data",
//             success:true,
//             userFullDetails
//         })
//     }
//     catch(error){
//         res.status(500).json({
//             success:false,
//             message:"Unable to fetch details"
//         })
//     }   
// }



export const userLogin = async(req : Request,res : Response) =>{
    try{
        const {email  , password } = req.body;
        if(!email || !password){
            res.status(404).json({
                message:"Details is incomplete",
                success:false
            })
            return;
        }

        const user: any = await UserDetail.findOne({where:{
            email:email,
        }})

        if(!user){
            res.status(404).json({
                message:"User is not exsist please Register",
                success:false
            })
            return;
        }

        if(!await bcrypt.compare(password,user.password)){
            res.status(409).json({
                success:false,
                message:"user login successfullly"
            })
        }
    
        const payload = {
            userId:user.id,
            email,
            isActive:user.isActive
        }

        const token = await jwt.sign(payload, process.env.SECREAT_KEY as string, {
            expiresIn:"1h"
        })

        user.password = undefined;

        res.status(200).json({
            message:"token generate succesfully",
            token,
            user,
        })
        
    } catch(error){
        res.status(500).json({
            message:error
            
        })
        console.log(error)
    }

}

export const updatePassword = async (req:any, res:Response) => {
    try{
        const {email, password} = req.user;

        const hashedPassword = passwordToHassed(password);

        const result = await UserDetail.update({password:hashedPassword, isActive:true},{
            where:{email:email}
        })

        res.status(200).json({
            success:true,
            message:"password updated succesfully"
        })

    } catch(error){
        res.status(500).json({
            message:error,
            success:false,

        })
    }
}


// export const updateProfile  = async(req:any, res:Response) => {
//     try{
//         const id = req.params?.id;
//         const {firstName, lastName,email
//             ,companyAddress, companyCity
//             , companyState , companyZip, homeAddress, homeCity, homeState, homeZip
//         } = req.body;

//         const {profile_image, appointment_letter} = req?.files;



//         if(!firstName || !lastName || !email 
//             || !companyAddress || !companyCity 
//             || !companyState || !companyZip || !homeAddress|| !homeCity || !homeState || !homeZip
//         ){
//             res.status(400).json({
//                 message:"Please fill all the fields",
//                 success:false
//             })
//             return;
//         } 

//         const updated_user  = await UserDetail.update({
//             firstName, lastName,email,
//             profile_image:profile_image[0].path , appoinment_letter:appointment_letter[0].path   
//         },{
//             where:{
//                 id :  id
//             }
//         })

//         const updated_address = await AddressDetail.update({
//             companyAddress, companyCity, 
//             companyState , companyZip, homeAddress, homeCity, homeState, homeZip

//         },{
//             where:{
//                 userId :  id
//             }
//         })

//         if(!updated_user ||  !updated_address){
//             res.status(400).json({
//                 message:"unable to update data",
//                 success:false           
//             })
//             return;
//         }
//         // await fetchUser.save();

//         // res.status(200).json({
//         //     success:true,
//         //     message:"Update value successfull"
//         // })
//         // return;

//         res.status(200).json({
//             success:true,
//             message:"Successfully Updated"
//         })

        

//     } catch(error){
//         res.status(500).json({
//             success:false,
//             message:"Unable to update details"
//         })      
//     }
// }