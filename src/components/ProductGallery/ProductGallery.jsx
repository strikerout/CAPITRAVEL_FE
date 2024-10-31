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
        <SwiperSlide className={style.swiperSlide}>
          <img src={data.images[0]} />
        </SwiperSlide>
        <SwiperSlide className={style.swiperSlide}>
          <img src={"https://swiperjs.com/demos/images/nature-2.jpg"}  />
        </SwiperSlide>
        <SwiperSlide className={style.swiperSlide}>
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide className={style.swiperSlide}>
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
        <SwiperSlide className={style.swiperSlide}>
          <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
        </SwiperSlide>
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
        <SwiperSlide className={style.swiperSlide}>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide className={style.swiperSlide}>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide className={style.swiperSlide}>
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide className={style.swiperSlide}>
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
        <SwiperSlide className={style.swiperSlide}>
          <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
        </SwiperSlide>

      </Swiper>


    </div>
  )
}

export default ProductGallery
