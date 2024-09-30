import { Router } from "express";
import { isUserAuthenticate } from "../middleware/auth.middleware.js";
import AddToCartController, {  AddToCartViewProduct, CountAddTocartProduct, DelAddToCart, UpdateAddToCart } from "../controllers/AddToCartController.js";
export const AddToCartRoute = Router();
AddToCartRoute.post("/Cart",isUserAuthenticate,AddToCartController)
AddToCartRoute.get("/CountAddTocartProduct",isUserAuthenticate,CountAddTocartProduct)
AddToCartRoute.get("/AddToCartViewProduct",isUserAuthenticate,AddToCartViewProduct)
AddToCartRoute.post("/UpdateAddToCart", isUserAuthenticate, UpdateAddToCart);
AddToCartRoute.post("/DelAddToCart", isUserAuthenticate, DelAddToCart);



