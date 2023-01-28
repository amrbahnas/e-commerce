import React from "react";
import { useSelector, useDispatch } from "react-redux";

// import Swiper core and required modules
import { Navigation, Pagination, A11y, Scrollbar, Autoplay } from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
//icon
import EditIcon from "@mui/icons-material/Edit";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./CardSlider.css";
import { Link } from "react-router-dom";
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
    const {  admin } = useSelector((store) => store.AuthSlice);
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
      // onSwiper={(swiper) => console.log("")}
      // onSlideChange={() => console.log("")}
      className="swiper-container p-4"
    >
      {data?.map((item) => (
        <SwiperSlide key={item.id} className="swiperSlide">
          <Link
            to={"/product/" + item.id}
            className="miniCard  w-full rounded-md shadow-md h-72 overflow-hidden p-4 hover:scale-105 hover:shadow-lg"
          >
            <img
              src={item.img}
              alt=""
              className=" bg-img h-2/3  w-full object-cover rounded-md"
            />
            <div className="info p-2 h-2/5 overflow-hidden ">
              <h3 className=" whitespace-nowrap mb-2">{item.title}</h3>
              <span className="block font-bold text-lg">${item.price}</span>
              <span className=" text-gray-500 text-sm line-through">
                ${+item.price + 20}
              </span>
            </div>
          </Link>
          {admin && (
            <Link to={"/admin/edditproduct/" + item.id} target="_blank">
              <div className="editProduct">
                <EditIcon />
              </div>
            </Link>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CardSlider;
