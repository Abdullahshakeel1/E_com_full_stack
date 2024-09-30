import Jwt from "jsonwebtoken"
import { User } from "../models/User.model.js"

import bcrypt from 'bcrypt'

export const siginupAuthController = async(req, res)=>{
try {
    const {email, password}= req.body
  
    if(!email){
        return res.status(400).json({message: 'Please provide an email'})
    }
    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(400).json({message: 'Email already in use'})
    }

    if(!password){
        return res.status(400).json({message: 'Please provide a password'})
    }
    const genSalt = bcrypt.genSaltSync(10)
  
    const hashedPassword =  bcrypt.hashSync(password, genSalt)
    const paylod ={
       ...req.body,
       role:"GENERAL",
        password: hashedPassword}
    const user = new User(paylod)
   const saveUser= await user.save()
    res.status(201).json(
        {   data:saveUser,
            success:true,
            error:false,
            message: 'User created successfully'
        
        })

    
} catch (error) {
    res.status(500).json({
        message:  error.message || error ,
        error: true ,
        success: false

    })
}
}

export const loginAuthController = async(req, res)=>{
    try {
        const {email, password}= req.body
        
        if(!email){
            return res.status(400).json({message: 'Please provide an email'})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: 'Please provide a Valid email'})
           }
           const isMatch = await bcrypt.compareSync(password, user.password)

           if(!isMatch){
            return res.status(400).json({message: 'Incorrect password'})
           }
           const tokenData ={
            _id: user._id, 
            email: user.email
         } 
          const token = await Jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {expiresIn:60 * 60 *8})
          const tokenOptions ={
           httpOnly: true,
           secure: true,
           sameSite:"none"
          }
          res.cookie('token', token, tokenOptions)
          res.json({
            data:token,
            success:true,
            error:false,
            message: 'Logged in successfully',
        
        })
        
    } catch (error) {
        res.status(500).json({
            message:  error.message || error ,
            error: true ,
            success: false
        })
    }
}
export const userDetails= async (req, res) => {
    try {
        const user = await User.findById(req.userID)
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }
        res.json({
            data: user,
            success:true,
            error:false,
            message: 'User details retrieved successfully',
        
        })
        
    } catch (error) {
        res.status(400).json({
            message: "error getting user details",
            error: error || error.message,
            success: false
        })
    }
}

export const logoutController = async(req, res) => {
    try {
        const tokenOptions ={
            httpOnly: true,
            secure: true,
            sameSite:"none"
           }
        res.clearCookie('token',tokenOptions)
        res.json({
            data: [],
            success:true,
            error:false,
            message: 'User logged out successfully',
        
        })
        
    } catch (error) {
        res(400).json({
            message: "error logging out user",
            error: error || error.message,
            success: false
        })
    }
}
export const getAllUsers =async (req, res) => {
    try {
        console.log("getalluser", req.userID)
        const users = await User.find()
        res.status(200).json({
            message:"allusers find",
            error: false,
            users,
            success: true

        })
        
    } catch (error) {
        res(400).json({
            message: "error logging out user",
            error: error || error.message,
            success: false
        })  
    }
}
export const updateUser =async(req, res) => {
    try {
        const sessionUser =req.userID
        const {UserId,name, email, role}=req.body
        const payload ={
            ...(email && {email:email}),
            ...(name && {name:name}),
            ...(role && {role:role}),

        }
        const user = await User.findById(sessionUser)
        console.log("userRole===", user.role)
        const updateUser = await User.findByIdAndUpdate(UserId, payload)
        // if(!updateUser){
        //     return res.status(404).json({message: 'User not found'})
        // }
        res.status(200).json({
            message:"user updated",
            error: false,
            data: updateUser,
            success: true
        })
    } catch (error) {
        res(400).json({
            message: "error to update user",
            error: error || error.message,
            success: false
        }) 
    }
}

