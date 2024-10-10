import {Router} from "express"

import {createPostValidator} from "../validators/createUserValidation"
import { getAllAgencies, userLogin, userSignup } from "../controllers/userController"
import imagaeuploader from "../middlewares/multer.middlerware"

const userRoute  = Router()

userRoute.post('/signup',imagaeuploader.single('resume'),createPostValidator, userSignup)
userRoute.get("/login",userLogin)
userRoute.get("/getAgency", getAllAgencies)
userRoute.put("/updatePassword", )


export default userRoute;
