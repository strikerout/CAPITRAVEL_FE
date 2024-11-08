import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import style from './ProductoGallery.module.scss'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

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

      <Link to={'/gallery/'+data.id} className='viewMoreImages'>
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 15 15"><path fill="currentColor" d="M10.71 3L7.85.15a.5.5 0 0 0-.707-.003L7.14.15L4.29 3H1.5a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zM7.5 1.21L9.29 3H5.71zM13 12H2V4h11zM5 7a1 1 0 1 1 0-2a1 1 0 0 1 0 2m7 4H4.5L6 8l1.25 2.5L9.5 6z"/></svg>
        View more
      </Link>


    </div>
  )
}

export default ProductGallery
