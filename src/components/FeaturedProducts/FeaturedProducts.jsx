import React from "react";
import { useEffect, useState } from "react";
import Card from "../Card/Card";
//fire base
import { products } from '../../Firebase/index';
import { onSnapshot, query, orderBy, where } from "firebase/firestore";
/// end firebase
import "./FeaturedProducts.css";
const FeaturedProducts = ({ title, type }) => {

  const [data, setData] = useState([]);
  useEffect(() => {
    const q = query(products, where("type", "==", type), orderBy("price", "asc"));
     setData([])
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setData((prev) => [...prev,{... doc.data(),id: doc.id}]);
      });
    });
  }, [type]);


  return (
    <div className="FeaturedProducts">
      <div className="theContainer">
        <div className="FeaturedProductsTop flex flex-col md:flex-row">
          <h2 className="mb-3 md:mb-0">{title}</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            delectus perspiciatis numquam earum, ab quisquam, quibusdam
            temporibus animi harum eaque autem eum voluptate. Obcaecati corporis
            quisquam ullam ipsam vero aliquid.
          </p>
        </div>
        <div className="FeaturedProductsBottom">
          {data?.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
      </div>
      .
    </div>
  );
};

export default FeaturedProducts;
