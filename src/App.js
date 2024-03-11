import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import  { Toaster } from 'react-hot-toast';
import LayOut from "./Components/LayOut/LayOut";
import Home from "./Components/Home/Home";
import Register from "./Components/Register/Register";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import Brands from "./Components/Brands/Brands";
import Login from "./Components/Login/Login";
import Categories from "./Components/Categories/Categories";
import NotFound from "./Components/NotFound/NotFound";
import ProductDetails from "./Components/ProductDetails/ProductDetails";


import NavBar from "./Components/NavBar/NavBar";
import { useEffect } from "react";
import { useContext } from "react";
import UserContextProvider, { UserContext } from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { CartContextProvider } from "./Context/CartContext";
import FeaturedProducts from "./Components/FeaturedProducts/FeaturedProducts";
import Checkout from "./Components/Checkout/Checkout";
import Allorders from "./Components/Allorders/Allorders";
import Wishlist from "./Components/Wishlist/Wishlist";
import WishListContextProvider from "./Context/WishlistContext";


function App() {
  let routers = createBrowserRouter([
   
    {
      path: "/",
      element: <LayOut />,
      children: [
       
        {
          index: true,
          element: (
            <ProtectedRoute>
              {" "}
              <Home />{" "}
            </ProtectedRoute>
          ),
        },
        { path: "home", element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
       
        {
          path: "products",
          element: (
            <ProtectedRoute>
              {" "}
              <Products/>{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
           <Allorders/>
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
           <Wishlist/>
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              {" "}
              <Categories />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              {" "}
              <Brands />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              {" "}
              <Cart />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
          <Checkout/>
            </ProtectedRoute>
          ),
        },
        {
          path: "productdetails/:id",
          element: (
            <ProtectedRoute>
              {" "}
              <ProductDetails />{" "}
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  // keda ay mkan ye2dar yshouf el usertoken
  return (
    <WishListContextProvider>
    <CartContextProvider>
      <RouterProvider router={routers}> </RouterProvider>
      <Toaster/>
    </CartContextProvider>  </WishListContextProvider>
  );
}

export default App;
