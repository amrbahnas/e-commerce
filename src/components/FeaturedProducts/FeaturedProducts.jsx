import React from "react";
import { useEffect, useState } from "react";
// component
import CardSlider from "../CardSlider/CardSlider";
//fire base
import { products } from "../../Firebase/index";
import { onSnapshot, query, orderBy, where } from "firebase/firestore";
// Import component styles
import "./FeaturedProducts.css";
/************************************* start ************************************************** */
const FeaturedProducts = ({ title, type }) => {
  const [data, setData] = useState([]);
  // fetch data
  useEffect(() => {
    const q = query(
      products,
      where("type", "==", type),
      orderBy("price", "asc")
    );
    const fetchedData = [];
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        fetchedData.push({ ...doc.data(), id: doc.id });
      });
      setData(fetchedData);
    });
  }, [type]);
  /************************************* DOM ************************************************** */
  return (
    <div className="FeaturedProducts">
      <div className="theContainer">
        <div className="bg-white rounded-md sectionWrapper dark:bg-darkCard">
          <div className="w-full FeaturedProductsTop">
            <h2 className="p-6 text-3xl font-bold capitalize">{title}</h2>
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
