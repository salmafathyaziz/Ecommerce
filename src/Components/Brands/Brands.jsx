import React from "react";
import styles from "./Brands.module.css";
import { Helmet } from "react-helmet";

import { useQuery } from "react-query";
import { Oval } from "react-loader-spinner";
import axios from "axios";

export default function Brands() {
  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  let { isLoading, isError, data } = useQuery("allbrands", getBrands, {
    cacheTime: 2000,
  });
  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <h2 className="text-main text-center fw-bolder py-4"> All Brands</h2>{" "}
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
          {data?.data.data.map((brand) => (
            <div key={brand.id} className="col-md-3 product mx-auto py-3 g-3 ">
              <img src={brand.image} className="w-100 mb-3" alt="" />
              <p className="text-center"> {brand.name}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
