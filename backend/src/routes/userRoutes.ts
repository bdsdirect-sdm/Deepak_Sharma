import {Router} from "express"

import {createPostValidator} from "../validators/signupValidation"
import { userSignup } from "../controllers/userController"

const userRoute  = Router()

userRoute.get('/signup', userSignup)

export default userRoute;
