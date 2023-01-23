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
import styles from "./CardSlider.module.css";
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
      breakpoints={{
        // when window width is >= 640px
        320: {
          width: breakpoints ? null : 300,
          slidesPerView: breakpoints || 1,
        },
        // when window width is >= 640px
        768: {
          width: breakpoints ? null : 750,
          slidesPerView: breakpoints || 2,
        },
        // when window width is >= 768px
        992: {
          width: breakpoints ? null : 970,
          slidesPerView: breakpoints || 4,
        },
        1200: {
          width: breakpoints ? null : 1170,
          slidesPerView: breakpoints || 4,
        },
      }}
      // onSwiper={(swiper) => console.log("")}
      // onSlideChange={() => console.log("")}
      className={`${styles.swiperContainer} w-full h-full`}
    >
      {data
        ? data?.map((item) => (
            <SwiperSlide key={item.id} className={styles.swiperSlide}>
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
