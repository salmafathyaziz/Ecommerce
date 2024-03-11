import axios from "axios";
import { createContext } from "react";

export let WishListContext = createContext();

let headers = {
  token: localStorage.getItem("userToken"),
};

export default function WishListContextProvider(props) {
  function addToWishlist(id) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: id,
        },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function getWishlist() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((res) => res)
      .catch((err) => err);
  }

  function removeWish(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  return (
    <WishListContext.Provider
      value={{ addToWishlist, getWishlist, removeWish }}
    >
      {props.children}
    </WishListContext.Provider>
  );
}
