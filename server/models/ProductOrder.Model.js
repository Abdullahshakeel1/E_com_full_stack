
import mongoose from "mongoose";
const ProductOrder = new  mongoose.Schema(
    {
        productDetails : {
            type : Array,
            default :[]
        },
       email :{
        type :String,
        default : "",
       },
       userId :{
        type :String,
        default : ""
       },
       paymentDetails : {
        paymentId:{
          type : String,
          default:""
        },
        payment_method_types : [],
        payment_status : {
         type : String
        }
       },
       shipping_options:[],
       amount_total:{
        type :Number,
        default: 0
       }
       
      }
,
    { timestamps: true }

)
export const Order = mongoose.model('Order', ProductOrder)