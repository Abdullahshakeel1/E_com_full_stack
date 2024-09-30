import mongoose from "mongoose";
const AddToCart = new  mongoose.Schema(
    {
        productId : {
            ref : "Product",
            type : String,
        },
       quantity :Number,
       userId :String,
      }
,
    { timestamps: true }

)
export const CART = mongoose.model('CART', AddToCart)