import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import style from './ProductoGallery.module.scss'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

//Import Icon
import { FaImage } from "react-icons/fa6";

import './ProductoGallery.module.scss'

// import required modules
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

const ProductGallery = ({data}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className={style.productGallery}>
        <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        autoplay={{ delay: 3000, disableOnInteraction: true }}  
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className={style.mySwiper2}
      >
        {data.images.map((image, index) => (
          <SwiperSlide key={index} className={style.swiperSlide}>
          <img src={image} />
        </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        breakpoints={{
            768: {
                direction:"vertical"
            },
          }}   
        modules={[FreeMode, Navigation, Thumbs]}
        className={style.mySwiper + ' ' + style.selector}
      >
        {data.images.map((image, index) => (
          <SwiperSlide key={index} className={style.swiperSlide}>
          <img src={image} />
        </SwiperSlide>
        ))}

      </Swiper>

      <Link to={'/gallery/'+data.id} className='buttonMoreAction'>
      <FaImage />
        View more
      </Link>


    </div>
  )
}

export default ProductGallery
