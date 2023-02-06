import React from "react";
// import Swiper core and required modules
import { Navigation, Pagination, A11y, Scrollbar, Autoplay } from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// style file
import "./CardSlider.css";
// component
import SingleCard from "./SingleCard";

/************************************* start ************************************************** */
const CardSlider = ({
  data,
  paginationIs,
  scrollbarIs,
  NavigationIs,
  autoplayIs,
  spaceBetweenIs,
  slidesPerViewIs,
}) => {
  /************************************* DOM ************************************************** */
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, Scrollbar, Autoplay]}
      pagination={paginationIs}
      scrollbar={scrollbarIs}
      navigation={NavigationIs}
      autoplay={autoplayIs}
      spaceBetween={spaceBetweenIs}
      slidesPerView={slidesPerViewIs}
      breakpoints={{
        340: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      }}
      className="swiper-container"
    >
      {data?.map((item) => (
        <SwiperSlide key={item.id} className="swiperSlide">
          <SingleCard item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CardSlider;
