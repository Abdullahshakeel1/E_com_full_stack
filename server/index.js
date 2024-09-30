import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Db } from './config/db.js';
import { AuthRoute } from './routes/Auth.Router.js';
import cookieParser from 'cookie-parser';
import { productroductRouter } from './routes/Product.Router.js';
import { AddToCartRoute } from './routes/AddToCart.Router.js';
import { OrderRouter } from './routes/Order.Router.js';

dotenv.config();
const app = express(); 
app.use(cors(
    {
        origin: process.env.FRONT_END_URL,
        credentials: true,
    }
))
app.use(cookieParser())


app.use(express.json());
app.use("/api/v1/auth",AuthRoute)
app.use("/api/v1/product",productroductRouter)
app.use("/api/v1/addToCart",AddToCartRoute)
app.use("/api/v1/order",OrderRouter)



const port = 8080 ||process.env.PORT ;
Db().then(()=>app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
}))
