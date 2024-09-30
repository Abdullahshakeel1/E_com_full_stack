// routes.js
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import Login from "../pages/Login";
import ForgotPass from "../pages/ForgotPass";
import SiginUp from "../pages/SiginUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProducts from "../pages/CategoryProducts";
import Productdetails from "../pages/Productdetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import Order from "../pages/Order";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "forgot-password",
                element: <ForgotPass />
            },
            {
                path: "sign-up",
                element: <SiginUp />
            },
            {
                path: "product-category",
                element: <CategoryProducts />
            },
            {
                path: "Product/:id",
                element: <Productdetails />
            },
            {
                path: "Cart",
                element: <Cart/>
            },
            {
                path: "Search",
                element: <SearchProduct/>
            },
            {
                path: "success",
                element: <Success/>
            },
            {
                path: "cancel",
                element: <Cancel/>
            },
            {
                path: "order",
                element: <Order/>
            },
            {
                path: "admin-panel",
                element: <AdminPanel />,
                children : [
                    {
                        path: "all-user",
                        element: <AllUsers />
                    },
                    {
                        path: "all-products",
                        element: <AllProducts />
                    }
                ]
            },
         
        ]
    }
]);
