import React, { useContext, useEffect } from "react";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import Slider from "react-slick";
import { WishListContext } from "../../Context/WishlistContext";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";

// useparams basthkdemo law ana ba3ta parameters fo2 fy elpath ana 3ayza astlmha to make any actions

export default function ProductDetails() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  let params = useParams();

  function getProductsDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  //query key and function
  let {  data } = useQuery("productDetails", () => getProductsDetails(params.id));


  let { addToCart, setNumOfCartItems } = useContext(CartContext);
  let { addToWishlist } = useContext(WishListContext);

  console.log(data?.data.data);


  async function addProduct(productId) {
    let response = await addToCart(productId);

    if (response.data.status === "success") {
      toast.success("product added successfully", {
        duration: 2000,
        position: "top-center",
      });
      setNumOfCartItems(data.numOfCartItems);
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


  return (
    <>

    <Helmet>
<title>
  {data?.data.data.title}
</title>
    </Helmet>


      {data?.data.data ? (
        <div className="row py-2 align-items-center">
          <div className="col-md-4">
          <Slider {...settings}>
   
   {data?.data.data.images.map((ele) => <img src={ele} alt=''/>)}
    </Slider>
          </div>

          <div className="col-md-8">
            <h2 className="h5"> {data?.data.data.title} </h2>
            <p> {data?.data.data.description}</p>
            <h6 className="text-main">{data?.data.data.category.name}</h6>
            <h6 className="text-main"> Price : {data?.data.data.price} EGP</h6>
            <div className="d-flex justify-content-between">
              <span>ratingsQuantity: {data?.data.data.ratingsQuantity}</span>
              <span>
                {" "}
                <i className="fas fa-star rating-color"></i>{" "}
                <h6 className="text-main">{data?.data.data.ratingsAverage}</h6>{" "}
              </span>
            </div>
            
            <button  onClick={() => addWish(data?.data.data.id)}  className="btn ">
                <i className="fa-solid fa-heart   fs-4 "></i> </button>
              

            <button  className="btn bg-main text-white w-100 mt-2"  onClick={() => addProduct(data?.data.data.id)}>
             
              Add to cart
            </button>
          </div>
        </div>
      ) : ("")}
    
    </>
  );
}
