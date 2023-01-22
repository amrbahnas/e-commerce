import React from "react";
import { useEffect, useState } from "react";
import Card from "../Card/Card";
//fire base
import { products } from "../../Firebase/index";
import { onSnapshot, query, orderBy, where } from "firebase/firestore";
// import Swiper core and required modules
import { Navigation, Pagination, A11y, Scrollbar, Autoplay } from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// Import component styles
import "./FeaturedProducts.css";
const FeaturedProducts = ({ title, type }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const q = query(
      products,
      where("type", "==", type),
      orderBy("price", "asc")
    );
    setData([]);
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setData((prev) => [...prev, { ...doc.data(), id: doc.id }]);
      });
    });
  }, [type]);

  return (
    <div className="FeaturedProducts">
      <div className="theContainer">
        <div className="sectionWrapper bg-white p-4 rounded-md">
          <div className="FeaturedProductsTop flex flex-col md:flex-row">
            <h2 className="mb-3 md:mb-0">{title}</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos delectus perspiciatis numquam earum, ab quisquam,
              quibusdam temporibus animi harum eaque autem eum voluptate.
              Obcaecati corporis quisquam ullam ipsam vero aliquid.
            </p>
          </div>
          <div className="FeaturedProductsBottom">
            <Swiper
              modules={[Navigation, Pagination, A11y, Scrollbar, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              spaceBetween={1}
              slidesPerView={4}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
              className="swiper-container"
            >
              {data?.map((item) => (
                <SwiperSlide key={item.id}>
                  <Card item={item} key={item.id} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
