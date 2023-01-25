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
  images,
  paginationIs,
  scrollbarIs,
  NavigationIs,
  autoplayIs,
  spaceBetweenIs,
  slidesPerViewIs,
  breakpoints,
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
      // onSwiper={(swiper) => console.log("")}
      // onSlideChange={() => console.log("")}
      className={`swiper-container ${images ? "p-0" : "p-4"}`}
    >
      {data
        ? data?.map((item) => (
            <SwiperSlide key={item.id} className="swiperSlide">
              {React.cloneElement(children, { item, key: item.id })}
            </SwiperSlide>
          ))
        : images?.map((item, indx) => (
            <SwiperSlide key={indx}>
              <img
                src={item}
                alt=""
                key={indx}
                className=" w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
    </Swiper>
  );
};

export default CardSlider;
