import mongoose from "mongoose";
const ProductSchema = new  mongoose.Schema(
    {
        productName:String,
        brandName:String,
        category:String,
        productImage:[],
        description:String,
        price:Number,
        sellingPrice:Number,
      }
,
    { timestamps: true }

)
export const Product = mongoose.model('Product', ProductSchema)