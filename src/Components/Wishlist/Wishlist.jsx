import React, { useContext, useEffect, useState } from "react";
import styles from "./Wishlist.module.css";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishlistContext";
import { Oval } from "react-loader-spinner";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Wishlist() {
  const [wishlistDetails, setWishlistDetails] = useState({});

  let { getWishlist, removeWish } = useContext(WishListContext);

  let { addToCart,setNumOfCartItems } = useContext(CartContext);



  async function getWishlistDetails() {
    let data = await getWishlist();
    console.log(data);
    setWishlistDetails(data);
  }

  async function removeItem(id) {
    let { data } = await removeWish(id);
    getWishlistDetails(data);
  }

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

  useEffect(() => {
    getWishlistDetails();
  }, []);

  return (
    <>
      <Helmet>
        <title>Wishlist</title>
      </Helmet>
      {wishlistDetails.data ? (
        <div className="mt-5 mx-auto bg-main-light p-5">
          <h1 className="mb-3">My Wishlist</h1>

          {wishlistDetails.data.data.map((ele) => (
            <div key={ele._id} className="row border-bottom py-2">
              <div className="col-md-1">
                <img className="w-100" src={ele.imageCover} alt="" />
              </div>
              <div className="col-md-11">
                <div className="d-flex justify-content-between">
                  <div className="leftside">
                    <h4>{ele.title}</h4>
                    <p className="fw-bolder text-success">{ele.price}</p>
                    <button
                      className="btn text-danger p-0 "
                      onClick={() => removeItem(ele._id)}
                    >
                      <i className="fas fa-trash"></i> Remove
                    </button>
                  </div>
                  <div className="rightside">
                    <button   className="btn borderButton "      onClick={() => addProduct(ele.id)}  >add to cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <section
          id="loading"
          className="d-flex justify-content-center align-items-center"
        >
          <Oval
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass="justify-content-center"
          />
        </section>
      )}
    </>
  );
}
