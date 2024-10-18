import {Router} from "express"

import {createPostValidator} from "../validators/createUserValidation"
import { getAllAgencies, getMyAgency, updatePassword, userLogin, userSignup,getAllSeekers, setAgaencyStatus } from "../controllers/userController"
import imagaeuploader from "../middlewares/multer.middlerware"
import { auth } from "../middlewares/authMiddleware"
import { getAllMessages } from "../controllers/messageController"

const userRoute  = Router()

userRoute.post('/signup',imagaeuploader.fields([{name:"profile_image", maxCount: 1}, {name:"resume" , maxCount:1}]),createPostValidator, userSignup)
userRoute.post("/login",userLogin)
userRoute.get("/getAllAgency", getAllAgencies)
userRoute.put("/updatePassword",auth,updatePassword)
userRoute.get("/getMyAgency",auth,getMyAgency)
userRoute.get("/getAllSeekers",auth, getAllSeekers)
userRoute.put("/setAgaencyStatus/:id",setAgaencyStatus)
userRoute.get("/getMessages/:roomid",getAllMessages)



export default userRoute;
