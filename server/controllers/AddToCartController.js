import { CART } from "../models/AddToCart.Model.js"

const AddToCartController = async(req,res) => {
 try {
  const {productId} = req.body
  const currentUser = req.userID
  const isproductAvailable = await CART.findOne({productId , userId: currentUser})
  if(isproductAvailable){
    return res.json({
      message : "Already exist in add to cart",
      success : false,
      error :true,
    })
  }
  const paylod = {
    productId : productId,
    quantity :1,
    userId :currentUser,
  }
 const newAddToCart = new CART(paylod);
 const saveProduct = newAddToCart.save()
  return  res.json({
  data : saveProduct,
  message : "product Added to Cart",
  success : true,
  error : false,

 })
  
 } catch (error) {
  res.json({
    success:false,
    error:true,
    message :error || "error while product added",
  })
 }
}

export default AddToCartController
export const CountAddTocartProduct =async (req, res)=>{
  try {
    const userId = req.userID
    const count = await CART.countDocuments({
      userId :userId
    })
    res.json({
      data :{
        count : count,
      },
      message:"ok" ,
      success:true,
      error :false
    })
  } catch (error) {
    res.json({
      success:false,
      error:true,
      message :error || "error while product count",
    })
  }
}
export const AddToCartViewProduct = async (req, res)=>{
  try {
    const currentUser = req.userID
    const Products = await CART.find({userId:currentUser}).populate("productId")
    res.json({
      data : Products,
      success:true,
      error:false
    })

  }catch (error) {
    res.json({
      success:false,
      error:true,
      message :error || "error while AddToCartViewProduct",
    })
  }
}
export const UpdateAddToCart =  async (req, res) => {
  try {
    const currentUser = req.userID; // Make sure the user is authenticated
    const addtocartProductId = req.body._id; // Product ID to update
    const qty = req.body.quantity; // New quantity to set
// console.log(qty, addtocartProductId)
    // Check if the quantity is valid before updating
    if (!addtocartProductId || qty === undefined) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Product ID and quantity are required.",
      });
    }

    // Update the product quantity in the cart
    const Updataproducts = await CART.updateOne(
      { _id: addtocartProductId }, // Match the document to update
      { $set: { quantity: qty } }   // Set the new quantity
    );

    // Send the response back
    res.json({
      data: Updataproducts,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Error while updating cart",
    });
  }
};
export const DelAddToCart =  async (req, res) => {
  try {
    const currentUser = req.userID; 
    const addtocartProductId = req.body._id;
console.log( addtocartProductId)

    if (!addtocartProductId ){
      return res.status(400).json({
        success: false,
        error: true,
        message: "Product ID and quantity are required.",
      });
    }

    const Delproduct = await CART.deleteOne(
      { _id: addtocartProductId }
    );

    res.json({
      data: Delproduct,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Error while Delproduct cart",
    });
  }
};
