// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import React, { useState } from "react";
// import Slider from "react-slick";
// import ProductCard from "../Cards/ProductCard";
// import style from './Carousel.module.scss'

// function Carousel() {
//   const [display, setDisplay] = useState(true);
//   const [width, setWidth] = useState(600);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1
//   };
//   return (
//     <div className={style.slider}>
//       {/* <h2> Resizable Collapsible </h2>
//       <button className="button" onClick={() => setWidth(width + 100)}>
//         {" "}
//         increase{" "}
//       </button>
//       <button className="button" onClick={() => setWidth(width - 100)}>
//         {" "}
//         decrease{" "}
//       </button>
//       <button className="button" onClick={() => setDisplay(!display)}>
//         {" "}
//         toggle{" "}
//       </button> */}
//       <div
//         style={{
//           width: width + "px",
//           display: display ? "block" : "none"
//         }}
//       >
//         <Slider {...settings}>
//           <div>
//             <h3><ProductCard/></h3>
//           </div>
//           <div>
//             <h3><ProductCard/></h3>
//           </div>
//           <div>
//             <h3><ProductCard/></h3>
//           </div>
//           <div>
//             <h3><ProductCard/></h3>
//           </div>
//           <div>
//             <h3><ProductCard/></h3>
//           </div>
//           <div>
//             <h3><ProductCard/></h3>
//           </div>
//         </Slider>
//       </div>
//     </div>
//   );
// }
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from "../Cards/ProductCard";
import './Carousel.module.scss'


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';

export default function Carousel() {
  return (
    <>
      <Swiper
        slidesPerView={1.5}
        spaceBetween={15}
        // pagination={{
        //   clickable: true,
        // }}
        autoplay={{ delay: 1000 }}      
        loop={true}                      
        modules={[Pagination]}
        className="mySwiper"
      >
        
        <SwiperSlide><ProductCard/></SwiperSlide>
        <SwiperSlide><ProductCard/></SwiperSlide>
        <SwiperSlide><ProductCard/></SwiperSlide>
        <SwiperSlide><ProductCard/></SwiperSlide>
        <SwiperSlide><ProductCard/></SwiperSlide>
        <SwiperSlide><ProductCard/></SwiperSlide>
        <SwiperSlide><ProductCard/></SwiperSlide>
        <SwiperSlide><ProductCard/></SwiperSlide>
        <SwiperSlide><ProductCard/></SwiperSlide>
      </Swiper>
    </>
  );
}


