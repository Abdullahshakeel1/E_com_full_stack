import mongoose from "mongoose";

// Connect to MongoDB
export const Db = async () => {
try {
    const db = await mongoose.connect(process.env.DB_CONECTION)
    if(db){
        console.log("Connected to MongoDB")
    }
} catch (error) {
    console.log(error)
}}