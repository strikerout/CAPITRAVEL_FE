import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from "../Cards/ProductCard";
import useExperiences from '../../hooks/useExperience'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import './CarouselMod.scss'

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

export default function Carousel() {
  const {experiences, error, loading} = useExperiences();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Swiper
      style={{
        '--swiper-navigation-color': '#562210',
        '--swiper-pagination-color': '#562210',
      }}
        slidesPerView={1}
        spaceBetween={15}
        autoplay={{ delay: 3000 }}      
        loop={true}
        pagination={{ clickable: true }}
        navigation
        centeredSlides={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}                
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        className="mySwiper"
      >
        {experiences.map((experience)=>(
             <SwiperSlide key={experience.id}><ProductCard data={experience}/></SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}


