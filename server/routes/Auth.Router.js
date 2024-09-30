import { Router } from "express";
import { getAllUsers, loginAuthController, logoutController, siginupAuthController, updateUser, userDetails } from "../controllers/AuthController.js";
import { isUserAuthenticate } from "../middleware/auth.middleware.js";
export const AuthRoute = Router();
AuthRoute.post("/signup",siginupAuthController)
AuthRoute.post("/login",loginAuthController)
AuthRoute.get("/logout",logoutController)
AuthRoute.get("/user-details",isUserAuthenticate,userDetails)
AuthRoute.get("/all-user",isUserAuthenticate,getAllUsers)
AuthRoute.post("/update-user-role",isUserAuthenticate,updateUser)




