import styles from "./FeaturedProducts.module.css";
import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { Oval } from "react-loader-spinner";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/WishlistContext";

export default function FeaturedProducts() {
  let { addToCart, setNumOfCartItems } = useContext(CartContext);
  let { addToWishlist } = useContext(WishListContext);

  async function addProduct(productId) {
    let response = await addToCart(productId);

    if (response.data.status === "success") {
      toast.success("product added successfully", {
        duration: 2000,
        position: "top-center",
      });
      setNumOfCartItems(response.data.numOfCartItems);
    } else {
      toast.error("cant add product");
    }
  }

  async function addWish(id) {
    let response = await addToWishlist(id);
    if (response.data.status == "success") {
      toast(" It has been succefully added", {
        duration: 2000,
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "green",
          color: "#fff",
        },
        icon: "❤️",
      });
    } 
    else {
      toast.error("cant add product");
    }
  }

  function getFeaturedProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { isLoading, isError, data, isFetching } = useQuery(
    "allProducts",
    getFeaturedProducts,
    { cacheTime: 3000 }
  );
  console.log("isLoading", isLoading);
  console.log("isFetching", isFetching);

  return (
    <>
      <h2>Products</h2>
      <div className="container  py-5">
        {isLoading ? (
          <Oval
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass="justify-content-center"
          />
        ) : (
          <div className="row">

            {data?.data.data.map((ele) => ( <div key={ele.id} className="col-md-2">
            <div className="product  px-2 py-3">
                <Link to={`/productdetails/${ele.id}`}>
                 
                    <img
                      src={ele.imageCover}
                      className="w-100"
                      alt={ele.title}
                    />
                    <p className="text-main"> {ele.category.name}</p>
                    <h3 className="h6">
                      {ele.title.split(" ").slice(0, 3).join(" ")}
                    </h3>
                    0
                    <div className="d-flex  justify-content-between">
                      <p>{ele.price}EGP</p>
                      <p>
                        {" "}
                        <i className="fa fa-star rating-color"></i>{" "}
                        {ele.ratingsAverage}
                      </p>
                    </div>
                
                </Link>
                


                <button onClick={() => addWish(ele.id)} className="btn ">
                  <i className="fa-solid fa-heart   fs-4 "></i>{" "}
                </button>
                <button
                  onClick={() => addProduct(ele.id)}
                  className="btn bg-main text-white w-100"
                >
                  {" "}
                  Add to cart
                </button>   
              </div>  
              </div>
            ))} 
          </div>
        )}
      </div>  
    </>
  );
}
