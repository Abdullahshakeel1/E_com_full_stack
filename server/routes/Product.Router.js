import { Router } from "express";
import { FiltterProduct, getAllProductController, getCategoryProduct, getcategoryWiseProduct, productDetails, SearchProduct, UpdateProduct, UploadProductController } from "../controllers/ProductController.js";
import { isUserAuthenticate } from "../middleware/auth.middleware.js";
export const productroductRouter = Router()
productroductRouter.post('/Upload-products',isUserAuthenticate,UploadProductController)
productroductRouter.get('/All-products',getAllProductController)
productroductRouter.post('/Update-products',isUserAuthenticate,UpdateProduct)
productroductRouter.get('/Get-Category-Product',getCategoryProduct)
productroductRouter.post('/Get-Category-Wise-Product',getcategoryWiseProduct)
productroductRouter.post('/product-details',productDetails)
productroductRouter.get("/SearchProduct",SearchProduct);
productroductRouter.post("/FiltterProduct",FiltterProduct);



