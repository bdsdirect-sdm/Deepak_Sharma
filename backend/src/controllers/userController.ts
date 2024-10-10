import {Request, Response} from "express"
import jwt from "jsonwebtoken"
import UserDetail from "../models/userDetail"
import AddressDetail from "../models/addressModel"


export const userSignup = async(req:any, res:Response) => {
    try{

        const {firstName, lastName,email,companyAddress, companyCity
            , companyState , companyZip, homeAddress, homeCity, homeState, homeZip
        } = req.body;

        console.log(firstName,lastName,email,companyAddress)

        if(!firstName || !lastName || !email || !companyAddress || !companyCity 
            || !companyState || !companyZip || !homeAddress|| !homeCity || !homeState || !homeZip
        ){
            res.status(400).json({
                message:"Please fill all the fields",
                success:false
            })
            return;
        }

        const existUser = await UserDetail.findOne({where:{email:email}});
        // console.log("yah tak ayaaa")

        if(existUser){
            res.status(401).json({
                message:"User Already exist",
                success:false
            })
            return;
        }


        const {profile_image, appointment_letter} = req?.files;


        if(!profile_image || !appointment_letter){
            res.status(400).json({
                message:"Please upload profile image and appoinment letter",
            })
            return;
        }
        
        const  userDetail : any = await UserDetail.create({
            firstName,
            lastName,
            email,
            profile_image: profile_image?.[0].path,
            appointment_letter: appointment_letter?.[0].path,
        })

        const userAddress = await AddressDetail.create({
            companyAddress,
            companyCity,
            companyState,
            companyZip,
            homeAddress,
            homeCity,
            homeState,
            homeZip,
            userId:userDetail?.id

        })

        if(!userDetail || ! userAddress){
            res.status(400).json({
                message:"Failed to create user",
                success:false
            })
            return;
        }

        res.status(200).json({
            success:true,
            message:"Successfully created user", 
            userDetail,
            userAddress
        })

        // const {firstName, lastName, email,password} = req.body;
        // // checking that user is already exist or not
        // const exsistUser = await UserDetail.findOne({where:{
        //     email:email
        // }})

        // if(exsistUser){
        //     res.status(400).json({
        //         message:"User is already exist",
        //         success:false
        //     })
        //     return;
        // }
        
        // const hashedPassword = await bcrypt.hash(password,10);
        // // password = hashedPassword;
        // console.log(hashedPassword);
        // const newUser = await UserDetail.create({firstName, lastName,email,password:hashedPassword});

        // if(newUser){
        //     res.status(200).json({
        //         success:true,
        //         message:"User Registered Successfullly"
        //     })
        //     return;
        // }
        // else{
        //     res.status(400).json({
        //         success:false,
        //         messagge:"problem in creating user"
        //     })
        // }


    } catch(error){
        res.status(500).json({
            message:"problem in creating user profile",
            success:false
        })
        console.log(error)
    }
}

export const userProfile = async(req:any, res:Response) =>{

    try{
        const  userId = req?.params?.id;
        console.log('params', req?.params);
        console.log('userId', userId);

        const userFullDetails : any = await UserDetail.findOne({where:{id :userId},
            include:[{model:AddressDetail, as : "user_address"}]
        })

        // const userFullDetails = await UserDetail.findByPk(userId);
        // console.log(userFullDetails,"userDetailsbeforev:::::::")

        // Object.keys(userFullDetails.user_address).forEach((key) =>{
        //     userFullDetails[key] =  userFullDetails.user_address[key];
        // }

        if(!userFullDetails){
            res.status(404).json({
                message:"User not found",
                success:false
            })
            return;
        }

        res.status(200).json({
            message:"User Data",
            success:true,
            userFullDetails
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Unable to fetch details"
        })
    }   
}



// export const userLogin = async(req : Request,res : Response) =>{
//     try{ ;
//         const {email  , password } = req.body;
//         if(!email || !password){
//             res.status(404).json({
//                 message:"Details is incomplete",
//                 success:false
//             })
//             return;
//         }

//         const user: any = await UserDetail.findOne({where:{
//             email:email,
//         }})

//         if(!user){
//             res.status(404).json({
//                 message:"User is not exit please Register first",
//                 success:false
//             })
//             return;
//         }

//         if(!await bcrypt.compare(password,user.password)){
//             res.status(409).json({
//                 success:false,
//                 message:"user login successfullly"
//             })
//         }
    
//         const payload = {
//             userId:user.id,
//             email
//         }

//         const token = await jwt.sign(payload, process.env.SECREAT_KEY as string, {
//             expiresIn:"1h"
//         })

//         res.status(200).json({
//             user,
//             token,
//             message:"token generate succesfully"
//         })
        
//     } catch(error){
//         res.status(500).json({
//             message:error
            
//         })
//         console.log(error)
//     }

// }



export const updateProfile  = async(req:any, res:Response) => {
    try{
        const id = req.params?.id;
        const {firstName, lastName,email
            ,companyAddress, companyCity
            , companyState , companyZip, homeAddress, homeCity, homeState, homeZip
        } = req.body;

        const {profile_image, appointment_letter} = req?.files;



        if(!firstName || !lastName || !email 
            || !companyAddress || !companyCity 
            || !companyState || !companyZip || !homeAddress|| !homeCity || !homeState || !homeZip
        ){
            res.status(400).json({
                message:"Please fill all the fields",
                success:false
            })
            return;
        } 

        const updated_user  = await UserDetail.update({
            firstName, lastName,email,
            profile_image:profile_image[0].path , appoinment_letter:appointment_letter[0].path   
        },{
            where:{
                id :  id
            }
        })

        const updated_address = await AddressDetail.update({
            companyAddress, companyCity, 
            companyState , companyZip, homeAddress, homeCity, homeState, homeZip

        },{
            where:{
                userId :  id
            }
        })

        if(!updated_user ||  !updated_address){
            res.status(400).json({
                message:"unable to update data",
                success:false           
            })
            return;
        }
        // await fetchUser.save();

        // res.status(200).json({
        //     success:true,
        //     message:"Update value successfull"
        // })
        // return;

        res.status(200).json({
            success:true,
            message:"Successfully Updated"
        })

        

    } catch(error){
        res.status(500).json({
            success:false,
            message:"Unable to update details"
        })      
    }
}