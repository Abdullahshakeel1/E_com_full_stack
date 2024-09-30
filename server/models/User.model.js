import mongoose from "mongoose";
const UserSchema = new  mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
        required:true,
      
    },
    password:String,
    profilePic :String,
    role: String,
},
    { timestamps: true }

)
export const User = mongoose.model('User', UserSchema)