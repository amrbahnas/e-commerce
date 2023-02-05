import React from "react";
// import Swiper core and required modules
import { Pagination, Autoplay } from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import styles from "./LandingSlider.module.css";

function LandingSlider({ images, slidesPerView, autoplay,SPV1,SPV2,SPV3,SPV4 }) {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={autoplay}
      spaceBetween={20}
      // slidesPerView={slidesPerView}
      breakpoints={{
        340: {
          slidesPerView: SPV1,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: SPV2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: SPV3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: SPV4,
          spaceBetween: 20,
        },
      }}
      // onSwiper={(swiper) => console.log("")}
      // onSlideChange={() => console.log("")}
      className="h-full"
    >
      {images?.map((item, indx) => (
        <SwiperSlide key={indx}>
          <img
            src={item}
            alt=""
            key={indx}
            className="object-fill w-full h-full cursor-pointer"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default LandingSlider;
