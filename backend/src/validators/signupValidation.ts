import { Request, Response, NextFunction } from "express";
import {check} from "express-validator"
import {validateUser} from "../middlewares/feildValidator"
export  const createPostValidator = [
    check("firstName")
        .not()
        .isEmpty()
        .withMessage("First Name is required"),

    check("lastName")
        .not()
        .isEmpty()
        .withMessage("Last Name is required"),

    check("email")
        .not()
        .isEmpty()
        .withMessage("Email is empty")
        .isEmail()
        .withMessage("Email is required"),

    check("companyAddress")
        .not()
        .isEmpty()
        .withMessage("Comapny Address is required"),
    
    check("companyCity")
        .not()
        .isEmpty()
        .withMessage("Company City is required"),

    check("companyState")
        .not()
        .isEmpty()
        .withMessage("Company State is required"),

    check("CompanyZip")
        .not()
        .isEmpty()
        .withMessage("Company Zip is required"),

    check("homeAddress")
        .not()
        .isEmpty()
        .withMessage("Home Address is required"),

    check("homeCity")
        .not()
        .isEmpty()
        .withMessage("Home City is required"),

    check("homeState")
        .not()
        .isEmpty()
        .withMessage("Home State is required"),
    
    check("homeZip")
        .not()
        .isEmpty()
        .withMessage("Home Zip is required"),


    (req:Request, res:Response, next:NextFunction) =>{
        validateUser(req, res, next);
    }
];

