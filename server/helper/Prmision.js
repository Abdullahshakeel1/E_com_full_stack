import { User } from "../models/User.model.js"

export const uploadPrermissions =async (userId)=>{
const user = await User.findById(userId)
if(user.role === "ADMIN"){
    return true
}
return false
}