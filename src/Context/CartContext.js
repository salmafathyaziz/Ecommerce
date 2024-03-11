import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export let CartContext = createContext();

export function CartContextProvider(props) {
  const [cartId, setCartId] = useState(null);
  const [numOfCartItems, setNumOfCartItems] = useState(null);

  async function getInitialCart() {
    let { data } = await getLoggedUserCart();

    setNumOfCartItems(data?.numOfCartItems);
    setCartId(data?._id);
  }

  useEffect(() => {
    getInitialCart();
  }, []);

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function addToCart(x) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: x,
        },
        { headers: headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers: headers })
      .then((response) => response)
      .catch((err) => err);
  }

  function removeCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  function onlinePayment(shippingAddress, productId) {
    //65e078b4be8b5232357dfabd

    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${productId}?url=http://localhost:3000`,
        { shippingAddress },

        { headers: headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function updateProductQuantity(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: count },
        { headers: headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getLoggedUserCart,
        removeCartItem,
        updateProductQuantity,
        onlinePayment,
        numOfCartItems,
        setNumOfCartItems,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
