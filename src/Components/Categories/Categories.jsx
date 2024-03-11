import React from "react";
import styles from "./Categories.module.css";

import { Helmet } from "react-helmet";

import { useQuery } from "react-query";
import { Oval } from "react-loader-spinner";
import axios from "axios";

export default function Categories() {
  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { isLoading, isError, data } = useQuery("allbrands", getCategories, {
    cacheTime: 2000,
  });

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>

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
        <div className="row py-5">
          {data?.data.data.map((cat) => (
            <div key={cat.id} className="col-md-4 product mb-3">
              <img
                src={cat.image}
                className="w-100 mb-3 "
                height={370}
                alt=""
              />
              <h3 className="text-center text-main fw-bolder "> {cat.name}</h3>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
