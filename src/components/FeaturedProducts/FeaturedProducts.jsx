import React from "react";
import { useEffect, useState } from "react";
import Card from "../Card/Card";
import CardSlider from "../CardSlider/CardSlider";
//fire base
import { products } from "../../Firebase/index";
import { onSnapshot, query, orderBy, where } from "firebase/firestore";

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
        <div className="sectionWrapper bg-white pt-6  md:py-10 rounded-md">
          <div className="FeaturedProductsTop flex flex-col md:flex-row">
            <h2 className=" md:mr-10 w-full ">{title}</h2>
            <p className="hidden md:block">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos delectus perspiciatis numquam earum, ab quisquam,
              quibusdam temporibus animi harum eaque autem eum voluptate.
              Obcaecati corporis quisquam ullam ipsam vero aliquid.
            </p>
          </div>
          <div className="FeaturedProductsBottom">
            <CardSlider
              data={data}
              paginationIs={false}
              ScrollbarIs={false}
              NavigationIs={false}
              autoplayIs={false}
              spaceBetweenIs={20}
              slidesPerViewIs={5}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
