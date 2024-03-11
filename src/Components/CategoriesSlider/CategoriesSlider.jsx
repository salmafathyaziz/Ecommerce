import React, { useEffect, useState } from 'react'
import styles from'./CategoriesSlider.module.css'
import axios from 'axios'
import Slider from 'react-slick';

export default function CategoriesSlider() {

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
  };


  const [categories , setCategories] = useState([]);

   async function getCategories(){


  let {data} =await  axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  console.log(data);
  setCategories(data.data)

}

useEffect(()=>  {
getCategories()
}, [] )

  return (
   <>
   <div className='container'>
    <h2> Show Popular Categories </h2>

    <Slider    {...settings}>
{/* kol ma  t3mel map 3la category hat create eldiv dy */}
 {categories.map(cat =>    <div className='category px-1'>
      <img src={cat.image}  height={"150"} className='w-100' alt=""/>
      <h5>  {cat.name}   </h5>
    </div> )}

    </Slider>

  

   </div>
   
   </>
  )
}
