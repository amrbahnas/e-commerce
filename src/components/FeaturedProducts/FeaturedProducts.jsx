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
    const fetchedData=[]
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        fetchedData.push({ ...doc.data(), id: doc.id });
      });
      setData(fetchedData);
    });
  }, [type]);

  return (
    <div className="FeaturedProducts">
      <div className="theContainer">
        <div className="sectionWrapper bg-white  rounded-md">
          <div className="FeaturedProductsTop w-full">
            <h2 className="p-6 capitalize font-bold text-3xl">
              {title}
            </h2>
          </div>
          <div className="FeaturedProductsBottom">
            <CardSlider
              data={data}
              paginationIs={false}
              ScrollbarIs={false}
              NavigationIs={true}
              autoplayIs={false}
              spaceBetweenIs={1}
              slidesPerViewIs={5}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
