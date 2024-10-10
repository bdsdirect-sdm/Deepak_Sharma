import { NextFunction, Request, Response } from "express";
import multer from "multer";
import fs from "node:fs";
import {v4 as uuidv4} from "uuid"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = "upload"
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
            
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const filenaam = uuidv4() + "." + file.originalname;
        console.log(filenaam,"File Name>>.")
        cb(null, filenaam );
    }
})


const imagaeuploader = multer({
    storage:storage,
    fileFilter:(req, file, cb) =>{
        // console.log(req,"reqLLLLLLLLLLLLLLLLL");
        console.log(req.file,"body")
        if(!file){
            return cb(new Error("file is missing"))
        }
        if(file.fieldname == "profile_image"){
            if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"  ||  file.mimetype === "image/jpg"){
                cb(null , true);
            }
            else{
                cb(new Error("only png jpeg  jpg file is allowed"))
            }
        }
        else if(file.fieldname == "appointment_letter"){
            if(file.mimetype === "application/pdf"){
                cb(null , true);
            }
            else{
                cb(new Error("only pdf file is allowed"));
            }
        }
        else{
            cb(new Error("file should be in not found"))
        }
    }
})


// export const errorHandler = (err:any, req:Request, res:Response, next:NextFunction)=>{
//     if(err instanceof multer.MulterError){
//         res.status(400).json({message:err.message});
//         return;
//     }
//     else if(err){
//         console.log(err,"::::::::::::::::::::::::::::::::::::::::::::,err")
//         res.status(400).json({message:err.message})
//         return;
//     }
//     else{
//         next();
//     }
// }

export default  imagaeuploader;