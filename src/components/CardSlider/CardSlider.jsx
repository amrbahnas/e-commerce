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
import "./CardSlider.css";
const CardSlider = ({
  children,
  data,
  paginationIs,
  scrollbarIs,
  NavigationIs,
  autoplayIs,
  spaceBetweenIs,
  slidesPerViewIs,
}) => {
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
          slidesPerView: 1,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      }}
      // onSwiper={(swiper) => console.log("")}
      // onSlideChange={() => console.log("")}
      className="swiper-container p-4"
    >
      {data?.map((item) => (
            <SwiperSlide key={item.id} className="swiperSlide">
              {React.cloneElement(children, { item, key: item.id })}
            </SwiperSlide>
          ))
       }
    </Swiper>
  );
};

export default CardSlider;
