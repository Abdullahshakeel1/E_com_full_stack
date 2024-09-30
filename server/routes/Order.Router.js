import { paymentController, userOrders, webHookController } from "../controllers/order.js";
import { Router } from "express";
import { isUserAuthenticate } from "../middleware/auth.middleware.js";
export const OrderRouter = Router()
OrderRouter.post("/checkout",isUserAuthenticate,paymentController);
OrderRouter.post("/webhook",webHookController);
OrderRouter.get("/userOrders",isUserAuthenticate,userOrders);


