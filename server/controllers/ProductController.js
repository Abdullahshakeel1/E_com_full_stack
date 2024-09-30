import { uploadPrermissions } from "../helper/Prmision.js"
import { Product } from "../models/Product.Model.js"

export const UploadProductController =async (req,res)=>{
    try {
        const sessionUser =req.userID
        if(!uploadPrermissions(sessionUser)){
            return res.status(403).json({
                message: "Access Denied",
                error: true,
                success: false
            })
        }

        const uploadProduct  = new Product(req.body)
        const saveProduct = uploadProduct.save()
        res.status(201).json(
            {   data:saveProduct,
                error: false,
                message: "Product uploaded successfully",
                success: true,
            })
    } catch (error) {
        res.status(500).json({
            message: "Error uploading product",
            error: error || error.message,
            success: false
        })
        
    }
}
export const getAllProductController =async (req,res)=>{
    try {
        const allProduct = await Product.find().sort({createdAt :-1})
        res.status(200).json({
            data: allProduct,
            error: false,
            message: "All products retrieved successfully",
            success: true,
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Error getting product",
            error: error || error.message,
            success: false
        })
        
    } 
}
export const UpdateProduct = async (req, res) => {
    try {
        const sessionUser = req.userID;

        // Check if the user has permission to update the product
        if (!uploadPrermissions(sessionUser)) {
            return res.status(403).json({
                message: "Access Denied",
                error: true,
                success: false
            });
        }

        const { _id, ...updateData } = req.body;

        // Validate the ID
        if (!_id || !updateData) {
            return res.status(400).json({
                message: "Invalid request data",
                error: true,
                success: false
            });
        }

        // Find the product and update it
        const updatedProduct = await Product.findByIdAndUpdate(_id, updateData, { new: true });

        // If no product found
        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false
            });
        }

        res.status(200).json({
            data: updatedProduct,
            error: false,
            message: "Product updated successfully",
            success: true
        });
    } catch (error) {
        console.error("Error updating product:", error); // Log the error for debugging purposes

        res.status(500).json({
            message: "Error updating product",
            error: error.message || "An unexpected error occurred",
            success: false
        });
    }
};
export const getCategoryProduct =async (req ,res)=>{
    try {
        const productCategory =await Product.distinct("category")
        console.log("category :", productCategory)
        const ProductByCategory = []
        for(const category of productCategory){
            const product =await Product.findOne({category})
            if(product){
                ProductByCategory.push(product)
            }
        }
        res.status(201).json({
            data: ProductByCategory,
            success : true,
            error:false

        })
    } catch (error) {
        res.status(500).json(
            {
                message : "error while get Category by Product",
                success : false,
                error: error.message || "An unexpected error occurred",



            }
        )
        
    }
}


export const getcategoryWiseProduct =async (req,res)=>{
    try {
        const {category} = req?.body || req?.query
        const product =  await Product.find({category})
        res.status(200).json({
            success:true,
            data : product,
            message : "product get ",
            error : false
        })
    } catch (error) {
        res.status(500).json({
            message: "error to get category Wise Product ",
            error: error || error.message,
            success: false
        })
    }
}
export const productDetails =async(req,res)=>{
    try {
        const {productId}=req.body
        const product = await Product.findById(productId)
        res.json({
            data: product,
            message: "ok",
            success:true , 
            error : false,
        })
        
    } catch (error) {
        res.status(500).json({
            message: "error to get category Wise Product ",
            error: error || error.message,
            success: false
        })
    }
}
export const SearchProduct = async (req, res )=>{
    try {
      const query = req.query.q
      console.log(query)
      const regex = new RegExp(query, "ig");
      const product = await Product.find({
        "$or" :[
            {
                productName: regex
            },
            {
                category :regex
            }
        ]
      })
      res.json({
        data:product,
        error :false,
        success: true,
        message : " search product List"
      })
      
    } catch (error) {
      res.status(500).json({
        success: false,
        error: true,
        message: error.message || "Error while SearchProduct cart",
      });
    }
  }

  export const FiltterProduct = async (req, res )=>{
    try {
      const CategoryList = req?.body?.category || []
     
      const product = await Product.find({
        category:{
            "$in" : CategoryList
        }
      })
      res.json({
        data:product,
        error :false,
        success: true,
        message : " FiltterProduct"
      })
      
    } catch (error) {
      res.status(500).json({
        success: false,
        error: true,
        message: error.message || "Error while FiltterProduct cart",
      });
    }
  }