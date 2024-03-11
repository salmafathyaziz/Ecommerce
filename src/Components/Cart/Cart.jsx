import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { Oval } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";


export default function Cart() {
  let { getLoggedUserCart, removeCartItem, updateProductQuantity , setNumOfCartItems} =  useContext(CartContext);

  let [cartDetails, setCartDetails] = useState(null);

  async function removeItem(id) {
    let  data  = await removeCartItem(id);
console.log(data);
    setNumOfCartItems(data.numOfCartItems)
    setCartDetails(data.data.products);
    getCart();
  }

  async function updateCount(id, count) {
    let { data } = await updateProductQuantity(id, count);
    setCartDetails(data);
     
  }

  async function getCart() {
    let { data } = await getLoggedUserCart();
setNumOfCartItems(data.numOfCartItems)

    setCartDetails(data);
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
  <Helmet>
        <title>Cart</title>
      </Helmet>

      {cartDetails ? ( <div  className="w-75 mx-auto p-3 bg-main-light py-5  ">
          <h3>Shopping Cart</h3>
          <h4 className="  text-main  fw-bolder fs-6 ">
            Cart Items: {cartDetails.numOfCartItems}
          </h4>
          <div className="d-flex justify-content-between">
          <h4 className="text-main fw-bolder  fs-6 mb-4">
            Total Cart Price: {cartDetails.data.totalCartPrice} EGP
          </h4>

 <Link  className="btn btn-primary text-white fw-bold" to={'/checkout'}> Checkout</Link>

          </div>

          {cartDetails.data.products.map((product) => (
            <div key={product.product._id} className="row border-bottom py-2 ">
              <div className="col-md-1">
                <img
                  className="w-100"
                  src={product.product.imageCover}
                  alt=""
                />
              </div>

              <div className="col-md-11">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 className="h6">
                      {" "}
                      {product.product.title.split(" ").slice(0, 3).join(" ")}
                    </h3>
                    <h6 className="text-main"> Price: {product.price} EGP</h6>
                  </div>

                  <div>
                  <button   onClick={() =>updateCount(product.product.id, product.count - 1)} className=" p-1 borderButton btn">-</button>
                    <span className="mx-2">{product.count}</span>
                    

                    <button
                      onClick={() =>
                        updateCount(product.product.id, product.count + 1)
                      }
                      className="btn p-1  borderButton"
                    >
                      +
                    </button >
                  </div>
                </div>

                <button
                  onClick={() => removeItem(product.product._id)}
                  className="btn p-0 fs-6">
                  <i className="text-danger font-sm fas fa-trash-can  fw-light"></i>{" "}
                  Remove
                </button>
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
