import React, { useContext } from "react";
import styles from "./Home.module.css";

import MainSlider from "../MainSlider/MainSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { Helmet } from "react-helmet";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home page</title>
      </Helmet>
      <MainSlider />
      <CategoriesSlider />
      <FeaturedProducts/>
    </>
  );
}
