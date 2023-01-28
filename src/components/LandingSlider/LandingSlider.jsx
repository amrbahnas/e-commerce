import React from "react";
// import Swiper core and required modules
import { Pagination, Autoplay } from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import styles from "./LandingSlider.module.css";

function LandingSlider({ images }) {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{clickable: true}}
      autoplay={true}
      spaceBetween={20}
      slidesPerView={1}
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
            className=" w-full h-full object-fill cursor-pointer"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default LandingSlider;
